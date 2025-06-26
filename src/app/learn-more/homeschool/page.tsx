"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Users, ArrowRight, Clock, Award, Lightbulb } from 'lucide-react';
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

export default function HomeschoolPage() {
  const features = [
    {
      title: "Curriculum",
      description: "Explore our comprehensive, culturally responsive curriculum designed for homeschooling families.",
      icon: <BookOpen />,
      href: "/learn-more/homeschool/curriculum",
    },
    {
      title: "Features",
      description: "Discover the powerful tools and features that make BIPOCA AI ideal for homeschooling.",
      icon: <Lightbulb />,
      href: "/learn-more/homeschool/features",
    },
    {
      title: "Parent Dashboard",
      description: "Learn how our intuitive dashboard helps parents track progress and manage learning.",
      icon: <Users />,
      href: "/learn-more/homeschool/parent-dashboard",
    },
    {
      title: "Student Experience",
      description: "See how students engage with our interactive, personalized learning platform.",
      icon: <Award />,
      href: "/learn-more/homeschool/student-experience",
    },
    {
      title: "AI Lesson Planning",
      description: "Explore how our AI helps create personalized lesson plans tailored to each student.",
      icon: <Clock />,
      href: "/learn-more/homeschool/ai-planning",
    },
    {
      title: "Success Stories",
      description: "Read about families who have transformed their homeschooling experience with BIPOCA AI.",
      icon: <Users />,
      href: "/learn-more/homeschool/success-stories",
    },
  ];

  return (
    <PageTemplate
      title="Homeschool with BIPOCA AI"
      description="Empower your homeschooling journey with our culturally responsive, AI-powered curriculum and tools designed for families committed to excellence in education."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
            Transform Your Homeschool Experience
          </h2>
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            BIPOCA AI provides a complete homeschooling solution that combines cutting-edge technology with culturally responsive content, giving your children the education they deserve.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Comprehensive K-12 curriculum aligned with standards</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>AI-powered personalization that adapts to your child&apos;s learning style</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Robust progress tracking and reporting tools</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Community support and resources for homeschooling families</span>
            </li>
          </ul>
          <div className="mt-2">
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
              Get Started Today
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
            src="/images/homeschool-hero.jpg"
            alt="Homeschooling with BIPOCA AI"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            priority
          />
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Explore Our Homeschool Resources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
        className="p-8 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Ready to transform your homeschooling experience?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of families who are using BIPOCA AI to provide their children with a world-class, culturally responsive education at home.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Sign Up for Free Trial
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
