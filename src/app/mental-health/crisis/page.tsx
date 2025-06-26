"use client";

import { Phone, ArrowLeft, AlertTriangle, Clock, Shield, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CrisisPage() {
  // Type-safe crisis resources definition
  const crisisResources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      description: "24/7 support for anyone in suicidal crisis or emotional distress",
      contact: "Call or text 988",
      website: "https://988lifeline.org/",
      hours: "24/7, all ages"
    },
    {
      name: "Crisis Text Line",
      description: "Text-based crisis intervention service",
      contact: "Text HELLO to 741741",
      website: "https://www.crisistextline.org/",
      hours: "24/7, all ages"
    },
    {
      name: "Trevor Project LGBTQ+ Crisis Line",
      description: "Crisis intervention and suicide prevention for LGBTQ+ young people",
      contact: "Call 1-866-488-7386 or text START to 678678",
      website: "https://www.thetrevorproject.org/",
      hours: "24/7, youth focused"
    },
    {
      name: "Veterans Crisis Line",
      description: "Support for veterans and their loved ones",
      contact: "Call 988 then press 1, or text 838255",
      website: "https://www.veteranscrisisline.net/",
      hours: "24/7"
    },
    {
      name: "National Domestic Violence Hotline",
      description: "Support for anyone affected by domestic violence",
      contact: "Call 1-800-799-7233 or text START to 88788",
      website: "https://www.thehotline.org/",
      hours: "24/7"
    },
    {
      name: "Childhelp National Child Abuse Hotline",
      description: "Crisis intervention and professional counseling for child abuse situations",
      contact: "Call 1-800-422-4453",
      website: "https://www.childhelp.org/",
      hours: "24/7, for children, teens, and adults"
    },
    {
      name: "National Runaway Safeline",
      description: "Crisis intervention and resources for youth at risk of running away",
      contact: "Call 1-800-786-2929 or text 66008",
      website: "https://www.1800runaway.org/",
      hours: "24/7, youth focused"
    },
    {
      name: "SAMHSA's National Helpline",
      description: "Treatment referral and information service for individuals facing mental health or substance use disorders",
      contact: "Call 1-800-662-4357",
      website: "https://www.samhsa.gov/find-help/national-helpline",
      hours: "24/7, English and Spanish"
    }
  ];

  // Warning signs that someone might be in crisis
  const warningSigns = [
    "Talking about wanting to die or to kill oneself",
    "Looking for a way to kill oneself",
    "Talking about feeling hopeless or having no purpose",
    "Talking about feeling trapped or being in unbearable pain",
    "Talking about being a burden to others",
    "Increasing use of alcohol or drugs",
    "Acting anxious, agitated, or reckless",
    "Sleeping too little or too much",
    "Withdrawing or feeling isolated",
    "Showing rage or talking about seeking revenge",
    "Displaying extreme mood swings"
  ];

  // How to help someone in crisis
  const howToHelp = [
    "Take threats of suicide or self-harm seriously",
    "Stay with the person if possible and call for help",
    "Listen without judgment and offer support",
    "Remove potential means of self-harm if it's safe to do so",
    "Encourage them to call a crisis hotline",
    "Help them connect with mental health services",
    "Follow up and continue to offer support"
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <Phone className="h-16 w-16 mx-auto mb-6 text-red-500" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Crisis Support Hotlines
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Immediate help is available 24/7 for all ages
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:988">
              <Button className="bg-red-500 hover:bg-red-600 text-white shadow-glow">
                Call 988 Now
              </Button>
            </a>
            <Link href="/mental-health">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Mental Health Resources
              </Button>
            </Link>
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full h-24 text-background dark:text-background visionease:text-background high-contrast:text-background"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C360 50 1080 50 1440 100 L1440 100 L0 100 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Emergency Alert */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-red-50 dark:bg-red-900">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white dark:bg-gray-800 border-red-500 shadow-glow">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-red-500 mb-4">If you or someone else is in immediate danger</h2>
                  <p className="text-lg mb-4">
                    Call <strong>911</strong> or go to your nearest emergency room if:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                    <li>Someone is in immediate danger of harming themselves or others</li>
                    <li>Someone has attempted suicide</li>
                    <li>Someone is experiencing a life-threatening medical emergency</li>
                  </ul>
                  <p className="text-muted-foreground">
                    Your safety is the top priority. Emergency services are equipped to handle crisis situations and can provide immediate assistance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Crisis Hotlines */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Crisis Support Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These hotlines provide immediate support for various crisis situations. All services are confidential and available 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {crisisResources.map((resource, index) => (
              <Card 
                key={index} 
                className="bg-card shadow-glow glassmorphism border-red-500 hover:border-red-400 transition-all duration-300"
              >
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{resource.name}</h3>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-red-500" />
                    <p className="font-medium">{resource.contact}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-red-500" />
                    <p className="text-sm text-muted-foreground">{resource.hours}</p>
                  </div>
                  
                  <a 
                    href={resource.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-red-500 hover:text-red-600 transition-colors text-sm flex items-center gap-1"
                  >
                    Visit Website
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Warning Signs */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
                Recognizing Warning Signs
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Being able to identify warning signs can help you recognize when someone might be in crisis:
              </p>
            </div>

            <Card className="bg-card shadow-glow glassmorphism">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <HelpCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Warning Signs of Crisis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      {warningSigns.map((sign, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <p className="text-muted-foreground">{sign}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How to Help */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
                How to Help Someone in Crisis
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                If you&apos;re concerned about someone, here are steps you can take to help:
              </p>
            </div>

            <Card className="bg-card shadow-glow glassmorphism">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Steps to Help</h3>
                    <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                      {howToHelp.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Resources */}
          <div className="text-center">
            <Link href="/mental-health">
              <Button className="bg-red-500 hover:bg-red-600 text-white shadow-glow">
                Return to Mental Health Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
