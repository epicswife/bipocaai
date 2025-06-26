"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Star, Compass, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, href, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + (delay * 0.1) }}
      className="h-full"
    >
      <Link href={href} className="block h-full">
        <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg group">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
              {React.cloneElement(icon as React.ReactElement, { 
                className: "w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" 
              } as React.HTMLAttributes<HTMLElement>)}
            </div>
            <h3 className="text-xl font-bold group-hover:text-[var(--color-pan-green)] dark:group-hover:text-[var(--color-pan-amber)] transition-colors duration-300">{title}</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
          <div className="mt-4 flex justify-end">
            <ArrowRight className="w-5 h-5 text-[var(--color-pan-amber)] group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

// Success Story component
interface SuccessStoryProps {
  name: string;
  achievement: string;
  quote: string;
  imageSrc: string;
  delay: number;
}

const SuccessStory: React.FC<SuccessStoryProps> = ({ name, achievement, quote, imageSrc, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + (delay * 0.2) }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-[var(--color-pan-amber)]/20"
    >
      <div className="relative h-48">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
        <Image
          src={imageSrc}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <h3 className="text-white font-bold text-xl">{name}</h3>
          <p className="text-white/90 text-sm">{achievement}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="italic text-gray-600 dark:text-gray-300">&quot;{quote}&quot;</p>
      </div>
    </motion.div>
  );
};

export default function StudentsPage() {
  const features = [
    {
      title: "Learning Paths",
      description: "Discover personalized learning journeys tailored to your interests, goals, and learning style.",
      icon: <Compass />,
      href: "/learn-more/students/learning-paths",
    },
    {
      title: "Interactive Courses",
      description: "Engage with dynamic, multimedia courses that make learning fun and effective.",
      icon: <BookOpen />,
      href: "/learn-more/students/interactive-courses",
    },
    {
      title: "Mentorship",
      description: "Connect with mentors who can guide your educational journey and provide personalized support.",
      icon: <Users />,
      href: "/learn-more/students/mentorship",
    },
    {
      title: "Certifications",
      description: "Earn recognized certifications that showcase your skills and knowledge to colleges and employers.",
      icon: <Award />,
      href: "/learn-more/students/certifications",
    },
    {
      title: "Student Community",
      description: "Join a vibrant community of learners who share your interests and educational goals.",
      icon: <Users />,
      href: "/learn-more/students/community",
    },
  ];

  const successStories = [
    {
      name: "Amara Johnson",
      achievement: "Accepted to Harvard University",
      quote: "BIPOCA AI helped me discover my passion for environmental science and prepared me for college-level coursework. The personalized learning path kept me engaged and challenged.",
      imageSrc: "/images/student-success-1.jpg",
    },
    {
      name: "Marcus Williams",
      achievement: "National Science Competition Winner",
      quote: "The interactive courses and mentorship program gave me the confidence and skills to develop my award-winning research project on sustainable energy solutions.",
      imageSrc: "/images/student-success-2.jpg",
    },
    {
      name: "Zara Patel",
      achievement: "Published Author at 16",
      quote: "Through BIPOCA AI's creative writing courses and community feedback, I was able to refine my storytelling skills and publish my first novel about my cultural heritage.",
      imageSrc: "/images/student-success-3.jpg",
    },
  ];

  return (
    <PageTemplate
      title="For Students"
      description="Embark on a personalized learning journey that celebrates your unique potential and prepares you for future success."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
            Your Learning, Your Way
          </h2>
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            BIPOCA AI provides a personalized learning experience that adapts to your unique interests, learning style, and goals, helping you unlock your full potential.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>AI-powered personalization that adapts to your learning style</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Interactive, engaging content that makes learning enjoyable</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Culturally responsive content that celebrates your heritage</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Mentorship and community support to guide your journey</span>
            </li>
          </ul>
          <div className="mt-2">
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
              Start Learning Today
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative min-h-[300px] rounded-lg overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-pan-green)]/20 to-[var(--color-pan-amber)]/20 z-10 rounded-lg"></div>
          <Image
            src="/images/student-learning.jpg"
            alt="Student learning with BIPOCA AI"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            priority
          />
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Explore Student Resources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            href={feature.href}
            delay={index}
          />
        ))}
      </div>
      
      <motion.div 
        className="p-8 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center mb-4">
          <Star className="w-6 h-6 text-[var(--color-pan-amber)] mr-2" />
          <h2 className="text-2xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
            Why Students Love BIPOCA AI
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
              <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">1</span>
            </div>
            <span>Learning that adapts to your pace and style</span>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
              <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">2</span>
            </div>
            <span>Content that celebrates diverse cultures and perspectives</span>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
              <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">3</span>
            </div>
            <span>Interactive lessons that make learning engaging and fun</span>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
              <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">4</span>
            </div>
            <span>Real-time feedback that helps you improve</span>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
              <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">5</span>
            </div>
            <span>Mentorship from experts who care about your success</span>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
              <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">6</span>
            </div>
            <span>Community of peers who share your interests and goals</span>
          </li>
        </ul>
      </motion.div>
      
      <h2 className="text-2xl font-bold mb-6 text-center">Student Success Stories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {successStories.map((story, index) => (
          <SuccessStory
            key={index}
            name={story.name}
            achievement={story.achievement}
            quote={story.quote}
            imageSrc={story.imageSrc}
            delay={index}
          />
        ))}
      </div>
      
      <motion.div 
        className="p-8 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Ready to start your learning journey?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of students who are discovering their potential and achieving their goals with BIPOCA AI.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Create Your Free Account
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
