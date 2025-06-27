"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, Clock, Star, Play } from "lucide-react";
import Link from "next/link";

export default function K12Page() {
  const gradeRanges = [
    {
      title: "Elementary (K-5)",
      description: "Foundation building with culturally responsive content",
      subjects: ["Reading & Language Arts", "Mathematics", "Science", "Social Studies", "Arts"],
      features: ["Interactive storytelling", "Gamified learning", "Visual learning aids", "Parent engagement tools"],
      color: "border-[var(--color-pan-green)]"
    },
    {
      title: "Middle School (6-8)",
      description: "Critical thinking and identity development",
      subjects: ["Advanced Mathematics", "Life Sciences", "World History", "Literature", "Technology"],
      features: ["Project-based learning", "Peer collaboration", "Identity exploration", "Career awareness"],
      color: "border-[var(--color-pan-amber)]"
    },
    {
      title: "High School (9-12)",
      description: "College and career preparation with cultural pride",
      subjects: ["Advanced Placement", "STEM Pathways", "College Prep", "Career Readiness", "Leadership"],
      features: ["College counseling", "Internship programs", "Scholarship guidance", "Leadership development"],
      color: "border-[var(--color-pan-red)]"
    }
  ];

  const featuredCourses = [
    {
      title: "African American History & Culture",
      grade: "6-12",
      duration: "Full Year",
      description: "Comprehensive exploration of African American contributions to society, from ancient civilizations to modern achievements.",
      topics: ["Ancient African Civilizations", "Civil Rights Movement", "Harlem Renaissance", "Modern Leaders"],
      difficulty: "Intermediate"
    },
    {
      title: "Indigenous Peoples & Traditions",
      grade: "K-12",
      duration: "Semester",
      description: "Respectful study of Indigenous cultures, traditions, and contributions across the Americas.",
      topics: ["Traditional Knowledge", "Cultural Practices", "Historical Perspectives", "Modern Communities"],
      difficulty: "All Levels"
    },
    {
      title: "STEM Through Cultural Lens",
      grade: "3-12",
      duration: "Full Year",
      description: "Science, technology, engineering, and math concepts taught through diverse cultural perspectives and examples.",
      topics: ["Ancient Mathematics", "Traditional Medicine", "Engineering Marvels", "Modern Innovations"],
      difficulty: "Progressive"
    },
    {
      title: "Global Literature & Voices",
      grade: "6-12",
      duration: "Full Year",
      description: "Literature from diverse authors and cultures, promoting global understanding and empathy.",
      topics: ["World Authors", "Cultural Narratives", "Poetry & Prose", "Contemporary Voices"],
      difficulty: "Intermediate"
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Standards-Aligned Curriculum",
      description: "All courses meet state and national education standards while incorporating cultural perspectives."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Learning",
      description: "Peer-to-peer learning opportunities that build community and shared understanding."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Personalized Pathways",
      description: "AI-driven recommendations that adapt to each student's learning style and interests."
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "Interactive Content",
      description: "Engaging multimedia content including videos, simulations, and virtual field trips."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-pan-green)]/10 to-[var(--color-pan-amber)]/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-orbitron font-bold text-foreground mb-6">
              K-12 Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive K-12 education that celebrates diversity, builds cultural pride, and prepares students for success in an interconnected world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
                Explore Courses
              </Button>
              <Button variant="outline" className="border-[var(--color-pan-green)] dark:border-[var(--color-pan-amber)] text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grade Ranges */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Programs by Grade Level
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Age-appropriate curricula designed to grow with your students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gradeRanges.map((range, index) => (
              <motion.div
                key={range.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full bg-card ${range.color} shadow-glow hover:shadow-xl transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">{range.title}</CardTitle>
                    <p className="text-muted-foreground">{range.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Core Subjects:</h4>
                      <div className="flex flex-wrap gap-2">
                        {range.subjects.map((subject) => (
                          <Badge key={subject} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {range.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)] rounded-full mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full mt-4 bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                      View Courses
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Featured K-12 Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Signature courses that exemplify our culturally responsive approach to education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl text-foreground flex-1">{course.title}</CardTitle>
                      <Badge variant="outline" className="ml-2">
                        {course.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        Grade {course.grade}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{course.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Course Topics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" className="bg-[var(--color-pan-green)]/10 text-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]/10 dark:text-[var(--color-pan-amber)] text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                        Start Course
                      </Button>
                      <Button variant="outline" className="border-[var(--color-pan-green)] dark:border-[var(--color-pan-amber)] text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Why Choose Our K-12 Programs?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Innovative features that make learning engaging, inclusive, and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-amber)]/20 dark:border-[var(--color-pan-green)]/20 shadow-glow text-center">
                  <CardHeader>
                    <div className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mx-auto mb-2">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Ready to Transform K-12 Education?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of educators who are already using BIPOCA AI to create more inclusive, engaging, and effective learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup?role=teacher">
                <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-[var(--color-pan-green)] dark:border-[var(--color-pan-amber)] text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                  Request Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
