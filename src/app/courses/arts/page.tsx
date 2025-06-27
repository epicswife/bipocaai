"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Palette, Music, Camera, Pen, Theater, Sparkles } from "lucide-react";

export default function ArtsPage() {
  const artsForms = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Visual Arts",
      description: "Traditional and contemporary visual expression",
      courses: ["African Art Traditions", "Indigenous Textiles", "Digital Art & Design", "Muralism & Social Art"],
      color: "border-[var(--color-pan-green)]"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Music & Sound",
      description: "Musical traditions from around the world",
      courses: ["Jazz & Blues History", "World Music Traditions", "Hip-Hop Culture", "Music Production"],
      color: "border-[var(--color-pan-amber)]"
    },
    {
      icon: <Pen className="w-8 h-8" />,
      title: "Literature & Writing",
      description: "Storytelling across cultures and languages",
      courses: ["Spoken Word Poetry", "Cultural Narratives", "Creative Writing", "Digital Storytelling"],
      color: "border-[var(--color-pan-red)]"
    },
    {
      icon: <Theater className="w-8 h-8" />,
      title: "Performing Arts",
      description: "Dance, theater, and performance traditions",
      courses: ["Cultural Dance Forms", "Community Theater", "Performance Art", "Movement & Expression"],
      color: "border-[var(--color-pan-green)]"
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
              Arts & Humanities
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore the rich artistic traditions and cultural expressions that shape our world. From ancient art forms to contemporary digital media.
            </p>
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
              Explore Arts Courses
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Arts Forms */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Artistic Expression Across Cultures
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover diverse artistic traditions and contemporary creative practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {artsForms.map((form, index) => (
              <motion.div
                key={form.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full bg-card ${form.color} shadow-glow hover:shadow-xl transition-all duration-300`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                        {form.icon}
                      </div>
                      <CardTitle className="text-xl text-foreground">{form.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{form.description}</p>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-foreground mb-3">Featured Courses:</h4>
                    <div className="space-y-2 mb-4">
                      {form.courses.map((course, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                          <span className="text-sm text-muted-foreground">{course}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                      View {form.title} Courses
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
