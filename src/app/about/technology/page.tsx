"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Brain, Cloud, Shield, Zap, Database, Globe, Cpu, Lock } from "lucide-react";
import Link from "next/link";

export default function TechnologyPage() {
  const technologies = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Advanced AI & Machine Learning",
      description: "Sophisticated algorithms that adapt to individual learning patterns and optimize educational outcomes.",
      features: [
        "Natural Language Processing for content analysis",
        "Predictive analytics for learning path optimization",
        "Computer vision for accessibility features",
        "Sentiment analysis for engagement tracking"
      ],
      stack: ["TensorFlow", "PyTorch", "OpenAI GPT", "Hugging Face"]
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud-Native Architecture",
      description: "Scalable, reliable infrastructure that delivers consistent performance worldwide.",
      features: [
        "Auto-scaling for peak performance",
        "Global CDN for fast content delivery",
        "Microservices architecture",
        "Real-time synchronization"
      ],
      stack: ["Next.js 15", "Cloudflare", "Firebase", "Vercel"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy & Security",
      description: "Enterprise-grade security protecting student data with zero-trust architecture.",
      features: [
        "End-to-end encryption",
        "COPPA & FERPA compliance",
        "Regular security audits",
        "Granular access controls"
      ],
      stack: ["OAuth 2.0", "JWT", "AES-256", "SOC 2"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Accessibility & Inclusion",
      description: "Universal design principles ensuring education is accessible to all learners.",
      features: [
        "Screen reader compatibility",
        "Voice navigation support",
        "Multi-language interface",
        "Cognitive accessibility features"
      ],
      stack: ["WCAG 2.1 AA", "ARIA", "Web Speech API", "i18n"]
    }
  ];

  const infrastructure = [
    {
      component: "Frontend",
      description: "React-based progressive web app with offline capabilities",
      technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"]
    },
    {
      component: "Backend",
      description: "Serverless functions with real-time data synchronization",
      technologies: ["Cloudflare Workers", "Firebase Functions", "Node.js", "GraphQL"]
    },
    {
      component: "Database",
      description: "Multi-model database supporting structured and unstructured data",
      technologies: ["Firestore", "Cloudflare KV", "Redis", "Vector DB"]
    },
    {
      component: "AI/ML",
      description: "Machine learning pipeline for personalization and analytics",
      technologies: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy"]
    }
  ];

  const performance = [
    { metric: "Page Load Time", value: "<2s", description: "Average global load time" },
    { metric: "Uptime", value: "99.9%", description: "Service availability" },
    { metric: "Response Time", value: "<100ms", description: "API response time" },
    { metric: "Scalability", value: "1M+", description: "Concurrent users supported" }
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
              Our Technology Stack
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge technology infrastructure designed for scale, security, and accessibility in educational environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Technologies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Core Technologies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The technological foundation that powers personalized, accessible education at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                        {tech.icon}
                      </div>
                      <CardTitle className="text-xl text-foreground">{tech.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {tech.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)] rounded-full mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Technology Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tech.stack.map((item) => (
                          <Badge key={item} variant="secondary" className="bg-[var(--color-pan-green)]/10 text-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]/10 dark:text-[var(--color-pan-amber)]">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Infrastructure Overview
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Modern, scalable architecture built for educational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infrastructure.map((component, index) => (
              <motion.div
                key={component.component}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-amber)]/20 dark:border-[var(--color-pan-green)]/20 shadow-glow">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">{component.component}</CardTitle>
                    <p className="text-sm text-muted-foreground">{component.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {component.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Performance & Reliability
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for speed, reliability, and scale to support millions of learners worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performance.map((metric, index) => (
              <motion.div
                key={metric.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 bg-gradient-to-br from-[var(--color-pan-green)]/10 to-[var(--color-pan-amber)]/10 border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20">
                  <div className="text-3xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mb-2">
                    {metric.value}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-1">{metric.metric}</div>
                  <div className="text-sm text-muted-foreground">{metric.description}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Lock className="w-16 h-16 mx-auto mb-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Security & Compliance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              We maintain the highest standards of data protection and privacy, ensuring compliance with educational regulations worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {["COPPA", "FERPA", "GDPR", "SOC 2", "ISO 27001"].map((compliance) => (
                <Badge key={compliance} variant="secondary" className="bg-[var(--color-pan-green)]/10 text-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]/10 dark:text-[var(--color-pan-amber)] px-4 py-2">
                  {compliance}
                </Badge>
              ))}
            </div>
            <Link href="/legal/privacy">
              <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
                View Privacy Policy
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
