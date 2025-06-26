"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, School, GraduationCap, FileText, ArrowRight } from 'lucide-react';
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

// Case Study Component
interface CaseStudyProps {
  institution: string;
  title: string;
  description: string;
  results: string[];
  imageSrc: string;
  index: number;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ institution, title, description, results, imageSrc, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + (index * 0.2) }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-[var(--color-pan-amber)]/20"
    >
      <div className="relative h-48">
        <Image
          src={imageSrc}
          alt={institution}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-6">
        <div className="text-sm text-[var(--color-pan-amber)] font-medium mb-2">{institution}</div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <h4 className="font-semibold mb-2">Key Results:</h4>
        <ul className="space-y-1">
          {results.map((result, i) => (
            <li key={i} className="flex items-start">
              <span className="text-[var(--color-pan-amber)] mr-2">•</span>
              <span className="text-sm">{result}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Link href="/learn-more/institutions/case-studies" className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-medium hover:underline inline-flex items-center">
            Read full case study
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function InstitutionsPage() {
  const features = [
    {
      title: "School Integration",
      description: "Seamlessly integrate BIPOCA AI into your school's existing educational infrastructure.",
      icon: <School />,
      href: "/learn-more/institutions/school-integration",
    },
    {
      title: "District Solutions",
      description: "Comprehensive solutions designed to meet the needs of entire school districts.",
      icon: <Building2 />,
      href: "/learn-more/institutions/district-solutions",
    },
    {
      title: "Higher Education",
      description: "Advanced tools and resources for colleges, universities, and other higher education institutions.",
      icon: <GraduationCap />,
      href: "/learn-more/institutions/higher-education",
    },
    {
      title: "Enterprise Solutions",
      description: "Customized educational solutions for businesses and organizations of all sizes.",
      icon: <Building2 />,
      href: "/learn-more/institutions/enterprise",
    },
    {
      title: "Case Studies",
      description: "Explore how other institutions have successfully implemented BIPOCA AI.",
      icon: <FileText />,
      href: "/learn-more/institutions/case-studies",
    },
  ];

  const caseStudies = [
    {
      institution: "Oakwood School District",
      title: "Transforming District-Wide Learning with Culturally Responsive Education",
      description: "Oakwood School District implemented BIPOCA AI across all K-12 schools to address achievement gaps and enhance cultural responsiveness in their curriculum.",
      results: [
        "28% increase in student engagement metrics",
        "22% improvement in standardized test scores",
        "91% of teachers reported more inclusive classroom environments",
        "Reduced achievement gap by 18% in first year"
      ],
      imageSrc: "/images/case-study-district.jpg",
    },
    {
      institution: "Westfield University",
      title: "Enhancing Higher Education with AI-Powered Learning",
      description: "Westfield University integrated BIPOCA AI into their education department to prepare future teachers with culturally responsive teaching methods.",
      results: [
        "35% increase in student teacher confidence in multicultural settings",
        "Developed 12 new courses on culturally responsive teaching",
        "Published research on effectiveness of AI in teacher preparation",
        "Secured additional $1.2M in research grants"
      ],
      imageSrc: "/images/case-study-university.jpg",
    },
    {
      institution: "Global Learning Corporation",
      title: "Enterprise-Wide Professional Development Solution",
      description: "Global Learning Corporation implemented BIPOCA AI to provide culturally responsive professional development for their 5,000+ employees across 12 countries.",
      results: [
        "42% increase in cross-cultural communication effectiveness",
        "Reduced onboarding time for international assignments by 30%",
        "89% employee satisfaction with training programs",
        "Estimated $3.2M annual savings in training costs"
      ],
      imageSrc: "/images/case-study-enterprise.jpg",
    },
  ];

  const stats = [
    { value: "94%", label: "of institutions report improved student engagement" },
    { value: "87%", label: "of schools see improved academic outcomes" },
    { value: "3.2x", label: "return on investment for educational institutions" },
    { value: "76%", label: "reduction in achievement gaps between student groups" },
  ];

  return (
    <PageTemplate
      title="For Institutions"
      description="Transform your educational institution with our comprehensive, culturally responsive AI-powered learning solutions."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
            Institutional Excellence Through Innovation
          </h2>
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            BIPOCA AI provides educational institutions with powerful tools and resources to enhance learning outcomes, promote equity, and prepare students for future success.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Comprehensive, culturally responsive curriculum aligned with standards</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Advanced analytics and reporting for data-driven decision making</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Scalable solutions for schools, districts, and higher education</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Professional development and implementation support</span>
            </li>
          </ul>
          <div className="mt-2">
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
              Request Institutional Demo
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
            src="/images/institution-classroom.jpg"
            alt="Modern classroom with BIPOCA AI technology"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            priority
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 text-center border border-[var(--color-pan-amber)]/20">
            <div className="text-3xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mb-2">
              {stat.value}
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</p>
          </Card>
        ))}
      </motion.div>

      <h2 className="text-2xl font-bold mb-6 text-center">Institutional Solutions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
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
      
      <h2 className="text-2xl font-bold mb-6 text-center">Success Stories</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {caseStudies.map((study, index) => (
          <CaseStudy
            key={index}
            institution={study.institution}
            title={study.title}
            description={study.description}
            results={study.results}
            imageSrc={study.imageSrc}
            index={index}
          />
        ))}
      </div>
      
      <motion.div 
        className="p-8 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="md:flex items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h2 className="text-2xl font-bold mb-2">Ready to transform your institution?</h2>
            <p className="max-w-2xl">Schedule a consultation with our education specialists to discover how BIPOCA AI can meet your institution&apos;s unique needs.</p>
          </div>
          <div className="flex-shrink-0">
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white w-full md:w-auto">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </motion.div>
    </PageTemplate>
  );
}
