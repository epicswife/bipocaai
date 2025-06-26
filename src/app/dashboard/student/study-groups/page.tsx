"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock, Users, Search, Plus, MessageSquare, Video, BookOpen, Calendar, MapPin, ShieldAlert, UserPlus, Flag, Ban, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function StudyGroupsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showModerationDialog, setShowModerationDialog] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  
  // Mock study groups data
  const studyGroups = [
    {
      id: 1,
      name: "Black History Collective",
      description: "A group dedicated to exploring Black history through collaborative research and discussion.",
      members: 12,
      category: "History",
      meetingSchedule: "Tuesdays, 7:00 PM",
      location: "Online (Zoom)",
      tags: ["Black History", "Research", "Discussion"]
    },
    {
      id: 2,
      name: "Indigenous Literature Circle",
      description: "Reading and discussing works by Indigenous authors from various tribes and nations.",
      members: 8,
      category: "Literature",
      meetingSchedule: "Wednesdays, 6:30 PM",
      location: "Library Room 204",
      tags: ["Indigenous", "Literature", "Book Club"]
    },
    {
      id: 3,
      name: "Civil Rights Movement Study Group",
      description: "Analyzing key events, figures, and impacts of the Civil Rights Movement in America.",
      members: 15,
      category: "History",
      meetingSchedule: "Mondays, 5:00 PM",
      location: "Online (Discord)",
      tags: ["Civil Rights", "Activism", "Social Justice"]
    },
    {
      id: 4,
      name: "BIPOC in STEM",
      description: "Supporting and highlighting contributions of BIPOC individuals in science, technology, engineering, and mathematics.",
      members: 10,
      category: "STEM",
      meetingSchedule: "Thursdays, 7:30 PM",
      location: "Science Building, Room 302",
      tags: ["STEM", "Research", "Networking"]
    },
    {
      id: 5,
      name: "Cultural Heritage Preservation",
      description: "Discussing methods and importance of preserving cultural heritage across different BIPOC communities.",
      members: 9,
      category: "Culture",
      meetingSchedule: "Saturdays, 3:00 PM",
      location: "Community Center",
      tags: ["Heritage", "Preservation", "Community"]
    },
    {
      id: 6,
      name: "Latinx Studies Collaborative",
      description: "Exploring Latinx history, culture, and contemporary issues through collaborative projects.",
      members: 11,
      category: "Culture",
      meetingSchedule: "Fridays, 6:00 PM",
      location: "Online (Zoom)",
      tags: ["Latinx", "Culture", "Projects"]
    }
  ];
  
  // Filter study groups based on search query
  const filteredGroups = studyGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // My groups (mock data)
  const myGroups = [
    {...studyGroups[0], isAdmin: true},
    {...studyGroups[2], isAdmin: false},
    {...studyGroups[5], isAdmin: true}
  ];
  
  // Connected students (mock data)
  const connectedStudents = [
    { id: 1, name: "Jamal Williams", email: "jwilliams@example.com", interests: ["Black History", "Civil Rights"] },
    { id: 2, name: "Maria Rodriguez", email: "mrodriguez@example.com", interests: ["Latinx Studies", "Social Justice"] },
    { id: 3, name: "Aisha Johnson", email: "ajohnson@example.com", interests: ["STEM", "Black Literature"] },
    { id: 4, name: "David Chen", email: "dchen@example.com", interests: ["Asian American History", "STEM"] },
    { id: 5, name: "Lakshmi Patel", email: "lpatel@example.com", interests: ["South Asian Studies", "Cultural Heritage"] }
  ];

  // Upcoming meetings
  const upcomingMeetings = [
    {
      id: 1,
      groupName: "Black History Collective",
      date: "March 7, 2025",
      time: "7:00 PM - 8:30 PM",
      topic: "The Harlem Renaissance: Key Figures and Impact",
      location: "Online (Zoom)"
    },
    {
      id: 2,
      groupName: "Civil Rights Movement Study Group",
      date: "March 10, 2025",
      time: "5:00 PM - 6:30 PM",
      topic: "Student Activism in the Civil Rights Era",
      location: "Online (Discord)"
    },
    {
      id: 3,
      groupName: "Latinx Studies Collaborative",
      date: "March 11, 2025",
      time: "6:00 PM - 7:30 PM",
      topic: "Immigration Narratives in Literature",
      location: "Online (Zoom)"
    }
  ];

  return (
    <ProtectedRoute requiredFeature={"view_courses"}>
      <div className="container mx-auto py-6 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Study Groups</h1>
              <p className="text-muted-foreground">Connect with peers to study BIPOC history, culture, and more</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="md:self-end">
              <Plus className="h-4 w-4 mr-2" /> Create Study Group
            </Button>
          </div>
        </motion.div>

        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="my-groups">My Groups</TabsTrigger>
            <TabsTrigger value="meetings">Upcoming Meetings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discover" className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Available Study Groups</CardTitle>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by name, topic..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGroups.map(group => (
                    <motion.div 
                      key={group.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="mb-4">
                            <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {group.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-auto space-y-3">
                            <div className="flex items-center text-sm">
                              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{group.members} members</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{group.meetingSchedule}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{group.location}</span>
                            </div>
                            
                            <div className="flex justify-end mt-4">
                              <Button>
                                Join Group
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                {filteredGroups.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No study groups match your search criteria</p>
                    <Button onClick={() => setShowCreateDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" /> Create a New Group
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="my-groups" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Study Groups</CardTitle>
                <CardDescription>Groups you&apos;ve joined or created</CardDescription>
              </CardHeader>
              <CardContent>
                {myGroups.length > 0 ? (
                  <div className="space-y-4">
                    {myGroups.map(group => (
                      <Card key={group.id} className="overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
                              <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {group.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                                ))}
                              </div>
                              <div className="flex items-center text-sm mt-4">
                                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{group.members} members</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 min-w-[120px]">
                              <Button variant="outline" size="sm" className="w-full">
                                <MessageSquare className="h-4 w-4 mr-2" /> Chat
                              </Button>
                              <Button variant="outline" size="sm" className="w-full">
                                <Calendar className="h-4 w-4 mr-2" /> Schedule
                              </Button>
                              <Button variant="outline" size="sm" className="w-full">
                                <BookOpen className="h-4 w-4 mr-2" /> Resources
                              </Button>
                              <Button size="sm" className="w-full">
                                <Video className="h-4 w-4 mr-2" /> Join Meeting
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full mt-2"
                                onClick={() => {
                                  setSelectedGroup(group);
                                  setShowConnectDialog(true);
                                }}
                              >
                                <Users className="h-4 w-4 mr-2" /> Connect
                              </Button>
                              {group.isAdmin && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full mt-2"
                                  onClick={() => {
                                    setSelectedGroup(group);
                                    setShowModerationDialog(true);
                                  }}
                                >
                                  <ShieldAlert className="h-4 w-4 mr-2" /> Moderate
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">You haven&apos;t joined any study groups yet</p>
                    <Button onClick={() => setShowCreateDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" /> Join or Create a Group
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="meetings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
                <CardDescription>Scheduled meetings for your study groups</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingMeetings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingMeetings.map(meeting => (
                      <Card key={meeting.id} className="overflow-hidden">
                        <div className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                              <h3 className="font-semibold">{meeting.groupName}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{meeting.topic}</p>
                              <div className="flex flex-wrap items-center gap-3 mt-3">
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <CalendarIcon className="h-3 w-3" /> {meeting.date}
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {meeting.time}
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" /> {meeting.location}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline">
                                <MessageSquare className="h-4 w-4 mr-2" /> Chat
                              </Button>
                              <Button>
                                <Video className="h-4 w-4 mr-2" /> Join
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No upcoming meetings scheduled</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" /> View Full Calendar
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Create Study Group Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create a New Study Group</DialogTitle>
              <DialogDescription>
                Fill out the details below to create your own study group.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Group Name</Label>
                <Input id="name" placeholder="Enter a name for your study group" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe what your group will focus on" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                    <SelectItem value="culture">Culture</SelectItem>
                    <SelectItem value="stem">STEM</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="social-justice">Social Justice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meeting-schedule">Meeting Schedule</Label>
                <Input id="meeting-schedule" placeholder="e.g., Tuesdays at 7:00 PM" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Online (Zoom) or Library Room 204" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" placeholder="e.g., Black History, Research, Discussion" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowCreateDialog(false)}>Create Group</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Moderation Tools Dialog */}
        <Dialog open={showModerationDialog} onOpenChange={setShowModerationDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Moderation Tools - {selectedGroup?.name}</DialogTitle>
              <DialogDescription>
                Manage your study group and ensure a positive learning environment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <h3 className="font-medium">Group Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    <UserPlus className="h-4 w-4 mr-2" /> Invite Members
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Users className="h-4 w-4 mr-2" /> Manage Members
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Calendar className="h-4 w-4 mr-2" /> Schedule Meetings
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BookOpen className="h-4 w-4 mr-2" /> Manage Resources
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Content Moderation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    <Flag className="h-4 w-4 mr-2" /> Review Flagged Content
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" /> Chat Moderation
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Ban className="h-4 w-4 mr-2" /> Block/Mute Users
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" /> Set Group Rules
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Reported Issues</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center py-2">
                      <p className="text-muted-foreground">No reported issues at this time</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Activity Log</h3>
                <div className="max-h-[200px] overflow-y-auto border rounded-md p-3 space-y-2">
                  <div className="text-sm flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p><span className="font-medium">Maria Rodriguez</span> joined the group</p>
                      <p className="text-muted-foreground text-xs">March 4, 2025 - 3:45 PM</p>
                    </div>
                  </div>
                  <div className="text-sm flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <p><span className="font-medium">Jamal Williams</span> posted in discussion</p>
                      <p className="text-muted-foreground text-xs">March 3, 2025 - 7:12 PM</p>
                    </div>
                  </div>
                  <div className="text-sm flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-purple-500 mt-0.5" />
                    <div>
                      <p><span className="font-medium">You</span> scheduled a new meeting</p>
                      <p className="text-muted-foreground text-xs">March 2, 2025 - 2:30 PM</p>
                    </div>
                  </div>
                  <div className="text-sm flex items-start gap-2">
                    <BookOpen className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div>
                      <p><span className="font-medium">You</span> added a new resource</p>
                      <p className="text-muted-foreground text-xs">March 1, 2025 - 11:15 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowModerationDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Connect with Students Dialog */}
        <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Connect with Students - {selectedGroup?.name}</DialogTitle>
              <DialogDescription>
                Find and connect with other students who share similar interests.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for students by name or interests"
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Suggested Connections</h3>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {connectedStudents.map(student => (
                    <Card key={student.id} className="overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {student.interests.map(interest => (
                                <Badge key={interest} variant="outline" className="text-xs">{interest}</Badge>
                              ))}
                            </div>
                          </div>
                          <Button size="sm">
                            <UserPlus className="h-4 w-4 mr-2" /> Connect
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConnectDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}