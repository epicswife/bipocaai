"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/homepage/hero-section/hero-section";
import FeaturedLessonSection from "@/components/homepage/featured-lesson-section/featured-lesson-section";
import RoleBasedSections from "@/components/homepage/role-based-sections/role-based-sections";
import Testimonials from "@/components/homepage/testimonials/testimonials";
import CTA from "@/components/homepage/cta/cta";
import CookieConsent from "@/components/features/cookie-consent/cookie-consent";
import { Course } from "@/lib/types";
import { fetchBlackFactsLessons } from "@/services/blackfacts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, BookOpen, Heart, Globe, Zap, Brain, Target, Shield, GraduationCap, Smartphone, Accessibility } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Partner logos (using real paths for assets)
const partnerLogos = {
  blackfacts: "/assets/partners/blackfacts-logo.png",
  fau: "/assets/partners/fau-logo.png",
  legacy: "/assets/partners/legacy-education-logo.png",
};

export default function HomePage() {
  const [lessons, setLessons] = useState<Course[]>([]);

  useEffect(() => {
    const loadLessons = async () => {
      const fetchedLessons = await fetchBlackFactsLessons();
      setLessons(fetchedLessons.filter((lesson) => lesson.isFeatured));
    };
    loadLessons();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Updated in previous steps, kept for continuity */}
      <HeroSection />

      {/* Featured Lessons Section - Updated in previous steps */}
      <FeaturedLessonSection lessons={lessons} />

      {/* Why Choose BIPOCA AI */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gray-dark dark:bg-gradient-gray-dark visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
          Why Choose BIPOCA AI?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
              <CardHeader className="flex justify-center">
                <Users className="w-12 h-12 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary" />
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Inclusive Learning</h3>
                <p className="text-muted-foreground">
                  Designed for Black, Indigenous, People of Color, and Allies, ensuring education for all, no matter where they are.
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
            <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
              <CardHeader className="flex justify-center">
                <BookOpen className="w-12 h-12 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary" />
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Rich Content</h3>
                <p className="text-muted-foreground">
                  Access lessons from BlackFacts.com, Legacy Education, and more, with live classrooms and interactive quizzes.
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
            <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
              <CardHeader className="flex justify-center">
                <Heart className="w-12 h-12 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary" />
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Supportive Community</h3>
                <p className="text-muted-foreground">
                  Chat with peers, access mental health tools, and join a global community of learners from anywhere.
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
            <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
              <CardHeader className="flex justify-center">
                <Globe className="w-12 h-12 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary" />
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Global Access</h3>
                <p className="text-muted-foreground">
                  Learn anytime, anywhere, on any device—desktop, tablet, or smartphone—with full accessibility.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Role-Based Sections - Updated in previous steps */}
      <RoleBasedSections />

      {/* Accessibility Features with AI Emphasis */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
          AI-Driven Accessibility for All
        </h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Personalized Learning with AI
              </h3>
              <p className="text-muted-foreground mb-4">
                Our advanced AI technology creates Individualized Education Programs (IEPs) tailored to each student’s needs. We support students with Intellectual and Developmental Disabilities (IDD) and other accessibility constraints, ensuring everyone can thrive.
              </p>
              <p className="text-muted-foreground">
                Features like voice navigation, screen reader enhancements, and calming tools are powered by AI to make learning accessible for all, no matter the challenge.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-md h-64 bg-muted rounded-lg shadow-glow">
                <span className="absolute inset-0 flex items-center justify-center text-foreground">
                  Accessibility Features Demo (Video Placeholder)
                </span>
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
              <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
                <CardHeader className="flex justify-center">
                  <Accessibility className="w-12 h-12 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary" />
                </CardHeader>
                <CardContent className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">AI for IEPs</h3>
                  <p className="text-muted-foreground">
                    Our AI creates customized IEPs for students with special needs, ensuring personalized learning paths.
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
              <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
                <CardHeader className="flex justify-center">
                  <Brain className="w-12 h-12 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary" />
                </CardHeader>
                <CardContent className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Support for IDD</h3>
                  <p className="text-muted-foreground">
                    AI-driven tools assist students with Intellectual and Developmental Disabilities, making education accessible.
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
              <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
                <CardHeader className="flex justify-center">
                  <Target className="w-12 h-12 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary" />
                </CardHeader>
                <CardContent className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Universal Design</h3>
                  <p className="text-muted-foreground">
                    Built with universal design principles to ensure accessibility for all abilities and devices.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
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
              <div className="relative w-full max-w-md h-64 bg-muted rounded-lg shadow-glow">
                <span className="absolute inset-0 flex items-center justify-center text-foreground">
                  Multi-Device Access Demo (Image Placeholder)
                </span>
              </div>
            </motion.div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Global Access for Everyone
              </h3>
              <p className="text-muted-foreground mb-4">
                BIPOCA AI is designed to work seamlessly on any device—whether you’re on a desktop in New York, a tablet in Nairobi, or a smartphone in Tokyo. Our platform ensures that education is accessible to everyone, no matter where you are or what device you use.
              </p>
              <p className="text-muted-foreground">
                With adaptive design and AI-driven optimizations, we deliver a consistent, high-quality learning experience across all platforms, ensuring no one is left behind.
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
              <Smartphone className="w-16 h-16 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GraduationCap className="w-16 h-16 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials - Will be updated in the next step */}
      <Testimonials />

      {/* AI Integration Highlights */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
          Powered by Advanced AI
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
              <CardHeader className="flex justify-center">
                <Zap className="w-12 h-12 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary" />
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">AI-Powered Learning</h3>
                <p className="text-muted-foreground">
                  Personalized lesson plans and quizzes using advanced AI technology to adapt to your learning pace.
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
            <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
              <CardHeader className="flex justify-center">
                <Brain className="w-12 h-12 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary" />
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Smart Search (Perplexity AI)</h3>
                <p className="text-muted-foreground">
                  [Perplexity AI Placeholder] Instantly find answers and resources with AI-driven search capabilities.
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
            <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
              <CardHeader className="flex justify-center">
                <Target className="w-12 h-12 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary" />
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Gamified Learning</h3>
                <p className="text-muted-foreground">
                  Earn badges and rewards as you progress, keeping you motivated with AI-driven gamification.
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
            <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
              <CardHeader className="flex justify-center">
                <Shield className="w-12 h-12 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary" />
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Secure Platform</h3>
                <p className="text-muted-foreground">
                  Your data is protected with state-of-the-art security, ensuring a safe learning environment.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gray-dark dark:bg-gradient-gray-dark visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
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
      </section>

      {/* Partner Highlights */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
          Our Trusted Partners
        </h2>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <Image
              src={partnerLogos.blackfacts}
              alt="BlackFacts.com Logo"
              width={50}
              height={50}
              className="object-contain"
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
              className="object-contain"
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
              className="object-contain"
            />
            <p className="text-xl font-semibold text-foreground">Legacy Education</p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark text-center">
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
          Our Mission
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          BIPOCA AI is dedicated to breaking down educational barriers for Black, Indigenous, People of Color, and Allies worldwide. We provide free, inclusive, AI-driven learning for students, teachers, and parents, with advanced tools for districts to ensure every learner succeeds—anywhere, anytime, on any device.
        </p>
        <Link href="/about">
          <Button className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground shadow-glow">
            Learn More About Us
          </Button>
        </Link>
      </section>

      {/* Final CTA - Updated in previous steps */}
      <CTA />

      {/* Cookie Consent - Updated in previous steps */}
      <CookieConsent />
    </div>
  );
}