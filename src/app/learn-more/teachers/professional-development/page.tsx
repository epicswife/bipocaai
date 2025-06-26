"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users, Calendar, Certificate, Globe, Video, Lightbulb } from 'lucide-react';

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

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  level: string;
  topics: string[];
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, duration, level, topics, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
            <GraduationCap className="w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
            {duration}
          </span>
          <span className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
            {level}
          </span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-sm font-semibold mb-2">Key Topics:</h4>
          <ul className="space-y-1">
            {topics.map((topic, i) => (
              <li key={i} className="flex items-start text-sm">
                <div className="w-4 h-4 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">✓</span>
                </div>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  );
};

export default function ProfessionalDevelopmentPage() {
  const pdFeatures = [
    {
      icon: <Video />,
      title: "On-Demand Courses",
      description: "Access a library of self-paced professional development courses covering a wide range of educational topics and teaching strategies."
    },
    {
      icon: <Users />,
      title: "Live Workshops",
      description: "Participate in interactive virtual workshops led by expert educators, with opportunities for real-time collaboration and feedback."
    },
    {
      icon: <BookOpen />,
      title: "Resource Library",
      description: "Explore our extensive collection of articles, research papers, lesson plans, and teaching materials to enhance your practice."
    },
    {
      icon: <Certificate />,
      title: "Certification Pathways",
      description: "Earn professional certificates and continuing education credits through our accredited professional development programs."
    },
    {
      icon: <Globe />,
      title: "Culturally Responsive Teaching",
      description: "Develop skills for creating inclusive classrooms that honor and integrate diverse cultural perspectives and experiences."
    },
    {
      icon: <Calendar />,
      title: "Personalized Learning Plan",
      description: "Create a customized professional growth plan based on your goals, interests, and areas for development as an educator."
    },
    {
      icon: <Lightbulb />,
      title: "Coaching & Mentoring",
      description: "Connect with experienced educators for one-on-one coaching sessions to address specific challenges and improve your practice."
    },
    {
      icon: <GraduationCap />,
      title: "Learning Communities",
      description: "Join subject-specific or grade-level communities to share ideas, resources, and best practices with fellow educators."
    }
  ];

  const featuredCourses = [
    {
      title: "Culturally Responsive Teaching Practices",
      description: "Learn strategies for creating an inclusive classroom environment that honors diverse cultural backgrounds and perspectives.",
      duration: "8 weeks",
      level: "Intermediate",
      topics: [
        "Cultural competence development",
        "Inclusive curriculum design",
        "Equitable assessment practices",
        "Community engagement strategies"
      ]
    },
    {
      title: "Digital Learning Tools for Engagement",
      description: "Explore innovative digital tools and platforms to enhance student engagement and facilitate interactive learning experiences.",
      duration: "6 weeks",
      level: "All Levels",
      topics: [
        "Interactive presentation tools",
        "Digital assessment strategies",
        "Collaborative learning platforms",
        "Multimedia content creation"
      ]
    },
    {
      title: "Differentiated Instruction Mastery",
      description: "Develop skills for effectively differentiating instruction to meet the diverse learning needs of all students in your classroom.",
      duration: "10 weeks",
      level: "Advanced",
      topics: [
        "Learning profile assessment",
        "Tiered assignment design",
        "Flexible grouping strategies",
        "Progress monitoring systems"
      ]
    },
    {
      title: "Social-Emotional Learning Integration",
      description: "Learn how to integrate social-emotional learning into academic instruction to support student well-being and achievement.",
      duration: "4 weeks",
      level: "Beginner",
      topics: [
        "SEL competency development",
        "Classroom community building",
        "Emotion regulation strategies",
        "Trauma-informed teaching practices"
      ]
    }
  ];

  return (
    <PageTemplate
      title="Professional Development"
      description="Enhance your teaching practice with our comprehensive professional development offerings designed to support your growth as an educator."
    >
      <div className="mb-12">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">PD Features</TabsTrigger>
            <TabsTrigger value="courses">Featured Courses</TabsTrigger>
            <TabsTrigger value="calendar">Upcoming Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pdFeatures.map((feature, index) => (
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
          
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredCourses.map((course, index) => (
                <CourseCard
                  key={index}
                  title={course.title}
                  description={course.description}
                  duration={course.duration}
                  level={course.level}
                  topics={course.topics}
                  index={index}
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                View All Courses
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 p-6 rounded-lg border border-[var(--color-pan-amber)]/20 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Professional Development Events</h2>
                
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg">Virtual Workshop: Project-Based Learning in the Digital Classroom</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">Learn how to design and implement engaging project-based learning experiences in virtual and hybrid environments.</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
                            Interactive Workshop
                          </span>
                          <span className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
                            3 Hours
                          </span>
                          <span className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
                            Certificate Available
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center md:items-end">
                        <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 px-4 py-2 rounded-lg text-center mb-2">
                          <p className="font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">April 15, 2025</p>
                          <p className="text-sm">1:00 PM - 4:00 PM EST</p>
                        </div>
                        <Button variant="outline" className="border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10">
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg">Webinar Series: Culturally Responsive Assessment Practices</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">A three-part webinar series exploring equitable assessment strategies that honor diverse cultural perspectives.</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
                            Webinar Series
                          </span>
                          <span className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
                            3 Sessions (1 Hour Each)
                          </span>
                          <span className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
                            PD Credit Available
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center md:items-end">
                        <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 px-4 py-2 rounded-lg text-center mb-2">
                          <p className="font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">May 3, 10, 17, 2025</p>
                          <p className="text-sm">4:30 PM - 5:30 PM EST</p>
                        </div>
                        <Button variant="outline" className="border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10">
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg">Virtual Conference: Innovative Teaching for Diverse Learners</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">A full-day virtual conference featuring keynote speakers, breakout sessions, and networking opportunities.</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
                            Virtual Conference
                          </span>
                          <span className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
                            Full Day
                          </span>
                          <span className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
                            8 PD Hours
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center md:items-end">
                        <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 px-4 py-2 rounded-lg text-center mb-2">
                          <p className="font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">June 12, 2025</p>
                          <p className="text-sm">9:00 AM - 4:00 PM EST</p>
                        </div>
                        <Button variant="outline" className="border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10">
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                    View Full Calendar
                  </Button>
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
        <h2 className="text-2xl font-bold mb-4">Ready to advance your teaching practice?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of educators who are enhancing their skills and knowledge through our professional development offerings.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Start Your Professional Growth Journey
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
