"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Quote, Award, GraduationCap, BookOpen, Star, MapPin } from 'lucide-react';

interface StoryCardProps {
  name: string;
  location: string;
  quote: string;
  achievement: string;
  index: number;
}

const StoryCard: React.FC<StoryCardProps> = ({ name, location, quote, achievement, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3">
            <span className="text-xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">{name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-3 h-3 mr-1" />
              {location}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex">
            <Quote className="w-8 h-8 text-[var(--color-pan-green)]/20 dark:text-[var(--color-pan-amber)]/20 mr-2 flex-shrink-0" />
            <p className="italic text-gray-600 dark:text-gray-300">{quote}</p>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Award className="w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mr-2" />
            <p className="text-sm font-medium">{achievement}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

interface StatisticCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  index: number;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ value, label, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mx-auto mb-4">
          {React.cloneElement(icon as React.ReactElement, { 
            className: "w-8 h-8 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" 
          } as React.HTMLAttributes<HTMLElement>)}
        </div>
        <h3 className="text-3xl font-bold mb-2">{value}</h3>
        <p className="text-gray-600 dark:text-gray-300">{label}</p>
      </Card>
    </motion.div>
  );
};

export default function SuccessStoriesPage() {
  const studentStories = [
    {
      name: "Maya Johnson",
      location: "Atlanta, GA",
      quote: "The personalized curriculum allowed me to pursue my passion for astronomy while maintaining excellence in core subjects. I was able to work at my own pace and dive deeper into topics that fascinated me.",
      achievement: "Accepted to MIT with a full scholarship"
    },
    {
      name: "Elijah Washington",
      location: "Portland, OR",
      quote: "As a competitive athlete, traditional school schedules were always a challenge. Homeschooling with Bipoca gave me the flexibility to train while receiving a quality education tailored to my learning style.",
      achievement: "National swimming champion while maintaining a 4.0 GPA"
    },
    {
      name: "Sophia Rodriguez",
      location: "Miami, FL",
      quote: "I struggled with anxiety in traditional classrooms. The supportive environment and personalized approach helped me thrive academically and build confidence in my abilities.",
      achievement: "Published research paper at age 16"
    },
    {
      name: "Jamal Davis",
      location: "Chicago, IL",
      quote: "The culturally responsive curriculum helped me connect with my heritage while developing critical thinking skills. I appreciated seeing diverse perspectives represented in my learning materials.",
      achievement: "Founded a youth community service organization"
    }
  ];

  const parentStories = [
    {
      name: "The Williams Family",
      location: "Houston, TX",
      quote: "Homeschooling our three children seemed overwhelming until we found Bipoca. The AI planning tools and comprehensive resources made it manageable, and the parent community provided invaluable support.",
      achievement: "All three children thriving academically and socially"
    },
    {
      name: "Dr. Patel",
      location: "Seattle, WA",
      quote: "As working parents, we worried about balancing careers with homeschooling. The flexible scheduling and comprehensive resources allowed us to provide a quality education while maintaining our professional lives.",
      achievement: "Children excelling in advanced mathematics and science"
    },
    {
      name: "The Robinson Family",
      location: "Nashville, TN",
      quote: "Our son has learning differences that weren&apos;t being addressed in traditional school. The personalized approach and adaptive technology helped him overcome challenges and discover his strengths.",
      achievement: "Son now reading above grade level after previous struggles"
    },
    {
      name: "The Garcia Family",
      location: "San Diego, CA",
      quote: "We wanted a curriculum that honored our cultural heritage while providing academic excellence. Bipoca&apos;s diverse content and customization options allowed us to create an educational experience that reflected our values.",
      achievement: "Children are bilingual and culturally connected"
    }
  ];

  const statistics = [
    {
      value: "94%",
      label: "of Bipoca homeschool students score above average on standardized tests",
      icon: <BookOpen />
    },
    {
      value: "89%",
      label: "of parents report increased engagement and motivation in their children",
      icon: <Star />
    },
    {
      value: "97%",
      label: "of Bipoca homeschool graduates are accepted to their first-choice colleges",
      icon: <GraduationCap />
    },
    {
      value: "92%",
      label: "of families report better work-life-education balance after switching to Bipoca",
      icon: <Award />
    }
  ];

  return (
    <PageTemplate
      title="Success Stories"
      description="Discover how families and students are thriving with our personalized homeschool approach. Read inspiring stories of academic achievement, personal growth, and educational transformation."
    >
      <div className="mb-12">
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="students">Student Stories</TabsTrigger>
            <TabsTrigger value="parents">Family Journeys</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studentStories.map((story, index) => (
                <StoryCard
                  key={index}
                  name={story.name}
                  location={story.location}
                  quote={story.quote}
                  achievement={story.achievement}
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
              <h3 className="text-xl font-bold mb-4 text-center">Student Achievement Spotlight</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Academic Excellence
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our students consistently outperform national averages on standardized tests and college entrance exams.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Specialized Pursuits
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Many students develop expertise in specialized areas of interest, from robotics to creative writing to environmental science.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Leadership Development
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our students develop strong leadership skills through community involvement, collaborative projects, and mentorship opportunities.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="parents">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {parentStories.map((story, index) => (
                <StoryCard
                  key={index}
                  name={story.name}
                  location={story.location}
                  quote={story.quote}
                  achievement={story.achievement}
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
              <h3 className="text-xl font-bold mb-4 text-center">Why Families Choose Bipoca Homeschooling</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Personalized Learning
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Families appreciate the ability to tailor education to each child&apos;s unique learning style, interests, and pace.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Culturally Responsive Content
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Parents value our diverse, inclusive curriculum that represents multiple perspectives and cultural traditions.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
                    Supportive Community
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our active parent community provides support, resources, and connections for families throughout their homeschooling journey.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <motion.div 
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Homeschool Success by the Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <StatisticCard
              key={index}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="p-8 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Ready to write your own success story?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of families who are transforming their educational experience with our personalized homeschool approach.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Start Your Homeschool Journey
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
