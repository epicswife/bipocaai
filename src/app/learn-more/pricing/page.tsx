"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, School, Building2, Star, HelpCircle, Sparkles, GraduationCap, Globe, Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';


interface PricingFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

interface PricingTier {
  name: string;
  description: string;
  price: string;
  billingPeriod: string;
  features: PricingFeature[];
  popular?: boolean;
  icon: React.ReactNode;
  buttonText: string;
  buttonVariant: 'default' | 'outline';
  color?: string;
}

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  institution: string;
  imageSrc: string;
  index: number;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

interface ComparisonFeature {
  name: string;
  traditional: boolean;
  bipoca: boolean;
  highlight?: boolean;
}

// Enhanced pricing card with more visual appeal
const PricingCard: React.FC<{ tier: PricingTier; index: number }> = ({ tier, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
      className="h-full"
    >
      <Card className={`p-6 h-full border ${tier.popular 
        ? 'border-[var(--color-pan-amber)] shadow-xl' 
        : 'border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)]/60'} 
        relative overflow-hidden transition-all duration-300 hover:shadow-lg group`}
      >
        {tier.popular && (
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] text-white text-xs font-bold px-4 py-1.5 transform translate-x-2 -translate-y-0 rounded-bl-lg shadow-md">
              Recommended
            </div>
          </div>
        )}
        
        <div className="flex items-center mb-6">
          <div className={`w-12 h-12 rounded-full ${tier.popular 
            ? 'bg-gradient-to-br from-[var(--color-pan-green)]/20 to-[var(--color-pan-amber)]/30' 
            : 'bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 group-hover:bg-[var(--color-pan-green)]/20 dark:group-hover:bg-[var(--color-pan-amber)]/20'} 
            flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110`}
          >
            {React.cloneElement(tier.icon as React.ReactElement, { 
              className: `w-6 h-6 ${tier.popular 
                ? 'text-[var(--color-pan-amber)]' 
                : 'text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]'}` 
            } as React.HTMLAttributes<HTMLElement>)}
          </div>
          <div>
            <h3 className="text-xl font-bold group-hover:text-[var(--color-pan-green)] dark:group-hover:text-[var(--color-pan-amber)] transition-colors duration-300">{tier.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{tier.description}</p>
          </div>
        </div>
        
        <div className="mb-6 bg-gradient-to-r from-[var(--color-pan-green)]/5 to-[var(--color-pan-amber)]/5 p-4 rounded-lg border border-[var(--color-pan-amber)]/10">
          <span className="text-3xl font-bold">{tier.price}</span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">{tier.billingPeriod}</span>
          {tier.popular && (
            <div className="mt-2 text-sm text-[var(--color-pan-amber)]">
              Includes priority implementation support
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <div className="text-sm font-medium text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mb-3">Features included:</div>
          <ul className="space-y-3">
            {tier.features.map((feature, i) => (
              <li key={i} className={`flex items-start ${feature.highlight ? 'bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 p-2 rounded-md -mx-2' : ''}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 ${
                  feature.included 
                    ? feature.highlight
                      ? 'bg-[var(--color-pan-amber)] text-white'
                      : 'bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {feature.included ? (
                    <Check className="w-3 h-3 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500 text-xs">—</span>
                  )}
                </div>
                <span className={`${feature.highlight ? 'font-medium' : ''} ${feature.included ? '' : 'text-gray-400 dark:text-gray-500 line-through'}`}>
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <Button 
          className={`w-full ${tier.popular 
            ? 'bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] hover:opacity-90 text-white' 
            : tier.buttonVariant === 'default'
              ? 'bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white'
              : 'border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10'
          }`}
          variant={tier.buttonVariant}
        >
          {tier.buttonText}
        </Button>
      </Card>
    </motion.div>
  );
};

// Feature card component for the "Why It's Free" section
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
      className="h-full"
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)]/60 transition-all duration-300 hover:shadow-lg group">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-pan-green)]/20 to-[var(--color-pan-amber)]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {React.cloneElement(icon as React.ReactElement, { 
            className: "w-6 h-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" 
          } as React.HTMLAttributes<HTMLElement>)}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-pan-green)] dark:group-hover:text-[var(--color-pan-amber)] transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </Card>
    </motion.div>
  );
};

// Testimonial component
const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, institution, imageSrc, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
      className="h-full"
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[var(--color-pan-amber)]">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </div>
        <div className="mb-4">
          <p className="italic text-gray-600 dark:text-gray-300 relative z-10">&quot;{quote}&quot;</p>
        </div>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-[var(--color-pan-amber)]/20">
            <Image src={imageSrc} alt={author} width={48} height={48} className="object-cover" />
          </div>
          <div>
            <div className="font-bold">{author}</div>
            <div className="text-sm text-[var(--color-pan-amber)]">{role}</div>
            <div className="text-xs text-gray-500">{institution}</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Comparison table row
const ComparisonRow: React.FC<{ feature: ComparisonFeature; index: number }> = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      className={`grid grid-cols-3 py-3 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''} ${feature.highlight ? 'bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 font-medium' : ''}`}
    >
      <div className="px-4">{feature.name}</div>
      <div className="px-4 text-center">
        {feature.traditional ? (
          <Check className="w-5 h-5 mx-auto text-gray-400" />
        ) : (
          <span className="text-gray-400 text-xl">—</span>
        )}
      </div>
      <div className="px-4 text-center">
        {feature.bipoca ? (
          <Check className="w-5 h-5 mx-auto text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
        ) : (
          <span className="text-gray-400 text-xl">—</span>
        )}
      </div>
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
  const [isOpen, setIsOpen] = React.useState(index === 0); // First FAQ is open by default

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4 overflow-hidden border border-[var(--color-pan-amber)]/10 hover:border-[var(--color-pan-amber)]/30 transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-medium text-lg p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-pan-green)]/10 to-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
            <HelpCircle className="w-4 h-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
          </div>
          {question}
        </span>
        <div className={`w-6 h-6 flex items-center justify-center rounded-full border border-[var(--color-pan-amber)]/30 transform transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[var(--color-pan-amber)]/10' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-5 pt-0 border-t border-gray-100 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300">{answer}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function PricingPage() {
  // Features for individual users (all free)
  const individualFeatures = [
    { name: "Full access to Pan-African curriculum", included: true, highlight: true },
    { name: "AI-powered personalized tutoring", included: true, highlight: true },
    { name: "Real-time progress tracking", included: true },
    { name: "Interactive learning tools", included: true },
    { name: "Community forum access", included: true },
    { name: "Cultural resources library", included: true, highlight: true },
    { name: "Mobile app access", included: true },
    { name: "Parent/Guardian dashboard", included: true },
  ];

  // Why It's Free section features
  const whyFreeFeatures = [
    {
      icon: <GraduationCap />,
      title: "Education for All",
      description: "Our mission is to make culturally responsive education accessible to every student, regardless of financial circumstances."
    },
    {
      icon: <Globe />,
      title: "Global Impact",
      description: "By removing financial barriers, we can reach more students worldwide and create a more inclusive educational landscape."
    },
    {
      icon: <Shield />,
      title: "No Hidden Costs",
      description: "We promise that individual users will never be charged. No trials, no paywalls, no data selling - ever."
    },
    {
      icon: <Sparkles />,
      title: "Sustainable Model",
      description: "Our platform is funded by partnerships with schools and districts who share our vision for equitable education."
    }
  ];

  // Testimonials from users
  const testimonials = [
    {
      quote: "BIPOCA AI has transformed how our students engage with history and culture. The depth of the curriculum and AI tutoring support is incredible.",
      author: "Dr. Maya Johnson",
      role: "History Department Head",
      institution: "Washington High School",
      imageSrc: "/images/testimonials/teacher1.jpg"
    },
    {
      quote: "As a parent, I'm amazed by how my children connect with their heritage through BIPOCA AI. And it's completely free!",
      author: "James Wilson",
      role: "Parent of Three",
      institution: "Homeschool Family",
      imageSrc: "/images/testimonials/parent1.jpg"
    }
  ];

  // Institution pricing tiers
  const institutionTiers: PricingTier[] = [
    {
      name: "School",
      description: "Perfect for individual schools and classrooms",
      price: "Custom",
      billingPeriod: "per student/year",
      icon: <School />,
      buttonText: "Schedule Demo",
      buttonVariant: "outline",
      features: [
        { name: "All individual features included", included: true, highlight: true },
        { name: "Advanced teacher dashboard", included: true },
        { name: "Class progress analytics", included: true },
        { name: "Custom curriculum tools", included: true, highlight: true },
        { name: "Professional development", included: true },
        { name: "Priority support", included: true },
        { name: "Implementation training", included: true },
        { name: "API access", included: false },
      ],
    },
    {
      name: "District",
      description: "Ideal for school districts and networks",
      price: "Custom",
      billingPeriod: "per student/year",
      icon: <Building2 />,
      popular: true,
      buttonText: "Talk to Sales",
      buttonVariant: "default",
      features: [
        { name: "All school features included", included: true, highlight: true },
        { name: "District-wide analytics", included: true },
        { name: "Administrative controls", included: true },
        { name: "Custom integrations", included: true, highlight: true },
        { name: "Dedicated success manager", included: true },
        { name: "On-site training", included: true },
        { name: "API access", included: true },
        { name: "SIS integration", included: true },
      ],
    }
  ];

  // Platform comparison features
  const comparisonFeatures = [
    { name: "100% Free for individuals", traditional: false, bipoca: true, highlight: true },
    { name: "No credit card required", traditional: false, bipoca: true },
    { name: "AI-powered tutoring", traditional: false, bipoca: true },
    { name: "Cultural resources", traditional: false, bipoca: true, highlight: true },
    { name: "Progress tracking", traditional: true, bipoca: true },
    { name: "Mobile access", traditional: true, bipoca: true },
  ];

  // Enhanced FAQ section
  const faqs = [
    {
      question: "Is BIPOCA AI really free for individual users?",
      answer: "Yes! BIPOCA AI is completely free for individual students, families, and teachers. Our mission is to provide accessible, culturally responsive education to all learners. You get full access to all features with no trial periods or hidden costs."
    },
    {
      question: "How can you offer everything for free?",
      answer: "Our platform is funded through partnerships with schools and educational institutions who share our vision for equitable education. This sustainable model allows us to keep BIPOCA AI completely free for individual users while continuously improving our offerings."
    },
    {
      question: "What's included in the free individual plan?",
      answer: "Everything! You get full access to our Pan-African curriculum, AI tutoring, personalized learning paths, progress tracking, cultural resources, community forums, and mobile app access. There are no premium features or paywalls."
    },
    {
      question: "Do you sell user data to keep it free?",
      answer: "Absolutely not. We never sell user data or show advertisements. Our commitment to privacy and security is unwavering. The platform is funded entirely by our institutional partnerships."
    },
    {
      question: "How do I get started?",
      answer: "Simply click the 'Get Started Free' button and create your account. No credit card or payment information is required. You'll have immediate access to all features."
    },
    {
      question: "Can teachers use this in their classrooms?",
      answer: "Individual teachers can use their free accounts for personal use and planning. For classroom implementation with student management features, we recommend schools consider our institutional plans."
    }
  ];

  return (
    <PageTemplate
      title="Pricing & Plans"
      description="BIPOCA AI is 100% free for individual students, families, and teachers. Our mission is to make culturally responsive education accessible to all."
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-medium mb-4">
          <Star className="w-4 h-4 mr-2" />
          Free Forever for Individual Users
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple Pricing for Everyone</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Our mission is to make culturally responsive education accessible to all learners.
          That&apos;s why BIPOCA AI is completely free for individual users.
        </p>
      </motion.div>

      {/* Why It's Free Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-center mb-8">Why It&apos;s Free</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyFreeFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* Pricing Tabs */}
      <Tabs defaultValue="individual" className="mb-16">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="individual" className="text-lg">Individual</TabsTrigger>
          <TabsTrigger value="institution" className="text-lg">Institution</TabsTrigger>
        </TabsList>
        
        <TabsContent value="individual">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-[var(--color-pan-green)]/5 via-transparent to-[var(--color-pan-amber)]/5 rounded-2xl p-8 border border-[var(--color-pan-amber)]/20 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-sm font-medium mb-4">
                  Most Popular
                </div>
                <h3 className="text-3xl font-bold mb-2">Free Individual Plan</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Perfect for students, families, and teachers</p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-medium">Forever Free</span>
                </div>
              </div>
              <Button
                size="lg"
                variant="default"
                className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white px-8"
              >
                Get Started Now
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {individualFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex items-start p-4 rounded-lg ${feature.highlight ? 'bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5' : ''}`}
                >
                  <div className="w-5 h-5 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  </div>
                  <span className={`${feature.highlight ? 'font-medium' : ''}`}>{feature.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="institution">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {institutionTiers.map((tier, index) => (
              <PricingCard key={tier.name} tier={tier} index={index} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Platform Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose BIPOCA AI?</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 dark:bg-gray-700 p-4">
            <div className="px-4 font-medium">Feature</div>
            <div className="px-4 text-center font-medium">Traditional Platforms</div>
            <div className="px-4 text-center font-medium">BIPOCA AI</div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {comparisonFeatures.map((feature, index) => (
              <ComparisonRow key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              institution={testimonial.institution}
              imageSrc={testimonial.imageSrc}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-16"
      >
        <div className="flex items-center justify-center mb-8">
          <HelpCircle className="w-6 h-6 text-[var(--color-pan-amber)] mr-2" />
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
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

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="rounded-2xl bg-gradient-to-br from-[var(--color-pan-green)]/10 via-transparent to-[var(--color-pan-amber)]/10 p-8 border border-[var(--color-pan-amber)]/20"
      >
        <div className="md:flex items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform education at your institution?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join the growing number of schools and districts using BIPOCA AI to provide culturally responsive education.
              Schedule a demo to learn more.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex-shrink-0">
            <Button
              size="lg"
              variant="default"
              className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white px-8"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </motion.div>
    </PageTemplate>
  );
}
