"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { GraduationCap, Users, Brain, Shield, BookOpen, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function EducatorsPage() {
  const educatorResources = [
    {
      title: "Recognizing Mental Health in Students",
      description: "Learn to identify early warning signs and provide appropriate support",
      topics: ["Behavioral indicators", "Academic changes", "Social withdrawal", "Cultural considerations"],
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Creating Inclusive Classrooms",
      description: "Build environments that support mental health and cultural identity",
      topics: ["Inclusive practices", "Cultural responsiveness", "Safe spaces", "Trauma-informed teaching"],
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Crisis Response in Schools",
      description: "Protocols and procedures for mental health emergencies",
      topics: ["Crisis identification", "Immediate response", "Professional referrals", "Follow-up care"],
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      title: "Self-Care for Educators",
      description: "Maintain your own mental health while supporting students",
      topics: ["Burnout prevention", "Stress management", "Work-life balance", "Professional support"],
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const professionalDevelopment = [
    {
      title: "Mental Health First Aid for Educators",
      duration: "8 hours",
      format: "Workshop",
      description: "Comprehensive training in mental health crisis response and support strategies"
    },
    {
      title: "Trauma-Informed Teaching Practices",
      duration: "6 hours",
      format: "Online Course",
      description: "Understanding trauma's impact on learning and implementing supportive practices"
    },
    {
      title: "Cultural Competency in Mental Health",
      duration: "4 hours",
      format: "Webinar Series",
      description: "Developing cultural awareness and sensitivity in mental health support"
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
              Mental Health for Educators
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Equip yourself with the knowledge and tools to support student mental health while maintaining your own wellbeing in culturally responsive ways.
            </p>
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
              Access Educator Resources
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Educator Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Essential Resources for Educators
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive guides to help you support student mental health in your classroom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educatorResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                        {resource.icon}
                      </div>
                      <CardTitle className="text-xl text-foreground">{resource.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{resource.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Key Topics:</h4>
                      <div className="space-y-2">
                        {resource.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)] rounded-full" />
                            <span className="text-sm text-muted-foreground">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Development */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Professional Development Opportunities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enhance your skills with specialized training in mental health support for educators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {professionalDevelopment.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-amber)]/20 dark:border-[var(--color-pan-green)]/20 shadow-glow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <GraduationCap className="w-6 h-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                      <Badge variant="secondary" className="bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-amber)] dark:bg-[var(--color-pan-green)]/10 dark:text-[var(--color-pan-green)] text-xs">
                        {course.format}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-foreground">{course.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{course.duration}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                    <Button className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800 dark:text-blue-200 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Quick Reference Guide for Educators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Warning Signs to Watch For:</h4>
                  <div className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    <p>• Sudden changes in academic performance</p>
                    <p>• Social withdrawal or isolation</p>
                    <p>• Increased absences or tardiness</p>
                    <p>• Changes in behavior or mood</p>
                    <p>• Expressions of hopelessness</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Immediate Actions:</h4>
                  <div className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    <p>• Listen without judgment</p>
                    <p>• Validate their feelings</p>
                    <p>• Maintain confidentiality appropriately</p>
                    <p>• Connect with school counselor</p>
                    <p>• Document observations</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <Link href="/mental-health/crisis">
                  <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    Crisis Protocols
                  </Button>
                </Link>
                <Link href="/mental-health/resources">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Resource Library
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
