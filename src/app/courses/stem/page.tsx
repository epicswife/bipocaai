"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Atom, Calculator, Microscope, Cpu, Rocket, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function STEMPage() {
  const stemFields = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Mathematics",
      description: "From ancient counting systems to modern algorithms",
      courses: ["Algebra Through Culture", "Geometry in Architecture", "Statistics & Social Justice", "Calculus Applications"],
      color: "border-[var(--color-pan-green)]"
    },
    {
      icon: <Atom className="w-8 h-8" />,
      title: "Science",
      description: "Exploring natural phenomena through diverse perspectives",
      courses: ["Traditional Medicine & Chemistry", "Physics of Music", "Environmental Science", "Astronomy Across Cultures"],
      color: "border-[var(--color-pan-amber)]"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Technology",
      description: "Digital literacy and computational thinking",
      courses: ["Coding for Social Change", "AI Ethics", "Digital Storytelling", "Cybersecurity Fundamentals"],
      color: "border-[var(--color-pan-red)]"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Engineering",
      description: "Design thinking and problem-solving",
      courses: ["Sustainable Design", "Biomedical Engineering", "Civil Engineering Projects", "Robotics & Automation"],
      color: "border-[var(--color-pan-green)]"
    }
  ];

  const featuredPrograms = [
    {
      title: "BIPOC Scientists & Innovators",
      description: "Celebrating contributions of BIPOC scientists throughout history and today",
      highlights: ["Hidden Figures in STEM", "Modern Innovators", "Research Spotlights", "Career Pathways"],
      level: "All Levels"
    },
    {
      title: "Indigenous Knowledge Systems",
      description: "Traditional ecological knowledge and sustainable practices",
      highlights: ["Traditional Medicine", "Sustainable Agriculture", "Environmental Stewardship", "Astronomical Knowledge"],
      level: "Middle & High School"
    },
    {
      title: "STEM for Social Justice",
      description: "Using STEM skills to address community challenges",
      highlights: ["Data for Equity", "Environmental Justice", "Health Disparities", "Technology Access"],
      level: "High School & Beyond"
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
              STEM Excellence
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover STEM through diverse cultural lenses. Learn from BIPOC scientists, explore traditional knowledge systems, and use technology to create positive change.
            </p>
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
              Explore STEM Courses
            </Button>
          </motion.div>
        </div>
      </section>

      {/* STEM Fields */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              STEM Through Cultural Perspectives
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each STEM field enriched with diverse cultural contributions and perspectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stemFields.map((field, index) => (
              <motion.div
                key={field.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full bg-card ${field.color} shadow-glow hover:shadow-xl transition-all duration-300`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                        {field.icon}
                      </div>
                      <CardTitle className="text-xl text-foreground">{field.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{field.description}</p>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-foreground mb-3">Featured Courses:</h4>
                    <div className="space-y-2">
                      {field.courses.map((course, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)] rounded-full" />
                          <span className="text-sm text-muted-foreground">{course}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                      View {field.title} Courses
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Signature STEM Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized programs that highlight diverse contributions to STEM fields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-amber)]/20 dark:border-[var(--color-pan-green)]/20 shadow-glow">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">{program.title}</CardTitle>
                    <Badge variant="secondary" className="bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-amber)] dark:bg-[var(--color-pan-green)]/10 dark:text-[var(--color-pan-green)] w-fit">
                      {program.level}
                    </Badge>
                    <p className="text-muted-foreground">{program.description}</p>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-foreground mb-3">Program Highlights:</h4>
                    <div className="space-y-2 mb-4">
                      {program.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-[var(--color-pan-amber)] dark:text-[var(--color-pan-green)]" />
                          <span className="text-sm text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Microscope className="w-16 h-16 mx-auto mb-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Inspire the Next Generation of STEM Leaders
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our mission to make STEM education more inclusive, culturally responsive, and inspiring for all students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
                  Start Learning
                </Button>
              </Link>
              <Link href="/learn-more/teachers">
                <Button variant="outline" className="border-[var(--color-pan-green)] dark:border-[var(--color-pan-amber)] text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                  For Educators
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
