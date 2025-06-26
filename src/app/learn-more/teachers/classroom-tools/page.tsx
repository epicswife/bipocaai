"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Users, 
  BarChart3, 
  Clock, 
  MessageSquare, 
  FileText, 
  PenTool, 
  CheckSquare, 
  Calendar,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, index }) => {
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

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, quote, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <p className="text-gray-600 dark:text-gray-300 italic mb-4">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
            <span className="text-lg font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">{name.charAt(0)}</span>
          </div>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default function ClassroomToolsPage() {
  const classroomTools = [
    {
      icon: <Layout />,
      title: "Interactive Classroom Dashboard",
      description: "Manage your entire classroom from a single, intuitive dashboard. Track attendance, monitor student progress, and organize learning materials all in one place."
    },
    {
      icon: <Users />,
      title: "Student Engagement Tracker",
      description: "Monitor student participation and engagement in real-time. Identify students who may need additional support or different learning approaches."
    },
    {
      icon: <BarChart3 />,
      title: "Performance Analytics",
      description: "Access comprehensive data visualizations of student performance across assignments, assessments, and learning objectives. Identify trends and areas for improvement."
    },
    {
      icon: <Clock />,
      title: "Time Management Tools",
      description: "Optimize classroom time with customizable timers, activity schedulers, and pacing guides that help keep lessons on track and students focused."
    },
    {
      icon: <MessageSquare />,
      title: "Communication Hub",
      description: "Facilitate seamless communication with students, parents, and colleagues through integrated messaging, announcement boards, and discussion forums."
    },
    {
      icon: <FileText />,
      title: "Resource Library",
      description: "Access a vast collection of teaching materials, lesson plans, and educational resources that can be easily integrated into your curriculum."
    }
  ];

  const assessmentTools = [
    {
      icon: <PenTool />,
      title: "Customizable Assessment Creator",
      description: "Design personalized assessments tailored to your teaching style and student needs. Choose from various question types and difficulty levels."
    },
    {
      icon: <CheckSquare />,
      title: "Automated Grading",
      description: "Save time with AI-powered grading for multiple-choice, fill-in-the-blank, and even short answer questions, with options for manual review."
    },
    {
      icon: <BarChart3 />,
      title: "Comprehensive Analytics",
      description: "Gain insights into student performance with detailed analytics that identify knowledge gaps and learning patterns across individuals and groups."
    },
    {
      icon: <Calendar />,
      title: "Assessment Scheduling",
      description: "Plan and schedule assessments in advance, with automated reminders for students and flexible time windows for completion."
    },
    {
      icon: <Sparkles />,
      title: "Adaptive Testing",
      description: "Implement adaptive assessments that adjust difficulty based on student responses, providing a more accurate measure of knowledge and abilities."
    },
    {
      icon: <BookOpen />,
      title: "Question Bank",
      description: "Access thousands of pre-made questions aligned with educational standards, or create and save your own for future use."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "High School Science Teacher",
      quote: "The classroom tools have revolutionized how I manage my science labs. The real-time engagement tracking helps me identify which students need additional support during complex experiments."
    },
    {
      name: "Michael Rodriguez",
      role: "Middle School Math Teacher",
      quote: "The assessment tools have cut my grading time in half while providing more detailed insights into my students' understanding of mathematical concepts. I can now spend more time actually teaching."
    },
    {
      name: "Jennifer Williams",
      role: "Elementary School Teacher",
      quote: "The interactive dashboard has made classroom management so much easier. I can track attendance, behavior, and academic progress all in one place, which has been invaluable for parent-teacher conferences."
    },
    {
      name: "David Chen",
      role: "Special Education Teacher",
      quote: "The customizable assessment creator allows me to design evaluations that accommodate different learning needs. My students feel more confident and show better results with assessments tailored to their abilities."
    }
  ];

  return (
    <PageTemplate
      title="Classroom Tools"
      description="Discover powerful digital tools designed to enhance classroom management, streamline assessment, and improve student engagement. Our comprehensive suite of teacher resources helps you create an effective and engaging learning environment."
    >
      <div className="mb-12">
        <Tabs defaultValue="management" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="management">Classroom Management</TabsTrigger>
            <TabsTrigger value="assessment">Assessment Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="management">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classroomTools.map((tool, index) => (
                <ToolCard
                  key={index}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
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
              <h3 className="text-xl font-bold mb-4">See Our Classroom Management Tools in Action</h3>
              <p className="mb-6 max-w-2xl mx-auto">Watch how our integrated classroom management system helps teachers create more engaging and effective learning environments.</p>
              <div className="aspect-video max-w-3xl mx-auto bg-black/5 dark:bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Layout className="w-12 h-12 mx-auto mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  <p className="font-medium">Video Demo Placeholder</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="assessment">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assessmentTools.map((tool, index) => (
                <ToolCard
                  key={index}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
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
              <h3 className="text-xl font-bold mb-4">Assessment Made Simple</h3>
              <p className="mb-6 max-w-2xl mx-auto">Explore how our assessment tools can save you time while providing deeper insights into student learning.</p>
              <div className="aspect-video max-w-3xl mx-auto bg-black/5 dark:bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <CheckSquare className="w-12 h-12 mx-auto mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  <p className="font-medium">Video Demo Placeholder</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <motion.div 
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">What Teachers Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              quote={testimonial.quote}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="p-8 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Ready to transform your classroom?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of educators who are using our classroom tools to create more engaging, efficient, and effective learning environments.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Get Started with Classroom Tools
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
