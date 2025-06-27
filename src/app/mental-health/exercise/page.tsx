"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Activity, Heart, Timer, Play, Users, Target } from "lucide-react";

export default function ExercisePage() {
  const exercisePrograms = [
    {
      title: "Mindful Movement",
      duration: "15-30 min",
      level: "All Levels",
      description: "Gentle exercises combining movement with mindfulness practices",
      benefits: ["Stress Relief", "Improved Focus", "Better Sleep", "Emotional Balance"],
      activities: ["Yoga Flow", "Tai Chi", "Walking Meditation", "Breathing Exercises"]
    },
    {
      title: "Cultural Dance Therapy",
      duration: "20-45 min",
      level: "Beginner to Advanced",
      description: "Therapeutic dance movements from various cultural traditions",
      benefits: ["Cultural Connection", "Self-Expression", "Community Building", "Physical Fitness"],
      activities: ["African Dance", "Latin Rhythms", "Indigenous Movements", "Contemporary Flow"]
    },
    {
      title: "Strength & Resilience",
      duration: "30-60 min",
      level: "Intermediate",
      description: "Physical training designed to build mental and physical strength",
      benefits: ["Confidence Building", "Stress Management", "Goal Achievement", "Endurance"],
      activities: ["Bodyweight Training", "Resistance Exercises", "Cardio Intervals", "Recovery Sessions"]
    }
  ];

  const quickWorkouts = [
    { name: "5-Minute Energy Boost", duration: "5 min", type: "Quick Start" },
    { name: "Stress Relief Stretches", duration: "10 min", type: "Relaxation" },
    { name: "Focus Enhancement", duration: "15 min", type: "Mental Clarity" },
    { name: "Confidence Builder", duration: "20 min", type: "Empowerment" }
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
              Exercise & Movement
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Strengthen your body and mind through culturally-informed movement practices designed to promote mental wellness and physical health.
            </p>
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
              Start Moving Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Exercise Programs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Movement Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Culturally-informed exercise programs designed for mental wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exercisePrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl text-foreground">{program.title}</CardTitle>
                      <Activity className="w-6 h-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Timer className="w-4 h-4" />
                        {program.duration}
                      </div>
                      <Badge variant="secondary" className="bg-[var(--color-pan-green)]/10 text-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]/10 dark:text-[var(--color-pan-amber)]">
                        {program.level}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{program.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.benefits.map((benefit) => (
                          <Badge key={benefit} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Activities:</h4>
                      <div className="space-y-1">
                        {program.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                            <span className="text-sm text-muted-foreground">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Start Program
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Workouts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Quick Workouts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Short, effective exercises for busy schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickWorkouts.map((workout, index) => (
              <motion.div
                key={workout.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card border-[var(--color-pan-amber)]/20 dark:border-[var(--color-pan-green)]/20 shadow-glow hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Target className="w-8 h-8 mx-auto mb-3 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">{workout.name}</h3>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-3">
                      <Timer className="w-4 h-4" />
                      {workout.duration}
                    </div>
                    <Badge variant="secondary" className="bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-amber)] dark:bg-[var(--color-pan-green)]/10 dark:text-[var(--color-pan-green)] mb-4">
                      {workout.type}
                    </Badge>
                    <Button size="sm" className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                      <Play className="w-4 h-4 mr-1" />
                      Start
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
