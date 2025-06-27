"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Handshake, Building, Users, Globe, Award, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PartnersPage() {
  const partners = [
    {
      name: "BlackFacts.com",
      type: "Content Partner",
      description: "Leading source of African American history and cultural content, providing authentic educational materials.",
      logo: "/assets/partners/blackfacts-logo.svg",
      partnership: "Content integration and curriculum development",
      impact: "10,000+ historical articles and multimedia content"
    },
    {
      name: "Friends of the African Union",
      type: "Strategic Partner",
      description: "Global organization promoting African unity and development through education and cultural exchange.",
      logo: "/assets/partners/fau-logo.svg",
      partnership: "Global education initiatives and cultural programs",
      impact: "Reaching 54 African countries with educational content"
    },
    {
      name: "Legacy Education",
      type: "Curriculum Partner",
      description: "Specialized in developing culturally responsive educational materials and teacher training programs.",
      logo: "/assets/partners/legacy-education-logo.svg",
      partnership: "Curriculum design and teacher professional development",
      impact: "500+ educators trained in culturally responsive teaching"
    }
  ];

  const investors = [
    {
      name: "Education Innovation Fund",
      type: "Lead Investor",
      description: "Venture capital firm focused on transformative educational technology companies.",
      focus: "EdTech Innovation",
      stage: "Series A"
    },
    {
      name: "Diversity Capital Partners",
      type: "Strategic Investor",
      description: "Investment firm dedicated to supporting minority-led startups and inclusive technology.",
      focus: "Diversity & Inclusion",
      stage: "Seed"
    },
    {
      name: "Global Education Ventures",
      type: "Impact Investor",
      description: "Impact investment fund supporting scalable solutions for global education challenges.",
      focus: "Global Impact",
      stage: "Series A"
    }
  ];

  const collaborations = [
    {
      organization: "UNESCO",
      type: "International Collaboration",
      description: "Working together on global education initiatives and digital equity programs.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      organization: "National Education Association",
      type: "Professional Partnership",
      description: "Collaborating on teacher training and professional development programs.",
      icon: <Users className="w-6 h-6" />
    },
    {
      organization: "Code.org",
      type: "Technology Partnership",
      description: "Joint initiatives to promote computer science education in underserved communities.",
      icon: <Award className="w-6 h-6" />
    },
    {
      organization: "Boys & Girls Clubs of America",
      type: "Community Partnership",
      description: "Providing educational technology access to youth in community centers nationwide.",
      icon: <Heart className="w-6 h-6" />
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
              Partners & Investors
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Building the future of education through strategic partnerships and investments that amplify our impact worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Handshake className="w-8 h-8 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
              Strategic Partners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Organizations that share our vision and contribute to our educational mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <CardTitle className="text-xl text-foreground">{partner.name}</CardTitle>
                    <Badge variant="secondary" className="bg-[var(--color-pan-green)]/10 text-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]/10 dark:text-[var(--color-pan-amber)]">
                      {partner.type}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{partner.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Partnership Focus:</h4>
                      <p className="text-sm text-muted-foreground">{partner.partnership}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Impact:</h4>
                      <p className="text-sm text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-medium">{partner.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Building className="w-8 h-8 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
              Our Investors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visionary investors who believe in our mission to transform education through technology and inclusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investors.map((investor, index) => (
              <motion.div
                key={investor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-amber)]/20 dark:border-[var(--color-pan-green)]/20 shadow-glow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg text-foreground">{investor.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {investor.stage}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-amber)] dark:bg-[var(--color-pan-green)]/10 dark:text-[var(--color-pan-green)] w-fit">
                      {investor.type}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{investor.description}</p>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Investment Focus:</h4>
                      <p className="text-sm text-[var(--color-pan-amber)] dark:text-[var(--color-pan-green)] font-medium">{investor.focus}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Key Collaborations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Working with leading organizations to expand our reach and impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collaborations.map((collab, index) => (
              <motion.div
                key={collab.organization}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mt-1">
                        {collab.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{collab.organization}</h3>
                          <Badge variant="outline" className="text-xs">
                            {collab.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">{collab.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Partner With Us
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our mission to transform education and create opportunities for learners worldwide. 
              Whether you're an organization, investor, or educational institution, we'd love to explore collaboration opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
                  Become a Partner
                </Button>
              </Link>
              <Button variant="outline" className="border-[var(--color-pan-green)] dark:border-[var(--color-pan-amber)] text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                Investment Opportunities
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
