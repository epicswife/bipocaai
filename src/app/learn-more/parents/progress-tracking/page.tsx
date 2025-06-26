"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Target, 
  Award, 
  Calendar, 
  Bell,
  BookOpen,
  CheckCircle,
  ArrowUpRight,
  Lightbulb,
  Users
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

interface ReportCardProps {
  title: string;
  description: string;
  chartType: React.ReactNode;
  metrics: string[];
  index: number;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, description, chartType, metrics, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
              {React.cloneElement(chartType as React.ReactElement, { 
                className: "w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" 
              } as React.HTMLAttributes<HTMLElement>)}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Key Metrics:</h4>
          <ul className="space-y-1">
            {metrics.map((metric, i) => (
              <li key={i} className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                {metric}
              </li>
            ))}
          </ul>
        </div>
        <Button variant="outline" className="w-full border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10">
          View Sample Report
        </Button>
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

export default function ProgressTrackingPage() {
  const trackingFeatures = [
    {
      icon: <BarChart />,
      title: "Comprehensive Analytics",
      description: "Access detailed analytics that track your child's progress across subjects, skills, and learning objectives with intuitive visualizations."
    },
    {
      icon: <LineChart />,
      title: "Growth Monitoring",
      description: "View progress over time with longitudinal data that highlights patterns, growth trajectories, and learning milestones."
    },
    {
      icon: <Target />,
      title: "Goal Setting & Tracking",
      description: "Set and monitor academic and skill-based goals collaboratively with your child and their teachers, with clear progress indicators."
    },
    {
      icon: <Award />,
      title: "Achievement Recognition",
      description: "Celebrate your child's accomplishments with achievement badges, milestone markers, and progress celebrations."
    },
    {
      icon: <Calendar />,
      title: "Regular Progress Updates",
      description: "Receive scheduled progress reports and real-time updates on significant learning achievements or challenges."
    },
    {
      icon: <Bell />,
      title: "Proactive Alerts",
      description: "Get notified about important trends, potential learning gaps, or areas where additional support might be beneficial."
    }
  ];

  const reportTypes = [
    {
      title: "Academic Performance Dashboard",
      description: "A comprehensive overview of your child's academic performance across all subjects, with grade trends, assignment completion rates, and mastery levels.",
      chartType: <BarChart />,
      metrics: [
        "Subject-by-subject performance metrics",
        "Assignment completion and quality indicators",
        "Assessment scores with comparative benchmarks",
        "Mastery level tracking for key concepts"
      ]
    },
    {
      title: "Skill Development Report",
      description: "Track your child's progress in developing essential skills like critical thinking, problem-solving, communication, and collaboration.",
      chartType: <LineChart />,
      metrics: [
        "Skill mastery progression over time",
        "Strengths and growth areas identification",
        "Cross-subject skill application metrics",
        "Personalized skill development recommendations"
      ]
    },
    {
      title: "Learning Habits Analysis",
      description: "Insights into your child's learning patterns, including engagement levels, study habits, time management, and persistence.",
      chartType: <PieChart />,
      metrics: [
        "Engagement and participation metrics",
        "Time spent on different learning activities",
        "Work consistency and completion patterns",
        "Challenge response and persistence indicators"
      ]
    },
    {
      title: "Goal Achievement Tracker",
      description: "Monitor progress toward personalized academic and skill-based goals set collaboratively by your child, their teachers, and you.",
      chartType: <Target />,
      metrics: [
        "Goal completion percentages and timelines",
        "Milestone achievement tracking",
        "Effort and progress indicators",
        "Goal adjustment recommendations"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Rebecca Chen",
      role: "Mother of two elementary students",
      quote: "The progress tracking tools have given me incredible insight into how my children learn. I can see exactly where they're excelling and where they need more support, which has made our parent-teacher conferences so much more productive."
    },
    {
      name: "James Wilson",
      role: "Father of a middle school student",
      quote: "Being able to track my son's progress in real-time has been a game-changer. Instead of waiting for report cards, I can see how he's doing on a daily basis and have meaningful conversations about his learning journey."
    },
    {
      name: "Maria Rodriguez",
      role: "Parent of a student with learning differences",
      quote: "The detailed skill tracking has been invaluable for my daughter who has dyslexia. We can clearly see her progress in specific reading skills, which has boosted her confidence and helped us provide targeted support at home."
    },
    {
      name: "Thomas Johnson",
      role: "Parent of a high-achieving student",
      quote: "Even though my daughter has always done well academically, the progress tracking tools have helped us identify areas where she can be further challenged and set meaningful goals that keep her engaged and growing."
    }
  ];

  return (
    <PageTemplate
      title="Progress Tracking"
      description="Monitor your child's educational journey with our comprehensive progress tracking tools. Gain insights into academic performance, skill development, and learning patterns through intuitive visualizations and detailed reports designed to help you support your child's growth."
    >
      <div className="mb-12">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">Tracking Features</TabsTrigger>
            <TabsTrigger value="reports">Report Types</TabsTrigger>
            <TabsTrigger value="testimonials">Parent Experiences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trackingFeatures.map((feature, index) => (
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
              <h3 className="text-xl font-bold mb-4 text-center">Beyond Grades: A Holistic View of Learning</h3>
              <p className="mb-6 text-center">Our progress tracking tools go beyond traditional grades to provide a comprehensive picture of your child&apos;s educational development.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Mastery-Based
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Track concept and skill mastery rather than just assignment scores, providing deeper insight into your child&apos;s understanding.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Growth-Focused
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Emphasize progress and improvement over time rather than static achievement, celebrating growth at every level.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Actionable Insights
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive specific recommendations for supporting your child&apos;s learning based on the data collected through our tracking tools.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reportTypes.map((report, index) => (
                <ReportCard
                  key={index}
                  title={report.title}
                  description={report.description}
                  chartType={report.chartType}
                  metrics={report.metrics}
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
              <h3 className="text-xl font-bold mb-4">Customized Reporting</h3>
              <p className="mb-6 max-w-2xl mx-auto">Tailor your progress tracking experience to focus on the metrics and insights that matter most to your family&apos;s educational priorities.</p>
              <div className="aspect-video max-w-3xl mx-auto bg-black/5 dark:bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="w-12 h-12 mx-auto mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  <p className="font-medium">Interactive Report Demo</p>
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
              <h3 className="text-xl font-bold mb-4 text-center">The Impact of Parent Involvement</h3>
              <p className="mb-6 text-center">Research consistently shows that when parents are actively engaged in their child&apos;s education, students achieve more, regardless of socioeconomic status, ethnic/racial background, or parents&apos; education level.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Higher Achievement
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Students with involved parents are more likely to earn higher grades and test scores, and enroll in higher-level programs.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Better Social Skills
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">When parents are informed and involved, students develop better social skills and show improved behavior both in and out of school.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Increased Confidence
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Students whose parents stay informed about their progress develop greater self-confidence and motivation in the classroom.</p>
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
        <h2 className="text-2xl font-bold mb-4">Start Tracking Your Child&apos;s Progress Today</h2>
        <p className="mb-6 max-w-2xl mx-auto">Create an account to access our comprehensive progress tracking tools and gain valuable insights into your child&apos;s educational journey.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          <BarChart className="w-4 h-4 mr-2" />
          Get Started
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
