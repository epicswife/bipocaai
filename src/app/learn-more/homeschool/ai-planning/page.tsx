"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Lightbulb, BookOpen, Calendar, Clock, Sparkles, Users, FileText, Rocket } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
            {React.cloneElement(icon as React.ReactElement, { 
              className: "w-6 h-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" 
            } as React.HTMLAttributes<HTMLElement>)}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </Card>
    </motion.div>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  index: number;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
            <span className="text-xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">{number}</span>
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </Card>
    </motion.div>
  );
};

export default function AILessonPlanningPage() {
  const aiFeatures = [
    {
      icon: <Lightbulb />,
      title: "Personalized Learning Paths",
      description: "Our AI analyzes your child's learning style, strengths, and areas for growth to create truly personalized learning experiences."
    },
    {
      icon: <BookOpen />,
      title: "Curriculum Alignment",
      description: "Automatically align lesson plans with state standards or your preferred curriculum framework while maintaining flexibility."
    },
    {
      icon: <Calendar />,
      title: "Smart Scheduling",
      description: "Intelligently schedule lessons based on optimal learning times, family availability, and balanced subject distribution."
    },
    {
      icon: <Clock />,
      title: "Time-Saving Automation",
      description: "Generate comprehensive lesson plans in seconds, freeing you to focus on teaching and connecting with your child."
    },
    {
      icon: <Sparkles />,
      title: "Culturally Responsive Content",
      description: "Incorporate diverse perspectives and culturally relevant materials that reflect your family's values and heritage."
    },
    {
      icon: <Users />,
      title: "Multi-Child Optimization",
      description: "Coordinate lessons for multiple children, finding opportunities for shared learning while addressing individual needs."
    }
  ];

  const planningSteps = [
    {
      number: 1,
      title: "Set Learning Goals",
      description: "Define your educational objectives, whether following state standards or creating custom learning goals tailored to your child's interests and needs."
    },
    {
      number: 2,
      title: "Input Student Profile",
      description: "Share information about your child's learning style, interests, strengths, and areas for growth to personalize the educational experience."
    },
    {
      number: 3,
      title: "Select Curriculum Framework",
      description: "Choose from standard curriculum frameworks or create your own custom approach to structure your homeschool program."
    },
    {
      number: 4,
      title: "Generate AI Lesson Plans",
      description: "Our AI creates comprehensive lesson plans tailored to your child's profile, complete with activities, resources, and assessment strategies."
    },
    {
      number: 5,
      title: "Review and Customize",
      description: "Easily modify any aspect of the generated plans to perfectly align with your teaching style and your child's needs."
    },
    {
      number: 6,
      title: "Implement and Track Progress",
      description: "Put your plans into action while our system tracks progress, making real-time adjustments based on your child's responses and achievements."
    }
  ];

  const examplePlans = [
    {
      subject: "Science",
      grade: "Elementary (Grades 3-5)",
      title: "Exploring Ecosystems",
      description: "A 4-week unit on ecosystems that integrates hands-on experiments, virtual field trips, and project-based learning.",
      highlights: [
        "Interactive ecosystem modeling activities",
        "Virtual tours of diverse biomes around the world",
        "Integration with math through data collection and analysis",
        "Culturally diverse perspectives on environmental stewardship"
      ]
    },
    {
      subject: "Mathematics",
      grade: "Middle School (Grades 6-8)",
      title: "Real-World Geometry",
      description: "A 3-week exploration of geometric concepts through practical applications in art, architecture, and nature.",
      highlights: [
        "Hands-on construction projects applying geometric principles",
        "Cultural mathematics from around the world",
        "Integration with history and art",
        "Digital modeling and 3D design activities"
      ]
    },
    {
      subject: "Language Arts",
      grade: "High School (Grades 9-12)",
      title: "Diverse Voices in Literature",
      description: "A 6-week literature study featuring works from diverse authors exploring universal themes through different cultural lenses.",
      highlights: [
        "Comparative analysis of literary traditions",
        "Creative writing in response to diverse texts",
        "Integration with history and social studies",
        "Multimedia presentation and discussion opportunities"
      ]
    }
  ];

  return (
    <PageTemplate
      title="AI Lesson Planning"
      description="Revolutionize your homeschool experience with our AI-powered lesson planning tools that create personalized, engaging, and effective learning experiences."
    >
      <div className="mb-12">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">AI Features</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="examples">Example Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
            
            <motion.div
              className="mt-8 p-6 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4 text-center">The Power of AI in Homeschool Education</h3>
              <p className="mb-6 text-center">Our AI planning tools combine the latest in educational research with advanced machine learning to create a truly personalized homeschool experience.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Adaptive Learning
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our AI continuously adapts to your child&apos;s progress, automatically adjusting difficulty levels and learning approaches.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Rocket className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Interest-Driven Learning
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">The AI incorporates your child&apos;s interests into lessons, making learning more engaging and meaningful.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Comprehensive Documentation
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatically generate detailed records and documentation for homeschool reporting requirements.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="how-it-works">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {planningSteps.map((step, index) => (
                <StepCard
                  key={index}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  index={index}
                />
              ))}
            </div>
            
            <motion.div
              className="mt-8 p-6 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4">See AI Lesson Planning in Action</h3>
              <p className="mb-6 max-w-2xl mx-auto">Watch how our AI transforms homeschool planning and creates personalized learning experiences for students of all ages.</p>
              <div className="aspect-video max-w-3xl mx-auto bg-black/5 dark:bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  <p className="font-medium">Video Demo Placeholder</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="examples">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                {examplePlans.map((plan, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-[var(--color-pan-amber)]/20"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="w-full">
                        <div className="flex items-center mb-2">
                          <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full mr-2">
                            {plan.subject}
                          </div>
                          <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
                            {plan.grade}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
                        
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <ul className="space-y-1 mb-4">
                          {plan.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start text-sm">
                              <div className="w-4 h-4 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">✓</span>
                              </div>
                              <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Button variant="outline" className="border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10">
                          View Full Lesson Plan
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="mt-8 p-6 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-xl font-bold mb-4">Create Your Own AI-Generated Lesson Plans</h3>
                <p className="mb-6 max-w-2xl mx-auto">These examples represent just a fraction of what our AI planning system can create. Generate your own personalized lesson plans tailored to your child&apos;s unique needs and interests.</p>
                <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                  Try AI Lesson Planning
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <motion.div 
        className="p-8 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Ready to transform your homeschool experience?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of homeschool families who are using our AI lesson planning tools to create engaging, effective, and personalized learning experiences.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Get Started with AI Lesson Planning
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
