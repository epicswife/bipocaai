"use client";

import { Book, ArrowLeft, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EducationResourcesPage() {
  // Type-safe interface for educational resources
  interface Resource {
    title: string;
    description: string;
    link: string;
    source: string;
    tags?: string[];
    format?: 'article' | 'video' | 'course' | 'tool' | 'podcast' | 'organization';
  }

  interface ResourceCategory {
    category: string;
    description?: string;
    resources: Resource[];
  }

  // Type-safe educational resources definition
  const educationalResources: ResourceCategory[] = [
    {
      category: "Understanding Mental Health",
      description: "Foundational resources to build your knowledge about mental health concepts and principles.",
      resources: [
        {
          title: "Mental Health Basics",
          description: "An overview of mental health concepts, common conditions, and the importance of mental wellness.",
          link: "https://www.nimh.nih.gov/health/topics/index",
          source: "National Institute of Mental Health",
          format: 'article',
          tags: ['overview', 'conditions', 'wellness']
        },
        {
          title: "The Science of Well-Being",
          description: "Learn evidence-based strategies to increase your own happiness and build productive habits.",
          link: "https://www.coursera.org/learn/the-science-of-well-being",
          source: "Yale University (Coursera)",
          format: 'course',
          tags: ['happiness', 'habits', 'positive psychology']
        },
        {
          title: "Mental Health Myths and Facts",
          description: "Dispelling common misconceptions about mental health and mental illness.",
          link: "https://www.mentalhealth.gov/basics/mental-health-myths-facts",
          source: "MentalHealth.gov",
          format: 'article',
          tags: ['myths', 'stigma', 'facts']
        },
        {
          title: "Brain Architecture and Development",
          description: "How early experiences shape brain development and impact mental health throughout life.",
          link: "https://developingchild.harvard.edu/science/key-concepts/brain-architecture/",
          source: "Harvard Center on the Developing Child",
          format: 'article',
          tags: ['neuroscience', 'development', 'childhood']
        },
        {
          title: "Understanding the Stress Response",
          description: "Comprehensive explanation of how stress affects the body and mind.",
          link: "https://www.health.harvard.edu/staying-healthy/understanding-the-stress-response",
          source: "Harvard Health Publishing",
          format: 'article',
          tags: ['stress', 'physiology', 'health']
        }
      ]
    },
    {
      category: "For Students",
      description: "Resources specifically designed to help students navigate mental health challenges in academic settings.",
      resources: [
        {
          title: "Student Mental Health Guide",
          description: "Comprehensive resource addressing common mental health challenges faced by students.",
          link: "https://www.activeminds.org/about-mental-health/for-students/",
          source: "Active Minds",
          format: 'article',
          tags: ['students', 'college', 'support']
        },
        {
          title: "Managing Academic Stress",
          description: "Strategies for balancing academic demands with mental well-being.",
          link: "https://www.jedfoundation.org/resource/managing-stress-and-anxiety/",
          source: "The Jed Foundation",
          format: 'article',
          tags: ['stress', 'academics', 'balance']
        },
        {
          title: "Mindfulness for Students",
          description: "Introduction to mindfulness practices specifically designed for academic settings.",
          link: "https://www.mindful.org/mindfulness-for-students/",
          source: "Mindful.org",
          format: 'article',
          tags: ['mindfulness', 'focus', 'present moment']
        },
        {
          title: "Sleep and Student Success",
          description: "Research-based information on how sleep affects academic performance and mental health.",
          link: "https://www.sleepfoundation.org/school-and-sleep",
          source: "National Sleep Foundation",
          format: 'article',
          tags: ['sleep', 'performance', 'health']
        },
        {
          title: "Test Anxiety Toolkit",
          description: "Practical strategies for managing anxiety before and during exams.",
          link: "https://www.anxietycanada.com/articles/test-anxiety/",
          source: "Anxiety Canada",
          format: 'tool',
          tags: ['anxiety', 'exams', 'performance']
        },
        {
          title: "Student Guide to Mental Health During COVID-19",
          description: "Resources for students navigating the unique challenges of the pandemic and its aftermath.",
          link: "https://www.nami.org/Support-Education/NAMI-HelpLine/COVID-19-Information-and-Resources/COVID-19-Resource-and-Information-Guide",
          source: "National Alliance on Mental Illness",
          format: 'article',
          tags: ['pandemic', 'isolation', 'adaptation']
        }
      ]
    },
    {
      category: "For Parents and Educators",
      description: "Resources to help parents and educators support the mental health of children and students.",
      resources: [
        {
          title: "Supporting Child and Student Mental Health",
          description: "Guide for parents and educators on recognizing signs of mental health challenges and providing support.",
          link: "https://www.nasponline.org/resources-and-publications/resources-and-podcasts/mental-health",
          source: "National Association of School Psychologists",
          format: 'article',
          tags: ['support', 'signs', 'intervention']
        },
        {
          title: "Educator Mental Health Literacy",
          description: "Training resources to help educators understand and support student mental health.",
          link: "https://www.teachmentalhealth.org/",
          source: "TeachMentalHealth.org",
          format: 'course',
          tags: ['literacy', 'educators', 'training']
        },
        {
          title: "Talking to Children About Mental Health",
          description: "Age-appropriate ways to discuss mental health with children and teens.",
          link: "https://childmind.org/article/talking-to-kids-about-mental-health/",
          source: "Child Mind Institute",
          format: 'article',
          tags: ['communication', 'children', 'teens']
        },
        {
          title: "Creating a Mentally Healthy Classroom",
          description: "Strategies for educators to promote mental wellness in learning environments.",
          link: "https://www.edutopia.org/article/creating-mentally-healthy-classrooms/",
          source: "Edutopia",
          format: 'article',
          tags: ['classroom', 'environment', 'wellness']
        },
        {
          title: "Trauma-Informed Educational Practices",
          description: "Understanding how trauma affects learning and implementing supportive approaches.",
          link: "https://traumasensitiveschools.org/",
          source: "Trauma Sensitive Schools",
          format: 'article',
          tags: ['trauma', 'sensitivity', 'support']
        }
      ]
    },
    {
      category: "Interactive Learning",
      description: "Hands-on tools and courses to actively engage with mental health concepts.",
      resources: [
        {
          title: "Mental Health First Aid",
          description: "Learn how to identify, understand and respond to signs of mental health challenges.",
          link: "https://www.mentalhealthfirstaid.org/",
          source: "Mental Health First Aid",
          format: 'course',
          tags: ['first aid', 'intervention', 'training']
        },
        {
          title: "Depression and Anxiety Self-Assessment",
          description: "Interactive tools to help you understand your mental health symptoms.",
          link: "https://screening.mhanational.org/screening-tools/",
          source: "Mental Health America",
          format: 'tool',
          tags: ['assessment', 'screening', 'symptoms']
        },
        {
          title: "Stress Management Interactive Modules",
          description: "Interactive learning modules on managing stress and building resilience.",
          link: "https://www.helpguide.org/articles/stress/stress-management.htm",
          source: "HelpGuide.org",
          format: 'tool',
          tags: ['stress', 'management', 'interactive']
        },
        {
          title: "CBT Thought Record Tool",
          description: "Interactive tool for practicing cognitive behavioral therapy techniques.",
          link: "https://www.psychologytools.com/resource/thought-record/",
          source: "Psychology Tools",
          format: 'tool',
          tags: ['CBT', 'thoughts', 'emotions']
        },
        {
          title: "Mood Tracking App",
          description: "Tool for monitoring your mood patterns and identifying triggers.",
          link: "https://www.moodpath.com/",
          source: "MoodPath",
          format: 'tool',
          tags: ['tracking', 'patterns', 'awareness']
        },
        {
          title: "Mindfulness Meditation Interactive Course",
          description: "Step-by-step guide to developing a mindfulness practice.",
          link: "https://palousemindfulness.com/",
          source: "Palouse Mindfulness",
          format: 'course',
          tags: ['mindfulness', 'meditation', 'practice']
        }
      ]
    },
    {
      category: "Videos and Podcasts",
      description: "Audio and visual resources for learning about mental health concepts.",
      resources: [
        {
          title: "TED Talks on Mental Health",
          description: "Inspiring and informative talks on various mental health topics.",
          link: "https://www.ted.com/topics/mental+health",
          source: "TED",
          format: 'video',
          tags: ['talks', 'inspiration', 'education']
        },
        {
          title: "The Hilarious World of Depression",
          description: "A series of frank, moving, and funny conversations about depression.",
          link: "https://www.hilariousworld.org/",
          source: "American Public Media",
          format: 'podcast',
          tags: ['depression', 'humor', 'stories']
        },
        {
          title: "Mental Health Videos for Students",
          description: "Short, informative videos addressing common mental health concerns for students.",
          link: "https://www.youtube.com/c/PsychHub",
          source: "Psych Hub YouTube Channel",
          format: 'video',
          tags: ['education', 'students', 'explainers']
        },
        {
          title: "Therapy in a Nutshell",
          description: "Educational videos about mental health, therapy techniques, and emotional wellness.",
          link: "https://www.youtube.com/c/TherapyinaNutshell",
          source: "Therapy in a Nutshell YouTube Channel",
          format: 'video',
          tags: ['therapy', 'techniques', 'skills']
        },
        {
          title: "The Mental Illness Happy Hour",
          description: "Interviews with comedians, artists, and medical professionals about mental illness, trauma, and addiction.",
          link: "https://mentalpod.com/",
          source: "Mental Illness Happy Hour",
          format: 'podcast',
          tags: ['interviews', 'stories', 'recovery']
        },
        {
          title: "Unlocking Us with Brené Brown",
          description: "Conversations about emotions, courage, and vulnerability.",
          link: "https://brenebrown.com/unlockingus/",
          source: "Brené Brown",
          format: 'podcast',
          tags: ['vulnerability', 'emotions', 'connection']
        }
      ]
    },
    {
      category: "Research and Academic Resources",
      description: "Scholarly resources for those interested in deeper understanding of mental health research.",
      resources: [
        {
          title: "PubMed Central - Mental Health Research",
          description: "Access to peer-reviewed research papers on mental health topics.",
          link: "https://www.ncbi.nlm.nih.gov/pmc/?term=mental+health",
          source: "National Center for Biotechnology Information",
          format: 'article',
          tags: ['research', 'academic', 'studies']
        },
        {
          title: "Annual Review of Clinical Psychology",
          description: "Comprehensive reviews of current research in clinical psychology and mental health.",
          link: "https://www.annualreviews.org/journal/clinpsy",
          source: "Annual Reviews",
          format: 'article',
          tags: ['reviews', 'clinical', 'psychology']
        },
        {
          title: "World Health Organization - Mental Health Data and Resources",
          description: "Global statistics, reports, and resources on mental health.",
          link: "https://www.who.int/health-topics/mental-health",
          source: "World Health Organization",
          format: 'article',
          tags: ['global', 'statistics', 'policy']
        },
        {
          title: "APA PsycNet",
          description: "Database of psychological literature from the American Psychological Association.",
          link: "https://psycnet.apa.org/",
          source: "American Psychological Association",
          format: 'article',
          tags: ['database', 'psychology', 'literature']
        },
        {
          title: "Open Access Mental Health Journals",
          description: "Directory of open access journals focused on mental health research.",
          link: "https://www.frontiersin.org/journals/psychiatry",
          source: "Frontiers in Psychiatry",
          format: 'article',
          tags: ['open access', 'journals', 'research']
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <Book className="h-16 w-16 mx-auto mb-6 text-blue-500" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Educational Resources
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Expand your knowledge about mental health and well-being
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

      {/* Educational Resources Introduction */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Learn and Grow
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Education is a powerful tool for mental health. Understanding mental health concepts can help you 
              recognize challenges early, develop coping strategies, and support others effectively.
            </p>
          </div>

          <Card className="bg-card shadow-glow glassmorphism mb-12">
            <CardContent className="p-6 sm:p-8">
              <p className="text-muted-foreground mb-6">
                We&apos;ve curated high-quality resources from reputable organizations to help you learn about various 
                aspects of mental health. These resources are organized by category to help you find what&apos;s most relevant to you.
              </p>
              <p className="text-muted-foreground">
                <strong>Note:</strong> External links will open in a new tab. While we&apos;ve carefully selected these resources, 
                they are provided by third parties and their content may change over time.
              </p>
            </CardContent>
          </Card>

          {/* Educational Resources By Category */}
          {educationalResources.map((category, index) => (
            <div key={index} className="mb-12">
              <h3 className="text-2xl font-semibold text-foreground mb-6">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.resources.map((resource, resIndex) => (
                  <Card 
                    key={resIndex} 
                    className="bg-card shadow-glow glassmorphism border-blue-500 hover:border-blue-400 transition-all duration-300"
                  >
                    <CardContent className="p-6 sm:p-8">
                      <h4 className="text-xl font-semibold text-foreground mb-3">{resource.title}</h4>
                      <p className="text-muted-foreground mb-4">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{resource.source}</span>
                        <a 
                          href={resource.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
                        >
                          Visit <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* Social Emotional Learning Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Social Emotional Learning
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Social and emotional learning (SEL) helps develop essential life skills for managing emotions, building relationships, and making responsible decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card shadow-glow glassmorphism border-blue-500">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">CASEL Framework</h3>
                <p className="text-muted-foreground mb-4">
                  Learn about the five core competencies of social emotional learning: self-awareness, self-management, social awareness, relationship skills, and responsible decision-making.
                </p>
                <a href="https://casel.org/fundamentals-of-sel/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Explore SEL Framework
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-glow glassmorphism border-blue-500">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">SEL Activities</h3>
                <p className="text-muted-foreground mb-4">
                  Practical activities and exercises to develop social emotional skills for different age groups, from elementary students to adults.
                </p>
                <Link href="/mental-health/social-emotional-learning">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    View SEL Activities
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-glow glassmorphism border-blue-500">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">SEL Research</h3>
                <p className="text-muted-foreground mb-4">
                  Evidence-based research on the impact of social emotional learning on academic performance, behavior, and long-term success.
                </p>
                <a href="https://www.edutopia.org/sel-research-learning-outcomes/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Read Research
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* BIPOCA AI Specific Resources */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              BIPOCA AI Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              In addition to external resources, we offer our own educational content:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card shadow-glow glassmorphism border-blue-500">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Mental Health Workshops</h3>
                <p className="text-muted-foreground mb-4">
                  We regularly host workshops on topics like stress management, building resilience, and supporting peers.
                  These interactive sessions provide practical skills and knowledge.
                </p>
                <Link href="/events">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    View Upcoming Workshops
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-glow glassmorphism border-blue-500">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Mental Health Library</h3>
                <p className="text-muted-foreground mb-4">
                  Our digital library contains articles, guides, and resources created specifically for our community.
                  These materials address common challenges and provide evidence-based strategies.
                </p>
                <Link href="/resources/library">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Browse Library
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-glow glassmorphism border-blue-500">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Webinar Series</h3>
                <p className="text-muted-foreground mb-4">
                  Access our recorded webinars featuring mental health professionals discussing various topics related to emotional wellness and psychological health.
                </p>
                <Link href="/resources/webinars">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Watch Webinars
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Additional Resources */}
          <div className="text-center">
            <Link href="/mental-health">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white shadow-glow">
                Return to Mental Health Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
