"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  Globe,
  Award,
  Share2,
  Lightbulb
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
            {React.cloneElement(icon as React.ReactElement, { 
              className: "w-6 h-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" 
            } as React.HTMLAttributes<HTMLElement>)}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </Card>
    </motion.div>
  );
};

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  type: string;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, description, type, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <div className="mb-4">
          <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full inline-block mb-2">
            {type}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <Button variant="outline" className="border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10">
          Learn More
        </Button>
      </Card>
    </motion.div>
  );
};

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  index: number;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ icon, title, description, category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center mb-2">
          <div className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full">
            {category}
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
            {React.cloneElement(icon as React.ReactElement, { 
              className: "w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" 
            } as React.HTMLAttributes<HTMLElement>)}
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <Button variant="outline" size="sm" className="border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10">
          Access Resource
        </Button>
      </Card>
    </motion.div>
  );
};

export default function TeacherCommunityPage() {
  const communityFeatures = [
    {
      icon: <Users />,
      title: "Educator Networks",
      description: "Connect with teachers in your subject area, grade level, or geographic region to share ideas and build professional relationships."
    },
    {
      icon: <MessageSquare />,
      title: "Discussion Forums",
      description: "Engage in meaningful conversations about pedagogy, classroom management, curriculum design, and other educational topics."
    },
    {
      icon: <FileText />,
      title: "Resource Sharing",
      description: "Share and access teacher-created resources, lesson plans, and materials to enhance your teaching practice."
    },
    {
      icon: <Calendar />,
      title: "Virtual Events",
      description: "Participate in webinars, workshops, and virtual conferences led by educational experts and fellow teachers."
    },
    {
      icon: <BookOpen />,
      title: "Mentorship Programs",
      description: "Connect with experienced educators for guidance or offer your expertise to new teachers through our structured mentorship program."
    },
    {
      icon: <GraduationCap />,
      title: "Professional Learning Communities",
      description: "Join specialized groups focused on specific teaching approaches, subject areas, or educational initiatives."
    }
  ];

  const upcomingEvents = [
    {
      title: "Culturally Responsive Teaching Workshop",
      date: "April 15, 2025 • 4:00 PM EST",
      description: "Learn practical strategies for creating inclusive classrooms that honor and leverage students' cultural backgrounds and experiences.",
      type: "Workshop"
    },
    {
      title: "Technology Integration Panel Discussion",
      date: "April 22, 2025 • 7:00 PM EST",
      description: "Join a panel of tech-savvy educators as they share their experiences integrating digital tools into their teaching practice.",
      type: "Panel Discussion"
    },
    {
      title: "Teacher Wellness Retreat",
      date: "May 8-10, 2025",
      description: "A virtual weekend retreat focused on teacher well-being, stress management, and sustainable teaching practices.",
      type: "Retreat"
    },
    {
      title: "Summer Curriculum Planning Collaborative",
      date: "June 5-7, 2025",
      description: "Work with colleagues to plan engaging, standards-aligned curriculum for the upcoming school year.",
      type: "Collaborative"
    }
  ];

  const sharedResources = [
    {
      icon: <FileText />,
      title: "Project-Based Learning Unit Templates",
      description: "Customizable templates for designing engaging project-based learning units across subject areas and grade levels.",
      category: "Curriculum Design"
    },
    {
      icon: <Users />,
      title: "Classroom Community Building Activities",
      description: "A collection of activities and routines to foster a positive classroom culture and strong student relationships.",
      category: "Classroom Management"
    },
    {
      icon: <BookOpen />,
      title: "Differentiation Strategies Toolkit",
      description: "Practical strategies and resources for meeting the diverse needs of all learners in your classroom.",
      category: "Instruction"
    },
    {
      icon: <Award />,
      title: "Authentic Assessment Examples",
      description: "Real-world examples of performance tasks, projects, and rubrics that measure deeper learning.",
      category: "Assessment"
    },
    {
      icon: <Globe />,
      title: "Global Collaboration Projects",
      description: "Connect your classroom with others around the world through these structured collaborative learning experiences.",
      category: "Global Education"
    },
    {
      icon: <Lightbulb />,
      title: "Inquiry-Based Learning Guides",
      description: "Step-by-step guides for implementing inquiry-based learning across different subject areas.",
      category: "Instructional Approaches"
    }
  ];

  return (
    <PageTemplate
      title="Teacher Community"
      description="Connect with fellow educators, share resources, and grow professionally through our vibrant teacher community. Collaborate, learn, and innovate together with teachers from around the world."
    >
      <div className="mb-12">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">Community Features</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            <TabsTrigger value="resources">Shared Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
            
            <motion.div
              className="mt-8 p-6 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4 text-center">The Power of Teacher Collaboration</h3>
              <p className="mb-6 text-center">Our teacher community is built on the belief that educators are stronger together. By connecting with colleagues, sharing ideas, and learning from one another, we can create better learning experiences for all students.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Share2 className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Collective Wisdom
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tap into the collective knowledge and experience of thousands of educators facing similar challenges and opportunities.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Professional Growth
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Accelerate your professional development through peer learning, feedback, and collaborative inquiry.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Innovation Catalyst
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Spark new ideas and approaches through cross-pollination with diverse teaching perspectives and experiences.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <EventCard
                  key={index}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  type={event.type}
                  index={index}
                />
              ))}
            </div>
            
            <motion.div
              className="mt-8 p-6 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4">Host Your Own Community Event</h3>
              <p className="mb-6 max-w-2xl mx-auto">Have expertise or insights to share? Propose a community event and connect with teachers who share your interests and passions.</p>
              <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Propose an Event
              </Button>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sharedResources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  icon={resource.icon}
                  title={resource.title}
                  description={resource.description}
                  category={resource.category}
                  index={index}
                />
              ))}
            </div>
            
            <motion.div
              className="mt-8 p-6 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4">Share Your Teaching Resources</h3>
              <p className="mb-6 max-w-2xl mx-auto">Contribute your own teaching materials to our community resource library and help fellow educators enhance their practice.</p>
              <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                <FileText className="w-4 h-4 mr-2" />
                Share a Resource
              </Button>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <motion.div 
        className="p-8 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Join our Teacher Community Today</h2>
        <p className="mb-6 max-w-2xl mx-auto">Connect with thousands of educators, access exclusive resources, and participate in professional learning opportunities designed by teachers, for teachers.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          <Users className="w-4 h-4 mr-2" />
          Join the Community
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
