"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Brain, Book, Calendar, Phone, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function MentalHealthPage() {
  const { user } = useAuth();

  const resources = [
    {
      title: "Self-Care Resources",
      description: "Explore techniques and activities to support your emotional well-being and reduce stress.",
      icon: <Heart className="h-8 w-8 text-pink-500" />,
      link: "/mental-health/self-care",
      color: "border-pink-500",
      hoverColor: "hover:bg-pink-500",
    },
    {
      title: "Mindfulness Exercises",
      description: "Practice mindfulness techniques to stay grounded and present, reducing anxiety and improving focus.",
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      link: "/mental-health/mindfulness",
      color: "border-purple-500",
      hoverColor: "hover:bg-purple-500",
    },
    {
      title: "Educational Resources",
      description: "Learn about mental health topics through articles, videos, and interactive modules.",
      icon: <Book className="h-8 w-8 text-blue-500" />,
      link: "/mental-health/education",
      color: "border-blue-500",
      hoverColor: "hover:bg-blue-500",
    },
    {
      title: "Schedule a Counseling Session",
      description: "Book a virtual session with one of our licensed counselors or social workers.",
      icon: <Calendar className="h-8 w-8 text-green-500" />,
      link: "/mental-health/schedule",
      color: "border-green-500",
      hoverColor: "hover:bg-green-500",
    },
    {
      title: "Crisis Support Hotlines",
      description: "Access 24/7 support hotlines for immediate assistance during crisis situations.",
      icon: <Phone className="h-8 w-8 text-red-500" />,
      link: "/mental-health/crisis",
      color: "border-red-500",
      hoverColor: "hover:bg-red-500",
    },
    {
      title: "Peer Support Groups",
      description: "Connect with others who share similar experiences in a safe, moderated environment.",
      icon: <MessageSquare className="h-8 w-8 text-amber-500" />,
      link: "/mental-health/peer-support",
      color: "border-amber-500",
      hoverColor: "hover:bg-amber-500",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Mental Health Resources
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Supporting your well-being on your educational journey
          </p>
        </motion.div>
        <svg
          className="absolute bottom-0 left-0 w-full h-24 text-background dark:text-background visionease:text-background high-contrast:text-background"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C360 50 1080 50 1440 100 L1440 100 L0 100 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Resources Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Explore Our Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              BIPOCA AI is committed to supporting the mental health and emotional well-being of our community. 
              Explore our resources designed to help you thrive both academically and personally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`bg-card ${resource.color} shadow-glow glassmorphism h-full`}>
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="bg-background rounded-full p-2">
                      {resource.icon}
                    </div>
                    <CardTitle className="text-xl text-foreground">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <Link href={resource.link}>
                      <Button className={`w-full bg-background text-foreground ${resource.hoverColor} hover:text-white transition-colors duration-300`}>
                        Explore
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gray-dark dark:bg-gradient-gray-dark visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              For Students
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Resources specifically designed to support students through the unique challenges of academic life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism h-full">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-foreground">Stress Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                  <li>Techniques for managing test anxiety</li>
                  <li>Creating balanced study schedules</li>
                  <li>Mindfulness practices for academic focus</li>
                  <li>Healthy sleep habits for students</li>
                </ul>
                <Link href="/mental-health/student-stress">
                  <Button className="w-full bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground shadow-glow">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card border-secondary dark:border-primary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism h-full">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-foreground">Social Emotional Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                  <li>Building healthy relationships with peers</li>
                  <li>Developing emotional awareness and regulation</li>
                  <li>Navigating conflicts in educational settings</li>
                  <li>Self-advocacy skills for students</li>
                </ul>
                <Link href="/mental-health/social-emotional">
                  <Button className="w-full bg-secondary hover:bg-primary dark:bg-primary dark:hover:bg-secondary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground shadow-glow">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mental Health Assessment */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Mental Health Check-In
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Take a confidential assessment to help understand your current mental health and receive personalized resource recommendations
            </p>
          </div>

          <div className="flex justify-center">
            <Card className="max-w-2xl w-full bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
              <CardContent className="p-6 sm:p-8">
                <p className="text-muted-foreground mb-6">
                  Our mental health assessment is designed to provide you with insights about your emotional well-being 
                  and connect you with appropriate resources. All responses are confidential and protected.
                </p>
                <div className="flex justify-center">
                  <Link href={user ? "/mental-health/assessment" : "/login?redirect=/mental-health/assessment"}>
                    <Button className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground shadow-glow">
                      {user ? "Take Assessment" : "Log In to Take Assessment"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Crisis Support */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground dark:text-gray-800 mb-4">
              Crisis Support
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-700 max-w-3xl mx-auto">
              If you&apos;re experiencing a mental health crisis, help is available 24/7
            </p>
          </div>

          <Card className="bg-card border-red-500 shadow-glow glassmorphism">
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground dark:text-gray-800 mb-4">Emergency Resources</h3>
                  <ul className="list-disc list-inside space-y-3 text-muted-foreground dark:text-gray-700">
                    <li>988 Suicide & Crisis Lifeline: Call or text 988</li>
                    <li>Crisis Text Line: Text HOME to 741741</li>
                    <li>Emergency Services: Call 911</li>
                    <li>National Domestic Violence Hotline: 1-800-799-7233</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground dark:text-gray-800 mb-4">When to Seek Help Immediately</h3>
                  <ul className="list-disc list-inside space-y-3 text-muted-foreground dark:text-gray-700">
                    <li>Thoughts of harming yourself or others</li>
                    <li>Experiencing a traumatic event</li>
                    <li>Feeling unable to perform basic self-care</li>
                    <li>Severe emotional distress</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}