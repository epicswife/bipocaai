"use client";

import { Calendar, ArrowLeft, Clock, User, MapPin, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function SchedulePage() {
  // Type-safe counselor definition
  interface Counselor {
    id: string;
    name: string;
    title: string;
    specialties: string[];
    availability: {
      day: string;
      times: string[];
    }[];
    location: string;
  }

  const counselors: Counselor[] = [
    {
      id: "dr-johnson",
      name: "Dr. Maya Johnson",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Academic Stress", "Identity Development"],
      availability: [
        { day: "Monday", times: ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
        { day: "Wednesday", times: ["9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM"] },
        { day: "Friday", times: ["11:00 AM", "12:00 PM", "3:00 PM", "4:00 PM"] }
      ],
      location: "Student Wellness Center, Room 203"
    },
    {
      id: "dr-patel",
      name: "Dr. Raj Patel",
      title: "Licensed Mental Health Counselor",
      specialties: ["Stress Management", "Relationship Issues", "Cultural Adjustment", "Grief"],
      availability: [
        { day: "Tuesday", times: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"] },
        { day: "Thursday", times: ["11:00 AM", "12:00 PM", "1:00 PM", "4:00 PM"] },
        { day: "Friday", times: ["9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM"] }
      ],
      location: "Student Wellness Center, Room 205"
    },
    {
      id: "ms-rodriguez",
      name: "Ms. Elena Rodriguez",
      title: "Licensed Social Worker",
      specialties: ["Family Issues", "LGBTQ+ Support", "Trauma", "Life Transitions"],
      availability: [
        { day: "Monday", times: ["9:00 AM", "12:00 PM", "1:00 PM", "4:00 PM"] },
        { day: "Wednesday", times: ["11:00 AM", "12:00 PM", "3:00 PM", "4:00 PM"] },
        { day: "Thursday", times: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"] }
      ],
      location: "Student Wellness Center, Room 210"
    },
    {
      id: "dr-williams",
      name: "Dr. James Williams",
      title: "Licensed Psychologist",
      specialties: ["Test Anxiety", "Performance Issues", "Career Counseling", "Mindfulness"],
      availability: [
        { day: "Tuesday", times: ["11:00 AM", "12:00 PM", "3:00 PM", "4:00 PM"] },
        { day: "Wednesday", times: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"] },
        { day: "Friday", times: ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"] }
      ],
      location: "Student Wellness Center, Room 208"
    }
  ];

  // State for selected counselor
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Get the selected counselor object
  const activeCounselor = counselors.find(c => c.id === selectedCounselor);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would connect to a backend API
    // to schedule the appointment
    alert(`Appointment scheduled with ${activeCounselor?.name} on ${selectedDay} at ${selectedTime}`);
    
    // Reset form
    setSelectedCounselor(null);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <Calendar className="h-16 w-16 mx-auto mb-6 text-green-500" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Schedule a Counseling Session
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Connect with a mental health professional
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

      {/* Scheduling Introduction */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              How Counseling Can Help
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our licensed counselors and social workers provide confidential support for a wide range of concerns,
              from academic stress to personal challenges. All sessions are free for enrolled students.
            </p>
          </div>

          <Card className="bg-card shadow-glow glassmorphism mb-12">
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <Clock className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Session Length</h3>
                  <p className="text-muted-foreground">Individual sessions last 50 minutes and are available in-person or virtually.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <User className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Confidentiality</h3>
                  <p className="text-muted-foreground">All sessions are confidential within the limits of the law and professional ethics.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <MapPin className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location</h3>
                  <p className="text-muted-foreground">Sessions take place at the Student Wellness Center or via secure video conference.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meet Our Counselors */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
              Meet Our Counselors
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Our diverse team of mental health professionals is here to support you:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {counselors.map((counselor) => (
              <Card 
                key={counselor.id} 
                className={`bg-card shadow-glow glassmorphism border-green-500 hover:border-green-400 transition-all duration-300 ${
                  selectedCounselor === counselor.id ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => {
                  setSelectedCounselor(counselor.id);
                  setSelectedDay(null);
                  setSelectedTime(null);
                }}
              >
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{counselor.name}</h3>
                  <p className="text-muted-foreground mb-4">{counselor.title}</p>
                  
                  <h4 className="text-sm font-medium text-foreground mb-2">Specialties:</h4>
                  <ul className="list-disc list-inside text-muted-foreground mb-4">
                    {counselor.specialties.map((specialty, index) => (
                      <li key={index}>{specialty}</li>
                    ))}
                  </ul>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      className="text-green-500 border-green-500 hover:bg-green-100 hover:text-green-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCounselor(counselor.id);
                        setSelectedDay(null);
                        setSelectedTime(null);
                      }}
                    >
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Scheduling Form */}
          {selectedCounselor && activeCounselor && (
            <Card className="bg-card shadow-glow glassmorphism mb-12">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                  Schedule with {activeCounselor.name}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Select Day */}
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-4">Select a Day:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {activeCounselor.availability.map((avail, index) => (
                        <Button
                          key={index}
                          type="button"
                          variant={selectedDay === avail.day ? "default" : "outline"}
                          className={selectedDay === avail.day ? "bg-green-500 hover:bg-green-600" : ""}
                          onClick={() => {
                            setSelectedDay(avail.day);
                            setSelectedTime(null);
                          }}
                        >
                          {avail.day}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Select Time */}
                  {selectedDay && (
                    <div>
                      <h4 className="text-xl font-semibold text-foreground mb-4">Select a Time:</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {activeCounselor.availability
                          .find(avail => avail.day === selectedDay)?.times
                          .map((time, index) => (
                            <Button
                              key={index}
                              type="button"
                              variant={selectedTime === time ? "default" : "outline"}
                              className={selectedTime === time ? "bg-green-500 hover:bg-green-600" : ""}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))
                        }
                      </div>
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  {selectedDay && selectedTime && (
                    <div className="flex flex-col items-center mt-8">
                      <p className="text-muted-foreground mb-4 text-center">
                        You&apos;re scheduling an appointment with {activeCounselor.name} on {selectedDay} at {selectedTime}.
                      </p>
                      <Button 
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-2"
                      >
                        Confirm Appointment
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          )}

          {/* Important Information */}
          <Card className="bg-card shadow-glow glassmorphism border-amber-500 mb-12">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <Info className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Important Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Please arrive 10 minutes early for your first appointment to complete intake forms.</li>
                    <li>If you need to cancel, please do so at least 24 hours in advance.</li>
                    <li>For urgent concerns outside of business hours, please contact the Crisis Support Hotline at 988.</li>
                    <li>All sessions are free for currently enrolled students.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div className="text-center">
            <Link href="/mental-health">
              <Button className="bg-green-500 hover:bg-green-600 text-white shadow-glow">
                Return to Mental Health Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
