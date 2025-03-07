"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Book, Users } from "lucide-react";

export default function StudentSchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock schedule data
  const events = [
    {
      id: 1,
      title: "African American History Lecture",
      type: "Class",
      time: "9:00 AM - 10:30 AM",
      location: "Virtual Classroom 3",
      course: "African American Studies 101",
      instructor: "Dr. Maya Johnson"
    },
    {
      id: 2,
      title: "Civil Rights Study Group",
      type: "Study Group",
      time: "1:00 PM - 2:30 PM",
      location: "Virtual Meeting Room 2",
      course: "History of Civil Rights",
      participants: 6
    },
    {
      id: 3,
      title: "Tutoring Session: Black Scientists in History",
      type: "Tutoring",
      time: "3:30 PM - 4:30 PM",
      location: "Virtual Office Hours",
      course: "Science and Society",
      tutor: "Prof. James Carter"
    }
  ];

  // Get events for the selected date (in a real app, this would filter based on the date)
  const selectedDateEvents = events;

  return (
    <ProtectedRoute requiredFeature="track_progress">
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-6">My Schedule</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Daily Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                Events for {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="bg-card shadow-sm hover:shadow-md transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Badge 
                                className={`mr-2 ${
                                  event.type === 'Class' 
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                                    : event.type === 'Study Group'
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                }`}
                              >
                                {event.type}
                              </Badge>
                              <h3 className="text-lg font-medium">{event.title}</h3>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{event.time}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Book className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{event.course}</span>
                            </div>
                            {event.instructor && (
                              <div className="flex items-center">
                                <span className="text-sm text-muted-foreground">Instructor: {event.instructor}</span>
                              </div>
                            )}
                            {event.tutor && (
                              <div className="flex items-center">
                                <span className="text-sm text-muted-foreground">Tutor: {event.tutor}</span>
                              </div>
                            )}
                            {event.participants && (
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{event.participants} participants</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm" className="mr-2">Details</Button>
                            <Button size="sm">Join</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No events scheduled for this day.</p>
                  <Button className="mt-4">Add New Event</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}