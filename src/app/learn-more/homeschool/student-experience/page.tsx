"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BookOpen, Video, MessageSquare, Award, Lightbulb, Gamepad2, Users, Rocket } from 'lucide-react';

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

export default function StudentExperiencePage() {
  const studentFeatures = [
    {
      icon: <BookOpen />,
      title: "Interactive Lessons",
      description: "Engage with dynamic, multimedia lessons that adapt to your learning style and pace, making complex concepts easy to understand."
    },
    {
      icon: <Video />,
      title: "Video Tutorials",
      description: "Access thousands of high-quality video tutorials featuring diverse educators who bring subjects to life with clear explanations."
    },
    {
      icon: <Gamepad2 />,
      title: "Educational Games",
      description: "Learn through play with our educational games that reinforce concepts while making learning fun and engaging."
    },
    {
      icon: <MessageSquare />,
      title: "AI Learning Assistant",
      description: "Get instant help from our AI learning assistant that can answer questions, provide explanations, and offer study tips 24/7."
    },
    {
      icon: <Award />,
      title: "Achievement System",
      description: "Earn badges, certificates, and rewards as you master new skills and complete learning milestones."
    },
    {
      icon: <Users />,
      title: "Virtual Study Groups",
      description: "Connect with other homeschool students in supervised virtual study groups to collaborate on projects and discuss ideas."
    },
    {
      icon: <Lightbulb />,
      title: "Personalized Learning",
      description: "Experience a curriculum that adapts to your interests, strengths, and areas for growth, making learning more relevant and engaging."
    },
    {
      icon: <Rocket />,
      title: "Project-Based Learning",
      description: "Apply what you've learned through hands-on projects that connect to real-world challenges and showcase your creativity."
    }
  ];

  const testimonials = [
    {
      name: "Jamal, 14",
      quote: "I love how I can learn at my own pace and dive deeper into the topics that really interest me. The interactive lessons make learning fun, and I actually look forward to my school day now!",
      subject: "Science & Technology"
    },
    {
      name: "Maya, 12",
      quote: "The AI tutor helps me whenever I get stuck, even when my parents are busy. I also made friends in the virtual study groups, so I don't feel isolated like I did before.",
      subject: "Mathematics & Art"
    },
    {
      name: "Zion, 16",
      quote: "As a high school student, I appreciate how the platform prepares me for college with advanced courses and project-based learning. The culturally diverse content also helps me see myself in what I'm studying.",
      subject: "History & Literature"
    }
  ];

  return (
    <PageTemplate
      title="Student Experience"
      description="Discover how BIPOCA AI creates an engaging, personalized, and culturally responsive learning environment that empowers homeschool students to thrive."
    >
      <div className="mb-12">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">Learning Features</TabsTrigger>
            <TabsTrigger value="day">A Day in the Life</TabsTrigger>
            <TabsTrigger value="testimonials">Student Testimonials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentFeatures.map((feature, index) => (
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
          
          <TabsContent value="day">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 p-6 rounded-lg border border-[var(--color-pan-amber)]/20 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">A Day in the Life of a BIPOCA AI Student</h2>
                
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                      <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 p-4 rounded-lg text-center">
                        <h3 className="font-bold text-lg mb-2">Morning</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">8:30 AM - 11:30 AM</p>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h4 className="font-semibold text-lg mb-2">Core Academic Subjects</h4>
                      <p className="mb-4">Begin the day with personalized lessons in math, language arts, and science. Each lesson includes interactive content, videos, and practice exercises tailored to the student's learning style.</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Adaptive Math Lesson</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Problem-solving with real-time feedback</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Interactive Reading</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Diverse literature with comprehension activities</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Science Exploration</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Virtual labs and experiments</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                      <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 p-4 rounded-lg text-center">
                        <h3 className="font-bold text-lg mb-2">Midday</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">12:30 PM - 2:30 PM</p>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h4 className="font-semibold text-lg mb-2">Project-Based Learning & Electives</h4>
                      <p className="mb-4">After lunch, students work on interdisciplinary projects and explore elective subjects based on their interests, from coding to music to foreign languages.</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Creative Project Work</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Hands-on application of concepts</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Elective Courses</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Personalized interest-based learning</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Skill Development</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Building practical and creative abilities</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                      <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 p-4 rounded-lg text-center">
                        <h3 className="font-bold text-lg mb-2">Afternoon</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">3:00 PM - 4:30 PM</p>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h4 className="font-semibold text-lg mb-2">Social Learning & Reflection</h4>
                      <p className="mb-4">End the day with collaborative activities, virtual study groups, and reflection on the day's learning to reinforce concepts and build social skills.</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Virtual Study Groups</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Collaborative learning with peers</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Learning Reflection</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Journaling and progress tracking</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                          <p className="font-medium">Goal Setting</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Planning for the next day's learning</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="testimonials">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                >
                  <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
                          <span className="font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">{testimonial.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-bold">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.subject}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -top-2 -left-2 text-4xl text-[var(--color-pan-green)]/20 dark:text-[var(--color-pan-amber)]/20">"</div>
                        <p className="relative z-10 italic text-gray-600 dark:text-gray-300 pl-4">{testimonial.quote}</p>
                        <div className="absolute -bottom-4 -right-2 text-4xl text-[var(--color-pan-green)]/20 dark:text-[var(--color-pan-amber)]/20">"</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
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
        <h2 className="text-2xl font-bold mb-4">Ready to transform your child's learning experience?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of students who are thriving with our personalized, culturally responsive homeschool platform.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Start Free Trial
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
