"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Heart, Users, BookOpen, AlertTriangle, MessageCircle, Shield } from "lucide-react";
import Link from "next/link";

export default function ParentsPage() {
  const parentResources = [
    {
      title: "Supporting Your Child's Mental Health",
      description: "Learn to recognize signs of mental health challenges and provide appropriate support",
      topics: ["Warning signs", "Communication strategies", "When to seek help", "Building resilience"],
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "Cultural Identity & Belonging",
      description: "Help your child develop a strong, positive cultural identity",
      topics: ["Identity development", "Dealing with discrimination", "Cultural pride", "Community connection"],
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Academic Stress Management",
      description: "Support your child through academic pressures and expectations",
      topics: ["Homework help", "Test anxiety", "Performance pressure", "Balance & boundaries"],
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Crisis Recognition & Response",
      description: "Know how to respond to mental health emergencies",
      topics: ["Crisis signs", "Emergency resources", "Safety planning", "Professional help"],
      icon: <AlertTriangle className="w-6 h-6" />
    }
  ];

  const supportServices = [
    {
      title: "Parent Support Groups",
      description: "Connect with other parents facing similar challenges",
      features: ["Peer support", "Shared experiences", "Expert facilitation", "Cultural understanding"]
    },
    {
      title: "Family Counseling",
      description: "Professional support for the whole family",
      features: ["Family therapy", "Communication skills", "Conflict resolution", "Cultural integration"]
    },
    {
      title: "Educational Workshops",
      description: "Learn practical skills for supporting your child",
      features: ["Expert-led sessions", "Interactive learning", "Take-home resources", "Q&A sessions"]
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
              Mental Health for Parents
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Resources and support to help you nurture your child's mental health while honoring your cultural values and family traditions.
            </p>
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
              Access Parent Resources
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Parent Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Essential Resources for Parents
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive guides to help you support your child's mental health and wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {parentResources.map((resource, index) => (
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
                      <h4 className="font-semibold text-foreground mb-2">Topics Covered:</h4>
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

      {/* Support Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Support Services for Parents
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional support and community connections for parents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-amber)]/20 dark:border-[var(--color-pan-green)]/20 shadow-glow text-center">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">{service.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 justify-center">
                          <Shield className="w-4 h-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button size="sm" className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-xl text-red-800 dark:text-red-200 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Emergency Mental Health Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Crisis Hotlines:</h4>
                  <div className="space-y-1 text-sm text-red-700 dark:text-red-300">
                    <p>• National Suicide Prevention Lifeline: 988</p>
                    <p>• Crisis Text Line: Text HOME to 741741</p>
                    <p>• BIPOC Mental Health: 1-800-XXX-XXXX</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">When to Seek Immediate Help:</h4>
                  <div className="space-y-1 text-sm text-red-700 dark:text-red-300">
                    <p>• Thoughts of self-harm or suicide</p>
                    <p>• Severe depression or anxiety</p>
                    <p>• Substance abuse concerns</p>
                    <p>• Behavioral changes or aggression</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <Link href="/mental-health/crisis">
                  <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    Crisis Resources
                  </Button>
                </Link>
                <Link href="/mental-health/appointments">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    Schedule Emergency Consultation
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
