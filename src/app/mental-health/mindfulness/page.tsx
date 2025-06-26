"use client";

import { Brain, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MindfulnessPage() {
  // Type-safe interface for mindfulness exercises
  interface Exercise {
    name: string;
    instructions: string;
    benefits: string;
    duration?: string;
    resources?: string;
  }

  interface ExerciseCategory {
    title: string;
    description?: string;
    exercises: Exercise[];
  }

  // Type-safe mindfulness exercises definition
  const mindfulnessExercises: ExerciseCategory[] = [
    {
      title: "Breathing Exercises",
      description: "Simple techniques to regulate breathing and calm the nervous system",
      exercises: [
        {
          name: "Box Breathing",
          instructions: "Inhale for 4 counts, hold for 4 counts, exhale for 4 counts, hold for 4 counts. Repeat for 2-5 minutes.",
          benefits: "Reduces stress, improves concentration, regulates emotions",
          duration: "2-5 minutes"
        },
        {
          name: "4-7-8 Breathing",
          instructions: "Inhale quietly through your nose for 4 counts, hold your breath for 7 counts, exhale completely through your mouth for 8 counts.",
          benefits: "Promotes relaxation, helps with anxiety and sleep",
          duration: "3-5 minutes"
        },
        {
          name: "Diaphragmatic Breathing",
          instructions: "Place one hand on your chest and the other on your abdomen. Breathe deeply so that your abdomen expands more than your chest.",
          benefits: "Reduces stress, lowers heart rate, improves oxygen flow",
          duration: "5-10 minutes"
        }
      ]
    },
    {
      title: "Meditation Practices",
      description: "Focused attention exercises to develop awareness and presence",
      exercises: [
        {
          name: "Body Scan Meditation",
          instructions: "Starting from your toes and moving upward, focus your attention on each part of your body, noticing sensations without judgment.",
          benefits: "Increases body awareness, reduces tension, improves relaxation",
          duration: "10-20 minutes"
        },
        {
          name: "Loving-Kindness Meditation",
          instructions: "Focus on sending positive wishes to yourself, then to loved ones, then to neutral people, then to difficult people, and finally to all beings.",
          benefits: "Increases compassion, improves relationships, reduces negative emotions",
          duration: "10-15 minutes"
        },
        {
          name: "Mindful Observation",
          instructions: "Choose an object and focus on it for 5 minutes. Notice its color, texture, shape, and other qualities without judgment.",
          benefits: "Improves focus, reduces overthinking, enhances present-moment awareness",
          duration: "5-10 minutes"
        }
      ]
    },
    {
      title: "Music Therapy",
      description: "Using music intentionally to promote relaxation, emotional expression, and mindful awareness",
      exercises: [
        {
          name: "Active Music Listening",
          instructions: "Choose a piece of music without lyrics. Close your eyes and focus completely on the sounds. Notice each instrument, the rhythm, melody, and how the music makes you feel in your body.",
          benefits: "Enhances focus, reduces rumination, promotes emotional processing",
          duration: "5-15 minutes",
          resources: "Instrumental music, headphones (optional)"
        },
        {
          name: "Rhythmic Breathing with Music",
          instructions: "Select calming music with a steady beat. Synchronize your breathing with the rhythm - inhaling for a certain number of beats, then exhaling for the same or longer. Let the music guide your breath.",
          benefits: "Regulates breathing, reduces anxiety, improves heart rate variability",
          duration: "10-15 minutes",
          resources: "Music with consistent tempo (60-80 BPM works well)"
        },
        {
          name: "Sound Bath Meditation",
          instructions: "Lie down comfortably and listen to recordings of singing bowls, gongs, or nature sounds. Allow the sounds to wash over you without analysis or judgment. Notice how different sounds affect different parts of your body.",
          benefits: "Deep relaxation, stress reduction, improved sleep quality",
          duration: "15-30 minutes",
          resources: "Singing bowl recordings, comfortable space to lie down"
        },
        {
          name: "Emotional Playlist Creation",
          instructions: "Create playlists for different emotional states (calm, energized, focused, etc.). When you need to shift your mood, mindfully listen to the appropriate playlist while focusing on how the music affects your emotions and body sensations.",
          benefits: "Emotional regulation, mood enhancement, increased emotional awareness",
          duration: "Varies",
          resources: "Music streaming service or personal music library"
        }
      ]
    },
    {
      title: "Mindfulness for Study Sessions",
      description: "Techniques to enhance focus and reduce stress during academic work",
      exercises: [
        {
          name: "Pomodoro with Mindfulness",
          instructions: "Study for 25 minutes, then take a 5-minute mindfulness break. Repeat 4 times, then take a longer break.",
          benefits: "Improves focus, prevents burnout, enhances information retention",
          duration: "25 minutes work + 5 minutes break"
        },
        {
          name: "Mindful Reading",
          instructions: "Before reading, take 3 deep breaths. Read slowly, pausing occasionally to notice your understanding. If your mind wanders, gently bring it back.",
          benefits: "Improves comprehension, reduces re-reading, enhances engagement with material",
          duration: "Varies with reading material"
        },
        {
          name: "Pre-Exam Centering",
          instructions: "Before an exam, take 2 minutes to focus on your breathing. Acknowledge any anxiety without judgment, then visualize yourself succeeding.",
          benefits: "Reduces test anxiety, improves recall, increases confidence",
          duration: "2-5 minutes"
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <Brain className="h-16 w-16 mx-auto mb-6 text-purple-500" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Mindfulness Exercises
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Cultivating presence and awareness for mental well-being
          </p>
          <Link href="/mental-health">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Mental Health Resources
            </Button>
          </Link>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full h-24 text-background dark:text-background visionease:text-background high-contrast:text-background"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C360 50 1080 50 1440 100 L1440 100 L0 100 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Mindfulness Introduction */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              What is Mindfulness?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Mindfulness is the practice of paying attention to the present moment with openness, curiosity, and acceptance.
              It helps reduce stress, improve focus, and enhance overall well-being.
            </p>
          </div>

          <Card className="bg-card shadow-glow glassmorphism mb-12">
            <CardContent className="p-6 sm:p-8">
              <p className="text-muted-foreground mb-6">
                Research shows that regular mindfulness practice can help students improve concentration, reduce test anxiety,
                enhance memory, and better manage academic stress. Even just a few minutes of mindfulness each day can make a difference.
              </p>
              <p className="text-muted-foreground">
                The exercises below are organized by type. Try different ones to find what works best for you, and remember that
                mindfulness is a skill that improves with practice.
              </p>
            </CardContent>
          </Card>

          {/* Mindfulness Exercises */}
          {mindfulnessExercises.map((category, index) => (
            <div key={index} className="mb-12">
              <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">{category.title}</h3>
              {category.description && (
                <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-6">{category.description}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.exercises.map((exercise, exIndex) => (
                  <Card 
                    key={exIndex} 
                    className="bg-card shadow-glow glassmorphism border-purple-500 hover:border-purple-400 transition-all duration-300"
                  >
                    <CardContent className="p-6 sm:p-8">
                      <h4 className="text-xl font-semibold text-foreground mb-3">{exercise.name}</h4>
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">How to Practice:</h5>
                        <p className="text-muted-foreground">{exercise.instructions}</p>
                      </div>
                      {exercise.duration && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-muted-foreground mb-1">Duration:</h5>
                          <p className="text-muted-foreground">{exercise.duration}</p>
                        </div>
                      )}
                      {exercise.resources && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-muted-foreground mb-1">Resources Needed:</h5>
                          <p className="text-muted-foreground">{exercise.resources}</p>
                        </div>
                      )}
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">Benefits:</h5>
                        <p className="text-muted-foreground">{exercise.benefits}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* Tips for Establishing a Practice */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Establishing a Mindfulness Practice
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Here are some tips to help you incorporate mindfulness into your daily routine:
            </p>
          </div>

          <Card className="bg-card shadow-glow glassmorphism mb-12">
            <CardContent className="p-6 sm:p-8">
              <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                <li><strong>Start small:</strong> Begin with just 2-5 minutes of practice daily.</li>
                <li><strong>Be consistent:</strong> Practice at the same time each day to build a habit.</li>
                <li><strong>Use reminders:</strong> Set alarms or place visual cues to remind yourself to practice.</li>
                <li><strong>Be patient:</strong> Mindfulness is a skill that develops over time.</li>
                <li><strong>Non-judgment:</strong> Notice when your mind wanders and gently bring it back without criticism.</li>
                <li><strong>Integrate into daily activities:</strong> Practice mindfulness while eating, walking, or waiting in line.</li>
                <li><strong>Use guided resources:</strong> Try apps like Headspace, Calm, or Insight Timer for guided practices.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div className="text-center">
            <Link href="/mental-health">
              <Button className="bg-purple-500 hover:bg-purple-600 text-white shadow-glow">
                Return to Mental Health Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
