"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, Lightbulb, Puzzle, Calculator, Globe, Rocket } from 'lucide-react';

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  index: number;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ icon, title, description, tags, index }) => {
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
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default function StudentResourcesPage() {
  const studyResources = [
    {
      icon: <BookOpen />,
      title: "Interactive Study Guides",
      description: "Comprehensive study guides with interactive elements to help you master key concepts across all subjects.",
      tags: ["All Subjects", "Self-Paced", "Interactive"]
    },
    {
      icon: <Video />,
      title: "Video Tutorials",
      description: "Clear, concise video explanations of complex topics featuring diverse educators who break down difficult concepts.",
      tags: ["Visual Learning", "All Subjects", "On-Demand"]
    },
    {
      icon: <FileText />,
      title: "Practice Tests & Quizzes",
      description: "Self-assessment tools with instant feedback to help you gauge your understanding and prepare for exams.",
      tags: ["Test Prep", "Self-Assessment", "All Levels"]
    },
    {
      icon: <Lightbulb />,
      title: "AI Study Assistant",
      description: "24/7 AI-powered study help that can answer questions, provide explanations, and offer personalized learning support.",
      tags: ["Personalized", "Instant Help", "All Subjects"]
    }
  ];

  const subjectResources = [
    {
      icon: <Calculator />,
      title: "Mathematics Resources",
      description: "From basic arithmetic to advanced calculus, our math resources include interactive problem-solving tools, step-by-step solutions, and visual models.",
      tags: ["Mathematics", "Problem-Solving", "Visual Models"]
    },
    {
      icon: <BookOpen />,
      title: "Language Arts Resources",
      description: "Enhance reading comprehension, writing skills, and literary analysis with our diverse collection of texts, writing guides, and analytical tools.",
      tags: ["Reading", "Writing", "Literature"]
    },
    {
      icon: <Globe />,
      title: "Social Studies Resources",
      description: "Explore history, geography, and civics through multiple perspectives with primary sources, interactive maps, and cultural explorations.",
      tags: ["History", "Geography", "Cultural Studies"]
    },
    {
      icon: <Rocket />,
      title: "Science Resources",
      description: "Discover scientific concepts through virtual labs, simulations, and experiments that connect theory to real-world applications.",
      tags: ["Biology", "Chemistry", "Physics", "Earth Science"]
    }
  ];

  const creativeResources = [
    {
      icon: <Puzzle />,
      title: "Creative Projects",
      description: "Express your learning through creative projects that connect academic concepts to real-world applications and personal interests.",
      tags: ["Project-Based", "Creative Expression", "Cross-Curricular"]
    },
    {
      icon: <Globe />,
      title: "Cultural Exploration Tools",
      description: "Dive into diverse cultural perspectives with virtual tours, cultural interviews, and global connections to expand your worldview.",
      tags: ["Cultural Studies", "Global Perspectives", "Virtual Tours"]
    },
    {
      icon: <Video />,
      title: "Multimedia Creation Tools",
      description: "Create videos, podcasts, digital art, and presentations to showcase your learning and develop digital literacy skills.",
      tags: ["Digital Creation", "Media Literacy", "Presentation Skills"]
    },
    {
      icon: <Lightbulb />,
      title: "Innovation Challenges",
      description: "Participate in design thinking and problem-solving challenges that encourage innovative solutions to real-world problems.",
      tags: ["Problem-Solving", "Design Thinking", "Innovation"]
    }
  ];

  return (
    <PageTemplate
      title="Student Resources"
      description="Access a wealth of engaging, culturally responsive learning resources designed to support your academic success and personal growth."
    >
      <div className="mb-12">
        <Tabs defaultValue="study" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="study">Study Tools</TabsTrigger>
            <TabsTrigger value="subjects">Subject Resources</TabsTrigger>
            <TabsTrigger value="creative">Creative Learning</TabsTrigger>
          </TabsList>
          
          <TabsContent value="study">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyResources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  icon={resource.icon}
                  title={resource.title}
                  description={resource.description}
                  tags={resource.tags}
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
              <h3 className="text-xl font-bold mb-4">Study Tips from Top Students</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Active Recall
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Test yourself regularly instead of just re-reading material. Use flashcards, practice questions, or explain concepts out loud.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Spaced Repetition
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Review material at increasing intervals over time rather than cramming. This helps move information to long-term memory.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Teach to Learn
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Explaining concepts to others (even imaginary students) helps solidify your understanding and identify knowledge gaps.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="subjects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subjectResources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  icon={resource.icon}
                  title={resource.title}
                  description={resource.description}
                  tags={resource.tags}
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
              <h3 className="text-xl font-bold mb-4">Featured Subject Collections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex">
                  <div className="w-16 h-16 rounded-lg bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Diverse Voices in Literature</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Explore literary works from authors of diverse backgrounds and perspectives.</p>
                    <Button variant="link" className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] p-0 h-auto">
                      Explore Collection
                    </Button>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex">
                  <div className="w-16 h-16 rounded-lg bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Globe className="w-8 h-8 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Global Mathematical Traditions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Discover mathematical concepts and contributions from cultures around the world.</p>
                    <Button variant="link" className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] p-0 h-auto">
                      Explore Collection
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="creative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creativeResources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  icon={resource.icon}
                  title={resource.title}
                  description={resource.description}
                  tags={resource.tags}
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
              <h3 className="text-xl font-bold mb-4">Student Showcase</h3>
              <p className="mb-4">Check out these inspiring creative projects from fellow students who have used our resources to express their learning in unique ways.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="h-40 bg-gradient-to-br from-[var(--color-pan-green)]/30 to-[var(--color-pan-amber)]/30 rounded-md mb-3 flex items-center justify-center">
                    <Video className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="font-semibold mb-1">Historical Documentary</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Maya, Grade 10</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="h-40 bg-gradient-to-br from-[var(--color-pan-green)]/30 to-[var(--color-pan-amber)]/30 rounded-md mb-3 flex items-center justify-center">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="font-semibold mb-1">Interactive Climate Map</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Jamal, Grade 8</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="h-40 bg-gradient-to-br from-[var(--color-pan-green)]/30 to-[var(--color-pan-amber)]/30 rounded-md mb-3 flex items-center justify-center">
                    <Rocket className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="font-semibold mb-1">Science Fiction Story</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Zion, Grade 7</p>
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
        <h2 className="text-2xl font-bold mb-4">Ready to enhance your learning experience?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Access our complete library of student resources and start exploring engaging, culturally responsive learning materials today.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Explore All Resources
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
