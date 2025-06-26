"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Layers, 
  FileText, 
  Users, 
  Sparkles, 
  PenTool, 
  Globe,
  Clock,
  BarChart3,
  Shuffle
} from 'lucide-react';

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

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  index: number;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
            <span className="text-xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">{number}</span>
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </Card>
    </motion.div>
  );
};

export default function CurriculumBuilderPage() {
  const builderFeatures = [
    {
      icon: <BookOpen />,
      title: "Standards Alignment",
      description: "Automatically align your curriculum with state, national, or international educational standards with our comprehensive standards database."
    },
    {
      icon: <Layers />,
      title: "Modular Design",
      description: "Create flexible, modular curriculum units that can be easily rearranged, adapted, and shared across different courses and grade levels."
    },
    {
      icon: <FileText />,
      title: "Resource Integration",
      description: "Seamlessly incorporate diverse learning resources including videos, interactive activities, readings, and assessments into your curriculum."
    },
    {
      icon: <Users />,
      title: "Collaborative Editing",
      description: "Work together with colleagues in real-time to develop, review, and refine curriculum materials for consistent quality across your school or district."
    },
    {
      icon: <Sparkles />,
      title: "AI-Powered Suggestions",
      description: "Receive intelligent recommendations for resources, activities, and assessments based on your curriculum objectives and student needs."
    },
    {
      icon: <PenTool />,
      title: "Customization Tools",
      description: "Tailor curriculum materials to meet the diverse needs of your students with easy-to-use customization and differentiation tools."
    }
  ];

  const diversityFeatures = [
    {
      icon: <Globe />,
      title: "Cultural Perspectives",
      description: "Access a diverse library of materials representing multiple cultural perspectives and traditions to create an inclusive curriculum."
    },
    {
      icon: <Users />,
      title: "Representation",
      description: "Ensure your curriculum includes diverse voices, experiences, and role models across all subject areas and grade levels."
    },
    {
      icon: <Layers />,
      title: "Differentiated Learning",
      description: "Design curriculum pathways that accommodate different learning styles, abilities, and language proficiency levels."
    },
    {
      icon: <Sparkles />,
      title: "Bias Detection",
      description: "Our AI-powered tools help identify and address potential bias in curriculum materials to ensure equitable learning experiences."
    },
    {
      icon: <BookOpen />,
      title: "Inclusive Content",
      description: "Access resources that authentically represent diverse communities and promote understanding across differences."
    },
    {
      icon: <PenTool />,
      title: "Customizable Elements",
      description: "Easily adapt materials to reflect the specific cultural contexts and backgrounds of your student population."
    }
  ];

  const buildSteps = [
    {
      number: 1,
      title: "Define Learning Objectives",
      description: "Clearly articulate what students should know and be able to do by the end of your curriculum unit, aligned with relevant standards."
    },
    {
      number: 2,
      title: "Select Content Framework",
      description: "Choose from our library of curriculum frameworks or create your own structure to organize your content in a coherent sequence."
    },
    {
      number: 3,
      title: "Add Learning Resources",
      description: "Incorporate diverse instructional materials including readings, videos, interactive activities, and assessments from our library or your own collection."
    },
    {
      number: 4,
      title: "Differentiate Instruction",
      description: "Create variations of activities and assessments to accommodate different learning needs, styles, and levels of readiness."
    },
    {
      number: 5,
      title: "Review and Refine",
      description: "Use our collaborative tools to gather feedback from colleagues and make revisions to strengthen your curriculum."
    },
    {
      number: 6,
      title: "Implement and Reflect",
      description: "Deploy your curriculum in the classroom, collect data on student learning, and use insights to make continuous improvements."
    }
  ];

  return (
    <PageTemplate
      title="Curriculum Builder"
      description="Design engaging, standards-aligned curriculum with our powerful and flexible curriculum builder. Create, customize, and collaborate on curriculum materials that meet the diverse needs of your students."
    >
      <div className="mb-12">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">Builder Features</TabsTrigger>
            <TabsTrigger value="diversity">Diversity & Inclusion</TabsTrigger>
            <TabsTrigger value="process">Build Process</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {builderFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
            
            <motion.div
              className="mt-8 p-6 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4 text-center">Advanced Curriculum Features</h3>
              <p className="mb-6 text-center">Our curriculum builder includes powerful tools to help you create more effective and engaging learning experiences.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Pacing Guides
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Create flexible pacing guides that help you maintain curriculum momentum while allowing for adjustments based on student needs.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Learning Analytics
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Track student progress through your curriculum with integrated analytics that help you identify areas for improvement.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Shuffle className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Adaptive Pathways
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Design curriculum with adaptive learning paths that adjust based on student performance and engagement.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="diversity">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diversityFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
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
              <h3 className="text-xl font-bold mb-4">Our Commitment to Inclusive Education</h3>
              <p className="mb-6 max-w-2xl mx-auto">We believe that all students deserve to see themselves represented in their learning materials and to gain exposure to diverse perspectives and experiences.</p>
              <div className="aspect-video max-w-3xl mx-auto bg-black/5 dark:bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-12 h-12 mx-auto mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  <p className="font-medium">Video: Creating Inclusive Curriculum</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="process">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {buildSteps.map((step, index) => (
                <StepCard
                  key={index}
                  number={step.number}
                  title={step.title}
                  description={step.description}
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
              <h3 className="text-xl font-bold mb-4">See the Curriculum Builder in Action</h3>
              <p className="mb-6 max-w-2xl mx-auto">Watch how educators use our curriculum builder to create engaging, standards-aligned learning experiences for their students.</p>
              <div className="aspect-video max-w-3xl mx-auto bg-black/5 dark:bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  <p className="font-medium">Video Demo Placeholder</p>
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
        <h2 className="text-2xl font-bold mb-4">Ready to build your ideal curriculum?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of educators who are using our curriculum builder to create engaging, effective, and inclusive learning experiences.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Start Building Your Curriculum
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
