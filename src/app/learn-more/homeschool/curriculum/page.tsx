"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BookOpen, Check, Star } from 'lucide-react';

interface SubjectCardProps {
  title: string;
  description: string;
  features: string[];
  index: number;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ title, description, features, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
            <BookOpen className="w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mr-2 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
};

export default function HomeschoolCurriculumPage() {
  // Define curriculum subjects by grade level
  const elementarySubjects = [
    {
      title: "Language Arts",
      description: "Develop strong reading, writing, and communication skills with our culturally responsive language arts curriculum.",
      features: [
        "Phonics and early reading skills",
        "Diverse literature from global authors",
        "Creative writing and storytelling",
        "Grammar and vocabulary development",
      ]
    },
    {
      title: "Mathematics",
      description: "Build a solid mathematical foundation with our engaging, real-world approach to numbers and problem-solving.",
      features: [
        "Number sense and operations",
        "Geometry and spatial reasoning",
        "Measurement and data analysis",
        "Mathematical reasoning and problem-solving",
      ]
    },
    {
      title: "Science",
      description: "Explore the natural world through hands-on experiments and investigations that celebrate scientific contributions from diverse cultures.",
      features: [
        "Life sciences and biology",
        "Earth and environmental sciences",
        "Physical sciences",
        "Scientific method and inquiry",
      ]
    },
    {
      title: "Social Studies",
      description: "Discover history, geography, and civics through an inclusive lens that honors diverse perspectives and experiences.",
      features: [
        "World cultures and traditions",
        "Geography and map skills",
        "Historical figures from diverse backgrounds",
        "Community and civic engagement",
      ]
    },
  ];

  const middleSchoolSubjects = [
    {
      title: "Language Arts",
      description: "Deepen reading comprehension and writing skills with literature that represents diverse voices and perspectives.",
      features: [
        "Critical reading and analysis",
        "Essay writing and research skills",
        "Public speaking and debate",
        "Media literacy and digital communication",
      ]
    },
    {
      title: "Mathematics",
      description: "Advance mathematical understanding with pre-algebra, geometry, and real-world applications of mathematical concepts.",
      features: [
        "Pre-algebra and algebraic thinking",
        "Proportional reasoning",
        "Statistical analysis and probability",
        "Mathematical modeling",
      ]
    },
    {
      title: "Science",
      description: "Engage in deeper scientific inquiry with labs and projects that connect to real-world challenges and innovations.",
      features: [
        "Life science and human biology",
        "Earth systems and climate science",
        "Chemistry fundamentals",
        "Physics and engineering principles",
      ]
    },
    {
      title: "Social Studies",
      description: "Examine history, geography, and civics through multiple perspectives with an emphasis on critical thinking.",
      features: [
        "World history and cultural studies",
        "Geography and global connections",
        "Civics and government systems",
        "Economic principles and financial literacy",
      ]
    },
  ];

  const highSchoolSubjects = [
    {
      title: "Language Arts",
      description: "Prepare for college and career with advanced reading, writing, and analytical skills through diverse literary traditions.",
      features: [
        "World literature and comparative analysis",
        "Research writing and citation methods",
        "Rhetorical analysis and persuasive writing",
        "Creative writing and digital storytelling",
      ]
    },
    {
      title: "Mathematics",
      description: "Master advanced mathematical concepts with courses from Algebra to Calculus, emphasizing both theory and application.",
      features: [
        "Algebra I and II",
        "Geometry and Trigonometry",
        "Pre-Calculus and Calculus",
        "Statistics and Data Analysis",
      ]
    },
    {
      title: "Science",
      description: "Explore specialized scientific disciplines with lab work and research projects that connect to contemporary issues.",
      features: [
        "Biology and Environmental Science",
        "Chemistry and Biochemistry",
        "Physics and Engineering",
        "Computer Science and Technology",
      ]
    },
    {
      title: "Social Studies",
      description: "Develop critical perspectives on history, government, and economics with courses that emphasize diverse viewpoints.",
      features: [
        "U.S. and World History",
        "Government and Political Science",
        "Economics and Financial Literacy",
        "Psychology and Sociology",
      ]
    },
  ];

  return (
    <PageTemplate
      title="Homeschool Curriculum"
      description="Our comprehensive, culturally responsive curriculum is designed to engage, challenge, and inspire homeschool students at every grade level."
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 p-6 rounded-lg border border-[var(--color-pan-amber)]/20 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] flex items-center">
            <Star className="w-6 h-6 mr-2" /> Curriculum Highlights
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start">
              <Check className="w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mr-2 mt-0.5" />
              <span>Culturally responsive content that celebrates diversity</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mr-2 mt-0.5" />
              <span>Aligned with national and state educational standards</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mr-2 mt-0.5" />
              <span>Personalized learning paths adapted to each student</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mr-2 mt-0.5" />
              <span>Interactive lessons with multimedia content</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mr-2 mt-0.5" />
              <span>Regular assessments and detailed progress reports</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mr-2 mt-0.5" />
              <span>Flexible scheduling to fit your family&apos;s needs</span>
            </li>
          </ul>
        </div>
      </motion.div>

      <Tabs defaultValue="elementary" className="mb-12">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="elementary">Elementary (K-5)</TabsTrigger>
          <TabsTrigger value="middle">Middle School (6-8)</TabsTrigger>
          <TabsTrigger value="high">High School (9-12)</TabsTrigger>
        </TabsList>
        <TabsContent value="elementary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {elementarySubjects.map((subject, index) => (
              <SubjectCard
                key={subject.title}
                title={subject.title}
                description={subject.description}
                features={subject.features}
                index={index}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="middle">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {middleSchoolSubjects.map((subject, index) => (
              <SubjectCard
                key={subject.title}
                title={subject.title}
                description={subject.description}
                features={subject.features}
                index={index}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="high">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highSchoolSubjects.map((subject, index) => (
              <SubjectCard
                key={subject.title}
                title={subject.title}
                description={subject.description}
                features={subject.features}
                index={index}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <motion.div 
        className="p-8 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Ready to explore our curriculum?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Get a personalized curriculum plan tailored to your child&apos;s grade level, interests, and learning style.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Request Sample Curriculum
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
