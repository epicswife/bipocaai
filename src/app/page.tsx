"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchBlackFactsLessons } from "@/services/blackfacts";
import { Course } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CookieConsent from "@/components/features/cookie-consent/cookie-consent";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Globe,
  Zap,
  Brain,
  Target,
  Shield,
  Building2,
  Smartphone,
  Accessibility,
  GraduationCap,
} from "lucide-react";

// Image paths configuration
const images = {
  hero: [
    "/assets/hero/hero-1.jpg",
    "/assets/hero/hero-2.jpg",
  ],
  features: {
    personalized: ["/assets/features/personalized-1.jpg", "/assets/features/personalized-2.jpg"],
    search: ["/assets/features/search-1.jpg", "/assets/features/search-2.jpg"],
    gamified: ["/assets/features/gamified-1.jpg", "/assets/features/gamified-2.jpg"],
    secure: ["/assets/features/secure-1.jpg", "/assets/features/secure-2.jpg"],
  },
  accessibility: ["/assets/accessibility/accessibility-1.jpg", "/assets/accessibility/accessibility-2.jpg"],
  devices: ["/assets/devices/devices-1.jpg", "/assets/devices/devices-2.jpg"],
  testimonials: {
    student: ["/assets/testimonials/student-1.jpg", "/assets/testimonials/student-2.jpg"],
    teacher: ["/assets/testimonials/teacher-1.jpg", "/assets/testimonials/teacher-2.jpg"],
    parent: ["/assets/testimonials/parent-1.jpg", "/assets/testimonials/parent-2.jpg"],
  },
};

// Partner logos (real paths)
const partnerLogos = {
  blackfacts: "/assets/partners/blackfacts-logo.png",
  fau: "/assets/partners/fau-logo.png",
  legacy: "/assets/partners/legacy-education-logo.png",
};

// Role-based quick access data
const roles = [
  { role: "student", label: "I’m a Student", href: "/signup?role=student", icon: <GraduationCap className="w-8 h-8" /> },
  { role: "teacher", label: "I’m a Teacher", href: "/signup?role=teacher", icon: <BookOpen className="w-8 h-8" /> },
  { role: "parent", label: "I’m a Parent", href: "/signup?role=parent", icon: <Users className="w-8 h-8" /> },
  { role: "admin", label: "District Admin", href: "/signup?role=admin", icon: <Building2 className="w-8 h-8" /> },
];

export default function HomePage() {
  const [lessons, setLessons] = useState<Course[]>([]);

  useEffect(() => {
    const loadLessons = async () => {
      const fetchedLessons = await fetchBlackFactsLessons();
      setLessons(fetchedLessons.filter((lesson) => lesson.isFeatured).slice(0, 3)); // Limit to 3 for display
    };
    loadLessons();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src={images.hero[0]}
            alt="AI Education Background"
            fill
            className="object-cover transition-all duration-700 hover:opacity-90"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
        </div>
        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center border-2 border-primary dark:border-secondary shadow-glow relative overflow-hidden group">
              {/* Light mode radial gradient background */}
              <div className="absolute inset-0 bg-gradient-radial from-[var(--color-white)] via-[var(--color-gold-300)]/20 to-[var(--color-cyan-400)]/40 group-hover:via-[var(--color-gold-300)]/30 group-hover:to-[var(--color-cyan-400)]/50 transition-all duration-500 dark:hidden"></div>
              {/* Dark mode radial gradient background */}
              <div className="absolute inset-0 bg-gradient-radial from-[var(--color-black)] via-[var(--color-gold-300)]/30 to-[var(--color-cyan-400)]/50 group-hover:via-[var(--color-gold-300)]/40 group-hover:to-[var(--color-cyan-400)]/60 transition-all duration-500 hidden dark:block"></div>
              {/* Content container with backdrop blur */}
              <div className="relative z-10 w-full h-full flex items-center justify-center backdrop-blur-md">
                <span className="text-foreground dark:text-primary-foreground text-xl font-orbitron font-bold">BIPOCA AI</span>
              </div>
            </div>
          </motion.div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-orbitron font-bold text-primary-foreground mb-6">
            Your Future of Learning Starts Here
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto">
            Empowering Black, Indigenous, People of Color, and Allies with AI-driven education—accessible anywhere, on any device, for everyone.
          </p>
          <Link href="/signup">
            <Button
              className="px-8 py-4 text-lg font-semibold rounded-lg bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground shadow-glow"
              aria-label="Get Started with BIPOCA AI"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>
        <svg
          className="absolute bottom-0 left-0 w-full h-24 text-background dark:text-background"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C360 50 1080 50 1440 100 L1440 100 L0 100 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Quick Access Navigation */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
          Start Your Journey Today
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {roles.map((role, index) => (
            <motion.div
              key={role.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={role.href}>
                <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism hover:scale-105 transition-transform">
                  <CardHeader className="flex justify-center">
                    {role.icon}
                  </CardHeader>
                  <CardContent className="text-center">
                    <h3 className="text-xl font-semibold text-foreground">{role.label}</h3>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Lessons Showcase */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gray-dark dark:bg-gradient-gray-dark">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
          Explore Our Featured Lessons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card border-secondary dark:border-primary shadow-glow glassmorphism hover:scale-105 transition-transform">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-foreground">{lesson.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">Source: {lesson.source}</p>
                  <Link href={`/classrooms/${lesson.id}`}>
                    <Button className="w-full bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground">
                      Explore Lesson
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/courses">
            <Button className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground shadow-glow">
              View All Courses
            </Button>
          </Link>
        </div>
      </section>

      {/* AI-Powered Learning Features */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
          Learning Powered by AI
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          >
            <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism overflow-hidden h-full">
              <div className="relative h-40 w-full group overflow-hidden">
                <Image
                  src={images.features.personalized[0]}
                  alt="Personalized Learning"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                />
              </div>
              <CardHeader className="flex justify-center">
                <Zap className="w-12 h-12 text-primary dark:text-secondary" />
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Personalized Learning</h3>
                <p className="text-muted-foreground">
                  AI tailors lessons and quizzes to your unique learning pace and style, ensuring you succeed.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism overflow-hidden h-full">
              <div className="relative h-40 w-full group overflow-hidden">
                <Image
                  src={images.features.search[0]}
                  alt="Smart Search"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                />
              </div>
              <CardHeader className="flex justify-center">
                <Brain className="w-12 h-12 text-primary dark:text-secondary" />
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Smart Search</h3>
                <p className="text-muted-foreground">
                  [Perplexity AI Placeholder] Instantly find answers and resources with AI-driven search.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism overflow-hidden h-full">
              <div className="relative h-40 w-full group overflow-hidden">
                <Image
                  src={images.features.gamified[0]}
                  alt="Gamified Experience"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                />
              </div>
              <CardHeader className="flex justify-center">
                <Target className="w-12 h-12 text-primary dark:text-secondary" />
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Gamified Experience</h3>
                <p className="text-muted-foreground">
                  Earn badges and rewards as you learn, keeping you motivated with AI-driven gamification.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism overflow-hidden h-full">
              <div className="relative h-40 w-full group overflow-hidden">
                <Image
                  src={images.features.secure[0]}
                  alt="Secure Platform"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                />
              </div>
              <CardHeader className="flex justify-center">
                <Shield className="w-12 h-12 text-primary dark:text-secondary" />
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Safe</h3>
                <p className="text-muted-foreground">
                  Your data is protected with state-of-the-art security, ensuring a safe learning environment.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Accessibility Commitment */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan relative">
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-primary-foreground mb-8">
            Accessibility for Everyone
          </h2>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-primary-foreground mb-4">
                  AI-Powered Accessibility
                </h3>
                <p className="text-primary-foreground/90 mb-4">
                  BIPOCA AI leverages advanced AI to create Individualized Education Programs (IEPs) for students with special needs, including those with Intellectual and Developmental Disabilities (IDD). Our platform supports voice navigation, screen reader enhancements, and calming tools to ensure learning is accessible to all.
                </p>
                <p className="text-primary-foreground/90">
                  With universal design principles, we make education inclusive for everyone, regardless of ability or device.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <div className="relative w-full max-w-md h-64 rounded-lg shadow-glow overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 scale-105 group-hover:scale-100" />
                  <Image
                    src={images.accessibility[0]}
                    alt="Accessibility Features Demo"
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism">
                  <CardHeader className="flex justify-center">
                    <Accessibility className="w-12 h-12 text-primary dark:text-secondary" />
                  </CardHeader>
                  <CardContent className="text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">AI for IEPs</h3>
                    <p className="text-primary-foreground/90">
                      Personalized IEPs for students with special needs, powered by AI.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism">
                  <CardHeader className="flex justify-center">
                    <Brain className="w-12 h-12 text-primary dark:text-secondary" />
                  </CardHeader>
                  <CardContent className="text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">IDD Support</h3>
                    <p className="text-primary-foreground/90">
                      AI tools for students with Intellectual and Developmental Disabilities.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism">
                  <CardHeader className="flex justify-center">
                    <Target className="w-12 h-12 text-primary dark:text-secondary" />
                  </CardHeader>
                  <CardContent className="text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">Universal Design</h3>
                    <p className="text-primary-foreground/90">
                      Inclusive design for all abilities and devices.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach & Device Compatibility */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
          Learn Anywhere, on Any Device
        </h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-md h-64 rounded-lg shadow-glow overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 scale-105 group-hover:scale-100" />
                <Image
                  src={images.devices[0]}
                  alt="Multi-Device Access Demo"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
              </div>
            </motion.div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Education Without Borders
              </h3>
              <p className="text-muted-foreground mb-4">
                Whether you’re on a desktop in New York, a tablet in Nairobi, or a smartphone in Tokyo, BIPOCA AI delivers a seamless learning experience. Our platform is optimized for all devices, ensuring education is accessible to everyone, everywhere.
              </p>
              <p className="text-muted-foreground">
                With AI-driven optimizations, we adapt to your device and network conditions, providing uninterrupted access to learning resources—no matter where you are.
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Smartphone className="w-16 h-16 text-primary dark:text-secondary" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Globe className="w-16 h-16 text-primary dark:text-secondary" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials & Impact */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gray-dark dark:bg-gradient-gray-dark">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
          Our Community & Impact
        </h2>
        <div className="max-w-7xl mx-auto">
          {/* Testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { name: "Sarah M., Student", quote: "BIPOCA AI made learning Black history so engaging! The platform is intuitive and accessible on my phone.", image: images.testimonials.student[0] },
              { name: "John D., Teacher", quote: "I love how easy it is to create quizzes and lessons. My students are thriving with the AI tools!", image: images.testimonials.teacher[0] },
              { name: "Emily R., Parent", quote: "The IEP support and mental health tools have been a game-changer for my child's education.", image: images.testimonials.parent[0] },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2, type: "spring", stiffness: 100 }}
              >
                <Card className="bg-card border-secondary dark:border-primary shadow-glow glassmorphism overflow-hidden group hover:shadow-xl transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 scale-105 group-hover:scale-100" />
                  <div className="relative h-40 w-full group overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.name} Testimonial`}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={85}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl text-foreground">{testimonial.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          {/* Impact Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-4xl font-orbitron font-bold text-foreground">1M+</p>
              <p className="text-muted-foreground">Students Empowered Globally</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-4xl font-orbitron font-bold text-foreground">500K+</p>
              <p className="text-muted-foreground">Lessons Delivered Worldwide</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-4xl font-orbitron font-bold text-foreground">10K+</p>
              <p className="text-muted-foreground">Teachers Supported Globally</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner Ecosystem */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
          Our Trusted Partners
        </h2>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="flex items-center gap-4"
          >
            <Image
              src={partnerLogos.blackfacts}
              alt="BlackFacts.com Logo"
              width={50}
              height={50}
              className="object-contain transition-all duration-500 hover:opacity-90"
            />
            <p className="text-xl font-semibold text-foreground">BlackFacts.com</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <Image
              src={partnerLogos.fau}
              alt="Friends of the African Union Logo"
              width={50}
              height={50}
              className="object-contain transition-all duration-500 hover:opacity-90"
            />
            <p className="text-xl font-semibold text-foreground">Friends of the African Union</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <Image
              src={partnerLogos.legacy}
              alt="Legacy Education Logo"
              width={50}
              height={50}
              className="object-contain transition-all duration-500 hover:opacity-90"
            />
            <p className="text-xl font-semibold text-foreground">Legacy Education</p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan text-center">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
          Our Mission & Vision
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
          BIPOCA AI is on a mission to break down educational barriers for Black, Indigenous, People of Color, and Allies worldwide. We envision a future where education is limitless, powered by AI to provide personalized, accessible learning for every individual, regardless of location, device, or ability.
        </p>
        <Link href="/about">
          <Button className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground shadow-glow">
            Learn More About Us
          </Button>
        </Link>
      </section>

      {/* Final Call-to-Action */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background text-center">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4 dark:[color:oklch(0.80_0.05_50)]">
          Ready to Transform Education?
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto dark:[color:oklch(0.60_0.05_50)]">
          Join millions of learners, educators, and districts using BIPOCA AI to empower the next generation. Start your journey today!
        </p>
        <Link href="/signup">
          <Button className="px-8 py-4 text-lg font-semibold rounded-lg bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground shadow-glow">
            Join BIPOCA AI Now
          </Button>
        </Link>
      </section>

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
}