"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Users, BookOpen, Award, Lightbulb } from "lucide-react";

export default function EducatorsPage() {
  const educatorResources = [
    {
      title: "Professional Development",
      description: "Continuous learning opportunities for educators",
      features: ["Monthly Workshops", "Peer Learning Groups", "Expert Webinars", "Certification Programs"],
      icon: <Award className="w-8 h-8" />
    },
    {
      title: "Curriculum Resources",
      description: "Ready-to-use culturally responsive lesson plans",
      features: ["Lesson Plan Library", "Assessment Tools", "Multimedia Resources", "Activity Guides"],
      icon: <BookOpen className="w-8 h-8" />
    },
    {
      title: "Community Support",
      description: "Connect with like-minded educators worldwide",
      features: ["Discussion Forums", "Mentorship Program", "Best Practice Sharing", "Collaborative Projects"],
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Innovation Lab",
      description: "Experiment with cutting-edge educational technology",
      features: ["AI Tools", "VR Experiences", "Interactive Simulations", "Beta Testing"],
      icon: <Lightbulb className="w-8 h-8" />
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
              For Educators
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Empower your teaching with culturally responsive resources, professional development, and a supportive community of educators.
            </p>
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
              Join Educator Community
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Educator Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Resources for Educators
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create inclusive, engaging learning experiences.
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
                  <CardContent>
                    <h4 className="font-semibold text-foreground mb-3">What's Included:</h4>
                    <div className="space-y-2 mb-4">
                      {resource.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)] rounded-full" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                      Explore {resource.title}
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
