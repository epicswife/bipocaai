"use client";

import React, { useRef, useEffect } from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';
import { 
  Lightbulb, 
  Users, 
  GraduationCap, 
  Heart, 
  Building2, 
  School, 
  Brain, 
  Bot, 
  Sparkles, 
  LineChart, 
  Accessibility, 
  HeartPulse, 
  Shield, 
  Globe, 
  Languages, 
  Layers,
  CheckCircle,
  ArrowRight,
  ChevronRight,

} from 'lucide-react';

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  delay: number;
  bgColor?: string;
}

// Futuristic Role Card with 3D effects and animations
const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon, href, delay, bgColor = 'var(--color-pan-green)' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, delay: 0.1 * delay, ease: [0.22, 1, 0.36, 1] }
        }
      }}
      className="h-full perspective-1000"
    >
      <Link href={href} className="block h-full">
        <motion.div 
          className="relative h-full group transform-gpu"
          whileHover={{
            rotateX: 2,
            rotateY: 5,
            z: 10,
            transition: { duration: 0.3 }
          }}
        >
          {/* Animated glow effect */}
          <motion.div 
            className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-[50px] transition-all duration-700"
            style={{ background: `radial-gradient(circle at center, ${bgColor}60, transparent 70%)` }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Main card with glassmorphism */}
          <div 
            className="relative h-full p-8 rounded-[2rem] overflow-hidden backdrop-blur-md border border-white/20 dark:border-gray-800/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] group flex flex-col z-10 bg-white/40 dark:bg-gray-900/40 transition-all duration-500"
            style={{
              backgroundImage: `radial-gradient(circle at 90% 10%, ${bgColor}20, transparent 60%)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Animated background elements */}
            <motion.div 
              className="absolute top-0 right-0 w-32 h-32 opacity-10 -mr-10 -mt-10"
              animate={{
                rotate: [0, 10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {React.cloneElement(icon as React.ReactElement, { 
                className: "w-full h-full",
                style: { color: bgColor }
              } as React.HTMLAttributes<HTMLElement>)}
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-5" 
              style={{ background: bgColor }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 5, 0],
                y: [0, -5, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: bgColor,
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 20}%`,
                  opacity: 0.3
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            ))}
            
            {/* Icon and title with 3D effect */}
            <div className="flex items-center mb-6 transform group-hover:translate-z-10 transition-transform duration-500">
              <motion.div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform-gpu"
                style={{ background: `linear-gradient(135deg, ${bgColor}, ${bgColor}90)` }}
                whileHover={{
                  rotate: 10,
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
              >
                {React.cloneElement(icon as React.ReactElement, { 
                  className: "w-7 h-7 text-white" 
                } as React.HTMLAttributes<HTMLElement>)}
              </motion.div>
              <h3 className="text-2xl font-bold transition-colors duration-300" style={{ color: bgColor }}>{title}</h3>
            </div>
            
            {/* Description with animated gradient underline */}
            <div className="relative">
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">{description}</p>
              <motion.div 
                className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[var(--color-pan-green)]/50 to-transparent dark:from-[var(--color-pan-amber)]/50"
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            
            {/* Animated learn more link */}
            <motion.div 
              className="mt-auto flex items-center font-medium transition-all duration-300"
              style={{ color: bgColor }}
              whileHover={{
                x: 10,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
            >
              <span>Learn more</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

// Feature card components are implemented inline in the respective tab sections



// Feature card components are implemented inline in the respective tab sections



// Add a 3D particle effect component for the hero section
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white dark:bg-gray-300"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            y: [0, -Math.random() * 100 - 50],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [Math.random() * 0.3 + 0.1, 0],
            scale: [Math.random() + 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
}

// Animated section title component
interface AnimatedSectionTitleProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  delay?: number;
}

function AnimatedSectionTitle({ title, subtitle, icon, delay = 0 }: AnimatedSectionTitleProps) {
  return (
    <motion.div 
      className="text-center mb-16 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="inline-block mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-[var(--color-pan-green)]/10 to-[var(--color-pan-amber)]/10 backdrop-blur-sm border border-white/20 dark:border-gray-800/50">
        <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-medium flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {subtitle}
        </span>
      </div>
      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] inline-block text-transparent bg-clip-text">{title}</h2>
      
      {/* Animated underline */}
      <motion.div 
        className="h-1 w-24 mx-auto mt-6 rounded-full bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)]"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 96, opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
}

export default function LearnMoreOverview() {
  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const roles = [
    {
      title: "Homeschool",
      description: "Comprehensive curriculum and tools for homeschooling families with personalized learning paths.",
      icon: <School />,
      href: "/learn-more/homeschool",
      bgColor: "var(--color-pan-green)"
    },
    {
      title: "For Teachers",
      description: "Resources and tools to enhance your classroom with culturally responsive teaching methods and AI assistance.",
      icon: <GraduationCap />,
      href: "/learn-more/teachers",
      bgColor: "var(--color-pan-amber)"
    },
    {
      title: "For Students",
      description: "Interactive learning experiences designed to engage and inspire students of all abilities and learning styles.",
      icon: <Users />,
      href: "/learn-more/students",
      bgColor: "var(--color-pan-red)"
    },
    {
      title: "For Parents",
      description: "Support resources to help parents guide their children&apos;s educational journey with real-time progress tracking.",
      icon: <Heart />,
      href: "/learn-more/parents",
      bgColor: "var(--color-pan-blue)"
    },
    {
      title: "For Institutions",
      description: "Solutions for schools, districts, and educational organizations seeking to implement BIPOCA AI with seamless integration.",
      icon: <Building2 />,
      href: "/learn-more/institutions",
      bgColor: "var(--color-pan-purple)"
    },
    {
      title: "Community",
      description: "Join our growing community of educators, students, and families committed to inclusive, accessible education for all.",
      icon: <Users />,
      href: "/learn-more/community",
      bgColor: "var(--color-pan-green)"
    },
  ];

  const aiFeatures = [
    {
      icon: <Brain />,
      title: "Adaptive Learning",
      description: "Our AI engine dynamically adjusts content difficulty, pacing, and presentation based on each learner's performance, preferences, and learning style."
    },
    {
      icon: <Bot />,
      title: "Intelligent Tutoring",
      description: "24/7 AI tutors provide personalized assistance, answering questions, explaining concepts, and guiding students through complex problem-solving."
    },
    {
      icon: <Sparkles />,
      title: "Content Generation",
      description: "AI-powered creation of customized learning materials, practice questions, and assessments tailored to specific curriculum objectives and student needs."
    },
    {
      icon: <LineChart />,
      title: "Predictive Analytics",
      description: "Advanced algorithms identify learning patterns, predict potential challenges, and recommend interventions before students fall behind."
    },
    {
      icon: <Languages />,
      title: "Multilingual Support",
      description: "Real-time translation and language learning assistance to support English language learners and promote global competency."
    },
    {
      icon: <Layers />,
      title: "Multimodal Learning",
      description: "AI-driven conversion of content into various formats (text, audio, visual, interactive) to accommodate different learning preferences and needs."
    }
  ];

  const inclusiveFeatures = [
    {
      icon: <Accessibility />,
      title: "IDD Support Framework",
      description: "Comprehensive tools and adaptations for students with intellectual and developmental disabilities, including customized learning pathways, simplified interfaces, and specialized content."
    },
    {
      icon: <HeartPulse />,
      title: "Mental Health Resources",
      description: "Integrated emotional wellness tools, stress management techniques, and access to mental health resources to support students' psychological wellbeing alongside academic growth."
    },
    {
      icon: <Shield />,
      title: "Accessibility Compliance",
      description: "Full adherence to WCAG guidelines with features like screen reader compatibility, keyboard navigation, color contrast options, and text-to-speech functionality."
    },
    {
      icon: <Globe />,
      title: "Cultural Responsiveness",
      description: "Content and teaching approaches that reflect diverse cultural perspectives, histories, and learning traditions to create an inclusive educational environment."
    }
  ];

  return (
    <PageTemplate
      title="Learn More About BIPOCA AI"
      description="Discover how BIPOCA AI is transforming education with culturally responsive, AI-powered learning experiences for people of all abilities, students, teachers, parents, and institutions."
    >
      {/* Futuristic Hero Section */}
      <div className="relative overflow-hidden py-16 sm:py-24 mb-20">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Animated grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(176,176,176,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(176,176,176,0.03)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          {/* Particle field for futuristic effect */}
          <ParticleField />
          
          {/* Animated glowing orbs */}
          <motion.div 
            className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[var(--color-pan-green)]/20 dark:bg-[var(--color-pan-amber)]/20 blur-[100px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            style={{ y: yBg1 }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[var(--color-pan-amber)]/20 dark:bg-[var(--color-pan-green)]/20 blur-[100px]"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{ y: yBg2 }}
          />
        </div>
        
        {/* Main hero content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              className="mb-6 inline-flex items-center rounded-full px-4 py-1.5 text-sm leading-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] ring-1 ring-[var(--color-pan-green)]/20 dark:ring-[var(--color-pan-amber)]/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-medium">AI-Powered Education Platform</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl mb-6">
                <span className="relative inline-block">
                  <span className="relative z-10">Transforming</span>
                  <motion.span 
                    className="absolute bottom-2 left-0 h-3 w-full bg-[var(--color-pan-green)]/20 dark:bg-[var(--color-pan-amber)]/20 rounded-full -z-10"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Education</span>
                  <motion.span 
                    className="absolute bottom-2 left-0 h-3 w-full bg-[var(--color-pan-green)]/20 dark:bg-[var(--color-pan-amber)]/20 rounded-full -z-10"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  />
                </span>{' '}
                <span className="relative inline-block mt-2 bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] bg-clip-text text-transparent">with BIPOCA AI</span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              BIPOCA AI combines cutting-edge artificial intelligence with culturally responsive pedagogy to create personalized learning experiences for{' '}
              <span className="font-semibold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">every student</span>, regardless of ability or background.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-green)]/80 hover:from-[var(--color-pan-green)]/90 hover:to-[var(--color-pan-green)]/70 text-white shadow-lg text-lg px-8 py-6 rounded-full relative overflow-hidden group">
                  <span className="relative z-10">Get Started</span>
                  <motion.span 
                    className="absolute inset-0 bg-white/20 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-2 border-[var(--color-pan-amber)] text-[var(--color-pan-amber)] hover:bg-[var(--color-pan-amber)]/10 text-lg px-8 py-6 rounded-full relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2">Watch Demo</span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-pan-amber)]" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Floating stats cards */}
            <div className="mt-20 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {[
                { label: "Students Served", value: "10,000+", icon: <Users className="h-4 w-4" /> },
                { label: "Schools", value: "500+", icon: <School className="h-4 w-4" /> },
                { label: "Satisfaction Rate", value: "95%", icon: <Heart className="h-4 w-4" /> },
                { label: "Learning Outcomes", value: "+40%", icon: <Brain className="h-4 w-4" /> }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="relative backdrop-blur-md bg-white/10 dark:bg-gray-900/10 rounded-2xl border border-white/10 dark:border-gray-800/10 p-6 shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  {/* Background glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-pan-green)]/20 to-[var(--color-pan-amber)]/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  
                  <div className="relative flex items-center space-x-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Futuristic Tabs Section */}
      <div className="mb-20">
        <Tabs defaultValue="overview" className="w-full">
          <motion.div 
            className="relative mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TabsList className="relative z-10 grid w-full grid-cols-3 mx-auto max-w-3xl bg-white/10 dark:bg-gray-900/10 p-2 rounded-full backdrop-blur-md border border-white/10 dark:border-gray-800/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden">
              {/* Animated background glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[var(--color-pan-green)]/5 to-[var(--color-pan-amber)]/5 rounded-full"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--color-pan-green)] data-[state=active]:to-[var(--color-pan-green)]/80 data-[state=active]:text-white dark:data-[state=active]:from-[var(--color-pan-amber)] dark:data-[state=active]:to-[var(--color-pan-amber)]/80 rounded-full py-3 text-lg font-medium relative overflow-hidden group"
              >
                <motion.span 
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  <Users className="mr-2 h-4 w-4" />
                  For Everyone
                </span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="ai" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--color-pan-green)] data-[state=active]:to-[var(--color-pan-green)]/80 data-[state=active]:text-white dark:data-[state=active]:from-[var(--color-pan-amber)] dark:data-[state=active]:to-[var(--color-pan-amber)]/80 rounded-full py-3 text-lg font-medium relative overflow-hidden group"
              >
                <motion.span 
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  <Brain className="mr-2 h-4 w-4" />
                  AI Capabilities
                </span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="inclusive" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--color-pan-green)] data-[state=active]:to-[var(--color-pan-green)]/80 data-[state=active]:text-white dark:data-[state=active]:from-[var(--color-pan-amber)] dark:data-[state=active]:to-[var(--color-pan-amber)]/80 rounded-full py-3 text-lg font-medium relative overflow-hidden group"
              >
                <motion.span 
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  <Accessibility className="mr-2 h-4 w-4" />
                  Inclusive Education
                </span>
              </TabsTrigger>
            </TabsList>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 blur-3xl"></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-32 h-32 rounded-full bg-[var(--color-pan-amber)]/5 dark:bg-[var(--color-pan-green)]/5 blur-3xl"></div>
          </motion.div>
          
          <TabsContent value="overview">
            <AnimatedSectionTitle 
              title="Find Your Role" 
              subtitle="Tailored for Everyone" 
              icon={<Users className="h-4 w-4" />}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roles.map((role, index) => (
                <RoleCard
                  key={role.title}
                  title={role.title}
                  description={role.description}
                  icon={role.icon}
                  href={role.href}
                  delay={index}
                  bgColor={role.bgColor}
                />
              ))}
            </div>
            
            <motion.div 
              className="mt-12 relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5 z-0"></div>
              <div className="absolute -top-60 right-1/4 w-96 h-96 bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 rounded-full blur-3xl z-0"></div>
              <div className="absolute -bottom-60 left-1/4 w-96 h-96 bg-[var(--color-pan-amber)]/10 dark:bg-[var(--color-pan-green)]/10 rounded-full blur-3xl z-0"></div>
              
              {/* Main content container */}
              <div className="relative z-10 p-12 rounded-[2.5rem] backdrop-blur-sm border border-white/20 dark:border-gray-800/50 shadow-2xl bg-white/60 dark:bg-gray-900/60 overflow-hidden">
                {/* Header section with badge */}
                <div className="text-center mb-10">
                  <div className="inline-block mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-[var(--color-pan-green)]/10 to-[var(--color-pan-amber)]/10 backdrop-blur-sm border border-white/20 dark:border-gray-800/50">
                    <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-medium">Why We&apos;re Different</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] inline-block text-transparent bg-clip-text">Why Choose BIPOCA AI?</h2>
                  <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">Our platform combines cutting-edge AI with culturally responsive education to create a truly inclusive learning environment.</p>
                </div>
                
                {/* Feature cards in a modern layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Feature 1 */}
                  <motion.div 
                    className="relative group h-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 bg-[var(--color-pan-green)]/20"></div>
                    <div className="h-full p-8 rounded-[2rem] backdrop-blur-sm border border-white/20 dark:border-gray-800/50 shadow-xl bg-white/80 dark:bg-gray-900/80 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-pan-green)] to-[var(--color-pan-green)]/70 flex items-center justify-center mb-6 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        <Lightbulb className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] bg-clip-text text-transparent">Culturally Responsive</h3>
                      <p className="text-gray-600 dark:text-gray-300">Curriculum that celebrates diversity and promotes inclusive learning for all students</p>
                    </div>
                  </motion.div>
                  
                  {/* Feature 2 */}
                  <motion.div 
                    className="relative group h-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 bg-[var(--color-pan-green)]/20"></div>
                    <div className="h-full p-8 rounded-[2rem] backdrop-blur-sm border border-white/20 dark:border-gray-800/50 shadow-xl bg-white/80 dark:bg-gray-900/80 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-pan-green)] to-[var(--color-pan-green)]/70 flex items-center justify-center mb-6 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        <Brain className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] bg-clip-text text-transparent">AI-Powered Learning</h3>
                      <p className="text-gray-600 dark:text-gray-300">Adapts to each student&apos;s unique learning style, pace, and abilities for personalized education</p>
                    </div>
                  </motion.div>
                  
                  {/* Feature 3 */}
                  <motion.div 
                    className="relative group h-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 bg-[var(--color-pan-green)]/20"></div>
                    <div className="h-full p-8 rounded-[2rem] backdrop-blur-sm border border-white/20 dark:border-gray-800/50 shadow-xl bg-white/80 dark:bg-gray-900/80 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-pan-green)] to-[var(--color-pan-green)]/70 flex items-center justify-center mb-6 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] bg-clip-text text-transparent">Comprehensive Resources</h3>
                      <p className="text-gray-600 dark:text-gray-300">For all educational stakeholders, from students with diverse needs to institutions</p>
                    </div>
                  </motion.div>
                  
                  {/* Feature 4 */}
                  <motion.div 
                    className="relative group h-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 bg-[var(--color-pan-green)]/20"></div>
                    <div className="h-full p-8 rounded-[2rem] backdrop-blur-sm border border-white/20 dark:border-gray-800/50 shadow-xl bg-white/80 dark:bg-gray-900/80 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-pan-green)] to-[var(--color-pan-green)]/70 flex items-center justify-center mb-6 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        <Heart className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] bg-clip-text text-transparent">Community-Focused</h3>
                      <p className="text-gray-600 dark:text-gray-300">Brings together families, educators, and learners in an inclusive environment</p>
                    </div>
                  </motion.div>
                  
                  {/* Feature 5 */}
                  <motion.div 
                    className="relative group h-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 bg-[var(--color-pan-green)]/20"></div>
                    <div className="h-full p-8 rounded-[2rem] backdrop-blur-sm border border-white/20 dark:border-gray-800/50 shadow-xl bg-white/80 dark:bg-gray-900/80 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-pan-green)] to-[var(--color-pan-green)]/70 flex items-center justify-center mb-6 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        <HeartPulse className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] bg-clip-text text-transparent">Holistic Development</h3>
                      <p className="text-gray-600 dark:text-gray-300">Addresses academic, social, emotional, and mental health development</p>
                    </div>
                  </motion.div>
                  
                  {/* Feature 6 */}
                  <motion.div 
                    className="relative group h-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 bg-[var(--color-pan-green)]/20"></div>
                    <div className="h-full p-8 rounded-[2rem] backdrop-blur-sm border border-white/20 dark:border-gray-800/50 shadow-xl bg-white/80 dark:bg-gray-900/80 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-pan-green)] to-[var(--color-pan-green)]/70 flex items-center justify-center mb-6 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        <Accessibility className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] bg-clip-text text-transparent">IDD Support</h3>
                      <p className="text-gray-600 dark:text-gray-300">Specialized support for students with intellectual and developmental disabilities</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="ai">
            <AnimatedSectionTitle 
              title="AI Capabilities" 
              subtitle="Cutting-Edge Technology" 
              icon={<Brain className="h-4 w-4" />}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="relative group h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  {/* Background and glow effects */}
                  <div className="absolute inset-0 rounded-3xl bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm border border-white/10 dark:border-gray-800/10 shadow-lg overflow-hidden">
                    {/* Animated gradient background */}
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${index % 2 === 0 ? 'var(--color-pan-green)' : 'var(--color-pan-amber)'}/15, transparent 70%)`
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Glow border on hover */}
                    <motion.div 
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ 
                        boxShadow: `0 0 20px 2px ${index % 2 === 0 ? 'var(--color-pan-green)' : 'var(--color-pan-amber)'}/20` 
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    <div className="mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/10 dark:to-gray-800/5 flex items-center justify-center shadow-inner">
                      <div className="w-8 h-8 flex items-center justify-center text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                        {feature.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[var(--color-pan-green)] dark:group-hover:text-[var(--color-pan-amber)] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 flex-grow">
                      {feature.description}
                    </p>
                    
                    <motion.div 
                      className="mt-4 flex items-center text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <span>Learn more</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-12 relative overflow-hidden rounded-3xl backdrop-blur-sm border border-white/10 dark:border-gray-800/20 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {/* Background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-pan-green)]/5 via-transparent to-[var(--color-pan-amber)]/5 z-0"></div>
              <div className="absolute -right-40 -top-40 w-80 h-80 rounded-full bg-[var(--color-pan-green)]/10 blur-3xl"></div>
              <div className="absolute -left-40 -bottom-40 w-80 h-80 rounded-full bg-[var(--color-pan-amber)]/10 blur-3xl"></div>
              <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-5"></div>
              
              {/* Content */}
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <motion.div 
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-pan-green)] to-[var(--color-pan-amber)] shadow-lg flex items-center justify-center transform -rotate-6 shrink-0"
                    animate={{ rotate: [-6, 6, -6] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Bot className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] inline-block text-transparent bg-clip-text">The BIPOCA AI Difference</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">Our proprietary AI system doesn&apos;t just deliver content—it creates a truly personalized learning ecosystem that evolves with each student. By combining advanced machine learning algorithms with pedagogical expertise, we&apos;ve created an educational experience that&apos;s as unique as each learner.</p>
                    
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button className="bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-green)]/80 hover:from-[var(--color-pan-green)]/90 hover:to-[var(--color-pan-green)]/70 dark:from-[var(--color-pan-amber)] dark:to-[var(--color-pan-amber)]/80 text-white shadow-md rounded-full px-6">
                        <Bot className="w-4 h-4 mr-2" />
                        Explore AI Technology
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="inclusive">
            <AnimatedSectionTitle 
              title="Inclusive Education" 
              subtitle="Accessible for All" 
              icon={<Accessibility className="h-4 w-4" />}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {inclusiveFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="relative group h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  {/* Background and glow effects */}
                  <div className="absolute inset-0 rounded-3xl bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm border border-white/10 dark:border-gray-800/10 shadow-lg overflow-hidden">
                    {/* Animated gradient background */}
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${index % 2 === 0 ? 'var(--color-pan-amber)' : 'var(--color-pan-green)'}/15, transparent 70%)`
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Glow border on hover */}
                    <motion.div 
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ 
                        boxShadow: `0 0 20px 2px ${index % 2 === 0 ? 'var(--color-pan-amber)' : 'var(--color-pan-green)'}/20` 
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    <div className="mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/10 dark:to-gray-800/5 flex items-center justify-center shadow-inner">
                      <div className="w-8 h-8 flex items-center justify-center text-[var(--color-pan-amber)] dark:text-[var(--color-pan-green)]">
                        {feature.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[var(--color-pan-amber)] dark:group-hover:text-[var(--color-pan-green)] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 flex-grow">
                      {feature.description}
                    </p>
                    
                    <motion.div 
                      className="mt-4 flex items-center text-[var(--color-pan-amber)] dark:text-[var(--color-pan-green)] font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <span>Learn more</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-12 relative overflow-hidden rounded-3xl backdrop-blur-sm border border-white/10 dark:border-gray-800/20 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {/* Background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-pan-amber)]/5 via-transparent to-[var(--color-pan-green)]/5 z-0"></div>
              <div className="absolute -right-40 -top-40 w-80 h-80 rounded-full bg-[var(--color-pan-amber)]/10 blur-3xl"></div>
              <div className="absolute -left-40 -bottom-40 w-80 h-80 rounded-full bg-[var(--color-pan-green)]/10 blur-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-[var(--color-pan-amber)] to-[var(--color-pan-green)] inline-block text-transparent bg-clip-text text-center md:text-left">Education For Everyone</h2>
                <p className="mb-8 text-center md:text-left text-gray-700 dark:text-gray-300">At BIPOCA AI, we believe that quality education should be accessible to all learners, regardless of their abilities, background, or circumstances.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    className="relative group h-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 bg-[var(--color-pan-amber)]/10"></div>
                    <div className="h-full p-6 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-gray-800/30 shadow-xl bg-white/80 dark:bg-gray-900/80 relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-pan-amber)] to-[var(--color-pan-amber)]/70 flex items-center justify-center shadow-lg mr-3">
                          <Accessibility className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-[var(--color-pan-amber)] to-[var(--color-pan-green)] bg-clip-text text-transparent">IDD Support System</h3>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">Our comprehensive support for students with intellectual and developmental disabilities includes:</p>
                      
                      <ul className="space-y-3">
                        {[
                          "Adaptive interfaces with simplified navigation and visual supports",
                          "Content modification tools that adjust complexity while maintaining core concepts",
                          "Specialized progress tracking that celebrates achievements at all levels",
                          "Integration with assistive technologies and alternative input methods"
                        ].map((item, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * i }}
                          >
                            <div className="mr-3 mt-1 w-5 h-5 rounded-full bg-[var(--color-pan-amber)]/10 flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 text-[var(--color-pan-amber)]" />
                            </div>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="relative group h-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 bg-[var(--color-pan-green)]/10"></div>
                    <div className="h-full p-6 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-gray-800/30 shadow-xl bg-white/80 dark:bg-gray-900/80 relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-pan-green)] to-[var(--color-pan-green)]/70 flex items-center justify-center shadow-lg mr-3">
                          <HeartPulse className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] bg-clip-text text-transparent">Mental Health Support</h3>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">Our integrated mental health resources provide:</p>
                      
                      <ul className="space-y-3">
                        {[
                          "Embedded mindfulness and stress management activities within the learning flow",
                          "Emotional intelligence curriculum that builds resilience and self-awareness",
                          "Early detection systems that identify potential mental health concerns",
                          "Secure connection to mental health resources and professional support"
                        ].map((item, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * i }}
                          >
                            <div className="mr-3 mt-1 w-5 h-5 rounded-full bg-[var(--color-pan-green)]/10 flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 text-[var(--color-pan-green)]" />
                            </div>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="my-20 relative">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-950 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#5a9d8b_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#1f2937_40%,#5a9d8b_100%)]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]">
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden">
            {/* Glowing orbs */}
            <motion.div 
              className="absolute -top-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-[var(--color-pan-green)]/30 blur-[100px] dark:bg-[var(--color-pan-amber)]/20"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute -bottom-40 -left-20 h-[25rem] w-[25rem] rounded-full bg-[var(--color-pan-amber)]/20 blur-[100px] dark:bg-[var(--color-pan-green)]/10"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />

            {/* Content container */}
            <div className="mx-auto grid max-w-5xl grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-20 py-16 lg:py-20">
              {/* Left side with text */}
              <motion.div 
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 inline-flex items-center rounded-full px-3 py-1 text-sm leading-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] ring-1 ring-[var(--color-pan-green)]/20 dark:ring-[var(--color-pan-amber)]/30">
                  <span className="font-medium">Join our growing community</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
                
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
                  Ready to Transform <br />
                  <span className="bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] bg-clip-text text-transparent">Education?</span>
                </h2>
                
                <p className="text-lg leading-8 text-gray-600 dark:text-gray-300 mb-8">
                  Join thousands of students, teachers, parents, and institutions already using BIPOCA AI to create more inclusive, personalized, and effective learning experiences.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link href="/signup">
                      <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 text-white dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 font-medium rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        Get Started Today
                      </Button>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link href="/contact">
                      <Button variant="outline" className="border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/5 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/5 font-medium rounded-full px-8 py-6 text-lg transition-all duration-300">
                        Schedule a Demo
                      </Button>
                    </Link>
                  </motion.div>
                </div>
                
                {/* Trust badges */}
                <div className="mt-10 flex items-center gap-x-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900 bg-[var(--color-pan-${i % 2 ? 'green' : 'amber'})]/80`}></div>
                    ))}
                  </div>
                  <div className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                    <strong className="font-semibold text-gray-900 dark:text-white">10,000+</strong> educators trust us
                  </div>
                </div>
              </motion.div>
              
              {/* Right side with floating elements */}
              <motion.div 
                className="relative flex items-center justify-center lg:justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative h-[450px] w-full max-w-[450px]">
                  {/* Main card */}
                  <motion.div 
                    className="absolute top-0 right-0 h-[350px] w-[300px] rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="mb-4 h-10 w-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center">
                      <Lightbulb className="h-5 w-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Personalized Learning</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">AI-powered curriculum that adapts to each student&apos;s unique learning style and pace.</p>
                    
                    <div className="mt-6 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                      <motion.div 
                        className="h-2 rounded-full bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]" 
                        initial={{ width: '30%' }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                    </div>
                    <div className="mt-4 flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">85%</span>
                    </div>
                  </motion.div>
                  
                  {/* Secondary card */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[200px] w-[250px] rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl"
                    initial={{ y: 0 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-8 w-8 rounded-lg bg-[var(--color-pan-amber)]/10 dark:bg-[var(--color-pan-green)]/10 flex items-center justify-center">
                        <Brain className="h-4 w-4 text-[var(--color-pan-amber)] dark:text-[var(--color-pan-green)]" />
                      </div>
                      <span className="text-xs font-medium text-[var(--color-pan-amber)] dark:text-[var(--color-pan-green)] bg-[var(--color-pan-amber)]/10 dark:bg-[var(--color-pan-green)]/10 px-2 py-1 rounded-full">AI Powered</span>
                    </div>
                    
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Adaptive Curriculum</h3>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center">
                          <CheckCircle className="h-3.5 w-3.5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mr-2" />
                          <span className="text-xs text-gray-600 dark:text-gray-300">Feature {i}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Floating badge */}
                  <motion.div 
                    className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg px-4 py-2 flex items-center space-x-2 z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10">
                      <Sparkles className="h-3 w-3 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    </span>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">BIPOCA AI</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
