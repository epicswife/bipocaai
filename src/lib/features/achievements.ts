import { db } from '@/lib/firebase';
import { Achievement, StudentProgress } from '@/types';
import { 
  collection, 
  doc, 
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  runTransaction,
  serverTimestamp
} from 'firebase/firestore';
import { ACHIEVEMENT_ERRORS } from '@/lib/errors';

export async function checkAchievementProgress(
  userId: string,
  achievementId: string
): Promise<{ earned: boolean; progress: number }> {
  const achievementRef = doc(db, 'achievements', achievementId);
  const achievementDoc = await getDoc(achievementRef);

  if (!achievementDoc.exists()) {
    throw ACHIEVEMENT_ERRORS.NOT_FOUND;
  }

  const achievement = achievementDoc.data() as Achievement;
  let totalProgress = 0;

  // Check each requirement
  for (const requirement of achievement.requirements) {
    let progress = 0;

    switch (requirement.type) {
      case 'assignment':
        // Check completed assignments
        const assignmentsQuery = query(
          collection(db, 'assignments'),
          where('status', '==', 'published')
        );
        const assignments = await getDocs(assignmentsQuery);

        let completedCount = 0;
        for (const assignment of assignments.docs) {
          const submissionQuery = query(
            collection(db, 'assignments', assignment.id, 'submissions'),
            where('studentId', '==', userId),
            where('status', '==', 'graded')
          );
          const submissions = await getDocs(submissionQuery);
          if (!submissions.empty) {
            completedCount++;
          }
        }
        progress = Math.min(1, completedCount / requirement.threshold);
        break;

      case 'attendance':
        // Check class attendance
        const classesQuery = query(
          collection(db, 'live-classes'),
          where('status', '==', 'ended')
        );
        const classes = await getDocs(classesQuery);

        let attendedCount = 0;
        for (const classDoc of classes.docs) {
          const attendanceQuery = query(
            collection(db, 'live-classes', classDoc.id, 'attendance'),
            where('userId', '==', userId)
          );
          const attendance = await getDocs(attendanceQuery);
          if (!attendance.empty) {
            attendedCount++;
          }
        }
        progress = Math.min(1, attendedCount / requirement.threshold);
        break;

      case 'participation':
        // Check participation metrics (e.g., comments, reactions)
        const participationQuery = query(
          collection(db, 'user-activity'),
          where('userId', '==', userId),
          where('type', '==', requirement.metric)
        );
        const participation = await getDocs(participationQuery);
        progress = Math.min(1, participation.size / requirement.threshold);
        break;

      case 'custom':
        // Custom achievements need manual verification
        const progressDoc = await getDoc(doc(db, 'achievement-progress', `${userId}_${achievementId}`));
        progress = progressDoc.exists() ? progressDoc.data()?.progress || 0 : 0;
        break;
    }

    totalProgress += progress / achievement.requirements.length;
  }

  return {
    earned: totalProgress >= 1,
    progress: totalProgress
  };
}

export async function awardAchievement(userId: string, achievementId: string): Promise<void> {
  await runTransaction(db, async (transaction) => {
    const achievementRef = doc(db, 'achievements', achievementId);
    const userProgressRef = doc(db, 'student-progress', userId);
    const earnedRef = doc(db, 'achievements', achievementId, 'earned', userId);

    // Check if already earned
    const earnedDoc = await transaction.get(earnedRef);
    if (earnedDoc.exists()) {
      throw ACHIEVEMENT_ERRORS.ALREADY_EARNED;
    }

    // Verify requirements are met
    const progress = await checkAchievementProgress(userId, achievementId);
    if (!progress.earned) {
      throw ACHIEVEMENT_ERRORS.REQUIREMENTS_NOT_MET;
    }

    // Get achievement data
    const achievementDoc = await transaction.get(achievementRef);
    if (!achievementDoc.exists()) {
      throw ACHIEVEMENT_ERRORS.NOT_FOUND;
    }
    const achievement = achievementDoc.data() as Achievement;

    // Record achievement
    transaction.set(earnedRef, {
      earnedAt: serverTimestamp(),
      progress: progress.progress
    });

    // Update user progress
    const userProgressDoc = await transaction.get(userProgressRef);
    const currentProgress = userProgressDoc.exists() 
      ? (userProgressDoc.data() as StudentProgress)
      : { userId, achievements: [], stats: { totalPoints: 0, classesAttended: 0, assignmentsCompleted: 0, averageGrade: 0 } };

    currentProgress.achievements.push({
      id: achievementId,
      earnedAt: Timestamp.now(),
      progress: progress.progress
    });

    currentProgress.stats.totalPoints += achievement.points;

    transaction.set(userProgressRef, currentProgress);
  });
}

export async function getStudentAchievements(userId: string): Promise<{
  earned: Achievement[];
  inProgress: Achievement[];
}> {
  // Get all achievements
  const achievementsQuery = query(collection(db, 'achievements'), orderBy('points', 'desc'));
  const achievements = await getDocs(achievementsQuery);

  // Get earned achievements
  const earnedQuery = query(
    collection(db, 'student-progress', userId, 'achievements'),
    where('progress', '>=', 1)
  );
  const earned = await getDocs(earnedQuery);
  const earnedIds = new Set(earned.docs.map(doc => doc.id));

  // Split into earned and in-progress
  const result = {
    earned: [] as Achievement[],
    inProgress: [] as Achievement[]
  };

  for (const doc of achievements.docs) {
    const achievement = { id: doc.id, ...doc.data() } as Achievement;
    if (earnedIds.has(achievement.id)) {
      result.earned.push(achievement);
    } else {
      const progress = await checkAchievementProgress(userId, achievement.id);
      if (progress.progress > 0) {
        result.inProgress.push({
          ...achievement,
          currentProgress: progress.progress
        } as Achievement & { currentProgress: number });
      }
    }
  }

  return result;
}

export async function getStudentProgress(userId: string): Promise<StudentProgress> {
  const progressRef = doc(db, 'student-progress', userId);
  const progressDoc = await getDoc(progressRef);

  if (!progressDoc.exists()) {
    return {
      userId,
      achievements: [],
      stats: {
        totalPoints: 0,
        classesAttended: 0,
        assignmentsCompleted: 0,
        averageGrade: 0
      }
    };
  }

  return progressDoc.data() as StudentProgress;
}
