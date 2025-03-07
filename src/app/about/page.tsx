"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
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
            About BIPOCA AI
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Transforming education for Black, Indigenous, People of Color, and Allies through AI-powered learning
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

      {/* Our Story */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
            Our Story
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-md h-64 bg-muted rounded-lg shadow-glow">
                <span className="absolute inset-0 flex items-center justify-center text-foreground">
                  Founder Image Placeholder
                </span>
              </div>
            </motion.div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Founded with Purpose
              </h3>
              <p className="text-muted-foreground mb-4">
                BIPOCA AI was founded in 2024 with a clear mission: to create an educational platform that addresses the unique needs and perspectives of Black, Indigenous, People of Color, and Allies. Our founder, Dr. Maya Johnson, recognized the gap in educational technology that authentically represented diverse histories, cultures, and learning styles.
              </p>
              <p className="text-muted-foreground">
                What began as a passion project quickly evolved into a comprehensive educational ecosystem, powered by advanced AI and designed to be accessible to all learners regardless of ability, device, or location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gray-dark dark:bg-gradient-gray-dark visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
            Our Mission & Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Mission
              </h3>
              <p className="text-muted-foreground mb-4">
                BIPOCA AI is on a mission to break down educational barriers for Black, Indigenous, People of Color, and Allies worldwide. We strive to create an inclusive learning environment that celebrates diverse perspectives, promotes cultural understanding, and empowers learners through accessible, AI-driven education.
              </p>
              <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
                Vision
              </h3>
              <p className="text-muted-foreground">
                We envision a future where education is limitless, powered by AI to provide personalized, accessible learning for every individual, regardless of location, device, or ability. Our goal is to create a world where diverse histories and perspectives are valued, and where technology bridges educational gaps rather than widening them.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Inclusion", description: "Creating spaces where everyone belongs" },
                { title: "Accessibility", description: "Education available to all, regardless of ability" },
                { title: "Innovation", description: "Pushing boundaries with AI-driven learning" },
                { title: "Empowerment", description: "Equipping learners with knowledge and confidence" },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism h-full">
                    <CardContent className="pt-6">
                      <h4 className="text-xl font-semibold text-foreground mb-2">{value.title}</h4>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Dr. Maya Johnson", role: "Founder & CEO", image: "team-placeholder.jpg" },
              { name: "Dr. James Washington", role: "Chief Education Officer", image: "team-placeholder.jpg" },
              { name: "Sarah Rodriguez", role: "Chief Technology Officer", image: "team-placeholder.jpg" },
              { name: "Michael Chen", role: "Head of Accessibility", image: "team-placeholder.jpg" },
            ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card border-secondary dark:border-primary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
                    <CardContent className="pt-6 text-center">
                      <div className="w-24 h-24 mx-auto bg-muted rounded-full mb-4">
                        <span className="flex items-center justify-center h-full text-xs text-foreground">Photo</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                      <p className="text-muted-foreground">{member.role}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Partners & Collaborators */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center dark:text-gray-800 text-foreground mb-8">
            Our Partners & Collaborators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "BlackFacts.com", description: "Providing authentic historical content and cultural resources" },
              { name: "Friends of the African Union", description: "Supporting educational initiatives across the diaspora" },
              { name: "Legacy Education", description: "Collaborating on curriculum development and teacher training" },
            ].map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism h-full">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold dark:text-gray-800 text-foreground mb-2">{partner.name}</h3>
                      <p className="text-muted-foreground dark:text-gray-700">{partner.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Join Our Mission */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            Whether you&apos;re a student, educator, parent, or institution, there&apos;s a place for you in the BIPOCA AI community. Join us in transforming education for everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground shadow-glow">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary text-foreground">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}