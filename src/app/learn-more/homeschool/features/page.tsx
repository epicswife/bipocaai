"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Calendar, Clock, Laptop, Users, BookOpen, BarChart, Sparkles, Zap } from 'lucide-react';

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

export default function HomeschoolFeaturesPage() {
  const features = [
    {
      icon: <Laptop />,
      title: "Interactive Learning Platform",
      description: "Our intuitive platform combines engaging content with interactive exercises, making learning enjoyable and effective for students of all ages."
    },
    {
      icon: <Calendar />,
      title: "Flexible Scheduling",
      description: "Design your own academic calendar and daily schedule to fit your family's unique needs and lifestyle, with tools to track progress and completion."
    },
    {
      icon: <BookOpen />,
      title: "Culturally Responsive Curriculum",
      description: "Access a comprehensive curriculum that celebrates diversity and includes perspectives from various cultures, traditions, and historical experiences."
    },
    {
      icon: <BarChart />,
      title: "Detailed Progress Tracking",
      description: "Monitor your child's academic growth with detailed analytics, assessments, and progress reports that highlight strengths and areas for improvement."
    },
    {
      icon: <Users />,
      title: "Community Connection",
      description: "Connect with other homeschooling families through our virtual community spaces, discussion forums, and collaborative learning opportunities."
    },
    {
      icon: <Clock />,
      title: "Self-Paced Learning",
      description: "Allow your child to learn at their own pace, spending more time on challenging concepts and moving quickly through material they grasp easily."
    },
    {
      icon: <Sparkles />,
      title: "Personalized Learning Paths",
      description: "AI-powered recommendations adapt to your child's learning style, interests, and progress to create truly personalized educational experiences."
    },
    {
      icon: <Zap />,
      title: "Instant Feedback",
      description: "Receive immediate feedback on assignments and assessments, helping students understand concepts and correct misconceptions in real-time."
    }
  ];

  return (
    <PageTemplate
      title="Homeschool Features"
      description="Discover the powerful tools and features that make BIPOCA AI the ideal platform for homeschooling families seeking quality, flexibility, and cultural responsiveness."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
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
        className="p-8 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Ready to transform your homeschool experience?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of families who are using BIPOCA AI to create engaging, culturally responsive homeschool environments.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Start Free Trial
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
