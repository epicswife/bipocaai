"use client";

import { Heart, ArrowLeft, Users, Brain, Shield, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SocialEmotionalLearningPage() {
  // Type-safe SEL competencies definition
  interface SELActivity {
    name: string;
    description: string;
    ageGroup: string;
    instructions: string;
    materials?: string;
    duration?: string;
    skills: string[];
  }

  interface SELCompetency {
    title: string;
    icon: React.ReactNode;
    description: string;
    activities: SELActivity[];
  }

  const selCompetencies: SELCompetency[] = [
    {
      title: "Self-Awareness",
      icon: <Heart className="h-8 w-8 text-red-500" />,
      description: "Recognizing one's emotions, thoughts, and values and how they influence behavior. Understanding one's strengths and limitations with a growth mindset.",
      activities: [
        {
          name: "Emotion Journaling",
          description: "A reflective practice to identify and understand emotions",
          ageGroup: "All ages",
          instructions: "Set aside 5-10 minutes daily to write about your emotions. Note what triggered them, how they felt physically, and how you responded. Over time, look for patterns.",
          materials: "Journal or notebook, pen",
          duration: "5-10 minutes daily",
          skills: ["Emotional identification", "Self-reflection", "Pattern recognition"]
        },
        {
          name: "Strengths Spotlight",
          description: "Activity to identify and celebrate personal strengths",
          ageGroup: "Elementary to adult",
          instructions: "Create a list of your top 5 strengths. For each strength, write a specific example of when you used it effectively. Share with a partner or group if comfortable.",
          materials: "Paper, writing utensils, strengths list (optional)",
          duration: "30 minutes",
          skills: ["Self-confidence", "Positive self-talk", "Strength identification"]
        },
        {
          name: "Mindful Body Scan",
          description: "Guided awareness exercise to connect with physical sensations",
          ageGroup: "All ages",
          instructions: "Starting at your toes and moving upward, focus attention on each part of your body. Notice sensations without judgment. If your mind wanders, gently bring it back.",
          duration: "10-15 minutes",
          skills: ["Body awareness", "Present moment focus", "Non-judgmental awareness"]
        }
      ]
    },
    {
      title: "Self-Management",
      icon: <Brain className="h-8 w-8 text-blue-500" />,
      description: "Regulating emotions, thoughts, and behaviors in different situations; effectively managing stress, controlling impulses, and motivating oneself.",
      activities: [
        {
          name: "Stress Toolkit",
          description: "Creating personalized strategies for stress management",
          ageGroup: "Middle school to adult",
          instructions: "Identify 5 physical signs that you're stressed. Then create a list of 5 quick strategies that help you calm down (deep breathing, counting to 10, etc.). Practice these regularly.",
          materials: "Index cards, writing materials",
          duration: "Initial creation: 30 minutes; Practice: ongoing",
          skills: ["Stress recognition", "Self-regulation", "Coping strategies"]
        },
        {
          name: "Goal Setting Workshop",
          description: "Structured approach to setting and achieving personal goals",
          ageGroup: "Upper elementary to adult",
          instructions: "Choose one goal. Break it down into smaller steps. For each step, identify potential obstacles and strategies to overcome them. Create a timeline and tracking system.",
          materials: "Goal worksheet, calendar",
          duration: "45-60 minutes",
          skills: ["Planning", "Perseverance", "Self-motivation"]
        },
        {
          name: "Emotional Thermometer",
          description: "Visual tool to track and regulate emotional intensity",
          ageGroup: "Elementary to middle school",
          instructions: "Create a thermometer drawing with emotions ranging from calm (bottom) to intense (top). Throughout the day, check in and mark where your emotions are. Practice calming strategies when needed.",
          materials: "Thermometer template, coloring supplies",
          duration: "5 minutes, multiple times daily",
          skills: ["Emotional awareness", "Self-regulation", "Emotional vocabulary"]
        }
      ]
    },
    {
      title: "Social Awareness",
      icon: <Users className="h-8 w-8 text-green-500" />,
      description: "Taking the perspective of and empathizing with others, including those from diverse backgrounds and cultures. Understanding social and ethical norms for behavior.",
      activities: [
        {
          name: "Perspective Taking Stories",
          description: "Narrative exercise to understand different viewpoints",
          ageGroup: "Upper elementary to adult",
          instructions: "Read a story or watch a video clip with multiple characters. Choose one character and rewrite the story from their perspective, focusing on their thoughts and feelings.",
          materials: "Stories, videos, writing materials",
          duration: "30-45 minutes",
          skills: ["Empathy", "Perspective-taking", "Narrative understanding"]
        },
        {
          name: "Cultural Appreciation Project",
          description: "Research and presentation on diverse cultural practices",
          ageGroup: "Middle school to adult",
          instructions: "Research a culture different from your own. Focus on values, traditions, and daily practices. Create a presentation highlighting similarities and differences with your own experience.",
          materials: "Research materials, presentation supplies",
          duration: "Multi-day project",
          skills: ["Cultural awareness", "Respect for diversity", "Research skills"]
        },
        {
          name: "Active Listening Circles",
          description: "Structured dialogue practice focusing on listening skills",
          ageGroup: "All ages",
          instructions: "Form small groups. One person speaks about a topic for 2 minutes while others listen without interrupting. Listeners then summarize what they heard before the next person speaks.",
          duration: "15-30 minutes",
          skills: ["Active listening", "Empathy", "Communication"]
        }
      ]
    },
    {
      title: "Relationship Skills",
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      description: "Establishing and maintaining healthy and rewarding relationships with diverse individuals and groups. Communicating clearly, listening actively, cooperating, and resolving conflicts constructively.",
      activities: [
        {
          name: "Conflict Resolution Scenarios",
          description: "Role-playing exercise to practice resolving disagreements",
          ageGroup: "Upper elementary to adult",
          instructions: "In pairs, act out provided conflict scenarios. Use the steps: 1) Identify the problem, 2) Express feelings using 'I' statements, 3) Listen to the other perspective, 4) Brainstorm solutions, 5) Choose a solution together.",
          materials: "Scenario cards",
          duration: "30-45 minutes",
          skills: ["Conflict resolution", "Communication", "Compromise"]
        },
        {
          name: "Friendship Recipe",
          description: "Creative activity to identify qualities of healthy relationships",
          ageGroup: "Elementary to middle school",
          instructions: "Create a 'recipe' for friendship, listing 'ingredients' (qualities) and 'instructions' (actions). For example: '2 cups of kindness, 1 tablespoon of honesty. Mix well with regular communication.'",
          materials: "Recipe template, art supplies",
          duration: "20-30 minutes",
          skills: ["Relationship values", "Social skills", "Creative expression"]
        },
        {
          name: "Collaborative Problem-Solving",
          description: "Team-based challenge requiring cooperation",
          ageGroup: "All ages",
          instructions: "In small groups, complete a challenge that requires everyone's participation (e.g., building a structure, solving a puzzle). Afterward, discuss what communication strategies worked well.",
          materials: "Problem-solving materials (varies by challenge)",
          duration: "45-60 minutes",
          skills: ["Teamwork", "Communication", "Leadership"]
        }
      ]
    },
    {
      title: "Responsible Decision-Making",
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      description: "Making constructive choices about personal behavior and social interactions based on ethical standards, safety concerns, and social norms. Evaluating consequences of various actions for personal and collective well-being.",
      activities: [
        {
          name: "Decision-Making Framework",
          description: "Structured approach to making ethical decisions",
          ageGroup: "Middle school to adult",
          instructions: "For an important decision, work through these steps: 1) Define the issue, 2) List options, 3) Evaluate consequences of each option, 4) Consider values and ethics, 5) Make a decision, 6) Reflect afterward.",
          materials: "Decision framework worksheet",
          duration: "30-45 minutes",
          skills: ["Critical thinking", "Ethical reasoning", "Consequence evaluation"]
        },
        {
          name: "Community Impact Project",
          description: "Service learning activity to practice civic responsibility",
          ageGroup: "Upper elementary to adult",
          instructions: "Identify a need in your community. Research the issue, develop an action plan, implement it, and reflect on the impact and what you learned.",
          materials: "Varies by project",
          duration: "Multi-week project",
          skills: ["Civic responsibility", "Project planning", "Social awareness"]
        },
        {
          name: "Values Clarification",
          description: "Reflective activity to identify personal values",
          ageGroup: "Middle school to adult",
          instructions: "From a list of values (honesty, creativity, justice, etc.), select your top 5. For each, write why it's important to you and how it influences your decisions. Share if comfortable.",
          materials: "Values list, reflection worksheet",
          duration: "30 minutes",
          skills: ["Self-awareness", "Ethical thinking", "Personal values"]
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <Heart className="h-16 w-16 mx-auto mb-6 text-red-500" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Social Emotional Learning
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Building essential life skills for emotional intelligence and healthy relationships
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

      {/* SEL Introduction */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              What is Social Emotional Learning?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Social and Emotional Learning (SEL) is the process through which people acquire and apply the knowledge, 
              skills, and attitudes necessary to understand and manage emotions, set and achieve positive goals, 
              feel and show empathy for others, establish and maintain positive relationships, and make responsible decisions.
            </p>
          </div>

          <Card className="bg-card shadow-glow glassmorphism mb-12">
            <CardContent className="p-6 sm:p-8">
              <p className="text-muted-foreground mb-6">
                Research shows that SEL programs can have a positive impact on school climate and promote academic, 
                social, and emotional benefits for students. SEL is also valuable for adults, helping to build 
                emotional intelligence, improve relationships, and enhance overall well-being.
              </p>
              <p className="text-muted-foreground">
                The activities below are organized by the five core SEL competencies identified by CASEL 
                (Collaborative for Academic, Social, and Emotional Learning). Try different activities 
                to develop skills across all areas.
              </p>
            </CardContent>
          </Card>

          {/* SEL Competencies and Activities */}
          {selCompetencies.map((competency, index) => (
            <div key={index} className="mb-16">
              <div className="flex flex-col items-center mb-8">
                <div className="bg-background p-4 rounded-full shadow-glow mb-4">
                  {competency.icon}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2 text-center">{competency.title}</h3>
                <p className="text-muted-foreground text-center max-w-3xl">{competency.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {competency.activities.map((activity, actIndex) => (
                  <Card 
                    key={actIndex} 
                    className="bg-card shadow-glow glassmorphism border-blue-500 hover:border-blue-400 transition-all duration-300"
                  >
                    <CardContent className="p-6 sm:p-8">
                      <h4 className="text-xl font-semibold text-foreground mb-2">{activity.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{activity.description}</p>
                      
                      <div className="mb-3">
                        <h5 className="text-sm font-medium text-foreground mb-1">Age Group:</h5>
                        <p className="text-sm text-muted-foreground">{activity.ageGroup}</p>
                      </div>
                      
                      {activity.duration && (
                        <div className="mb-3">
                          <h5 className="text-sm font-medium text-foreground mb-1">Duration:</h5>
                          <p className="text-sm text-muted-foreground">{activity.duration}</p>
                        </div>
                      )}
                      
                      {activity.materials && (
                        <div className="mb-3">
                          <h5 className="text-sm font-medium text-foreground mb-1">Materials:</h5>
                          <p className="text-sm text-muted-foreground">{activity.materials}</p>
                        </div>
                      )}
                      
                      <div className="mb-3">
                        <h5 className="text-sm font-medium text-foreground mb-1">Instructions:</h5>
                        <p className="text-sm text-muted-foreground">{activity.instructions}</p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-1">Skills Developed:</h5>
                        <div className="flex flex-wrap gap-1">
                          {activity.skills.map((skill, skillIndex) => (
                            <span 
                              key={skillIndex} 
                              className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* Implementation Tips */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Implementing SEL Practices
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Here are some tips for effectively incorporating SEL into daily life:
            </p>
          </div>

          <Card className="bg-card shadow-glow glassmorphism mb-12">
            <CardContent className="p-6 sm:p-8">
              <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                <li><strong>Create a safe space:</strong> Establish an environment where people feel comfortable expressing emotions and taking risks.</li>
                <li><strong>Model SEL skills:</strong> Demonstrate emotional awareness, empathy, and responsible decision-making in your own behavior.</li>
                <li><strong>Integrate regularly:</strong> Incorporate SEL activities into daily routines rather than treating them as separate lessons.</li>
                <li><strong>Use teachable moments:</strong> Use real-life situations as opportunities to practice SEL skills.</li>
                <li><strong>Provide feedback:</strong> Offer specific, constructive feedback on SEL skills just as you would academic or professional skills.</li>
                <li><strong>Involve families:</strong> Share SEL concepts and activities with families to reinforce skills at home.</li>
                <li><strong>Be culturally responsive:</strong> Adapt SEL practices to honor and reflect the cultural backgrounds of all participants.</li>
                <li><strong>Measure progress:</strong> Regularly assess SEL skill development through observation, reflection, and discussion.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Additional SEL Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore these resources to learn more about social emotional learning:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card shadow-glow glassmorphism border-blue-500">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">CASEL</h3>
                <p className="text-muted-foreground mb-4">
                  The Collaborative for Academic, Social, and Emotional Learning provides research, frameworks, and resources for implementing SEL.
                </p>
                <a href="https://casel.org/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Visit CASEL Website
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-glow glassmorphism border-blue-500">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">SEL Books</h3>
                <p className="text-muted-foreground mb-4">
                  Recommended reading for educators, parents, and anyone interested in developing social emotional skills.
                </p>
                <a href="https://www.edutopia.org/article/13-books-build-social-emotional-learning-library/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    View Book Recommendations
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-glow glassmorphism border-blue-500">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">SEL Research</h3>
                <p className="text-muted-foreground mb-4">
                  Evidence-based research on the impact of social emotional learning on academic performance, behavior, and life outcomes.
                </p>
                <a href="https://www.wallacefoundation.org/knowledge-center/social-and-emotional-learning/pages/default.aspx" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Explore Research
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Return to Mental Health Resources */}
          <div className="text-center">
            <Link href="/mental-health">
              <Button className="bg-red-500 hover:bg-red-600 text-white shadow-glow">
                Return to Mental Health Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
