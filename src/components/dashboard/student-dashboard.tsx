import { useStudentDashboardRealtime } from '@/lib/features/real-time';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistance } from 'date-fns';

interface StudentDashboardProps {
  userId: string;
}

export function StudentDashboard({ userId }: StudentDashboardProps) {
  const { dashboard, loading, error } = useStudentDashboardRealtime(userId);
  
  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading dashboard: {error.message}
      </div>
    );
  }

  const { upcomingClasses, activeAssignments, progress } = dashboard;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Progress Overview */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
        {progress ? (
          <>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Assignments Completed</span>
                  <span>{progress.stats.assignmentsCompleted}</span>
                </div>
                <Progress 
                  value={(progress.stats.assignmentsCompleted / activeAssignments.length) * 100} 
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Classes Attended</span>
                  <span>{progress.stats.classesAttended}</span>
                </div>
                <Progress 
                  value={progress.stats.classesAttended} 
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Average Grade</span>
                  <span>{progress.stats.averageGrade.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={progress.stats.averageGrade} 
                />
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Total Points</h3>
              <div className="text-3xl font-bold">
                {progress.stats.totalPoints}
              </div>
            </div>
          </>
        ) : (
          <div className="text-gray-500">No progress data available</div>
        )}
      </Card>

      {/* Upcoming Classes */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Upcoming Classes</h2>
        {upcomingClasses.length > 0 ? (
          <div className="space-y-4">
            {upcomingClasses.map((class_) => (
              <div key={class_.id} className="border-b pb-4">
                <h3 className="font-semibold">{class_.title}</h3>
                <p className="text-sm text-gray-500">{class_.subject}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">
                    {formatDistance(class_.startTime.toDate(), new Date(), { addSuffix: true })}
                  </span>
                  <Badge>{class_.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No upcoming classes</div>
        )}
      </Card>

      {/* Active Assignments */}
      <Card className="p-6 md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Active Assignments</h2>
        {activeAssignments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {activeAssignments.map((assignment) => (
              <div key={assignment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{assignment.title}</h3>
                    <p className="text-sm text-gray-500">{assignment.subject}</p>
                  </div>
                  <Badge>{assignment.status}</Badge>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-500">Due</div>
                  <div>
                    {formatDistance(assignment.dueDate.toDate(), new Date(), { addSuffix: true })}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-500">Points</div>
                  <div>{assignment.points}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No active assignments</div>
        )}
      </Card>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-8" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="border-b pb-4">
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-32 mb-2" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 md:col-span-2">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="mt-4">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
