"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, Heart, Users, Globe, Lightbulb, Target, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ApproachPage() {
  const principles = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Culturally Responsive",
      description: "Education that honors and builds upon students' cultural backgrounds, experiences, and ways of knowing.",
      details: [
        "Inclusive curriculum reflecting diverse perspectives",
        "Culturally relevant examples and case studies",
        "Multiple ways of knowing and learning styles",
        "Community and family engagement"
      ]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Personalization",
      description: "Adaptive learning technology that adjusts to each student's unique needs, pace, and learning style.",
      details: [
        "Personalized learning paths",
        "Real-time difficulty adjustment",
        "Learning style recognition",
        "Predictive analytics for intervention"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community-Centered",
      description: "Learning happens best in supportive communities that foster collaboration and mutual growth.",
      details: [
        "Peer-to-peer learning opportunities",
        "Mentorship programs",
        "Family and community involvement",
        "Collaborative project-based learning"
      ]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Globally Accessible",
      description: "Breaking down barriers to quality education regardless of location, device, or ability.",
      details: [
        "Multi-language support",
        "Offline capability",
        "Accessibility features",
        "Low-bandwidth optimization"
      ]
    }
  ];

  const methodology = [
    {
      phase: "Assess",
      icon: <Target className="w-6 h-6" />,
      description: "Understanding each learner's starting point, goals, and preferences",
      color: "text-[var(--color-pan-green)]"
    },
    {
      phase: "Adapt",
      icon: <Brain className="w-6 h-6" />,
      description: "AI algorithms create personalized learning experiences",
      color: "text-[var(--color-pan-amber)]"
    },
    {
      phase: "Engage",
      icon: <Sparkles className="w-6 h-6" />,
      description: "Interactive, culturally relevant content keeps students motivated",
      color: "text-[var(--color-pan-red)]"
    },
    {
      phase: "Evaluate",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Continuous assessment and feedback for improvement",
      color: "text-[var(--color-pan-green)]"
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
              Our Educational Approach
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combining cutting-edge AI technology with culturally responsive pedagogy to create transformative learning experiences for every student.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Core Principles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our educational philosophy is built on four foundational principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                        {principle.icon}
                      </div>
                      <CardTitle className="text-xl text-foreground">{principle.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{principle.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {principle.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)] rounded-full mt-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Methodology */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Our Learning Methodology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A systematic approach that ensures every student receives personalized, effective education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((step, index) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-background border-2 border-current ${step.color} flex items-center justify-center shadow-lg`}>
                    {step.icon}
                  </div>
                  {index < methodology.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-current to-transparent opacity-30" />
                  )}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${step.color}`}>{step.phase}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Evidence */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-orbitron font-bold text-foreground mb-6">
                Research-Based Foundation
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our approach is grounded in decades of educational research, including work by leading scholars in culturally responsive pedagogy, adaptive learning, and educational technology.
                </p>
                <p>
                  We continuously collaborate with universities, research institutions, and educational experts to ensure our methods remain at the forefront of educational innovation.
                </p>
                <p>
                  Regular assessment and iteration based on student outcomes ensure our approach evolves with the needs of our learners.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/about/technology">
                  <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
                    Learn About Our Technology
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="text-center p-6 bg-[var(--color-pan-green)]/10 border-[var(--color-pan-green)]/20">
                <div className="text-3xl font-bold text-[var(--color-pan-green)] mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Student Engagement Rate</div>
              </Card>
              <Card className="text-center p-6 bg-[var(--color-pan-amber)]/10 border-[var(--color-pan-amber)]/20">
                <div className="text-3xl font-bold text-[var(--color-pan-amber)] mb-2">40%</div>
                <div className="text-sm text-muted-foreground">Faster Learning Progress</div>
              </Card>
              <Card className="text-center p-6 bg-[var(--color-pan-red)]/10 border-[var(--color-pan-red)]/20">
                <div className="text-3xl font-bold text-[var(--color-pan-red)] mb-2">89%</div>
                <div className="text-sm text-muted-foreground">Knowledge Retention</div>
              </Card>
              <Card className="text-center p-6 bg-[var(--color-pan-green)]/10 border-[var(--color-pan-green)]/20">
                <div className="text-3xl font-bold text-[var(--color-pan-green)] mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Student Satisfaction</div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
