"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, BarChart, BookOpen, LifeBuoy, Users, ArrowRight } from 'lucide-react';
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

// FAQ Component
interface FAQProps {
  question: string;
  answer: string;
  index: number;
}

const FAQ: React.FC<FAQProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      className="border-b border-[var(--color-pan-amber)]/20 last:border-b-0 py-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-medium text-lg"
      >
        <span>{question}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      <div
        className={`mt-2 text-gray-600 dark:text-gray-300 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="pb-2">{answer}</p>
      </div>
    </motion.div>
  );
};

export default function ParentsPage() {
  const features = [
    {
      title: "Progress Tracking",
      description: "Monitor your child's academic progress and achievements in real-time.",
      icon: <BarChart />,
      href: "/learn-more/parents/progress-tracking",
    },
    {
      title: "Curriculum Overview",
      description: "Explore the comprehensive, culturally responsive curriculum your child will engage with.",
      icon: <BookOpen />,
      href: "/learn-more/parents/curriculum-overview",
    },
    {
      title: "Support Resources",
      description: "Access guides, tutorials, and resources to help you support your child's learning journey.",
      icon: <LifeBuoy />,
      href: "/learn-more/parents/support-resources",
    },
    {
      title: "Family Plans",
      description: "Discover flexible subscription options designed to meet your family's unique needs.",
      icon: <Users />,
      href: "/learn-more/parents/family-plans",
    },
  ];

  const faqs = [
    {
      question: "How does BIPOCA AI personalize learning for my child?",
      answer: "BIPOCA AI uses advanced artificial intelligence to adapt to your child's learning style, pace, and interests. The platform analyzes their interactions, performance, and preferences to create a personalized learning path that challenges them appropriately while building on their strengths and addressing areas for growth."
    },
    {
      question: "What makes the curriculum culturally responsive?",
      answer: "Our curriculum is designed to represent and celebrate diverse cultures, histories, and perspectives. Content features contributions from people of various backgrounds, incorporates cultural knowledge and experiences, and encourages critical thinking about social issues. This approach helps students see themselves reflected in their learning materials while developing appreciation for different cultures."
    },
    {
      question: "How can I track my child's progress?",
      answer: "The Parent Dashboard provides comprehensive insights into your child's learning journey. You can view detailed reports on completed assignments, mastery of concepts, time spent learning, and areas where they excel or need additional support. The dashboard also highlights achievements and suggests ways you can support their learning at home."
    },
    {
      question: "What support is available if my child struggles with a concept?",
      answer: "BIPOCA AI offers multiple layers of support. The platform automatically adapts to provide additional practice and alternative explanations when it detects a student is struggling. Students can access virtual tutors for real-time help, and parents receive notifications with specific suggestions for how to support learning at home. Our support team is also available to provide personalized assistance."
    },
    {
      question: "Can BIPOCA AI be used alongside traditional schooling?",
      answer: "Absolutely! Many families use BIPOCA AI as a supplement to traditional education. The platform can reinforce concepts learned in school, provide enrichment in areas of interest, or offer additional support in challenging subjects. The flexible nature of our platform allows it to complement any educational approach."
    },
  ];

  return (
    <PageTemplate
      title="For Parents"
      description="Partner with us to support your child's educational journey with tools and resources designed to keep you informed and engaged."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
            Empower Your Child&apos;s Education
          </h2>
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            BIPOCA AI provides parents with the tools, insights, and resources needed to actively participate in and support their child&apos;s educational journey.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Real-time insights into your child&apos;s progress and achievements</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Culturally responsive curriculum that celebrates diversity</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Resources to help you support learning at home</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Flexible plans that adapt to your family&apos;s needs</span>
            </li>
          </ul>
          <div className="mt-2">
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
              Learn More About Family Plans
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
            src="/images/parent-child-learning.jpg"
            alt="Parent supporting child's learning with BIPOCA AI"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            priority
          />
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Parent Resources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center mb-6">
          <Heart className="w-6 h-6 text-[var(--color-pan-amber)] mr-2" />
          <h2 className="text-2xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-[var(--color-pan-amber)]/20">
          {faqs.map((faq, index) => (
            <FAQ 
              key={index} 
              question={faq.question} 
              answer={faq.answer} 
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
        <h2 className="text-2xl font-bold mb-4">Ready to transform your child&apos;s learning experience?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of parents who are using BIPOCA AI to provide their children with a culturally responsive, personalized education.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Start Your Free Trial
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
