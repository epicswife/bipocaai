"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Users, Calendar, ClipboardList, BarChart, MessageSquare, BookOpen, Zap, Settings } from 'lucide-react';

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

export default function ClassroomManagementPage() {
  const managementFeatures = [
    {
      icon: <Users />,
      title: "Student Roster Management",
      description: "Easily organize your students into classes, groups, and individual learning paths with our intuitive roster management system."
    },
    {
      icon: <Calendar />,
      title: "Scheduling & Planning",
      description: "Create and manage class schedules, lesson plans, and academic calendars with our flexible scheduling tools."
    },
    {
      icon: <ClipboardList />,
      title: "Assignment Tracking",
      description: "Distribute, collect, and grade assignments digitally, with automated tracking of submission status and completion rates."
    },
    {
      icon: <BarChart />,
      title: "Performance Analytics",
      description: "Monitor student progress with detailed analytics that highlight strengths, identify areas for improvement, and track growth over time."
    },
    {
      icon: <MessageSquare />,
      title: "Communication Tools",
      description: "Stay connected with students and parents through integrated messaging, announcements, and feedback tools."
    },
    {
      icon: <BookOpen />,
      title: "Curriculum Management",
      description: "Access, customize, and deliver culturally responsive curriculum materials that align with educational standards."
    },
    {
      icon: <Zap />,
      title: "Automated Grading",
      description: "Save time with AI-powered grading tools for objective assessments, providing instant feedback to students."
    },
    {
      icon: <Settings />,
      title: "Customizable Settings",
      description: "Tailor the classroom environment to your teaching style and your students' needs with flexible configuration options."
    }
  ];

  return (
    <PageTemplate
      title="Classroom Management"
      description="Streamline your teaching process with our comprehensive classroom management tools designed to save time, enhance organization, and improve student outcomes."
    >
      <div className="mb-12">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">Management Features</TabsTrigger>
            <TabsTrigger value="workflow">Teacher Workflow</TabsTrigger>
            <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {managementFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="workflow">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 p-6 rounded-lg border border-[var(--color-pan-amber)]/20 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">A Day in the Life: Teacher Workflow</h2>
                
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                      <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 p-4 rounded-lg text-center">
                        <h3 className="font-bold text-lg mb-2">Before Class</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Preparation</p>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h4 className="font-semibold text-lg mb-2">Planning and Setup</h4>
                      <p className="mb-4">Start your day by reviewing your lesson plans, checking student progress, and preparing materials for upcoming classes.</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Lesson Planning</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Access and customize lesson materials</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Progress Review</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Check student completion and performance</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Resource Preparation</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Organize materials and assignments</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                      <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 p-4 rounded-lg text-center">
                        <h3 className="font-bold text-lg mb-2">During Class</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Instruction</p>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h4 className="font-semibold text-lg mb-2">Teaching and Monitoring</h4>
                      <p className="mb-4">Deliver instruction, monitor student engagement, and provide real-time support and feedback during class sessions.</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Live Instruction</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Present lessons with interactive tools</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Student Monitoring</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Track engagement and participation</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Real-time Support</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Address questions and provide guidance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                      <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 p-4 rounded-lg text-center">
                        <h3 className="font-bold text-lg mb-2">After Class</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Assessment</p>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h4 className="font-semibold text-lg mb-2">Evaluation and Planning</h4>
                      <p className="mb-4">Review student work, provide detailed feedback, and adjust future lessons based on performance data and insights.</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Assignment Review</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Grade work with AI assistance</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Feedback Delivery</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Provide personalized comments</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Data Analysis</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Review performance metrics</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="demo">
            <div className="bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 p-8 rounded-lg border border-[var(--color-pan-amber)]/20 text-center">
              <h2 className="text-2xl font-bold mb-4">Interactive Classroom Management Demo</h2>
              <p className="mb-6 max-w-2xl mx-auto">Experience our classroom management tools firsthand with this interactive demo. Explore the features that help teachers save time and improve student outcomes.</p>
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl border border-[var(--color-pan-amber)]/20 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-pan-green)]/80 to-[var(--color-pan-amber)]/80 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <h3 className="text-2xl font-bold mb-2">Interactive Demo</h3>
                    <p className="mb-4">The interactive classroom management demo would be embedded here</p>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--color-pan-green)]">
                      Try Full Demo
                    </Button>
                  </div>
                </div>
              </div>
              <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                Schedule a Guided Tour
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <motion.div 
        className="p-8 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Ready to transform your classroom management?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of teachers who are saving time and improving student outcomes with our comprehensive classroom management tools.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Start Free Trial
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
