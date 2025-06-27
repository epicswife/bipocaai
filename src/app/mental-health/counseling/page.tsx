"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Users, Calendar, MessageCircle, Video, Phone, Heart } from "lucide-react";
import Link from "next/link";

export default function CounselingPage() {
  const counselingServices = [
    {
      title: "Individual Counseling",
      description: "One-on-one sessions with culturally competent mental health professionals",
      features: ["Personalized treatment plans", "Cultural sensitivity", "Flexible scheduling", "Progress tracking"],
      duration: "50 minutes",
      availability: "7 days a week",
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      title: "Group Therapy",
      description: "Supportive group sessions focused on shared experiences and community healing",
      features: ["Peer support", "Shared experiences", "Community building", "Skill development"],
      duration: "90 minutes",
      availability: "Multiple times weekly",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Family Counseling",
      description: "Family-centered therapy that honors cultural values and family dynamics",
      features: ["Family systems approach", "Cultural integration", "Communication skills", "Conflict resolution"],
      duration: "60 minutes",
      availability: "Flexible scheduling",
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "Crisis Support",
      description: "Immediate support for mental health emergencies and crisis situations",
      features: ["24/7 availability", "Immediate response", "Safety planning", "Emergency resources"],
      duration: "As needed",
      availability: "24/7",
      icon: <Phone className="w-6 h-6" />
    }
  ];

  const sessionTypes = [
    {
      type: "In-Person",
      description: "Face-to-face sessions at our community centers",
      icon: <Users className="w-5 h-5" />,
      benefits: ["Personal connection", "Full non-verbal communication", "Comfortable environment"]
    },
    {
      type: "Video Call",
      description: "Secure video sessions from the comfort of your home",
      icon: <Video className="w-5 h-5" />,
      benefits: ["Convenience", "Privacy", "Accessibility", "Flexible scheduling"]
    },
    {
      type: "Phone Call",
      description: "Voice-only sessions for maximum accessibility",
      icon: <Phone className="w-5 h-5" />,
      benefits: ["No technology barriers", "Complete privacy", "Available anywhere"]
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
              Counseling Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Access professional mental health support from culturally competent counselors who understand your unique experiences and background.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mental-health/appointments">
                <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
                  Schedule Appointment
                </Button>
              </Link>
              <Link href="/mental-health/crisis">
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                  Crisis Support
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Counseling Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Our Counseling Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive mental health support tailored to your needs and cultural background.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {counselingServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                        {service.icon}
                      </div>
                      <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{service.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="bg-[var(--color-pan-green)]/10 text-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]/10 dark:text-[var(--color-pan-amber)] text-xs">
                        {service.duration}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {service.availability}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">What's Included:</h4>
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)] rounded-full" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
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

      {/* Session Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Flexible Session Options
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the format that works best for you and your schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sessionTypes.map((session, index) => (
              <motion.div
                key={session.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-amber)]/20 dark:border-[var(--color-pan-green)]/20 shadow-glow text-center">
                  <CardHeader>
                    <div className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mx-auto mb-2">
                      {session.icon}
                    </div>
                    <CardTitle className="text-lg text-foreground">{session.type}</CardTitle>
                    <p className="text-muted-foreground text-sm">{session.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {session.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 justify-center">
                          <div className="w-1.5 h-1.5 bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)] rounded-full" />
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
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
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Ready to Start Your Healing Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step towards better mental health with culturally competent support that understands your unique experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mental-health/appointments">
                <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/mental-health/resources">
                <Button variant="outline" className="border-[var(--color-pan-green)] dark:border-[var(--color-pan-amber)] text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                  View Resources
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
