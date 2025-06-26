"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Map, 
  Sparkles, 
  Users, 
  Brain, 
  Award, 
  Rocket,
  Lightbulb,
  Star,
  GraduationCap
} from 'lucide-react';

interface PathCardProps {
  title: string;
  description: string;
  subjects: string[];
  level: string;
  duration: string;
  index: number;
}

const PathCard: React.FC<PathCardProps> = ({ title, description, subjects, level, duration, index }) => {
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
              {level}
            </div>
            <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
              {duration}
            </div>
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Subjects Covered:</h4>
          <div className="flex flex-wrap gap-1">
            {subjects.map((subject, i) => (
              <span 
                key={i} 
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
        <Button className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Explore Path
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
  path: string;
  quote: string;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, age, path, quote, index }) => {
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
            <p className="text-sm text-gray-500 dark:text-gray-400">{age} • {path}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default function LearningPathsPage() {
  const academicPaths = [
    {
      title: "Advanced Mathematics Explorer",
      description: "A comprehensive journey through advanced mathematical concepts, from algebra to calculus, with real-world applications and problem-solving challenges.",
      subjects: ["Algebra", "Geometry", "Trigonometry", "Calculus", "Statistics"],
      level: "Middle & High School",
      duration: "1-3 Years"
    },
    {
      title: "Scientific Discovery",
      description: "Explore the natural world through hands-on experiments, research projects, and interdisciplinary connections across biology, chemistry, physics, and earth sciences.",
      subjects: ["Biology", "Chemistry", "Physics", "Earth Science", "Environmental Science"],
      level: "Elementary to High School",
      duration: "1-4 Years"
    },
    {
      title: "Global Literature & Communication",
      description: "Develop advanced literacy skills through diverse literature, creative writing, critical analysis, and effective communication across multiple formats.",
      subjects: ["Literature", "Writing", "Communication", "Media Studies", "Cultural Studies"],
      level: "Middle & High School",
      duration: "1-2 Years"
    },
    {
      title: "Historical Perspectives",
      description: "Examine historical events, movements, and figures through multiple perspectives, primary sources, and connections to contemporary issues.",
      subjects: ["World History", "U.S. History", "Civics", "Economics", "Geography"],
      level: "Middle & High School",
      duration: "1-2 Years"
    }
  ];

  const careerPaths = [
    {
      title: "Computer Science Foundations",
      description: "Build a strong foundation in computer science concepts, programming languages, and computational thinking to prepare for tech careers or further study.",
      subjects: ["Programming", "Web Development", "Data Structures", "Algorithms", "Computer Systems"],
      level: "Middle & High School",
      duration: "1-3 Years"
    },
    {
      title: "Business & Entrepreneurship",
      description: "Develop business acumen, entrepreneurial mindset, and practical skills in finance, marketing, and management through real-world projects.",
      subjects: ["Business Fundamentals", "Marketing", "Finance", "Entrepreneurship", "Economics"],
      level: "High School",
      duration: "1-2 Years"
    },
    {
      title: "Creative Arts & Design",
      description: "Explore various artistic mediums and design principles while building a portfolio of creative work and developing technical skills in digital and traditional arts.",
      subjects: ["Visual Arts", "Digital Design", "Animation", "Photography", "Portfolio Development"],
      level: "Elementary to High School",
      duration: "1-4 Years"
    },
    {
      title: "Health Sciences Introduction",
      description: "Discover the foundations of health sciences through anatomy, physiology, medical terminology, ethics, and exploration of various healthcare careers.",
      subjects: ["Anatomy", "Physiology", "Medical Terminology", "Healthcare Ethics", "Nutrition"],
      level: "High School",
      duration: "1-2 Years"
    }
  ];

  const pathFeatures = [
    {
      icon: <Map />,
      title: "Personalized Learning Journey",
      description: "Each learning path adapts to your unique strengths, interests, and goals, creating a truly personalized educational experience."
    },
    {
      icon: <Sparkles />,
      title: "AI-Powered Recommendations",
      description: "Our intelligent system suggests resources, activities, and assessments based on your learning style and progress."
    },
    {
      icon: <Users />,
      title: "Expert Guidance",
      description: "Access support from subject matter experts, mentors, and peers who can provide guidance and feedback throughout your journey."
    },
    {
      icon: <Brain />,
      title: "Mastery-Based Progression",
      description: "Move at your own pace, advancing when you've demonstrated mastery of concepts rather than being bound by time constraints."
    },
    {
      icon: <Award />,
      title: "Recognized Achievements",
      description: "Earn digital badges, certificates, and credentials that document your skills and knowledge for college applications or portfolios."
    },
    {
      icon: <Rocket />,
      title: "Real-World Applications",
      description: "Apply your learning to authentic projects and challenges that connect academic concepts to real-world contexts."
    }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      age: "16 years old",
      path: "Computer Science Foundations",
      quote: "The Computer Science path gave me structure while still allowing me to explore my specific interests in game development. The projects were challenging but engaging, and I loved being able to work with mentors in the field."
    },
    {
      name: "Maya Johnson",
      age: "14 years old",
      path: "Scientific Discovery",
      quote: "I've always been curious about how things work, and this path let me explore so many different areas of science. The hands-on experiments were my favorite part, especially when we designed our own research projects."
    },
    {
      name: "Jamal Williams",
      age: "17 years old",
      path: "Advanced Mathematics Explorer",
      quote: "Math used to be just about memorizing formulas, but this path showed me how mathematics connects to everything. I especially appreciated being able to move quickly through concepts I understood and spend more time on challenging areas."
    },
    {
      name: "Sofia Rodriguez",
      age: "15 years old",
      path: "Creative Arts & Design",
      quote: "The Creative Arts path helped me discover my passion for digital illustration. I love that I could customize my learning to focus on the specific techniques and tools I was most interested in while still building a well-rounded foundation."
    }
  ];

  return (
    <PageTemplate
      title="Learning Paths"
      description="Discover personalized learning journeys designed to help you explore your interests, develop your skills, and achieve your academic and career goals. Our flexible learning paths combine structure with customization to create an engaging educational experience."
    >
      <div className="mb-12">
        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="academic">Academic Paths</TabsTrigger>
            <TabsTrigger value="career">Career-Focused Paths</TabsTrigger>
            <TabsTrigger value="features">Path Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="academic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {academicPaths.map((path, index) => (
                <PathCard
                  key={index}
                  title={path.title}
                  description={path.description}
                  subjects={path.subjects}
                  level={path.level}
                  duration={path.duration}
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
              <h3 className="text-xl font-bold mb-4 text-center">Academic Excellence Through Personalization</h3>
              <p className="mb-6 text-center">Our academic paths are designed to provide a comprehensive foundation while allowing for personalization based on your interests and goals.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Standards Alignment
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">All academic paths align with national and state standards while going beyond basic requirements to encourage deeper learning.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Interdisciplinary Connections
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Explore connections between subject areas through integrated projects and thematic learning experiences.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Advanced Options
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Opportunities for acceleration and advanced study for students ready for additional challenges in specific subject areas.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="career">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {careerPaths.map((path, index) => (
                <PathCard
                  key={index}
                  title={path.title}
                  description={path.description}
                  subjects={path.subjects}
                  level={path.level}
                  duration={path.duration}
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
              <h3 className="text-xl font-bold mb-4">Preparing for Future Success</h3>
              <p className="mb-6 max-w-2xl mx-auto">Our career-focused paths help you explore potential career interests while developing valuable skills and knowledge that will serve you in higher education and beyond.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Career Exploration Resources
                </Button>
                <Button variant="outline" className="border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10">
                  <Users className="w-4 h-4 mr-2" />
                  Connect with Mentors
                </Button>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pathFeatures.map((feature, index) => (
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
              <h3 className="text-xl font-bold mb-4">How Learning Paths Work</h3>
              <p className="mb-6 max-w-2xl mx-auto">Watch this short video to see how our learning paths adapt to your unique needs and help you achieve your educational goals.</p>
              <div className="aspect-video max-w-3xl mx-auto bg-black/5 dark:bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-12 h-12 mx-auto mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
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
        <h2 className="text-2xl font-bold mb-6 text-center">Student Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              age={testimonial.age}
              path={testimonial.path}
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
        <h2 className="text-2xl font-bold mb-4">Find Your Perfect Learning Path</h2>
        <p className="mb-6 max-w-2xl mx-auto">Take our interactive assessment to discover which learning paths align with your interests, strengths, and goals. Get personalized recommendations to help you chart your educational journey.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          <Map className="w-4 h-4 mr-2" />
          Start Path Assessment
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
