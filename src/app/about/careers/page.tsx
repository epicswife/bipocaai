"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Users, Heart, Lightbulb, Globe, Award } from "lucide-react";

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Lead the development of our AI-powered personalization engine and learning analytics platform.",
      requirements: ["5+ years ML/AI experience", "Python, TensorFlow", "Educational technology background preferred"],
      posted: "2 days ago"
    },
    {
      title: "Curriculum Designer",
      department: "Education",
      location: "Remote / Atlanta",
      type: "Full-time", 
      description: "Design culturally responsive curricula and educational content for diverse learning communities.",
      requirements: ["M.Ed or equivalent", "Curriculum design experience", "Cultural competency expertise"],
      posted: "1 week ago"
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote / New York",
      type: "Full-time",
      description: "Create accessible, inclusive user experiences that serve learners of all abilities and backgrounds.",
      requirements: ["3+ years UX design", "Accessibility expertise", "Educational product experience"],
      posted: "3 days ago"
    },
    {
      title: "Community Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Build and nurture our global community of educators, students, and families.",
      requirements: ["Community management experience", "Social media expertise", "Multilingual preferred"],
      posted: "5 days ago"
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours and quarterly team retreats"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Learning & Development",
      description: "$2,000 annual learning budget and conference attendance support"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Equity & Ownership",
      description: "Competitive equity packages and profit-sharing opportunities"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Inclusive Environment",
      description: "Diverse team with strong commitment to equity and inclusion"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Work-Life Balance",
      description: "Unlimited PTO, parental leave, and sabbatical opportunities"
    }
  ];

  const values = [
    {
      title: "Educational Equity",
      description: "We believe every learner deserves access to high-quality, culturally responsive education."
    },
    {
      title: "Innovation with Purpose",
      description: "We use cutting-edge technology to solve real educational challenges and create meaningful impact."
    },
    {
      title: "Inclusive Excellence",
      description: "We celebrate diversity and create environments where everyone can thrive and contribute their best work."
    },
    {
      title: "Community-Centered",
      description: "We build with and for communities, ensuring our solutions meet real needs and create lasting change."
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
              Join Our Mission
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Help us revolutionize education through AI and cultural inclusion. Build technology that empowers learners worldwide.
            </p>
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
              View Open Positions
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and shape our culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Briefcase className="w-8 h-8 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
              Open Positions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our team and help shape the future of education.
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{position.title}</h3>
                          <Badge variant="secondary" className="bg-[var(--color-pan-green)]/10 text-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]/10 dark:text-[var(--color-pan-amber)]">
                            {position.department}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {position.type}
                          </div>
                          <span>Posted {position.posted}</span>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{position.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {position.requirements.map((req) => (
                            <Badge key={req} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="lg:ml-6">
                        <Button className="w-full lg:w-auto bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Benefits & Perks
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We invest in our team's success, growth, and well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-amber)]/20 dark:border-[var(--color-pan-green)]/20 shadow-glow text-center">
                  <CardHeader>
                    <div className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mx-auto mb-2">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-lg text-foreground">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Don't See Your Role?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for talented individuals who are passionate about education and technology. 
              Send us your resume and let us know how you'd like to contribute to our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
                Send General Application
              </Button>
              <Button variant="outline" className="border-[var(--color-pan-green)] dark:border-[var(--color-pan-amber)] text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                Join Our Talent Network
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
