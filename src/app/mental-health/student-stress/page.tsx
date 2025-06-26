"use client";

import { ArrowLeft, BookOpen, Clock, Coffee, Brain, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function StudentStressPage() {
  // Type-safe stress management techniques definition
  interface StressManagementTechnique {
    id: string;
    name: string;
    description: string;
    steps: string[];
    timeNeeded: string;
    benefits: string[];
  }

  const techniques: StressManagementTechnique[] = [
    {
      id: "deep-breathing",
      name: "Deep Breathing Exercise",
      description: "A simple breathing technique to quickly reduce stress and increase focus.",
      steps: [
        "Find a comfortable position sitting or lying down",
        "Place one hand on your chest and the other on your abdomen",
        "Breathe in slowly through your nose for 4 counts, feeling your abdomen expand",
        "Hold your breath for 2 counts",
        "Exhale slowly through your mouth for 6 counts",
        "Repeat for 2-5 minutes"
      ],
      timeNeeded: "2-5 minutes",
      benefits: [
        "Reduces physical tension",
        "Lowers heart rate and blood pressure",
        "Increases oxygen flow to the brain",
        "Can be done anywhere, anytime"
      ]
    },
    {
      id: "progressive-relaxation",
      name: "Progressive Muscle Relaxation",
      description: "A technique that involves tensing and then releasing each muscle group to reduce physical tension.",
      steps: [
        "Find a quiet place and sit or lie down comfortably",
        "Starting with your feet, tense the muscles as tightly as you can for 5 seconds",
        "Release the tension and notice how your muscles feel when relaxed",
        "Move up to your calves, thighs, abdomen, hands, arms, shoulders, neck, and face",
        "Focus on the difference between tension and relaxation"
      ],
      timeNeeded: "10-15 minutes",
      benefits: [
        "Reduces physical tension and pain",
        "Improves awareness of body sensations",
        "Helps identify stress triggers",
        "Promotes better sleep"
      ]
    },
    {
      id: "mindful-break",
      name: "5-Minute Mindful Break",
      description: "A brief mindfulness practice to reset your mind during study sessions.",
      steps: [
        "Set a timer for 5 minutes",
        "Close your eyes or soften your gaze",
        "Focus on your breathing without trying to change it",
        "When your mind wanders, gently bring your attention back to your breath",
        "Notice physical sensations, sounds, and thoughts without judgment",
        "When the timer ends, take a deep breath and slowly return to your activities"
      ],
      timeNeeded: "5 minutes",
      benefits: [
        "Improves concentration and focus",
        "Reduces mental fatigue",
        "Prevents burnout during long study sessions",
        "Increases productivity"
      ]
    },
    {
      id: "study-pomodoro",
      name: "Study Pomodoro Technique",
      description: "A time management method that breaks work into intervals with short breaks.",
      steps: [
        "Choose one task to focus on",
        "Set a timer for 25 minutes and work with full focus",
        "When the timer rings, take a 5-minute break (stretch, walk, breathe)",
        "After 4 pomodoros, take a longer 15-30 minute break",
        "Track your progress and adjust intervals as needed"
      ],
      timeNeeded: "30-minute cycles",
      benefits: [
        "Improves focus and concentration",
        "Reduces procrastination",
        "Creates a sense of accomplishment",
        "Prevents mental fatigue"
      ]
    }
  ];

  // Type-safe common stressors definition
  interface Stressor {
    category: string;
    examples: string[];
    managementTips: string[];
  }

  const stressors: Stressor[] = [
    {
      category: "Academic Pressure",
      examples: [
        "Heavy course load",
        "Challenging assignments",
        "Exam anxiety",
        "Grade expectations",
        "Competition with peers"
      ],
      managementTips: [
        "Break large tasks into smaller, manageable steps",
        "Create a realistic study schedule with breaks",
        "Form or join study groups for support",
        "Utilize campus academic resources and tutoring",
        "Practice positive self-talk about your abilities"
      ]
    },
    {
      category: "Time Management",
      examples: [
        "Balancing multiple responsibilities",
        "Procrastination",
        "Ineffective study habits",
        "Overcommitment to activities",
        "Poor sleep schedule"
      ],
      managementTips: [
        "Use a planner or digital calendar to track deadlines",
        "Prioritize tasks using importance/urgency matrix",
        "Set specific, achievable goals for each study session",
        "Learn to say no to additional commitments when necessary",
        "Establish a consistent sleep routine"
      ]
    },
    {
      category: "Social and Personal Challenges",
      examples: [
        "Roommate conflicts",
        "Relationship issues",
        "Homesickness",
        "Social anxiety",
        "Identity exploration"
      ],
      managementTips: [
        "Practice direct, respectful communication",
        "Schedule regular check-ins with friends and family",
        "Join campus groups aligned with your interests",
        "Set healthy boundaries in relationships",
        "Seek support from campus counseling services"
      ]
    },
    {
      category: "Financial Concerns",
      examples: [
        "Tuition and student loans",
        "Living expenses",
        "Textbook costs",
        "Balancing work and school",
        "Budget management"
      ],
      managementTips: [
        "Explore scholarship and financial aid opportunities",
        "Create a realistic monthly budget",
        "Look for used textbooks or rental options",
        "Seek campus employment with flexible hours",
        "Utilize campus resources like food pantries if needed"
      ]
    }
  ];

  // State for selected technique
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);

  // Get the selected technique object
  const activeTechnique = techniques.find(t => t.id === selectedTechnique);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <BookOpen className="h-16 w-16 mx-auto mb-6 text-indigo-500" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Managing Student Stress
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Practical strategies for academic success and well-being
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

      {/* Introduction */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Understanding Student Stress
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Stress is a normal part of the student experience, but when it becomes overwhelming, it can affect your 
              academic performance, health, and overall well-being. Learning to manage stress effectively is a valuable skill.
            </p>
          </div>

          <Card className="bg-card shadow-glow glassmorphism mb-12">
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <Brain className="h-12 w-12 text-indigo-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">How Stress Affects Learning</h3>
                  <p className="text-muted-foreground">Chronic stress can impair memory, concentration, and information processing, making it harder to learn effectively.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Clock className="h-12 w-12 text-indigo-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">The Stress Cycle</h3>
                  <p className="text-muted-foreground">Stress builds over time if not addressed, creating a cycle that can lead to burnout and decreased performance.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Coffee className="h-12 w-12 text-indigo-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Stress vs. Pressure</h3>
                  <p className="text-muted-foreground">Some pressure can be motivating, but excessive stress without relief becomes counterproductive.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Stressors */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Common Student Stressors
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Recognizing your specific stressors is the first step in managing them effectively:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {stressors.map((stressor, index) => (
              <Card 
                key={index} 
                className="bg-card shadow-glow glassmorphism border-indigo-500 hover:border-indigo-400 transition-all duration-300"
              >
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">{stressor.category}</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">Common Examples:</h4>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {stressor.examples.map((example, exIndex) => (
                        <li key={exIndex}>{example}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Management Tips:</h4>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {stressor.managementTips.map((tip, tipIndex) => (
                        <li key={tipIndex}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stress Relief Techniques */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Quick Stress Relief Techniques
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              These evidence-based techniques can help you manage stress in the moment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {techniques.map((technique) => (
              <Card 
                key={technique.id} 
                className={`bg-card shadow-glow glassmorphism border-indigo-500 hover:border-indigo-400 transition-all duration-300 ${
                  selectedTechnique === technique.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => setSelectedTechnique(technique.id)}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-foreground">{technique.name}</h3>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                      {technique.timeNeeded}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{technique.description}</p>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      className="text-indigo-500 border-indigo-500 hover:bg-indigo-100 hover:text-indigo-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTechnique(technique.id);
                      }}
                    >
                      Learn How
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Technique Details */}
          {selectedTechnique && activeTechnique && (
            <Card className="bg-card shadow-glow glassmorphism mb-12">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                  {activeTechnique.name}
                </h3>
                
                <p className="text-muted-foreground mb-6 text-center max-w-3xl mx-auto">
                  {activeTechnique.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                      How to Practice
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      {activeTechnique.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-indigo-500" />
                      Benefits
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {activeTechnique.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-2"
                    onClick={() => {
                      // In a real application, this could start a guided audio or video
                      alert(`In a real application, this would start a guided ${activeTechnique.name} exercise.`);
                    }}
                  >
                    Try Guided Exercise
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Long-Term Stress Management */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Long-Term Stress Management
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Beyond quick techniques, these strategies help build resilience over time:
            </p>
          </div>

          <Card className="bg-card shadow-glow glassmorphism mb-12">
            <CardContent className="p-6 sm:p-8">
              <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                <li><strong>Regular Physical Activity:</strong> Even 20-30 minutes of movement daily can significantly reduce stress hormones.</li>
                <li><strong>Consistent Sleep Schedule:</strong> Aim for 7-9 hours of quality sleep each night to support cognitive function and emotional regulation.</li>
                <li><strong>Balanced Nutrition:</strong> Limit caffeine and sugar, which can exacerbate stress responses, and stay hydrated.</li>
                <li><strong>Social Connections:</strong> Maintain relationships with supportive friends and family members.</li>
                <li><strong>Realistic Expectations:</strong> Set achievable goals and practice self-compassion when facing challenges.</li>
                <li><strong>Mindfulness Practice:</strong> Regular meditation or mindfulness can change how your brain responds to stress.</li>
                <li><strong>Hobbies and Interests:</strong> Make time for activities you enjoy that aren&apos;t related to academic performance.</li>
                <li><strong>Professional Support:</strong> Don&apos;t hesitate to seek help from campus counseling services when needed.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Campus Resources */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Campus Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Take advantage of these resources available to support your well-being:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card shadow-glow glassmorphism">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">Counseling Center</h3>
                <p className="text-muted-foreground mb-4">
                  Free individual and group counseling sessions for all enrolled students.
                </p>
                <Link href="/mental-health/schedule">
                  <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
                    Schedule a Session
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-glow glassmorphism">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">Academic Support</h3>
                <p className="text-muted-foreground mb-4">
                  Tutoring, study skills workshops, and time management coaching.
                </p>
                <Link href="/resources/academic-support">
                  <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
                    View Services
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-glow glassmorphism">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">Wellness Center</h3>
                <p className="text-muted-foreground mb-4">
                  Fitness classes, meditation sessions, and wellness workshops.
                </p>
                <Link href="/resources/wellness">
                  <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
                    Explore Programs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Additional Resources */}
          <div className="text-center">
            <Link href="/mental-health">
              <Button className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-glow">
                Return to Mental Health Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
