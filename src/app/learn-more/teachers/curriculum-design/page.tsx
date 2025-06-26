"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BookOpen, Layers, PenTool, Globe, Users, Lightbulb, Shuffle, FileText } from 'lucide-react';

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

export default function CurriculumDesignPage() {
  const designFeatures = [
    {
      icon: <BookOpen />,
      title: "Standards-Aligned Content",
      description: "Access thousands of lessons and resources aligned with national and state educational standards across all subject areas."
    },
    {
      icon: <Layers />,
      title: "Customizable Templates",
      description: "Start with professionally designed curriculum templates that you can modify and adapt to meet your classroom's unique needs."
    },
    {
      icon: <PenTool />,
      title: "Content Creation Tools",
      description: "Create your own lessons, activities, and assessments with our intuitive authoring tools that support multimedia integration."
    },
    {
      icon: <Globe />,
      title: "Culturally Responsive Materials",
      description: "Access diverse content that represents multiple perspectives and celebrates contributions from various cultures and backgrounds."
    },
    {
      icon: <Users />,
      title: "Collaborative Planning",
      description: "Work with colleagues to develop and share curriculum materials, fostering collaboration and consistency across classrooms."
    },
    {
      icon: <Lightbulb />,
      title: "AI-Powered Suggestions",
      description: "Receive intelligent recommendations for resources, activities, and differentiation strategies based on your curriculum goals."
    },
    {
      icon: <Shuffle />,
      title: "Differentiation Options",
      description: "Easily modify content for different learning levels, styles, and needs to ensure all students can access the curriculum."
    },
    {
      icon: <FileText />,
      title: "Curriculum Mapping",
      description: "Plan your entire year with our curriculum mapping tools that help you organize units, lessons, and assessments across terms."
    }
  ];

  const curriculumAreas = [
    {
      title: "Language Arts",
      description: "Comprehensive reading, writing, speaking, and listening curriculum with diverse literature and culturally responsive texts.",
      features: [
        "Diverse literary selections from global authors",
        "Writing instruction across multiple genres",
        "Grammar and vocabulary development",
        "Media literacy and digital communication"
      ]
    },
    {
      title: "Mathematics",
      description: "Engaging math curriculum that builds conceptual understanding, procedural fluency, and real-world problem-solving skills.",
      features: [
        "Visual models and manipulatives",
        "Real-world applications and problem solving",
        "Cultural mathematics connections",
        "Differentiated instruction pathways"
      ]
    },
    {
      title: "Science",
      description: "Inquiry-based science curriculum that integrates hands-on experiments, scientific practices, and diverse scientific contributions.",
      features: [
        "Virtual and hands-on lab experiences",
        "Connections to scientists from diverse backgrounds",
        "Environmental and sustainability focus",
        "Cross-disciplinary STEM projects"
      ]
    },
    {
      title: "Social Studies",
      description: "Culturally responsive social studies curriculum that presents multiple perspectives and promotes critical thinking about history and society.",
      features: [
        "Multiple historical perspectives and voices",
        "Primary source analysis from diverse origins",
        "Contemporary issues and civic engagement",
        "Global cultural studies and geography"
      ]
    }
  ];

  return (
    <PageTemplate
      title="Curriculum Design"
      description="Create, customize, and deliver engaging, standards-aligned, and culturally responsive curriculum that meets the diverse needs of your students."
    >
      <div className="mb-12">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">Design Features</TabsTrigger>
            <TabsTrigger value="subjects">Curriculum Areas</TabsTrigger>
            <TabsTrigger value="process">Design Process</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designFeatures.map((feature, index) => (
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
          
          <TabsContent value="subjects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {curriculumAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                >
                  <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
                        <BookOpen className="w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                      </div>
                      <h3 className="text-xl font-bold">{area.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{area.description}</p>
                    <ul className="space-y-2">
                      {area.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">✓</span>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="process">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 p-6 rounded-lg border border-[var(--color-pan-amber)]/20 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Curriculum Design Process</h2>
                
                <div className="space-y-12">
                  <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-1 bg-[var(--color-pan-green)]/20 dark:bg-[var(--color-pan-amber)]/20"></div>
                    
                    <div className="relative flex items-start">
                      <div className="absolute left-8 w-1 h-full bg-[var(--color-pan-green)]/20 dark:bg-[var(--color-pan-amber)]/20"></div>
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center z-10">
                        <span className="text-xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">1</span>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-xl font-bold mb-2">Assessment & Planning</h3>
                        <p className="mb-4">Begin by assessing your students' needs, reviewing standards, and setting clear learning objectives for your curriculum.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                            <p className="font-medium">Standards Review</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Align with educational requirements</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                            <p className="font-medium">Needs Assessment</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Identify student learning needs</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                            <p className="font-medium">Goal Setting</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Define clear learning objectives</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start mt-12">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center z-10">
                        <span className="text-xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">2</span>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-xl font-bold mb-2">Content Selection & Creation</h3>
                        <p className="mb-4">Choose from our library of resources or create your own content, ensuring materials are culturally responsive and engaging.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                            <p className="font-medium">Resource Selection</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Choose from diverse materials</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                            <p className="font-medium">Content Creation</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Develop custom materials</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                            <p className="font-medium">Cultural Integration</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Ensure diverse representation</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start mt-12">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center z-10">
                        <span className="text-xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">3</span>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-xl font-bold mb-2">Differentiation & Adaptation</h3>
                        <p className="mb-4">Modify and adapt your curriculum to meet diverse learning needs, ensuring all students can access and engage with the content.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                            <p className="font-medium">Learning Levels</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Adjust for different abilities</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                            <p className="font-medium">Learning Styles</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Accommodate diverse approaches</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                            <p className="font-medium">Accessibility</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Ensure content is accessible to all</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start mt-12">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center z-10">
                        <span className="text-xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">4</span>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-xl font-bold mb-2">Implementation & Assessment</h3>
                        <p className="mb-4">Deliver your curriculum through our platform and use our assessment tools to monitor student progress and make adjustments.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                            <p className="font-medium">Content Delivery</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Present curriculum effectively</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                            <p className="font-medium">Progress Monitoring</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Track student achievement</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-[var(--color-pan-amber)]/10">
                            <p className="font-medium">Iterative Improvement</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Refine based on outcomes</p>
                          </div>
                        </div>
                      </div>
                    </div>
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
        <h2 className="text-2xl font-bold mb-4">Ready to transform your curriculum design process?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of educators who are creating engaging, culturally responsive curriculum with our powerful design tools.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Start Free Trial
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
