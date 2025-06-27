"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Globe, MessageCircle, BookOpen, Users } from "lucide-react";

export default function LanguagesPage() {
  const languages = [
    {
      name: "Spanish",
      speakers: "500M+ speakers",
      description: "Connect with Hispanic and Latino cultures worldwide",
      levels: ["Beginner", "Intermediate", "Advanced", "Business"],
      cultural: ["Mexican Traditions", "Caribbean Culture", "South American History"]
    },
    {
      name: "Mandarin Chinese",
      speakers: "1B+ speakers",
      description: "Explore Chinese culture and global business opportunities",
      levels: ["Beginner", "Intermediate", "Advanced", "Business"],
      cultural: ["Chinese Philosophy", "Traditional Arts", "Modern China"]
    },
    {
      name: "Arabic",
      speakers: "400M+ speakers",
      description: "Discover the rich heritage of Arabic-speaking nations",
      levels: ["Beginner", "Intermediate", "Advanced", "Classical"],
      cultural: ["Islamic History", "Poetry & Literature", "Middle Eastern Culture"]
    },
    {
      name: "Swahili",
      speakers: "200M+ speakers",
      description: "Learn the lingua franca of East Africa",
      levels: ["Beginner", "Intermediate", "Advanced"],
      cultural: ["East African Culture", "Trade History", "Modern Africa"]
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
              Language Learning
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Master new languages while exploring the cultures and communities that speak them. AI-powered lessons adapt to your learning style.
            </p>
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
              Start Learning
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Available Languages
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn languages through cultural immersion and real-world context.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {languages.map((language, index) => (
              <motion.div
                key={language.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl text-foreground">{language.name}</CardTitle>
                      <Badge variant="secondary" className="bg-[var(--color-pan-green)]/10 text-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]/10 dark:text-[var(--color-pan-amber)]">
                        {language.speakers}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{language.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Available Levels:</h4>
                      <div className="flex flex-wrap gap-2">
                        {language.levels.map((level) => (
                          <Badge key={level} variant="outline" className="text-xs">
                            {level}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Cultural Components:</h4>
                      <div className="space-y-1">
                        {language.cultural.map((component, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)] rounded-full" />
                            <span className="text-sm text-muted-foreground">{component}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                      Start {language.name}
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
