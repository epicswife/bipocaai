"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon, Clock, Star, MessageSquare, Video, Users, Search, Bot, Sparkles, BookOpen, GraduationCap, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function TutoringPage() {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [showAITutoringDialog, setShowAITutoringDialog] = useState(false);
  const [aiQuestion, setAIQuestion] = useState("");
  const [aiResponse, setAIResponse] = useState("");
  
  // Check if user is a teacher
  const isTeacher = user?.role === "teacher";
  
  // Mock tutors data
  const tutors = [
    {
      id: 1,
      name: "Dr. Maya Johnson",
      avatar: "/avatars/tutor1.png",
      specialty: "African American History",
      rating: 4.9,
      reviews: 124,
      availability: ["Mon", "Wed", "Fri"],
      price: "$45/hour",
      bio: "Specializing in African American history with 15 years of teaching experience. PhD from Howard University.",
      tags: ["History", "Civil Rights", "Literature"]
    },
    {
      id: 2,
      name: "Prof. James Washington",
      avatar: "/avatars/tutor2.png",
      specialty: "Indigenous Studies",
      rating: 4.8,
      reviews: 98,
      availability: ["Tue", "Thu", "Sat"],
      price: "$40/hour",
      bio: "Expert in Indigenous cultures and history. Member of the Cherokee Nation with 10+ years teaching experience.",
      tags: ["Indigenous", "Cultural Studies", "Anthropology"]
    },
    {
      id: 3,
      name: "Dr. Leila Rodriguez",
      avatar: "/avatars/tutor3.png",
      specialty: "Latinx Studies",
      rating: 4.7,
      reviews: 87,
      availability: ["Mon", "Tue", "Thu", "Sun"],
      price: "$42/hour",
      bio: "Focused on Latinx history and cultural studies. Published author with extensive research background.",
      tags: ["Latinx", "Immigration", "Cultural Identity"]
    },
    {
      id: 4,
      name: "Prof. Amara Okafor",
      avatar: "/avatars/tutor4.png",
      specialty: "Pan-African Studies",
      rating: 4.9,
      reviews: 156,
      availability: ["Wed", "Fri", "Sat", "Sun"],
      price: "$48/hour",
      bio: "Specialist in Pan-African movements and diaspora studies. Teaches at multiple universities.",
      tags: ["Pan-African", "Diaspora", "Political Movements"]
    },
  ];
  
  // Filter tutors based on search query
  const filteredTutors = tutors.filter(tutor => 
    tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      tutorName: "Dr. Maya Johnson",
      tutorAvatar: "/avatars/tutor1.png",
      date: "March 7, 2025",
      time: "3:00 PM - 4:00 PM",
      topic: "Civil Rights Movement Leaders",
      isGroup: false
    },
    {
      id: 2,
      tutorName: "Study Group: Indigenous Perspectives",
      tutorAvatar: "/avatars/group1.png",
      date: "March 10, 2025",
      time: "5:00 PM - 6:30 PM",
      topic: "Native American Literature Discussion",
      isGroup: true
    }
  ];

  return (
    <ProtectedRoute requiredFeature={"view_courses"}>
      <div className="container mx-auto py-6 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">Tutoring & Mentorship</h1>
            <p className="text-muted-foreground">Connect with expert tutors specializing in BIPOC history and culture</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowAITutoringDialog(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Bot className="h-4 w-4" /> AI Tutoring Help
            </Button>
            {isTeacher && (
              <Button className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> Teacher Dashboard
              </Button>
            )}
          </div>
        </motion.div>

        <Tabs defaultValue="find" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="find">Find Tutors</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
            <TabsTrigger value="ai">AI Tutoring</TabsTrigger>
          </TabsList>
          
          <TabsContent value="find" className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Available Tutors</CardTitle>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by name, specialty..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTutors.map(tutor => (
                    <motion.div 
                      key={tutor.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 border-2 border-primary/10">
                              <AvatarImage src={tutor.avatar} alt={tutor.name} />
                              <AvatarFallback>{tutor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg">{tutor.name}</h3>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                  <span className="text-sm font-medium">{tutor.rating}</span>
                                  <span className="text-xs text-muted-foreground">({tutor.reviews})</span>
                                </div>
                              </div>
                              <p className="text-sm font-medium text-primary">{tutor.specialty}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {tutor.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-4">{tutor.bio}</p>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="text-sm">
                              <span className="font-medium">Price:</span> {tutor.price}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" /> Message
                              </Button>
                              <Button size="sm">
                                <Video className="h-4 w-4 mr-2" /> Book Session
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.length > 0 ? (
                    upcomingSessions.map(session => (
                      <Card key={session.id} className="overflow-hidden">
                        <div className="p-4 flex items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-primary/10">
                            <AvatarImage src={session.tutorAvatar} alt={session.tutorName} />
                            <AvatarFallback>
                              {session.isGroup ? <Users className="h-6 w-6" /> : session.tutorName.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h3 className="font-semibold">{session.tutorName}</h3>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <CalendarIcon className="h-3 w-3" /> {session.date}
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {session.time}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{session.topic}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" /> Message
                            </Button>
                            <Button size="sm">
                              <Video className="h-4 w-4 mr-2" /> Join
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No upcoming sessions scheduled</p>
                      <Button className="mt-4">
                        Book a Session
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="past" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Past Sessions</CardTitle>
                <CardDescription>Review your previous tutoring sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Card>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/avatars/tutor1.png" alt="Dr. Maya Johnson" />
                            <AvatarFallback>MJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">Dr. Maya Johnson</h3>
                            <p className="text-sm text-muted-foreground">Civil Rights Movement Leaders</p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">February 28, 2025</div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">1 hour</Badge>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Notes</Button>
                          <Button size="sm">Book Again</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/avatars/tutor2.png" alt="Prof. James Washington" />
                            <AvatarFallback>JW</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">Prof. James Washington</h3>
                            <p className="text-sm text-muted-foreground">Indigenous Land Rights</p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">February 22, 2025</div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">1.5 hours</Badge>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Notes</Button>
                          <Button size="sm">Book Again</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">View All Past Sessions</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Tutoring Assistant</CardTitle>
                <CardDescription>
                  Get instant help with your BIPOC studies from our AI tutor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-primary" /> AI Tutor Chat
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted/50 rounded-lg p-4 mb-4 min-h-[200px] max-h-[300px] overflow-y-auto">
                          {aiResponse ? (
                            <div className="space-y-4">
                              <div className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-primary text-primary-foreground">
                                    <Bot className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 bg-background p-3 rounded-lg">
                                  <p className="text-sm">{aiResponse}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-muted-foreground">
                              <p>Ask a question to start a conversation with the AI tutor</p>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Textarea 
                            placeholder="Ask a question about BIPOC history, culture, or any subject..." 
                            className="min-h-[80px]"
                            value={aiQuestion}
                            onChange={(e) => setAIQuestion(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end mt-3">
                          <Button 
                            onClick={() => {
                              // Consider using a more robust approach for AI responses:
                              setAIResponse(
                                "The Harlem Renaissance was an intellectual and cultural revival of African American music, dance, art, fashion, literature, theater, and politics centered in Harlem, Manhattan, New York City, spanning the 1920s and 1930s."
                              );
                              // This should eventually be replaced with an actual API call
                              setAIQuestion("");
                            }}
                            disabled={!aiQuestion.trim()}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" /> Send
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Popular Topics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {[
                            "Civil Rights Movement",
                            "Indigenous Peoples' History",
                            "Black Literature",
                            "Latinx Cultural Studies",
                            "Asian American History"
                          ].map((topic, i) => (
                            <Button 
                              key={i} 
                              variant="outline" 
                              className="w-full justify-start text-left"
                              onClick={() => {
                                setAIQuestion(`Tell me about ${topic}`);
                              }}
                            >
                              <BookOpen className="h-4 w-4 mr-2" /> {topic}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Connect with Real Tutors</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Need more personalized help? Connect with our expert tutors for in-depth guidance.
                        </p>
                        <Button className="w-full">
                          <UserCheck className="h-4 w-4 mr-2" /> Find a Tutor
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* AI Tutoring Dialog */}
        <Popover open={showAITutoringDialog} onOpenChange={setShowAITutoringDialog}>
          <PopoverContent className="w-[400px] p-0" align="end">
            <div className="p-4 border-b">
              <h3 className="font-medium flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" /> Quick AI Tutoring Help
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Ask a quick question about any BIPOC-related topic
              </p>
            </div>
            <div className="p-4">
              <Textarea 
                placeholder="What would you like to learn about?" 
                className="min-h-[100px] mb-3"
                value={aiQuestion}
                onChange={(e) => setAIQuestion(e.target.value)}
              />
              <div className="flex justify-end">
                <Button 
                  onClick={() => {
                    // In a real app, this would call an API
                    setAIResponse(
                      "The Harlem Renaissance was an intellectual and cultural revival of African American music, dance, art, fashion, literature, theater, and politics centered in Harlem, Manhattan, New York City, spanning the 1920s and 1930s."
                    );
                    setShowAITutoringDialog(false);
                  }}
                  disabled={!aiQuestion.trim()}
                >
                  <MessageSquare className="h-4 w-4 mr-2" /> Get Answer
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </ProtectedRoute>
  );
}