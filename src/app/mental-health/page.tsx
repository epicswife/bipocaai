"use client";

import { Heart, Brain, Book, Calendar, Phone, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MentalHealthPage() {

  // Type-safe resource definition
  const resources = [
    {
      title: "Self-Care Resources",
      description: "Explore techniques and activities to support your emotional well-being and reduce stress.",
      icon: Heart,
      link: "/mental-health/self-care",
      color: "border-pink-500",
      hoverColor: "hover:bg-pink-500",
    },
    {
      title: "Mindfulness Exercises",
      description: "Practice mindfulness techniques to stay grounded and present, reducing anxiety and improving focus.",
      icon: Brain,
      link: "/mental-health/mindfulness",
      color: "border-purple-500",
      hoverColor: "hover:bg-purple-500",
    },
    {
      title: "Educational Resources",
      description: "Learn about mental health topics through articles, videos, and interactive modules.",
      icon: Book,
      link: "/mental-health/education",
      color: "border-blue-500",
      hoverColor: "hover:bg-blue-500",
    },
    {
      title: "Schedule a Counseling Session",
      description: "Book a virtual session with one of our licensed counselors or social workers.",
      icon: Calendar,
      link: "/mental-health/appointments",
      color: "border-green-500",
      hoverColor: "hover:bg-green-500",
    },
    {
      title: "Crisis Support Hotlines",
      description: "Access 24/7 support hotlines for immediate assistance during crisis situations.",
      icon: Phone,
      link: "/mental-health/crisis",
      color: "border-red-500",
      hoverColor: "hover:bg-red-500",
    },
    {
      title: "Peer Support Groups",
      description: "Connect with others who share similar experiences in a safe, moderated environment.",
      icon: MessageSquare,
      link: "/mental-health/peer-support",
      color: "border-amber-500",
      hoverColor: "hover:bg-amber-500",
    },
  ] as const;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Mental Health Resources
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Supporting your well-being on your educational journey
          </p>
        </div>
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
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className={`bg-card ${resource.color} shadow-glow glassmorphism h-full`}>
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="bg-background rounded-full p-2">
                      <resource.icon className="h-8 w-8" />
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
              </div>
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

      {/* Get Support Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Get Mental Health Support
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Access our mental health services through appointments with counselors or submit a support request
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism h-full">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-foreground flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-green-500" />
                  Schedule an Appointment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Book a virtual counseling session with one of our licensed mental health professionals. Select your preferred date, time, and counselor type.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                  <li>Flexible scheduling options</li>
                  <li>Choose your preferred counselor type</li>
                  <li>Manage and track your appointments</li>
                  <li>Receive appointment reminders</li>
                </ul>
                <Link href="/mental-health/appointments">
                  <Button className="w-full bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground shadow-glow">
                    Schedule Appointment
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card border-secondary dark:border-primary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism h-full">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-foreground flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-blue-500" />
                  Request Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Submit a mental health support request form to receive assistance. You can choose to remain anonymous and specify the type of support you need.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                  <li>Option for anonymous requests</li>
                  <li>Specify urgency level</li>
                  <li>Select preferred support type</li>
                  <li>Receive follow-up via your preferred method</li>
                </ul>
                <Link href="/mental-health/request">
                  <Button className="w-full bg-secondary hover:bg-primary dark:bg-primary dark:hover:bg-secondary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground shadow-glow">
                    Submit Support Request
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mental Health Assessment */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gray-dark dark:bg-gradient-gray-dark visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
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
                  <Link href="/mental-health/assessment">
                    <Button className="w-full bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground shadow-glow">
                      Take Assessment
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
              If you&apos;re experiencing a mental health crisis, help is available 24/7 for all ages, from children to adults
            </p>
          </div>

          <Card className="bg-card border-red-500 shadow-glow glassmorphism">
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground dark:text-gray-800 mb-4">Emergency Resources</h3>
                  <ul className="list-disc list-inside space-y-3 text-muted-foreground dark:text-gray-700">
                    <li>988 Suicide & Crisis Lifeline: Call or text 988 (24/7, all ages)</li>
                    <li>Crisis Text Line: Text HELLO to 741741 (24/7, all ages)</li>
                    <li>Emergency Services: Call 911</li>
                    <li>National Domestic Violence Hotline: 1-800-799-7233 or text START to 88788</li>
                    <li>Trevor Project LGBTQ+ Crisis Line: 1-866-488-7386 or text START to 678678 (youth focused)</li>
                    <li>Veterans Crisis Line: Call 988 then press 1, or text 838255</li>
                    <li>Childhelp National Child Abuse Hotline: 1-800-422-4453 (for children, teens, and adults)</li>
                    <li>National Runaway Safeline: 1-800-786-2929 or text 66008 (youth focused)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground dark:text-gray-800 mb-4">When to Seek Help Immediately</h3>
                  <ul className="list-disc list-inside space-y-3 text-muted-foreground dark:text-gray-700">
                    <li>Thoughts of harming yourself or others</li>
                    <li>Experiencing a traumatic event</li>
                    <li>Feeling unable to perform basic self-care</li>
                    <li>Severe emotional distress</li>
                    <li>Panic attacks that interfere with daily activities</li>
                    <li>Substance use crisis</li>
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