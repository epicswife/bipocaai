"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  Sparkles, 
  Users, 
  Brain, 
  Award, 
  Rocket,
  Gamepad2,
  Code,
  Globe,
  Microscope,
  PenTool
} from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, category, level, duration, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
              {category}
            </div>
            <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
              {level}
            </div>
            <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
              {duration}
            </div>
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <Button className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          <Play className="w-4 h-4 mr-2" />
          Preview Course
        </Button>
      </Card>
    </motion.div>
  );
};

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

interface TestimonialCardProps {
  name: string;
  age: string;
  course: string;
  quote: string;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, age, course, quote, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <p className="text-gray-600 dark:text-gray-300 italic mb-4">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
            <span className="text-lg font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">{name.charAt(0)}</span>
          </div>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{age} • {course}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default function InteractiveCoursesPage() {
  const stemCourses = [
    {
      title: "Interactive Coding: Building Your First App",
      description: "Learn programming fundamentals through hands-on projects as you build your own interactive applications from scratch.",
      category: "Computer Science",
      level: "Beginner to Intermediate",
      duration: "8 Weeks"
    },
    {
      title: "Virtual Physics Laboratory",
      description: "Explore physics concepts through virtual experiments, simulations, and real-world problem-solving challenges.",
      category: "Physics",
      level: "Middle & High School",
      duration: "12 Weeks"
    },
    {
      title: "Mathematical Modeling & Data Science",
      description: "Discover how to use mathematics to model real-world phenomena and analyze data to draw meaningful conclusions.",
      category: "Mathematics",
      level: "High School",
      duration: "10 Weeks"
    },
    {
      title: "Biotechnology Exploration",
      description: "Investigate cutting-edge biotechnology through virtual labs, case studies, and ethical discussions about emerging technologies.",
      category: "Biology",
      level: "High School",
      duration: "8 Weeks"
    }
  ];

  const humanitiesCourses = [
    {
      title: "World Literature Through Digital Storytelling",
      description: "Explore diverse literary traditions while creating your own digital stories that reflect themes from global literature.",
      category: "Literature",
      level: "Middle & High School",
      duration: "10 Weeks"
    },
    {
      title: "Historical Investigation: Analyzing Primary Sources",
      description: "Develop historical thinking skills through analysis of primary sources, virtual museum visits, and collaborative research projects.",
      category: "History",
      level: "Middle & High School",
      duration: "8 Weeks"
    },
    {
      title: "Global Cultures & Communication",
      description: "Explore cultural diversity, intercultural communication, and global perspectives through interactive activities and virtual exchanges.",
      category: "Social Studies",
      level: "Elementary to High School",
      duration: "12 Weeks"
    },
    {
      title: "Creative Writing Workshop",
      description: "Develop your unique voice through guided writing exercises, peer workshops, and multimedia storytelling projects.",
      category: "Language Arts",
      level: "Middle & High School",
      duration: "8 Weeks"
    }
  ];

  const courseFeatures = [
    {
      icon: <Gamepad2 />,
      title: "Gamified Learning",
      description: "Engage with course content through game-based elements that make learning fun and motivating while reinforcing key concepts."
    },
    {
      icon: <Sparkles />,
      title: "Adaptive Content",
      description: "Experience personalized learning with content that adapts to your knowledge level, learning style, and pace of progress."
    },
    {
      icon: <Users />,
      title: "Collaborative Projects",
      description: "Work with peers on collaborative assignments that develop teamwork skills while deepening your understanding of course material."
    },
    {
      icon: <Brain />,
      title: "Interactive Simulations",
      description: "Explore complex concepts through interactive simulations that allow you to manipulate variables and observe outcomes."
    },
    {
      icon: <Award />,
      title: "Skill Certification",
      description: "Earn digital badges and certificates that document your mastery of specific skills and knowledge areas."
    },
    {
      icon: <Rocket />,
      title: "Real-World Applications",
      description: "Connect course content to real-world contexts through authentic projects and case studies that demonstrate relevance."
    }
  ];

  const testimonials = [
    {
      name: "Tyler Johnson",
      age: "16 years old",
      course: "Interactive Coding",
      quote: "The interactive coding course was nothing like traditional programming classes. I could experiment, make mistakes, and see immediate results. By the end, I had built my own game that I was really proud of!"
    },
    {
      name: "Aisha Patel",
      age: "14 years old",
      course: "World Literature",
      quote: "I loved how the literature course connected books to digital storytelling. Creating my own interactive narrative based on themes from global literature helped me understand the stories on a much deeper level."
    },
    {
      name: "Marcus Williams",
      age: "17 years old",
      course: "Virtual Physics Laboratory",
      quote: "The virtual physics lab made concepts I was struggling with finally click. Being able to manipulate variables in the simulations and see the results helped me understand the underlying principles."
    },
    {
      name: "Sophia Rodriguez",
      age: "15 years old",
      course: "Creative Writing Workshop",
      quote: "The feedback system in the creative writing course was amazing. Getting immediate responses from peers and instructors helped me refine my writing style and develop confidence in my voice."
    }
  ];

  return (
    <PageTemplate
      title="Interactive Courses"
      description="Explore our engaging, interactive courses designed to make learning come alive. Through simulations, games, collaborative projects, and multimedia content, our courses create immersive learning experiences that deepen understanding and build skills."
    >
      <div className="mb-12">
        <Tabs defaultValue="stem" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="stem">STEM Courses</TabsTrigger>
            <TabsTrigger value="humanities">Humanities Courses</TabsTrigger>
            <TabsTrigger value="features">Course Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stem">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stemCourses.map((course, index) => (
                <CourseCard
                  key={index}
                  title={course.title}
                  description={course.description}
                  category={course.category}
                  level={course.level}
                  duration={course.duration}
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
              <h3 className="text-xl font-bold mb-4 text-center">STEM Learning Reimagined</h3>
              <p className="mb-6 text-center">Our STEM courses bring abstract concepts to life through interactive simulations, virtual labs, and project-based learning.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Code className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Coding & Technology
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Learn programming, web development, app creation, and other tech skills through hands-on, project-based courses.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Microscope className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Scientific Inquiry
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Develop scientific thinking through virtual experiments, data analysis, and research projects across science disciplines.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Mathematical Thinking
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Build mathematical reasoning skills through interactive problem-solving, modeling, and real-world applications.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="humanities">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {humanitiesCourses.map((course, index) => (
                <CourseCard
                  key={index}
                  title={course.title}
                  description={course.description}
                  category={course.category}
                  level={course.level}
                  duration={course.duration}
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
              <h3 className="text-xl font-bold mb-4">Humanities for the Digital Age</h3>
              <p className="mb-6 max-w-2xl mx-auto">Our humanities courses blend traditional content with digital tools and interactive experiences to develop critical thinking, creativity, and cultural understanding.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <PenTool className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Creative Expression
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Develop your creative voice through writing, digital storytelling, and multimedia projects that blend traditional and new media.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Cultural Exploration
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Explore diverse perspectives and cultural traditions through interactive content, virtual field trips, and global connections.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Global Citizenship
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Develop the knowledge, skills, and values needed to thrive in an interconnected world and contribute to positive change.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseFeatures.map((feature, index) => (
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
              <h3 className="text-xl font-bold mb-4">Experience Interactive Learning</h3>
              <p className="mb-6 max-w-2xl mx-auto">Watch this demo to see how our interactive courses engage students through immersive content and responsive learning experiences.</p>
              <div className="aspect-video max-w-3xl mx-auto bg-black/5 dark:bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-12 h-12 mx-auto mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  <p className="font-medium">Video Demo Placeholder</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <motion.div 
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Student Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              age={testimonial.age}
              course={testimonial.course}
              quote={testimonial.quote}
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
        <h2 className="text-2xl font-bold mb-4">Ready to Experience Interactive Learning?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Explore our catalog of interactive courses and find the perfect learning experience to match your interests and educational goals.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          <BookOpen className="w-4 h-4 mr-2" />
          Browse All Courses
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
