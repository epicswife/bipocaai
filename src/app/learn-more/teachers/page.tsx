"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, Layers, BarChart, BookOpen, Users, ArrowRight } from 'lucide-react';
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

// Testimonial component
interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  delay: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + (delay * 0.2) }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-[var(--color-pan-amber)]/20"
    >
      <div className="mb-4 text-[var(--color-pan-amber)] text-4xl">&quot;</div>
      <p className="italic mb-4 text-gray-600 dark:text-gray-300">{quote}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/20 dark:bg-[var(--color-pan-amber)]/20 flex items-center justify-center mr-3">
          <GraduationCap className="w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
        </div>
        <div>
          <p className="font-bold">{author}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function TeachersPage() {
  const features = [
    {
      title: "Classroom Tools",
      description: "Discover interactive tools designed to engage students and enhance your teaching experience.",
      icon: <BookOpen />,
      href: "/learn-more/teachers/classroom-tools",
    },
    {
      title: "Curriculum Builder",
      description: "Create custom, culturally responsive curriculum that meets your students' unique needs.",
      icon: <Layers />,
      href: "/learn-more/teachers/curriculum-builder",
    },
    {
      title: "Assessment Tools",
      description: "Access comprehensive assessment tools that provide meaningful insights into student progress.",
      icon: <BarChart />,
      href: "/learn-more/teachers/assessment-tools",
    },
    {
      title: "Professional Development",
      description: "Enhance your teaching skills with our professional development resources and courses.",
      icon: <GraduationCap />,
      href: "/learn-more/teachers/professional-development",
    },
    {
      title: "Teacher Community",
      description: "Connect with other educators to share resources, strategies, and support.",
      icon: <Users />,
      href: "/learn-more/teachers/community",
    },
  ];

  const testimonials = [
    {
      quote: "BIPOCA AI has transformed my classroom. The culturally responsive curriculum engages my students in ways I've never seen before, and the assessment tools give me insights that help me tailor my teaching to each student's needs.",
      author: "Dr. Maya Johnson",
      role: "High School History Teacher, Atlanta",
    },
    {
      quote: "As a new teacher, the curriculum builder has been invaluable. It helps me create lessons that are both rigorous and culturally relevant, saving me hours of planning time while improving student outcomes.",
      author: "James Wilson",
      role: "Middle School Science Teacher, Chicago",
    },
    {
      quote: "The professional development resources have helped me grow as an educator. I've learned new strategies for creating an inclusive classroom where all my students feel represented and valued.",
      author: "Sophia Rodriguez",
      role: "Elementary School Teacher, Los Angeles",
    },
  ];

  return (
    <PageTemplate
      title="For Teachers"
      description="Empower your teaching with culturally responsive tools, curriculum, and resources designed to engage all students and enhance learning outcomes."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
            Transform Your Teaching
          </h2>
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            BIPOCA AI provides educators with powerful tools and resources to create engaging, culturally responsive learning experiences that meet the diverse needs of all students.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>AI-powered lesson planning and curriculum development</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Real-time assessment and personalized feedback tools</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Culturally responsive content that represents all students</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Professional development and community support</span>
            </li>
          </ul>
          <div className="mt-2">
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
              Schedule a Demo
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
            src="/images/teacher-classroom.jpg"
            alt="Teacher using BIPOCA AI in classroom"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            priority
          />
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Explore Our Teacher Resources</h2>
      
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
      
      <h2 className="text-2xl font-bold mb-6 text-center mt-16">What Teachers Are Saying</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
            role={testimonial.role}
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
        <h2 className="text-2xl font-bold mb-4">Ready to enhance your teaching?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of educators who are using BIPOCA AI to create engaging, culturally responsive learning experiences for their students.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Get Started Today
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
