"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BookOpen, Users, MessageSquare, Calendar, Video, Lightbulb, FileText, HelpCircle } from 'lucide-react';

interface SupportCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const SupportCard: React.FC<SupportCardProps> = ({ icon, title, description, index }) => {
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

interface ResourceCardProps {
  title: string;
  description: string;
  type: string;
  tags: string[];
  index: number;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, type, tags, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
            {type === 'Guide' && <FileText className="w-6 h-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />}
            {type === 'Workshop' && <Video className="w-6 h-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />}
            {type === 'Community' && <Users className="w-6 h-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />}
          </div>
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <span className="text-sm text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">{type}</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
      className="mb-6"
    >
      <div className="flex items-start mb-2">
        <div className="w-8 h-8 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
          <HelpCircle className="w-4 h-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
        </div>
        <h3 className="text-lg font-bold">{question}</h3>
      </div>
      <div className="ml-11">
        <p className="text-gray-600 dark:text-gray-300">{answer}</p>
      </div>
    </motion.div>
  );
};

export default function ParentSupportPage() {
  const supportFeatures = [
    {
      icon: <BookOpen />,
      title: "Parent Education Resources",
      description: "Access guides, articles, and videos on supporting your child's educational journey, understanding curriculum, and fostering learning at home."
    },
    {
      icon: <Users />,
      title: "Parent Community",
      description: "Connect with other parents to share experiences, advice, and resources in our moderated online community spaces."
    },
    {
      icon: <MessageSquare />,
      title: "Expert Consultations",
      description: "Schedule one-on-one consultations with education specialists to address specific questions or concerns about your child's learning."
    },
    {
      icon: <Calendar />,
      title: "Parent Workshops",
      description: "Participate in live and recorded workshops on topics ranging from supporting homework to navigating educational transitions."
    },
    {
      icon: <Video />,
      title: "Virtual Office Hours",
      description: "Join weekly drop-in sessions with our education team to get quick answers to your questions and connect with other parents."
    },
    {
      icon: <Lightbulb />,
      title: "Personalized Support Plans",
      description: "Work with our team to develop customized strategies for supporting your child's unique learning needs and goals."
    }
  ];

  const parentResources = [
    {
      title: "Supporting Your Child's Digital Learning",
      description: "A comprehensive guide to helping your child navigate online learning platforms, develop digital literacy, and maintain healthy technology habits.",
      type: "Guide",
      tags: ["Digital Learning", "Technology", "Screen Time"]
    },
    {
      title: "Culturally Responsive Parenting Workshop",
      description: "Learn strategies for nurturing your child's cultural identity, addressing bias, and supporting diverse perspectives in their education.",
      type: "Workshop",
      tags: ["Cultural Identity", "Diversity", "Parenting Strategies"]
    },
    {
      title: "Homework Help Strategies",
      description: "Practical approaches to supporting your child with homework without doing it for them, including creating effective study environments and routines.",
      type: "Guide",
      tags: ["Homework", "Study Skills", "Time Management"]
    },
    {
      title: "Parents of Teens Discussion Group",
      description: "A facilitated monthly discussion group for parents of teenagers to share challenges, strategies, and resources specific to adolescent education.",
      type: "Community",
      tags: ["Teenagers", "Peer Support", "Monthly Meetings"]
    }
  ];

  const faqs = [
    {
      question: "How can I track my child's progress in the platform?",
      answer: "You can access detailed progress reports through your parent dashboard, which shows completed assignments, assessment results, time spent on different subjects, and areas of strength and growth. You can also set up weekly email summaries to stay informed without constantly checking the platform."
    },
    {
      question: "What should I do if my child is struggling with a particular subject?",
      answer: "First, review your child's work in that subject area through your parent dashboard to identify specific concepts they're finding challenging. Then, you can schedule a consultation with one of our education specialists who can provide targeted strategies and resources. Additionally, consider booking a tutoring session focused on those specific concepts."
    },
    {
      question: "How can I support my child's learning if I'm not familiar with the subject matter?",
      answer: "You don't need to be an expert in the subject to support your child's learning. Focus on creating a consistent study environment, asking questions about what they're learning, and encouraging them to explain concepts to you. Our platform also provides parent guides for each subject that explain key concepts and suggest supportive activities you can do together."
    },
    {
      question: "How much parent involvement is expected or recommended?",
      answer: "The level of involvement varies by age and individual needs. For younger students, we recommend more direct supervision and engagement. For older students, focus on checking in regularly while encouraging independence. Our parent dashboard allows you to customize notification settings based on your preferred level of involvement."
    },
    {
      question: "What resources are available if my child has special learning needs?",
      answer: "We offer a range of accommodations and specialized resources for diverse learning needs. You can indicate specific learning needs in your child's profile, and our system will automatically adjust certain features. Additionally, our special education specialists can provide personalized consultations and support plans tailored to your child's specific requirements."
    }
  ];

  return (
    <PageTemplate
      title="Parent Support"
      description="Access resources, community, and expert guidance to effectively support your child's educational journey and become an empowered partner in their learning."
    >
      <div className="mb-12">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">Support Features</TabsTrigger>
            <TabsTrigger value="resources">Featured Resources</TabsTrigger>
            <TabsTrigger value="faqs">Common Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportFeatures.map((feature, index) => (
                <SupportCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {parentResources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  tags={resource.tags}
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
              <h3 className="text-xl font-bold mb-4 text-center">Upcoming Parent Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex">
                  <div className="w-16 h-16 rounded-lg bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Calendar className="w-8 h-8 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  </div>
                  <div>
                    <span className="text-sm text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mb-1 block">May 15, 2025 • 7:00 PM EST</span>
                    <h4 className="font-semibold mb-1">Supporting Social-Emotional Learning at Home</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Learn practical strategies for nurturing your child&apos;s emotional intelligence and social skills.</p>
                    <Button variant="link" className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] p-0 h-auto">
                      Register Now
                    </Button>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex">
                  <div className="w-16 h-16 rounded-lg bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Users className="w-8 h-8 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                  </div>
                  <div>
                    <span className="text-sm text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mb-1 block">June 8, 2025 • 1:00 PM EST</span>
                    <h4 className="font-semibold mb-1">Parent Panel: Transitioning Between Grade Levels</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Hear from experienced parents about navigating educational transitions successfully.</p>
                    <Button variant="link" className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] p-0 h-auto">
                      Register Now
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="faqs">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
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
              <h3 className="text-xl font-bold mb-4">Have a specific question?</h3>
              <p className="mb-6 max-w-2xl mx-auto">Our parent support team is available to help you navigate any challenges or questions you may have about supporting your child&apos;s education.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Live Chat
                </Button>
                <Button variant="outline" className="border-[var(--color-pan-green)] text-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/10 dark:border-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/10">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </Button>
              </div>
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
        <h2 className="text-2xl font-bold mb-4">Join our Parent Community</h2>
        <p className="mb-6 max-w-2xl mx-auto">Connect with other parents, access exclusive resources, and receive personalized support for your child&apos;s educational journey.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Get Started
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
