"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Settings, 
  Bell, 
  Clock,
  BookOpen,
  LineChart,
  Users,
  Lightbulb,
  CheckCircle
} from 'lucide-react';

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

interface DashboardSectionProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ title, description, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
          <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
            Learn More
          </Button>
        </div>
        <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 rounded-lg aspect-video flex items-center justify-center">
          <div className="text-center p-4">
            {/* Placeholder for dashboard screenshot */}
            <div className="text-4xl mb-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
              {index === 0 ? <BarChart className="w-12 h-12 mx-auto" /> : 
               index === 1 ? <Calendar className="w-12 h-12 mx-auto" /> : 
               index === 2 ? <MessageSquare className="w-12 h-12 mx-auto" /> : 
               <FileText className="w-12 h-12 mx-auto" />}
            </div>
            <p className="font-medium">{image}</p>
          </div>
        </div>
      </div>
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

export default function ParentDashboardPage() {
  const dashboardFeatures = [
    {
      icon: <BarChart />,
      title: "Academic Progress Tracking",
      description: "Monitor your child's academic progress across all subjects with detailed analytics, mastery levels, and growth indicators."
    },
    {
      icon: <Calendar />,
      title: "Schedule Management",
      description: "View and manage your child's learning schedule, upcoming assignments, assessments, and live classes in one centralized calendar."
    },
    {
      icon: <MessageSquare />,
      title: "Communication Hub",
      description: "Connect with teachers, tutors, and support staff through integrated messaging, video conferencing, and appointment scheduling."
    },
    {
      icon: <FileText />,
      title: "Assignment Oversight",
      description: "Review current and past assignments, submission status, feedback, and grades to stay informed about your child's work."
    },
    {
      icon: <Settings />,
      title: "Customization Options",
      description: "Personalize dashboard views, notification preferences, and reporting formats to match your parental oversight style."
    },
    {
      icon: <Bell />,
      title: "Smart Notifications",
      description: "Receive timely alerts about important deadlines, grade updates, learning achievements, and areas needing attention."
    }
  ];

  const dashboardSections = [
    {
      title: "Academic Analytics Dashboard",
      description: "Get a comprehensive view of your child's academic performance with our intuitive analytics dashboard. Track progress across subjects, identify strengths and growth areas, and monitor mastery of key concepts and skills. Our visual reports make it easy to understand your child's educational journey at a glance.",
      image: "Academic Analytics Screenshot"
    },
    {
      title: "Learning Schedule & Calendar",
      description: "Stay organized with our integrated calendar that displays your child's complete learning schedule. View upcoming classes, assignment due dates, assessments, and educational activities. Add family events, set reminders, and coordinate your child's educational and personal commitments in one place.",
      image: "Calendar View Screenshot"
    },
    {
      title: "Communication Center",
      description: "Maintain open lines of communication with everyone involved in your child's education. Message teachers directly, schedule video conferences with tutors, participate in parent forums, and access support resources—all from within the dashboard interface.",
      image: "Communication Center Screenshot"
    },
    {
      title: "Resource & Activity Library",
      description: "Discover educational resources, enrichment activities, and supplemental learning materials tailored to your child's interests and learning needs. Our curated library offers everything from additional practice exercises to family learning activities that extend classroom concepts.",
      image: "Resource Library Screenshot"
    }
  ];

  const testimonials = [
    {
      name: "Jennifer Martinez",
      role: "Parent of two middle school students",
      quote: "The parent dashboard has transformed how I stay involved in my children's education. I can quickly see their progress, upcoming assignments, and areas where they might need extra support—all without having to constantly ask them for updates."
    },
    {
      name: "Michael Thompson",
      role: "Father of a high school freshman",
      quote: "As a busy working parent, the dashboard's notification system has been invaluable. I get alerts about important deadlines and grade updates, and I can easily message teachers when I have questions. It's helped me stay connected to my son's education despite my hectic schedule."
    },
    {
      name: "Sarah Johnson",
      role: "Mother of elementary and middle school children",
      quote: "I love being able to see exactly what my kids are learning and how they're progressing. The visual reports make it easy to understand their strengths and areas for growth, and the resource library has given us great ideas for educational activities we can do together at home."
    },
    {
      name: "David Wilson",
      role: "Parent of a student with learning accommodations",
      quote: "The dashboard makes it simple to track how my daughter's accommodations are being implemented and how they're affecting her progress. The ability to communicate directly with her support team has improved our coordination and helped ensure her needs are consistently met."
    }
  ];

  return (
    <PageTemplate
      title="Parent Dashboard"
      description="Stay connected to your child's educational journey with our comprehensive parent dashboard. Monitor progress, manage schedules, communicate with teachers, and access resources—all in one intuitive interface designed to support your role in your child's education."
    >
      <div className="mb-12">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">Dashboard Features</TabsTrigger>
            <TabsTrigger value="tour">Dashboard Tour</TabsTrigger>
            <TabsTrigger value="testimonials">Parent Experiences</TabsTrigger>
          </TabsList>
          
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
            
            <motion.div
              className="mt-8 p-6 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4 text-center">Designed for Busy Parents</h3>
              <p className="mb-6 text-center">Our parent dashboard is built to give you meaningful insights into your child&apos;s education without overwhelming you with information.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Time-Saving
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quick access to the most important information about your child&apos;s education, saving you time and reducing stress.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Educationally Focused
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Highlights meaningful learning metrics and progress indicators that help you support your child&apos;s educational journey.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Settings className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Customizable
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tailor the dashboard to your preferences and your child&apos;s specific educational needs and goals.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="tour">
            {dashboardSections.map((section, index) => (
              <DashboardSection
                key={index}
                title={section.title}
                description={section.description}
                image={section.image}
                index={index}
              />
            ))}
            
            <motion.div
              className="mt-8 p-6 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4">See the Dashboard in Action</h3>
              <p className="mb-6 max-w-2xl mx-auto">Watch our guided tour video to see how the parent dashboard can help you stay connected to your child&apos;s education.</p>
              <div className="aspect-video max-w-3xl mx-auto bg-black/5 dark:bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="w-12 h-12 mx-auto mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  <p className="font-medium">Dashboard Demo Video</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="testimonials">
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
            
            <motion.div
              className="mt-8 p-6 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4 text-center">The Parent Difference</h3>
              <p className="mb-6 text-center">Research shows that parent involvement significantly impacts student success. Our dashboard is designed to make meaningful involvement easier and more effective.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Strengthened Partnership
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Build stronger connections with teachers and support staff through improved communication and coordination.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Informed Support
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Provide more targeted support at home based on real-time insights into your child&apos;s learning progress and needs.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Increased Accountability
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Help your child develop responsibility and organizational skills through shared visibility into assignments and deadlines.</p>
                </div>
              </div>
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
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Create an account to access the parent dashboard and stay connected to your child&apos;s educational journey.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          <Users className="w-4 h-4 mr-2" />
          Create Parent Account
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
