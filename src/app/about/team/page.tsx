"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, Users, Award, Globe } from "lucide-react";
import Link from "next/link";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export default function TeamPage() {
  const leadership: TeamMember[] = [
    {
      name: "Dr. Amara Johnson",
      role: "CEO & Founder",
      bio: "Educational technology visionary with 15+ years experience in AI-driven learning platforms. Former Director of Educational Innovation at Stanford University.",
      expertise: ["Educational Technology", "AI in Learning", "Inclusive Education"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "amara@bipoca-ai.org"
      }
    },
    {
      name: "Marcus Williams",
      role: "CTO & Co-Founder",
      bio: "Full-stack engineer and AI researcher specializing in personalized learning algorithms. Previously led engineering teams at Google Education.",
      expertise: ["Machine Learning", "Educational AI", "Platform Architecture"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "marcus@bipoca-ai.org"
      }
    },
    {
      name: "Dr. Keisha Thompson",
      role: "Chief Academic Officer",
      bio: "Curriculum design expert with deep expertise in culturally responsive pedagogy. Former professor at Howard University's School of Education.",
      expertise: ["Curriculum Design", "Cultural Pedagogy", "Assessment"],
      social: {
        linkedin: "#",
        email: "keisha@bipoca-ai.org"
      }
    },
    {
      name: "David Chen",
      role: "Head of Product",
      bio: "Product strategist focused on accessible design and user experience. Champion of inclusive technology with background in assistive technologies.",
      expertise: ["Product Strategy", "UX Design", "Accessibility"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "david@bipoca-ai.org"
      }
    }
  ];

  const advisors: TeamMember[] = [
    {
      name: "Dr. Maya Patel",
      role: "Educational Advisor",
      bio: "Former UNESCO Director of Education Technology, expert in global education initiatives and digital equity.",
      expertise: ["Global Education", "Digital Equity", "Policy"],
      social: { linkedin: "#" }
    },
    {
      name: "Prof. James Whitehorse",
      role: "Cultural Advisor",
      bio: "Indigenous education specialist and advocate for traditional knowledge integration in modern curricula.",
      expertise: ["Indigenous Education", "Cultural Integration", "Traditional Knowledge"],
      social: { linkedin: "#" }
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
              Meet Our Leadership Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate educators, technologists, and advocates united in our mission to revolutionize education through AI and cultural inclusion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Users className="w-8 h-8 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
              Leadership Team
            </h2>
            <p className="text-lg text-muted-foreground">
              The visionaries driving BIPOCA AI's mission forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {leadership.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">{member.name}</CardTitle>
                    <p className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-semibold">{member.role}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{member.bio}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-[var(--color-pan-green)]/10 text-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]/10 dark:text-[var(--color-pan-amber)]">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      {member.social.linkedin && (
                        <Button size="sm" variant="outline" className="p-2">
                          <Linkedin className="w-4 h-4" />
                        </Button>
                      )}
                      {member.social.twitter && (
                        <Button size="sm" variant="outline" className="p-2">
                          <Twitter className="w-4 h-4" />
                        </Button>
                      )}
                      {member.social.email && (
                        <Button size="sm" variant="outline" className="p-2">
                          <Mail className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Advisory Board */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Award className="w-8 h-8 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
              Advisory Board
            </h2>
            <p className="text-lg text-muted-foreground">
              Distinguished experts guiding our strategic direction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-amber)]/20 dark:border-[var(--color-pan-green)]/20 shadow-glow">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">{advisor.name}</CardTitle>
                    <p className="text-[var(--color-pan-amber)] dark:text-[var(--color-pan-green)] font-semibold">{advisor.role}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{advisor.bio}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {advisor.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-amber)] dark:bg-[var(--color-pan-green)]/10 dark:text-[var(--color-pan-green)]">
                          {skill}
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

      {/* Join Our Team CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">Join Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're always looking for passionate individuals who share our vision of inclusive, AI-powered education.
          </p>
          <Link href="/about/careers">
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
              View Open Positions
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
