"use client";

import { Heart, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SelfCarePage() {
  // Type-safe self-care activities definition
  const selfCareActivities = [
    {
      title: "Physical Self-Care",
      activities: [
        "Get adequate sleep (7-9 hours)",
        "Maintain a balanced diet",
        "Stay hydrated throughout the day",
        "Engage in regular physical activity",
        "Take breaks from screen time",
        "Practice deep breathing exercises",
        "Stretch regularly, especially during study sessions"
      ]
    },
    {
      title: "Emotional Self-Care",
      activities: [
        "Journal about your feelings and experiences",
        "Practice positive self-talk and affirmations",
        "Allow yourself to feel emotions without judgment",
        "Engage with creative outlets (art, music, writing)",
        "Connect with supportive friends and family",
        "Set healthy boundaries in relationships",
        "Celebrate small achievements and progress"
      ]
    },
    {
      title: "Mental Self-Care",
      activities: [
        "Practice mindfulness and meditation",
        "Take breaks during intense study sessions",
        "Engage in activities that challenge your mind",
        "Read for pleasure, not just for academics",
        "Listen to podcasts or music that uplifts you",
        "Limit news consumption if it causes anxiety",
        "Practice time management to reduce stress"
      ]
    },
    {
      title: "Social Self-Care",
      activities: [
        "Spend time with people who energize you",
        "Join clubs or groups aligned with your interests",
        "Volunteer for causes you care about",
        "Practice active listening in conversations",
        "Ask for help when you need it",
        "Attend community events or gatherings",
        "Schedule regular check-ins with friends"
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <Heart className="h-16 w-16 mx-auto mb-6 text-pink-500" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Self-Care Resources
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Nurturing your well-being through intentional practices
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

      {/* Self-Care Introduction */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              What is Self-Care?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Self-care involves deliberate actions you take to care for your physical, mental, and emotional health. 
              It&apos;s not selfish—it&apos;s necessary for your overall well-being and academic success.
            </p>
          </div>

          <Card className="bg-card shadow-glow glassmorphism mb-12">
            <CardContent className="p-6 sm:p-8">
              <p className="text-muted-foreground mb-6">
                Self-care is especially important during your educational journey. Research shows that students who practice 
                regular self-care experience reduced stress, improved concentration, better academic performance, and greater 
                resilience when facing challenges.
              </p>
              <p className="text-muted-foreground">
                The activities below are organized into different categories of self-care. Try incorporating a few into your 
                daily or weekly routine and notice how they impact your well-being.
              </p>
            </CardContent>
          </Card>

          {/* Self-Care Activities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {selfCareActivities.map((category, index) => (
              <Card 
                key={index} 
                className="bg-card shadow-glow glassmorphism border-pink-500 hover:border-pink-400 transition-all duration-300"
              >
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">{category.title}</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {category.activities.map((activity, actIndex) => (
                      <li key={actIndex}>{activity}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Self-Care Planner */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Create Your Self-Care Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              A personalized self-care plan can help you prioritize your well-being. Consider these steps:
            </p>
          </div>

          <Card className="bg-card shadow-glow glassmorphism mb-12">
            <CardContent className="p-6 sm:p-8">
              <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                <li><strong>Assess your current self-care practices:</strong> What are you already doing well? Where could you improve?</li>
                <li><strong>Identify your needs:</strong> What areas of self-care feel most neglected right now?</li>
                <li><strong>Set realistic goals:</strong> Start small with 1-2 new activities per week.</li>
                <li><strong>Schedule self-care:</strong> Block time in your calendar specifically for self-care activities.</li>
                <li><strong>Track your progress:</strong> Notice how different activities affect your mood and energy.</li>
                <li><strong>Adjust as needed:</strong> Your self-care needs may change during different parts of the semester.</li>
              </ol>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div className="text-center">
            <Link href="/mental-health">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white shadow-glow">
                Return to Mental Health Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
