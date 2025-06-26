"use client";

import { MessageSquare, ArrowLeft, Users, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function PeerSupportPage() {
  // Type-safe support group definition
  interface SupportGroup {
    id: string;
    name: string;
    description: string;
    meetingTimes: string[];
    location: string;
    facilitator: string;
    topics: string[];
    isVirtual: boolean;
  }

  const supportGroups: SupportGroup[] = [
    {
      id: "stress-management",
      name: "Stress Management Group",
      description: "A supportive space to discuss academic stress and develop coping strategies together.",
      meetingTimes: ["Mondays, 4:00 PM - 5:30 PM", "Thursdays, 6:00 PM - 7:30 PM"],
      location: "Student Wellness Center, Room 101",
      facilitator: "Dr. Maya Johnson",
      topics: ["Academic pressure", "Time management", "Healthy coping skills", "Balancing responsibilities"],
      isVirtual: false
    },
    {
      id: "grief-loss",
      name: "Grief & Loss Support Circle",
      description: "For students navigating grief, loss, or major life transitions.",
      meetingTimes: ["Tuesdays, 5:00 PM - 6:30 PM"],
      location: "Student Wellness Center, Room 103",
      facilitator: "Ms. Elena Rodriguez, LCSW",
      topics: ["Processing grief", "Honoring memories", "Building resilience", "Moving forward while remembering"],
      isVirtual: false
    },
    {
      id: "anxiety-support",
      name: "Anxiety Support Group",
      description: "Connect with others experiencing anxiety and learn practical management techniques.",
      meetingTimes: ["Wednesdays, 3:00 PM - 4:30 PM", "Fridays, 1:00 PM - 2:30 PM"],
      location: "Virtual via Secure Zoom",
      facilitator: "Dr. James Williams",
      topics: ["Anxiety management", "Challenging negative thoughts", "Relaxation techniques", "Building confidence"],
      isVirtual: true
    },
    {
      id: "first-gen",
      name: "First-Generation Student Circle",
      description: "A community for first-generation college students to share experiences and resources.",
      meetingTimes: ["Thursdays, 4:00 PM - 5:30 PM"],
      location: "Student Union, Room 205",
      facilitator: "Dr. Raj Patel & Student Peer Leaders",
      topics: ["Navigating college systems", "Family expectations", "Finding resources", "Building community"],
      isVirtual: false
    },
    {
      id: "lgbtq-support",
      name: "LGBTQ+ Support Space",
      description: "A safe, affirming environment for LGBTQ+ students to connect and support each other.",
      meetingTimes: ["Tuesdays, 6:00 PM - 7:30 PM"],
      location: "LGBTQ+ Resource Center",
      facilitator: "Alex Rivera, M.Ed. & Student Peer Leaders",
      topics: ["Identity exploration", "Coming out", "Building community", "Navigating challenges"],
      isVirtual: false
    },
    {
      id: "mindfulness",
      name: "Mindfulness Practice Group",
      description: "Weekly guided mindfulness and meditation sessions for stress reduction.",
      meetingTimes: ["Mondays, 12:00 PM - 1:00 PM", "Wednesdays, 5:00 PM - 6:00 PM"],
      location: "Virtual via Secure Zoom",
      facilitator: "Dr. Sarah Chen",
      topics: ["Meditation basics", "Mindful movement", "Present-moment awareness", "Self-compassion practices"],
      isVirtual: true
    }
  ];

  // State for selected group
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Get the selected group object
  const activeGroup = supportGroups.find(g => g.id === selectedGroup);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <MessageSquare className="h-16 w-16 mx-auto mb-6 text-amber-500" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Peer Support Groups
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Connect with others who understand what you&apos;re going through
          </p>
          <Link href="/mental-health">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Mental Health Resources
            </Button>
          </Link>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full h-24 text-background dark:text-background visionease:text-background high-contrast:text-background"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C360 50 1080 50 1440 100 L1440 100 L0 100 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Peer Support Introduction */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              The Power of Peer Support
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Connecting with others who share similar experiences can be incredibly healing. Our peer support groups 
              provide a safe, confidential space to share, learn, and grow together.
            </p>
          </div>

          <Card className="bg-card shadow-glow glassmorphism mb-12">
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Community Connection</h3>
                  <p className="text-muted-foreground">Find comfort in knowing you&apos;re not alone in your experiences.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Calendar className="h-12 w-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Regular Meetings</h3>
                  <p className="text-muted-foreground">Consistent support through weekly or bi-weekly group sessions.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <MapPin className="h-12 w-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Accessible Options</h3>
                  <p className="text-muted-foreground">Choose from in-person or virtual groups to fit your comfort and schedule.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Groups */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Available Support Groups
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore our current groups and find the right fit for you:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {supportGroups.map((group) => (
              <Card 
                key={group.id} 
                className={`bg-card shadow-glow glassmorphism border-amber-500 hover:border-amber-400 transition-all duration-300 ${
                  selectedGroup === group.id ? 'ring-2 ring-amber-500' : ''
                }`}
                onClick={() => setSelectedGroup(group.id)}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-foreground">{group.name}</h3>
                    {group.isVirtual && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        Virtual
                      </span>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{group.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-amber-500 mt-1" />
                      <div>
                        <h4 className="text-sm font-medium text-foreground">Meeting Times:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {group.meetingTimes.map((time, index) => (
                            <li key={index}>{time}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-amber-500 mt-1" />
                      <div>
                        <h4 className="text-sm font-medium text-foreground">Location:</h4>
                        <p className="text-sm text-muted-foreground">{group.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      className="text-amber-500 border-amber-500 hover:bg-amber-100 hover:text-amber-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGroup(group.id);
                      }}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Group Details */}
          {selectedGroup && activeGroup && (
            <Card className="bg-card shadow-glow glassmorphism mb-12">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                  {activeGroup.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">About This Group</h4>
                    <p className="text-muted-foreground mb-4">{activeGroup.description}</p>
                    
                    <h4 className="text-lg font-semibold text-foreground mb-2">Facilitated By</h4>
                    <p className="text-muted-foreground mb-4">{activeGroup.facilitator}</p>
                    
                    <h4 className="text-lg font-semibold text-foreground mb-2">Location</h4>
                    <p className="text-muted-foreground mb-4">{activeGroup.location}</p>
                    
                    <h4 className="text-lg font-semibold text-foreground mb-2">Meeting Times</h4>
                    <ul className="list-disc list-inside text-muted-foreground mb-4">
                      {activeGroup.meetingTimes.map((time, index) => (
                        <li key={index}>{time}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Topics Discussed</h4>
                    <ul className="list-disc list-inside text-muted-foreground mb-6">
                      {activeGroup.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                    
                    <h4 className="text-lg font-semibold text-foreground mb-3">How to Join</h4>
                    <p className="text-muted-foreground mb-4">
                      You can join this group at any time. No prior registration is required - simply show up to any session.
                      All groups are free for enrolled students.
                    </p>
                    
                    {activeGroup.isVirtual && (
                      <div className="bg-blue-50 p-4 rounded-md dark:bg-blue-900">
                        <h5 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Virtual Meeting Information</h5>
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                          This group meets virtually via Secure Zoom. To receive the meeting link, please email 
                          <a href="mailto:wellness@bipoca.edu" className="underline ml-1">wellness@bipoca.edu</a> or 
                          visit the Student Wellness Center website.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-2"
                    onClick={() => {
                      // In a real application, this would connect to a calendar or email system
                      alert(`You've expressed interest in the ${activeGroup.name}. In a real application, you would receive an email with more details.`);
                    }}
                  >
                    Express Interest
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Group Guidelines */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Group Guidelines
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              To ensure a safe and supportive environment for all participants:
            </p>
          </div>

          <Card className="bg-card shadow-glow glassmorphism mb-12">
            <CardContent className="p-6 sm:p-8">
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li><strong>Confidentiality:</strong> What is shared in the group stays in the group.</li>
                <li><strong>Respect:</strong> Treat all members with dignity and respect.</li>
                <li><strong>Active Listening:</strong> Give your full attention when others are speaking.</li>
                <li><strong>No Advice-Giving:</strong> Share your experiences rather than telling others what to do.</li>
                <li><strong>Participation:</strong> Participate at your own comfort level - there&apos;s no pressure to share.</li>
                <li><strong>Timeliness:</strong> Arrive on time and stay for the full session if possible.</li>
                <li><strong>Support:</strong> Focus on supporting each other rather than solving problems.</li>
                <li><strong>Self-Care:</strong> Take care of your needs during the session.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div className="text-center">
            <Link href="/mental-health">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white shadow-glow">
                Return to Mental Health Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
