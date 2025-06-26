"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Users, Video, MessageSquare, Calendar, Clock, BookOpen, Lightbulb, Award } from 'lucide-react';

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

interface TutorCardProps {
  name: string;
  subjects: string[];
  experience: string;
  bio: string;
  index: number;
}

const TutorCard: React.FC<TutorCardProps> = ({ name, subjects, experience, bio, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
            <span className="text-xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">{name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{experience}</p>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Subjects:</h4>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject, i) => (
              <span 
                key={i} 
                className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{bio}</p>
        <div className="mt-4">
          <Button variant="outline" className="w-full border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10">
            View Profile
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default function TutoringPage() {
  const tutoringFeatures = [
    {
      icon: <Users />,
      title: "Live 1:1 Tutoring",
      description: "Connect with expert tutors for personalized, one-on-one sessions tailored to your specific learning needs and goals."
    },
    {
      icon: <Video />,
      title: "Interactive Sessions",
      description: "Engage in dynamic tutoring sessions with screen sharing, virtual whiteboards, and collaborative document editing."
    },
    {
      icon: <MessageSquare />,
      title: "24/7 AI Assistance",
      description: "Get immediate help from our AI tutor for quick questions and concept explanations, available anytime day or night."
    },
    {
      icon: <Calendar />,
      title: "Flexible Scheduling",
      description: "Book sessions at times that work for you, with options for recurring appointments or on-demand assistance."
    },
    {
      icon: <Clock />,
      title: "Session Recordings",
      description: "Review your tutoring sessions later with full recordings and notes to reinforce learning and track progress."
    },
    {
      icon: <BookOpen />,
      title: "Culturally Responsive Approach",
      description: "Learn from tutors trained in culturally responsive teaching methods that honor diverse perspectives and learning styles."
    },
    {
      icon: <Lightbulb />,
      title: "Personalized Learning Plans",
      description: "Receive customized tutoring plans based on your learning style, academic goals, and areas for improvement."
    },
    {
      icon: <Award />,
      title: "Progress Tracking",
      description: "Monitor your academic growth with detailed progress reports and achievement tracking after each session."
    }
  ];

  const featuredTutors = [
    {
      name: "Dr. Maya Johnson",
      subjects: ["Mathematics", "Physics", "Computer Science"],
      experience: "10+ years experience, Ph.D. in Applied Mathematics",
      bio: "Dr. Johnson specializes in making complex math and science concepts accessible to students of all levels. Her teaching approach emphasizes real-world applications and building strong foundational understanding."
    },
    {
      name: "Marcus Williams",
      subjects: ["English Literature", "Writing", "History"],
      experience: "8 years experience, M.A. in Education",
      bio: "Marcus is passionate about helping students develop critical thinking and communication skills through literature and writing. He incorporates diverse literary perspectives and culturally responsive teaching methods."
    },
    {
      name: "Dr. Aisha Patel",
      subjects: ["Biology", "Chemistry", "Environmental Science"],
      experience: "12 years experience, Ph.D. in Molecular Biology",
      bio: "Dr. Patel makes science engaging through hands-on experiments and real-world connections. She excels at breaking down complex scientific concepts into understandable components for students at all levels."
    },
    {
      name: "Carlos Rodriguez",
      subjects: ["Spanish", "Social Studies", "ESL/ELL"],
      experience: "15 years experience, M.Ed. in Bilingual Education",
      bio: "Carlos specializes in language acquisition and cultural studies. His interactive approach helps students develop language skills while gaining appreciation for diverse cultural perspectives and global issues."
    }
  ];

  const testimonials = [
    {
      student: "Jamal, 11th Grade",
      quote: "My tutor didn't just help me with calculus problems—she helped me understand the concepts behind them. My grades improved from a C to an A-, but more importantly, I actually enjoy math now!",
      subject: "Mathematics"
    },
    {
      student: "Zoe, 8th Grade",
      quote: "I was struggling with writing essays until I started working with my tutor. He helped me organize my thoughts and find my voice. Now I feel confident expressing my ideas in writing.",
      subject: "English"
    },
    {
      student: "Miguel, 10th Grade",
      quote: "The chemistry tutoring sessions made such a difference for me. The interactive experiments and visual explanations helped me understand concepts I'd been struggling with for months.",
      subject: "Chemistry"
    }
  ];

  return (
    <PageTemplate
      title="Student Tutoring"
      description="Get personalized academic support from expert tutors who understand your unique learning needs and help you achieve your educational goals."
    >
      <div className="mb-12">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">Tutoring Features</TabsTrigger>
            <TabsTrigger value="tutors">Meet Our Tutors</TabsTrigger>
            <TabsTrigger value="testimonials">Student Success Stories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutoringFeatures.map((feature, index) => (
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
          
          <TabsContent value="tutors">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredTutors.map((tutor, index) => (
                <TutorCard
                  key={index}
                  name={tutor.name}
                  subjects={tutor.subjects}
                  experience={tutor.experience}
                  bio={tutor.bio}
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
              <h3 className="text-xl font-bold mb-2">Our Tutor Selection Process</h3>
              <p className="mb-6 max-w-3xl mx-auto">All of our tutors undergo a rigorous selection and training process to ensure they provide the highest quality academic support.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mb-3">
                    <span className="font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Academic Verification</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">We verify academic credentials and subject matter expertise through rigorous assessment.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mb-3">
                    <span className="font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Teaching Assessment</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Candidates demonstrate their teaching abilities through sample sessions and pedagogical evaluation.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mb-3">
                    <span className="font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Cultural Competency</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tutors are trained in culturally responsive teaching methods to support diverse learners.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mb-3">
                    <span className="font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">4</span>
                  </div>
                  <h4 className="font-semibold mb-2">Ongoing Training</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">All tutors participate in continuous professional development to enhance their skills.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="testimonials">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 gap-6 mb-8">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-[var(--color-pan-amber)]/20"
                  >
                    <div className="flex items-start">
                      <div className="text-4xl text-[var(--color-pan-green)]/20 dark:text-[var(--color-pan-amber)]/20 leading-none mr-4">"</div>
                      <div>
                        <p className="italic mb-4 text-gray-600 dark:text-gray-300">{testimonial.quote}</p>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
                            <span className="font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">{testimonial.student.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold">{testimonial.student}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.subject} Student</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 p-6 rounded-lg border border-[var(--color-pan-amber)]/20">
                <h3 className="text-xl font-bold mb-4 text-center">Academic Improvement Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">92%</span>
                    </div>
                    <h4 className="font-semibold mb-2">Grade Improvement</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">of students improved their grades by at least one letter grade after 8 weeks of tutoring</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">87%</span>
                    </div>
                    <h4 className="font-semibold mb-2">Confidence Boost</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">of students reported increased academic confidence and reduced test anxiety</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">95%</span>
                    </div>
                    <h4 className="font-semibold mb-2">Satisfaction Rate</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">of students and parents reported high satisfaction with their tutoring experience</p>
                  </div>
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
        <h2 className="text-2xl font-bold mb-4">Ready to boost your academic success?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Get started with personalized tutoring today and experience the difference that expert, culturally responsive academic support can make.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Schedule Your First Session
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
