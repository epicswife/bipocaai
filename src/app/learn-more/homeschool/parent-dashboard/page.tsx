"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, Clock, FileText, PieChart, Settings, Users, BookOpen } from 'lucide-react';

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

export default function ParentDashboardPage() {
  const dashboardFeatures = [
    {
      icon: <BarChart3 />,
      title: "Progress Analytics",
      description: "Track your child's academic progress with detailed analytics that show mastery levels across subjects, time spent learning, and growth over time."
    },
    {
      icon: <Calendar />,
      title: "Scheduling Tools",
      description: "Create and manage your homeschool schedule with our intuitive calendar, set recurring lessons, and receive reminders for upcoming activities."
    },
    {
      icon: <FileText />,
      title: "Curriculum Management",
      description: "Easily customize your child's curriculum, add or remove lessons, and adjust difficulty levels to create the perfect learning experience."
    },
    {
      icon: <PieChart />,
      title: "Subject Balance",
      description: "Visualize how your child's time is distributed across different subjects and ensure a well-rounded education with our balance indicators."
    },
    {
      icon: <Clock />,
      title: "Time Tracking",
      description: "Monitor learning time across subjects to ensure compliance with state requirements and maintain records for homeschool documentation."
    },
    {
      icon: <Settings />,
      title: "Personalization Controls",
      description: "Adjust learning preferences, set goals, and customize the platform to align with your educational philosophy and approach."
    },
    {
      icon: <Users />,
      title: "Multi-Child Management",
      description: "Manage multiple children from a single dashboard with individual profiles, progress tracking, and personalized learning paths for each child."
    },
    {
      icon: <BookOpen />,
      title: "Resource Library",
      description: "Access our extensive library of supplemental resources, printables, and activities to enhance your homeschool curriculum."
    }
  ];

  return (
    <PageTemplate
      title="Parent Dashboard"
      description="Our intuitive parent dashboard gives you complete control over your child's homeschool education with powerful tools for tracking, planning, and customization."
    >
      <div className="mb-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Dashboard Overview</TabsTrigger>
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Your Command Center for Homeschool Success</h2>
                <p className="mb-4">The BIPOCA AI Parent Dashboard is designed to give you complete visibility and control over your child&apos;s education. With intuitive analytics, customizable scheduling, and powerful curriculum management tools, you can create the perfect learning environment for your family.</p>
                <p className="mb-6">Our dashboard is built with homeschool parents in mind, providing the flexibility and detailed reporting you need to ensure your child&apos;s educational success.</p>
                <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                  Explore Dashboard Features
                </Button>
              </motion.div>
              
              <motion.div
                className="relative h-[400px] rounded-lg overflow-hidden shadow-xl border border-[var(--color-pan-amber)]/20"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-pan-green)]/80 to-[var(--color-pan-amber)]/80 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <h3 className="text-2xl font-bold mb-2">Dashboard Preview</h3>
                    <p className="mb-4">Interactive demo would be displayed here</p>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--color-pan-green)]">
                      View Full Demo
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardFeatures.map((feature, index) => (
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
          
          <TabsContent value="demo">
            <div className="bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 p-8 rounded-lg border border-[var(--color-pan-amber)]/20 text-center">
              <h2 className="text-2xl font-bold mb-4">Interactive Dashboard Demo</h2>
              <p className="mb-6 max-w-2xl mx-auto">Experience our parent dashboard firsthand with this interactive demo. Explore the features, tools, and analytics available to homeschool parents.</p>
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl border border-[var(--color-pan-amber)]/20 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-pan-green)]/80 to-[var(--color-pan-amber)]/80 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <h3 className="text-2xl font-bold mb-2">Interactive Demo</h3>
                    <p className="mb-4">The interactive dashboard demo would be embedded here</p>
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
        <h2 className="text-2xl font-bold mb-4">Ready to take control of your homeschool journey?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Create your account today and experience the power of our parent dashboard with a 30-day free trial.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Start Free Trial
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
