"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Newspaper, Download, ExternalLink, Calendar, Award, Users } from "lucide-react";
import Link from "next/link";

export default function PressPage() {
  const pressReleases = [
    {
      title: "BIPOCA AI Raises $10M Series A to Expand AI-Powered Educational Platform",
      date: "2024-12-01",
      excerpt: "Funding will accelerate development of culturally responsive AI learning tools and expand global reach to underserved communities.",
      category: "Funding",
      downloadUrl: "#"
    },
    {
      title: "Partnership with UNESCO Brings BIPOCA AI to 20 Countries",
      date: "2024-11-15",
      excerpt: "Strategic collaboration aims to bridge digital education gaps and promote inclusive learning worldwide.",
      category: "Partnership",
      downloadUrl: "#"
    },
    {
      title: "BIPOCA AI Wins EdTech Innovation Award at Global Education Summit",
      date: "2024-10-28",
      excerpt: "Recognition for groundbreaking work in AI-powered personalized learning and cultural inclusion in education.",
      category: "Award",
      downloadUrl: "#"
    },
    {
      title: "New Study Shows 40% Improvement in Learning Outcomes with BIPOCA AI",
      date: "2024-10-10",
      excerpt: "Independent research demonstrates significant impact of culturally responsive AI on student engagement and achievement.",
      category: "Research",
      downloadUrl: "#"
    }
  ];

  const mediaKit = [
    {
      title: "Company Logos",
      description: "High-resolution logos in various formats and color schemes",
      type: "ZIP",
      size: "2.4 MB"
    },
    {
      title: "Executive Photos",
      description: "Professional headshots of leadership team members",
      type: "ZIP", 
      size: "8.1 MB"
    },
    {
      title: "Product Screenshots",
      description: "Platform interface and feature demonstrations",
      type: "ZIP",
      size: "15.3 MB"
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics, milestones, and company information",
      type: "PDF",
      size: "1.2 MB"
    }
  ];

  const coverage = [
    {
      outlet: "TechCrunch",
      title: "How BIPOCA AI is Revolutionizing Education Through Cultural Inclusion",
      date: "2024-11-20",
      type: "Feature Article",
      url: "#"
    },
    {
      outlet: "Education Week",
      title: "AI-Powered Learning Platforms Show Promise for Diverse Classrooms",
      date: "2024-11-05",
      type: "Industry Analysis",
      url: "#"
    },
    {
      outlet: "Forbes",
      title: "The Future of EdTech: Startups Leading the Inclusion Revolution",
      date: "2024-10-22",
      type: "Opinion Piece",
      url: "#"
    },
    {
      outlet: "The Chronicle of Higher Education",
      title: "Universities Partner with AI Platforms to Improve Student Outcomes",
      date: "2024-10-08",
      type: "News Report",
      url: "#"
    }
  ];

  const awards = [
    {
      title: "EdTech Innovation Award",
      organization: "Global Education Summit",
      year: "2024",
      description: "Recognition for breakthrough AI technology in education"
    },
    {
      title: "Diversity in Tech Award",
      organization: "Tech Inclusion Conference",
      year: "2024",
      description: "Honoring commitment to inclusive technology development"
    },
    {
      title: "Social Impact Startup of the Year",
      organization: "Impact Investor Awards",
      year: "2023",
      description: "Acknowledging positive social impact through education technology"
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
              Press & Media
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Latest news, press releases, and media coverage about BIPOCA AI's mission to transform education through AI and cultural inclusion.
            </p>
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
              Download Media Kit
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Newspaper className="w-8 h-8 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
              Press Releases
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Official announcements and company news.
            </p>
          </div>

          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="secondary" className="bg-[var(--color-pan-green)]/10 text-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]/10 dark:text-[var(--color-pan-amber)]">
                            {release.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {new Date(release.date).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-foreground mb-3">{release.title}</h3>
                        <p className="text-muted-foreground mb-4">{release.excerpt}</p>
                      </div>
                      
                      <div className="lg:ml-6 flex gap-2">
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Read More
                        </Button>
                        <Button size="sm" className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                          <Download className="w-4 h-4 mr-1" />
                          Download
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

      {/* Media Coverage */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Media Coverage
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recent coverage and mentions in leading publications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coverage.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-amber)]/20 dark:border-[var(--color-pan-green)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {article.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="text-lg text-foreground">{article.title}</CardTitle>
                    <p className="text-[var(--color-pan-amber)] dark:text-[var(--color-pan-green)] font-semibold">{article.outlet}</p>
                  </CardHeader>
                  <CardContent>
                    <Link href={article.url}>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read Article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Award className="w-8 h-8 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
              Awards & Recognition
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Industry recognition for our innovation and impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow text-center">
                  <CardHeader>
                    <Award className="w-12 h-12 mx-auto mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    <CardTitle className="text-lg text-foreground">{award.title}</CardTitle>
                    <p className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-semibold">{award.organization}</p>
                    <Badge variant="secondary" className="bg-[var(--color-pan-green)]/10 text-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]/10 dark:text-[var(--color-pan-amber)] w-fit mx-auto">
                      {award.year}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{award.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Media Kit
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Download assets and resources for media coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-amber)]/20 dark:border-[var(--color-pan-green)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <Download className="w-8 h-8 mx-auto mb-2 text-[var(--color-pan-amber)] dark:text-[var(--color-pan-green)]" />
                    <CardTitle className="text-lg text-foreground">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                      <span>{item.type}</span>
                      <span>{item.size}</span>
                    </div>
                    <Button className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Press Inquiries
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              For media inquiries, interview requests, or additional information, please contact our press team.
            </p>
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Media Contact</h3>
              <p className="text-muted-foreground">Sarah Johnson, Director of Communications</p>
              <p className="text-muted-foreground">press@bipoca-ai.org</p>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
              Contact Press Team
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
