"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  CheckSquare, 
  BarChart3, 
  FileText, 
  Brain, 
  Sparkles, 
  Clock, 
  Users,
  PenTool,
  BookOpen,
  Shuffle
} from 'lucide-react';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, index }) => {
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

interface AssessmentTypeCardProps {
  title: string;
  description: string;
  features: string[];
  index: number;
}

const AssessmentTypeCard: React.FC<AssessmentTypeCardProps> = ({ title, description, features, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <h4 className="font-semibold mb-2">Key Features:</h4>
        <ul className="space-y-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start text-sm">
              <div className="w-4 h-4 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">✓</span>
              </div>
              <span className="text-gray-600 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
};

export default function AssessmentToolsPage() {
  const formativeTools = [
    {
      icon: <CheckSquare />,
      title: "Quick Checks",
      description: "Create and deploy quick formative assessments to gauge student understanding in real-time during lessons."
    },
    {
      icon: <BarChart3 />,
      title: "Progress Monitoring",
      description: "Track student progress toward learning objectives with ongoing formative assessments that identify knowledge gaps."
    },
    {
      icon: <FileText />,
      title: "Feedback Tools",
      description: "Provide timely, specific feedback to students through text, audio, or video comments linked directly to their work."
    },
    {
      icon: <Brain />,
      title: "Metacognitive Prompts",
      description: "Encourage student reflection with built-in prompts that help learners assess their own understanding and learning strategies."
    },
    {
      icon: <Sparkles />,
      title: "AI-Assisted Grading",
      description: "Save time with AI tools that help evaluate open-ended responses while maintaining teacher oversight of the assessment process."
    },
    {
      icon: <Clock />,
      title: "Real-Time Insights",
      description: "Receive immediate data on student performance to make instructional decisions on the fly and address misconceptions promptly."
    }
  ];

  const summativeTools = [
    {
      icon: <PenTool />,
      title: "Comprehensive Test Builder",
      description: "Design rigorous summative assessments with diverse question types, customizable scoring, and standards alignment."
    },
    {
      icon: <Shuffle />,
      title: "Question Randomization",
      description: "Create unique test versions with randomized question order and answer choices to maintain academic integrity."
    },
    {
      icon: <BookOpen />,
      title: "Question Bank",
      description: "Access thousands of pre-made questions aligned with educational standards, or create and save your own for future use."
    },
    {
      icon: <Users />,
      title: "Group Projects",
      description: "Facilitate and assess collaborative projects with tools for peer evaluation, group contribution tracking, and milestone management."
    },
    {
      icon: <FileText />,
      title: "Portfolio Assessment",
      description: "Enable students to showcase their learning through digital portfolios with reflection components and teacher evaluation tools."
    },
    {
      icon: <BarChart3 />,
      title: "Performance Analytics",
      description: "Generate detailed reports on student achievement, standards mastery, and growth over time to inform instruction and reporting."
    }
  ];

  const assessmentTypes = [
    {
      title: "Multiple Choice & Selected Response",
      description: "Create traditional selected-response assessments with enhanced features for deeper learning assessment.",
      features: [
        "Automated grading with detailed item analysis",
        "Option for multiple correct answers",
        "Ability to require justification for answers",
        "Randomized question and answer order",
        "Tiered difficulty levels for differentiation"
      ]
    },
    {
      title: "Constructed Response",
      description: "Design assessments that require students to produce original answers, from short responses to extended essays.",
      features: [
        "AI-assisted scoring with teacher review",
        "Built-in rubrics with customizable criteria",
        "Voice recording option for oral responses",
        "Plagiarism detection and source verification",
        "Annotation tools for detailed feedback"
      ]
    },
    {
      title: "Performance Assessment",
      description: "Evaluate student skills and knowledge through authentic tasks and demonstrations of learning.",
      features: [
        "Project management tools with milestone tracking",
        "Digital portfolio integration",
        "Peer and self-assessment options",
        "Video submission and annotation capabilities",
        "Standards-aligned rubric builder"
      ]
    },
    {
      title: "Adaptive Assessment",
      description: "Implement assessments that adjust difficulty based on student responses for more precise measurement.",
      features: [
        "Dynamic question selection based on performance",
        "Personalized learning path recommendations",
        "Detailed diagnostic reports",
        "Efficient testing time with targeted questions",
        "Growth measurement across multiple dimensions"
      ]
    }
  ];

  return (
    <PageTemplate
      title="Assessment Tools"
      description="Discover powerful assessment tools designed to measure student learning, provide meaningful feedback, and inform instruction. Our comprehensive assessment suite helps you create, administer, and analyze both formative and summative assessments."
    >
      <div className="mb-12">
        <Tabs defaultValue="formative" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="formative">Formative Assessment</TabsTrigger>
            <TabsTrigger value="summative">Summative Assessment</TabsTrigger>
            <TabsTrigger value="types">Assessment Types</TabsTrigger>
          </TabsList>
          
          <TabsContent value="formative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formativeTools.map((tool, index) => (
                <ToolCard
                  key={index}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
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
              <h3 className="text-xl font-bold mb-4 text-center">The Power of Formative Assessment</h3>
              <p className="mb-6 text-center">Our formative assessment tools help you gather continuous feedback to adjust instruction and improve student learning in real-time.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Immediate Insights
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get real-time data on student understanding to make immediate instructional adjustments.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Student Engagement
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Increase participation with interactive assessment formats that make checking for understanding fun.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Personalized Learning
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Use assessment data to create targeted interventions and extensions for individual students.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="summative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {summativeTools.map((tool, index) => (
                <ToolCard
                  key={index}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
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
              <h3 className="text-xl font-bold mb-4">Reimagining Summative Assessment</h3>
              <p className="mb-6 max-w-2xl mx-auto">Our summative assessment tools help you move beyond traditional testing to create authentic, meaningful evaluations of student learning.</p>
              <div className="aspect-video max-w-3xl mx-auto bg-black/5 dark:bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <CheckSquare className="w-12 h-12 mx-auto mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  <p className="font-medium">Video Demo Placeholder</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="types">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assessmentTypes.map((type, index) => (
                <AssessmentTypeCard
                  key={index}
                  title={type.title}
                  description={type.description}
                  features={type.features}
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
              <h3 className="text-xl font-bold mb-4">Assessment Best Practices</h3>
              <p className="mb-6 max-w-2xl mx-auto">Explore our resources on assessment design, implementation, and analysis to maximize the impact of your assessment strategy.</p>
              <Button variant="outline" className="border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10">
                <BookOpen className="w-4 h-4 mr-2" />
                Access Assessment Resources
              </Button>
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
        <h2 className="text-2xl font-bold mb-4">Ready to transform your assessment practice?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of educators who are using our assessment tools to gather meaningful data, provide effective feedback, and improve student learning.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Get Started with Assessment Tools
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
