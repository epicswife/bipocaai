"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, Building, Check, Globe, Lightbulb, Shield, Users } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center" style={{background: 'linear-gradient(to right, #0f7c3d, #ffc107)', color: 'white'}}>
        <div className="absolute inset-0 opacity-20 bg-[url('/images/grid-pattern.svg')] bg-center z-0"></div>
        <motion.div
          className="max-w-7xl mx-auto relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Badge className="mb-4 px-4 py-2 text-sm bg-[#0f7c3d]/20 backdrop-blur-sm text-[#0f7c3d] dark:text-[#ffc107] border-none shadow-glow opacity-100">
            Established 2024 • Trusted by 10,000+ Students Worldwide
          </Badge>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-orbitron font-bold mb-6 opacity-100" style={{color: 'white'}}>
            <span style={{color: 'white'}}>About</span>{" "}
            <span style={{color: '#e53935'}}>
              BIPOCA AI
            </span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-900 dark:text-white mb-10 max-w-3xl mx-auto opacity-100">
            Transforming education for Black, Indigenous, People of Color, and Allies through AI-powered learning
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" className="rounded-full bg-[#0f7c3d] hover:bg-[#00897b] dark:bg-[#ffc107] dark:hover:bg-[#e53935] text-white shadow-glow hover:scale-105 transition-all duration-300">
              Our Mission <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-[#e53935] dark:border-[#ffc107] text-[#e53935] dark:text-[#ffc107] hover:bg-[#e53935]/10 dark:hover:bg-[#ffc107]/10 hover:scale-105 transition-all duration-300">
              Watch Video
            </Button>
          </div>
          <div className="flex justify-center gap-8 mt-12">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">50+</span>
              <span className="text-gray-900 dark:text-white">Courses</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">25+</span>
              <span className="text-gray-900 dark:text-white">Partners</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">10K+</span>
              <span className="text-gray-900 dark:text-white">Students</span>
            </div>
          </div>
        </motion.div>
        <svg
          className="absolute bottom-0 left-0 w-full h-24 text-background dark:text-background visionease:text-background high-contrast:text-background z-0"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C360 50 1080 50 1440 100 L1440 100 L0 100 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Our Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <Badge className="mb-4 px-3 py-1 bg-card/50 backdrop-blur-sm text-primary-foreground dark:text-primary-foreground border-none shadow-glow opacity-100">
              OUR JOURNEY
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-orbitron font-bold text-center text-foreground dark:text-white mb-4 opacity-100">
              Our{" "}
              <span style={{color: '#e53935'}}>
                Story
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0f7c3d] to-[#e53935] rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground dark:text-muted-foreground text-center max-w-3xl opacity-100">
              From vision to reality: How we&apos;re revolutionizing education for underrepresented communities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center relative z-10"
            >
              <div className="relative w-full max-w-md h-[400px] rounded-2xl overflow-hidden shadow-glow border border-primary/30">
                <div className="absolute inset-0 bg-gradient-gold-cyan opacity-90"></div>
                <Image
                  src="/images/founder.jpg"
                  alt="Dr. Maya Johnson, Founder"
                  fill
                  className="object-cover opacity-90 mix-blend-overlay"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-person.jpg";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6 bg-card/70 backdrop-blur-sm rounded-xl w-4/5 shadow-glow border border-primary/20 opacity-100">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Dr. Maya Johnson</h3>
                    <p className="text-foreground/90 mb-4 font-medium">Founder & CEO</p>
                    <p className="text-foreground italic text-sm">
                      “Education should be a mirror where every student can see themselves reflected.”
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-foreground mb-6 opacity-100">
                Founded with <span style={{color: '#e53935'}}>Purpose</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed opacity-100">
                BIPOCA AI was founded in 2024 with a clear mission: to create an educational platform that addresses the unique needs and perspectives of Black, Indigenous, People of Color, and Allies. Our founder, Dr. Maya Johnson, recognized the gap in educational technology that authentically represented diverse histories, cultures, and learning styles.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed opacity-100">
                What began as a passion project quickly evolved into a comprehensive educational ecosystem, powered by advanced AI and designed to be accessible to all learners regardless of ability, device, or location.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Check className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                  <span>Culturally responsive</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                  <span>AI-powered learning</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                  <span>Accessibility focused</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                  <span>Community driven</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <Badge className="mb-4 px-3 py-1 bg-card/50 backdrop-blur-sm text-primary-foreground dark:text-primary-foreground border-none shadow-glow opacity-100">
              OUR PURPOSE
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-orbitron font-bold text-center text-gray-900 dark:text-white mb-4 opacity-100">
              Mission &{" "}
              <span style={{color: '#e53935'}}>
                Values
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0f7c3d] to-[#e53935] rounded-full mb-6"></div>
            <p className="text-xl text-gray-900 dark:text-white text-center max-w-3xl opacity-100">
              Guided by purpose, driven by innovation, committed to inclusive education for all
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div className="flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-[#0f7c3d]/10 dark:bg-[#ffc107]/10 flex items-center justify-center mr-4 shadow-glow">
                  <Building className="h-6 w-6 text-[#0f7c3d] dark:text-[#ffc107]" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white opacity-100">
                  Our{" "}
                  <span style={{color: '#e53935'}}>
                    Mission
                  </span>
                </h3>
              </div>
              <p className="text-lg text-gray-900 dark:text-white mb-8 leading-relaxed opacity-100">
                BIPOCA AI is on a mission to break down educational barriers for Black, Indigenous, People of Color, and Allies worldwide. We strive to create an inclusive learning environment that celebrates diverse perspectives, promotes cultural understanding, and empowers learners through accessible, AI-driven education.
              </p>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-[#0f7c3d]/10 dark:bg-[#ffc107]/10 flex items-center justify-center mr-4 shadow-glow">
                  <Shield className="h-6 w-6 text-[#e53935] dark:text-[#e53935]" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white opacity-100">
                  Our{" "}
                  <span style={{color: '#e53935'}}>
                    Vision
                  </span>
                </h3>
              </div>
              <p className="text-lg text-gray-900 dark:text-white leading-relaxed opacity-100">
                We envision a future where education is limitless, powered by AI to provide personalized, accessible learning for every individual, regardless of location, device, or ability. Our goal is to create a world where diverse histories and perspectives are valued, and where technology bridges educational gaps rather than widening them.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { 
                  title: "Inclusion", 
                  description: "Creating spaces where everyone belongs and diverse perspectives are celebrated",
                  icon: <Users className="h-10 w-10 text-primary dark:text-secondary" />
                },
                { 
                  title: "Accessibility", 
                  description: "Making education available to all, regardless of ability, device, or location",
                  icon: <Globe className="h-10 w-10 text-primary dark:text-secondary" />
                },
                { 
                  title: "Innovation", 
                  description: "Pushing boundaries with AI-driven learning and cutting-edge educational technology",
                  icon: <Lightbulb className="h-10 w-10 text-primary dark:text-secondary" />
                },
                { 
                  title: "Empowerment", 
                  description: "Equipping learners with knowledge, skills, and confidence to succeed",
                  icon: <Award className="h-10 w-10 text-primary dark:text-secondary" />
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card dark:bg-card border border-primary/20 dark:border-secondary/20 shadow-glow hover:shadow-xl transition-all duration-300 h-full glassmorphism">
                    <CardContent className="pt-8 pb-6">
                      <div className="bg-primary/10 dark:bg-secondary/10 p-3 rounded-full w-fit mb-4">
                        {value.icon}
                      </div>
                      <h4 className="text-xl font-bold text-foreground dark:text-foreground mb-3 opacity-100">{value.title}</h4>
                      <p className="text-muted-foreground dark:text-muted-foreground opacity-100">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <Badge className="mb-4 px-3 py-1 bg-card/50 backdrop-blur-sm text-primary-foreground dark:text-primary-foreground border-none shadow-glow opacity-100">
              LEADERSHIP
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-orbitron font-bold text-center text-foreground dark:text-white mb-4 opacity-100">
              Our{" "}
              <span style={{color: '#e53935'}}>
                Team
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0f7c3d] to-[#e53935] rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground dark:text-muted-foreground text-center max-w-3xl opacity-100">
              Meet the visionaries and experts behind BIPOCA AI&apos;s educational revolution
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: "Dr. Maya Johnson", 
                role: "Founder & CEO", 
                bio: "Former education policy advisor with a passion for inclusive learning",
                imagePath: "/images/team/maya-johnson.jpg" 
              },
              { 
                name: "Dr. James Washington", 
                role: "Chief Education Officer", 
                bio: "20+ years experience in curriculum development and educational psychology",
                imagePath: "/images/team/james-washington.jpg" 
              },
              { 
                name: "Sarah Rodriguez", 
                role: "Chief Technology Officer", 
                bio: "AI specialist with expertise in adaptive learning systems",
                imagePath: "/images/team/sarah-rodriguez.jpg" 
              },
              { 
                name: "Michael Chen", 
                role: "Head of Accessibility", 
                bio: "Advocate for inclusive design and accessible educational technology",
                imagePath: "/images/team/michael-chen.jpg" 
              },
            ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col h-full"
                >
                  <Card className="bg-white dark:bg-gray-900/80 border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <div className="relative h-64 w-full bg-gradient-to-br from-blue-600 to-purple-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image 
                          src={member.imagePath}
                          alt={member.name}
                          width={250}
                          height={250}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' text-anchor='middle' dominant-baseline='middle' fill='%23a0a0a0'%3ETeam Member%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/2"></div>
                    </div>
                    <CardContent className="pt-6 pb-6 relative">
                      <h3 className="text-xl font-bold text-foreground opacity-100">{member.name}</h3>
                      <p className="text-primary font-medium mb-3 opacity-100">{member.role}</p>
                      <p className="text-muted-foreground text-sm opacity-100">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Partners & Collaborators */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <Badge className="mb-4 px-3 py-1 bg-card/50 backdrop-blur-sm text-primary-foreground dark:text-primary-foreground border-none shadow-glow opacity-100">
              COLLABORATIONS
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-orbitron font-bold text-center text-gray-900 dark:text-white mb-4 opacity-100">
              Partners &{" "}
              <span style={{color: '#e53935'}}>
                Collaborators
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0f7c3d] to-[#e53935] rounded-full mb-6"></div>
            <p className="text-xl text-gray-900 dark:text-white text-center max-w-3xl opacity-100">
              Working together with leading organizations to transform educational experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { 
                name: "BlackFacts.com", 
                description: "Providing authentic historical content and cultural resources that celebrate Black history and achievements",
                logo: "/images/partners/blackfacts-logo.png",
                website: "https://blackfacts.com"
              },
              { 
                name: "Friends of the African Union", 
                description: "Supporting educational initiatives across the diaspora and promoting cultural exchange programs",
                logo: "/images/partners/fau-logo.png",
                website: "https://friendsoftheafricanunion.org"
              },
              { 
                name: "Legacy Education", 
                description: "Collaborating on curriculum development and teacher training to ensure culturally responsive education",
                logo: "/images/partners/legacy-logo.png",
                website: "https://legacyeducation.org"
              },
            ].map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <CardContent className="pt-8 pb-6">
                      <div className="h-16 flex items-center justify-center mb-6">
                        <div className="relative w-full h-full">
                          <Image 
                            src={partner.logo}
                            alt={partner.name + " logo"}
                            width={150}
                            height={60}
                            className="object-contain w-auto h-full mx-auto"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='60' viewBox='0 0 150 60'%3E%3Crect width='150' height='60' fill='%23f0f0f0'/%3E%3Ctext x='75' y='30' font-family='Arial' font-size='14' text-anchor='middle' dominant-baseline='middle' fill='%23a0a0a0'%3E" + partner.name + "%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-foreground dark:text-foreground mb-3 opacity-100">{partner.name}</h3>
                      <p className="text-muted-foreground dark:text-muted-foreground mb-6 opacity-100">{partner.description}</p>
                      <Link 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-primary hover:text-secondary dark:text-secondary dark:hover:text-primary transition-colors opacity-100"
                      >
                        Visit Website <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Join Our Mission */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark text-center relative">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/grid-pattern.svg')] bg-center z-0"></div>
        <div className="max-w-5xl mx-auto relative z-20">
          <h2 className="text-4xl sm:text-5xl font-orbitron font-bold text-gray-900 dark:text-white mb-6 opacity-100">
            Join Our{" "}
            <span style={{color: '#e53935'}}>
              Mission
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-900 dark:text-white mb-12 max-w-3xl mx-auto opacity-100">
            Whether you&apos;re a student, educator, parent, or institution, there&apos;s a place for you in the BIPOCA AI community. Join us in transforming education for everyone.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "For Students",
                description: "Access culturally responsive learning materials tailored to your interests and learning style",
                cta: "Start Learning",
                link: "/auth/signup?role=student"
              },
              {
                title: "For Educators",
                description: "Discover AI-powered tools to create inclusive curriculum and engage diverse learners",
                cta: "Explore Tools",
                link: "/auth/signup?role=educator"
              },
              {
                title: "For Parents",
                description: "Support your child's education with resources that celebrate their heritage and identity",
                cta: "Join Now",
                link: "/auth/signup?role=parent"
              }
            ].map((option, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary dark:border-secondary glassmorphism hover:shadow-glow transition-all duration-300">
                <CardContent className="pt-8 pb-4">
                  <h3 className="text-2xl font-bold text-foreground dark:text-foreground mb-4 opacity-100">{option.title}</h3>
                  <p className="text-muted-foreground dark:text-muted-foreground mb-6 opacity-100">{option.description}</p>
                </CardContent>
                <CardFooter className="pb-8 pt-0">
                  <Link href={option.link} className="w-full">
                    <Button className="w-full bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground shadow-glow hover:scale-105 transition-all duration-300">
                      {option.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-full border-primary dark:border-secondary text-foreground hover:bg-accent/10 hover:scale-105 transition-all duration-300">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}