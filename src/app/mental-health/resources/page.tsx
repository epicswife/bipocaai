"use client";

import { ArrowLeft, BookOpen, Globe, Bookmark, ExternalLink, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';

export default function MentalHealthResourcesPage() {
  // Type-safe resource definition
  interface Resource {
    id: string;
    title: string;
    description: string;
    url: string;
    type: 'article' | 'video' | 'podcast' | 'tool' | 'organization';
    tags: string[];
    ageGroup?: 'children' | 'teens' | 'adults' | 'all';
  }

  const resources: Resource[] = [
    {
      id: "nimh-mental-health",
      title: "Understanding Mental Health",
      description: "Comprehensive overview of mental health conditions, treatments, and research from the National Institute of Mental Health.",
      url: "https://www.nimh.nih.gov/health/topics/index",
      type: "article",
      tags: ["overview", "conditions", "research", "treatment"],
      ageGroup: "all"
    },
    {
      id: "apa-managing-stress",
      title: "Stress Management Techniques",
      description: "Evidence-based strategies for managing stress in daily life from the American Psychological Association.",
      url: "https://www.apa.org/topics/stress",
      type: "article",
      tags: ["stress", "coping", "techniques", "self-help"],
      ageGroup: "adults"
    },
    {
      id: "headspace-meditation",
      title: "Headspace: Guided Meditation",
      description: "App offering guided meditation sessions for stress, anxiety, sleep, focus, and more.",
      url: "https://www.headspace.com/",
      type: "tool",
      tags: ["meditation", "mindfulness", "app", "relaxation"],
      ageGroup: "all"
    },
    {
      id: "calm-harm",
      title: "Calm Harm App",
      description: "App designed to help manage the urge to self-harm using evidence-based techniques.",
      url: "https://calmharm.co.uk/",
      type: "tool",
      tags: ["self-harm", "crisis", "coping", "app"],
      ageGroup: "teens"
    },
    {
      id: "ted-anxiety",
      title: "How to Cope with Anxiety",
      description: "TED Talk by psychologist Olivia Remes on managing anxiety and building resilience.",
      url: "https://www.ted.com/talks/olivia_remes_how_to_cope_with_anxiety",
      type: "video",
      tags: ["anxiety", "coping", "resilience", "talk"],
      ageGroup: "all"
    },
    {
      id: "nami-bipoc",
      title: "BIPOC Mental Health Resources",
      description: "Resources specifically addressing mental health in Black, Indigenous, and People of Color communities.",
      url: "https://www.nami.org/Your-Journey/Identity-and-Cultural-Dimensions/Black-African-American",
      type: "organization",
      tags: ["BIPOC", "cultural", "resources", "support"],
      ageGroup: "all"
    },
    {
      id: "trevor-lgbtq",
      title: "The Trevor Project",
      description: "Crisis intervention and suicide prevention services for LGBTQ+ young people.",
      url: "https://www.thetrevorproject.org/resources/",
      type: "organization",
      tags: ["LGBTQ+", "crisis", "youth", "support"],
      ageGroup: "teens"
    },
    {
      id: "mental-note-podcast",
      title: "Mental Note Podcast",
      description: "Podcast exploring mental health topics through personal stories and expert insights.",
      url: "https://mentalnoteproject.org/podcast/",
      type: "podcast",
      tags: ["stories", "recovery", "inspiration", "education"],
      ageGroup: "adults"
    },
    {
      id: "child-mind-anxiety",
      title: "Anxiety in Children",
      description: "Guide for parents on recognizing and helping children with anxiety from the Child Mind Institute.",
      url: "https://childmind.org/article/what-to-do-and-not-do-when-children-are-anxious/",
      type: "article",
      tags: ["children", "anxiety", "parenting", "guidance"],
      ageGroup: "children"
    },
    {
      id: "moodgym",
      title: "MoodGym",
      description: "Interactive self-help program teaching cognitive-behavioral therapy skills for preventing depression.",
      url: "https://moodgym.com.au/",
      type: "tool",
      tags: ["CBT", "depression", "self-help", "interactive"],
      ageGroup: "all"
    },
    {
      id: "calm-college",
      title: "Calm College Student Program",
      description: "Free premium access to Calm meditation app for college students.",
      url: "https://www.calm.com/colleges",
      type: "tool",
      tags: ["meditation", "students", "stress", "sleep"],
      ageGroup: "adults"
    },
    {
      id: "mayo-mindfulness",
      title: "Mindfulness Exercises",
      description: "Simple mindfulness exercises to practice daily from Mayo Clinic.",
      url: "https://www.mayoclinic.org/healthy-lifestyle/consumer-health/in-depth/mindfulness-exercises/art-20046356",
      type: "article",
      tags: ["mindfulness", "exercises", "beginners", "daily practice"],
      ageGroup: "all"
    }
  ];

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null);

  // Filter resources based on search and filters
  const filteredResources = resources.filter(resource => {
    // Search query filter
    const matchesSearch = searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Type filter
    const matchesType = selectedType === null || resource.type === selectedType;
    
    // Age group filter
    const matchesAgeGroup = selectedAgeGroup === null || 
      resource.ageGroup === selectedAgeGroup || 
      resource.ageGroup === 'all';
    
    return matchesSearch && matchesType && matchesAgeGroup;
  });

  // Resource type options
  const resourceTypes = [
    { value: "article", label: "Articles" },
    { value: "video", label: "Videos" },
    { value: "podcast", label: "Podcasts" },
    { value: "tool", label: "Tools & Apps" },
    { value: "organization", label: "Organizations" }
  ];

  // Age group options
  const ageGroups = [
    { value: "children", label: "Children" },
    { value: "teens", label: "Teens" },
    { value: "adults", label: "Adults" },
    { value: "all", label: "All Ages" }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <BookOpen className="h-16 w-16 mx-auto mb-6 text-teal-500" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Mental Health Resources
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Curated resources for all ages and needs
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

      {/* Resources Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Find the Right Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Browse our curated collection of mental health resources for all ages. Use the filters to find exactly what you need.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search resources..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {resourceTypes.map(type => (
                  <Button
                    key={type.value}
                    variant={selectedType === type.value ? "default" : "outline"}
                    className={selectedType === type.value ? "bg-teal-500 hover:bg-teal-600" : ""}
                    onClick={() => setSelectedType(selectedType === type.value ? null : type.value)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm font-medium text-muted-foreground self-center mr-2">Age Group:</span>
              {ageGroups.map(age => (
                <Button
                  key={age.value}
                  variant={selectedAgeGroup === age.value ? "default" : "outline"}
                  size="sm"
                  className={selectedAgeGroup === age.value ? "bg-teal-500 hover:bg-teal-600" : ""}
                  onClick={() => setSelectedAgeGroup(selectedAgeGroup === age.value ? null : age.value)}
                >
                  {age.label}
                </Button>
              ))}
            </div>
            
            {/* Results count */}
            <p className="text-sm text-muted-foreground">
              Showing {filteredResources.length} of {resources.length} resources
              {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
            </p>
          </div>

          {/* Resources Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredResources.map((resource) => (
                <Card 
                  key={resource.id} 
                  className="bg-card shadow-glow glassmorphism border-teal-500 hover:border-teal-400 transition-all duration-300"
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`
                        text-xs font-medium px-2.5 py-0.5 rounded 
                        ${resource.type === 'article' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : ''}
                        ${resource.type === 'video' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : ''}
                        ${resource.type === 'podcast' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : ''}
                        ${resource.type === 'tool' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}
                        ${resource.type === 'organization' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' : ''}
                      `}>
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </span>
                      
                      {resource.ageGroup && (
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {resource.ageGroup === 'all' ? 'All Ages' : 
                           resource.ageGroup === 'children' ? 'Children' :
                           resource.ageGroup === 'teens' ? 'Teens' : 'Adults'}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded dark:bg-teal-900 dark:text-teal-300"
                          onClick={() => setSearchQuery(tag)}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-teal-500 hover:text-teal-600 transition-colors flex items-center gap-1"
                      >
                        Visit Resource
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-teal-500"
                        onClick={() => {
                          // In a real app, this would save the resource to user's bookmarks
                          alert(`Resource "${resource.title}" would be saved to your bookmarks in a real application.`);
                        }}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Globe className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No matching resources found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType(null);
                  setSelectedAgeGroup(null);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Suggest a Resource */}
          <Card className="bg-card shadow-glow glassmorphism mb-12">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Don&apos;t see what you&apos;re looking for?</h3>
                <p className="text-muted-foreground mb-4">
                  We&apos;re always looking to expand our resource library. If you know of a valuable mental health resource 
                  that should be included here, please let us know.
                </p>
                <Button 
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                  onClick={() => {
                    // In a real app, this would open a form to suggest a resource
                    alert("In a real application, this would open a form to suggest a new resource.");
                  }}
                >
                  Suggest a Resource
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-12 dark:bg-amber-900 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>Disclaimer:</strong> The resources listed on this page are provided for informational purposes only and 
              are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your 
              physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>

          {/* Return Link */}
          <div className="text-center">
            <Link href="/mental-health">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white shadow-glow">
                Return to Mental Health Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
