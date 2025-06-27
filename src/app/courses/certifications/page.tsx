"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Award, Clock, Users, CheckCircle } from "lucide-react";

export default function CertificationsPage() {
  const certificationTracks = [
    {
      title: "Cultural Competency Educator",
      duration: "6 months",
      level: "Professional",
      description: "Comprehensive certification for educators in culturally responsive teaching practices.",
      modules: ["Cultural Awareness", "Inclusive Curriculum Design", "Assessment Strategies", "Family Engagement"],
      requirements: ["Teaching Experience", "Portfolio Submission", "Peer Review", "Final Assessment"]
    },
    {
      title: "AI-Enhanced Learning Specialist",
      duration: "4 months",
      level: "Advanced",
      description: "Master the integration of AI tools in educational settings for personalized learning.",
      modules: ["AI in Education", "Data Analytics", "Personalization Strategies", "Ethics & Privacy"],
      requirements: ["Technical Background", "Project Completion", "Case Study", "Certification Exam"]
    },
    {
      title: "Diversity & Inclusion Leader",
      duration: "8 months",
      level: "Leadership",
      description: "Develop skills to lead diversity and inclusion initiatives in educational institutions.",
      modules: ["Leadership Theory", "Change Management", "Policy Development", "Community Building"],
      requirements: ["Leadership Experience", "Capstone Project", "Mentorship", "Presentation"]
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
              Certification Tracks
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Advance your career with industry-recognized certifications in culturally responsive education and AI-enhanced learning.
            </p>
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
              View All Certifications
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Certification Tracks */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Professional Certification Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Structured learning paths designed for educational professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificationTracks.map((track, index) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-6 h-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                      <Badge variant="secondary" className="bg-[var(--color-pan-green)]/10 text-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]/10 dark:text-[var(--color-pan-amber)]">
                        {track.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-foreground">{track.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {track.duration}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{track.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Core Modules:</h4>
                      <div className="space-y-1">
                        {track.modules.map((module, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                            <span className="text-sm text-muted-foreground">{module}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {track.requirements.map((req) => (
                          <Badge key={req} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
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
    </div>
  );
}
