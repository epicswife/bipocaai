"use client";

import React from 'react';
import { PageTemplate } from '@/components/learn-more/page-template';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Calendar, BookOpen, Globe, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, href, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + (delay * 0.1) }}
      className="h-full"
    >
      <Link href={href} className="block h-full">
        <Card className="p-6 h-full border border-[var(--color-pan-amber)]/20 hover:border-[var(--color-pan-amber)] transition-all duration-300 hover:shadow-lg group">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
              {React.cloneElement(icon as React.ReactElement, { 
                className: "w-5 h-5 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" 
              } as React.HTMLAttributes<HTMLElement>)}
            </div>
            <h3 className="text-xl font-bold group-hover:text-[var(--color-pan-green)] dark:group-hover:text-[var(--color-pan-amber)] transition-colors duration-300">{title}</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
          <div className="mt-4 flex justify-end">
            <ArrowRight className="w-5 h-5 text-[var(--color-pan-amber)] group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

// Community Member Card
interface CommunityMemberProps {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  index: number;
}

const CommunityMember: React.FC<CommunityMemberProps> = ({ name, role, bio, imageSrc, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-[var(--color-pan-amber)]/20 flex flex-col md:flex-row"
    >
      <div className="relative w-full md:w-1/3 h-48 md:h-auto">
        <Image
          src={imageSrc}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-6 md:w-2/3">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-[var(--color-pan-amber)] mb-3">{role}</p>
        <p className="text-gray-600 dark:text-gray-300">{bio}</p>
      </div>
    </motion.div>
  );
};

// Upcoming Event Card
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
      transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
      className="border-b border-[var(--color-pan-amber)]/20 last:border-b-0 py-4"
    >
      <div className="flex items-start">
        <div className="w-12 h-12 rounded-lg bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-4 flex-shrink-0">
          <Calendar className="w-6 h-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />
        </div>
        <div>
          <div className="flex items-center mb-1">
            <span className="text-sm font-medium text-[var(--color-pan-amber)] mr-2">{date}</span>
            <span className="text-xs bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] px-2 py-0.5 rounded-full">{type}</span>
          </div>
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
          <Link href="#" className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] text-sm font-medium mt-2 inline-flex items-center hover:underline">
            Learn more
            <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function CommunityPage() {
  const communityFeatures = [
    {
      title: "Discussion Forums",
      description: "Connect with other members to share ideas, ask questions, and collaborate on educational topics.",
      icon: <MessageCircle />,
      href: "#forums",
    },
    {
      title: "Events & Webinars",
      description: "Participate in virtual and in-person events to deepen your knowledge and expand your network.",
      icon: <Calendar />,
      href: "#events",
    },
    {
      title: "Resource Library",
      description: "Access a wealth of community-contributed resources, lesson plans, and teaching materials.",
      icon: <BookOpen />,
      href: "#resources",
    },
    {
      title: "Global Network",
      description: "Join a diverse, global community of educators, parents, and students committed to educational excellence.",
      icon: <Globe />,
      href: "#network",
    },
  ];

  const communityMembers = [
    {
      name: "Dr. Amina Okafor",
      role: "Educational Consultant & Community Leader",
      bio: "Dr. Okafor has been a driving force in our community, bringing 20 years of experience in culturally responsive education. She leads our monthly webinars and has contributed over 50 resources to our library.",
      imageSrc: "/images/community-member-1.jpg",
    },
    {
      name: "Marcus Johnson",
      role: "High School Teacher & Curriculum Developer",
      bio: "Marcus has transformed his classroom using BIPOCA AI and now helps other teachers implement culturally responsive practices. His student-centered approach has inspired many in our community.",
      imageSrc: "/images/community-member-2.jpg",
    },
    {
      name: "Sofia Rodriguez",
      role: "Parent Advocate & Homeschool Mentor",
      bio: "After successfully homeschooling her three children using BIPOCA AI, Sofia now mentors other parents. She leads our parent support group and has created numerous family learning resources.",
      imageSrc: "/images/community-member-3.jpg",
    },
  ];

  const upcomingEvents = [
    {
      title: "Culturally Responsive Teaching in STEM",
      date: "June 15, 2023",
      description: "Join Dr. James Wilson for an interactive workshop on integrating culturally responsive practices into STEM education.",
      type: "Workshop",
    },
    {
      title: "Parent Community Meetup",
      date: "June 22, 2023",
      description: "Connect with other parents to share experiences, challenges, and successes in supporting your child's educational journey.",
      type: "Networking",
    },
    {
      title: "Student Showcase: Creative Projects",
      date: "July 5, 2023",
      description: "Celebrate the achievements of students as they present creative projects developed through BIPOCA AI's curriculum.",
      type: "Showcase",
    },
    {
      title: "Implementing BIPOCA AI in Your School",
      date: "July 12, 2023",
      description: "A comprehensive webinar for administrators and teachers on successfully implementing BIPOCA AI in school settings.",
      type: "Webinar",
    },
  ];

  return (
    <PageTemplate
      title="Join Our Community"
      description="Connect with a diverse network of educators, parents, and students committed to culturally responsive education and lifelong learning."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
            A Vibrant Learning Community
          </h2>
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            The BIPOCA AI community brings together passionate educators, parents, and students from around the world who are committed to culturally responsive education and lifelong learning.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Connect with like-minded educators, parents, and students</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Share resources, ideas, and best practices</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Participate in events, webinars, and discussions</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-bold">✓</span>
              </div>
              <span>Grow professionally and personally through collaboration</span>
            </li>
          </ul>
          <div className="mt-2">
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
              Join Our Community
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative min-h-[300px] rounded-lg overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-pan-green)]/20 to-[var(--color-pan-amber)]/20 z-10 rounded-lg"></div>
          <Image
            src="/images/community-hero.jpg"
            alt="BIPOCA AI community members collaborating"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            priority
          />
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Community Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {communityFeatures.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            href={feature.href}
            delay={index}
          />
        ))}
      </div>
      
      <div id="network" className="mb-16">
        <div className="flex items-center mb-6">
          <Users className="w-6 h-6 text-[var(--color-pan-amber)] mr-2" />
          <h2 className="text-2xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
            Meet Our Community Leaders
          </h2>
        </div>
        <div className="space-y-6">
          {communityMembers.map((member, index) => (
            <CommunityMember
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              imageSrc={member.imageSrc}
              index={index}
            />
          ))}
        </div>
      </div>
      
      <div id="events" className="mb-16">
        <div className="flex items-center mb-6">
          <Calendar className="w-6 h-6 text-[var(--color-pan-amber)] mr-2" />
          <h2 className="text-2xl font-bold text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
            Upcoming Community Events
          </h2>
        </div>
        <Card className="p-6 border border-[var(--color-pan-amber)]/20">
          <div className="space-y-2">
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
          <div className="mt-6 text-center">
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
              View All Events
            </Button>
          </div>
        </Card>
      </div>
      
      <motion.div 
        className="p-8 bg-[var(--color-pan-green)]/5 dark:bg-[var(--color-pan-amber)]/5 rounded-lg border border-[var(--color-pan-amber)]/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Ready to join our community?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Connect with educators, parents, and students who share your passion for culturally responsive education and lifelong learning.</p>
        <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
          Create Your Free Account
        </Button>
      </motion.div>
    </PageTemplate>
  );
}
