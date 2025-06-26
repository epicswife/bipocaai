"use client";

import { useAuth } from "@/lib/auth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function CalendarPage() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12">Please log in to view your calendar.</div>;

  const mockEvents = [
    { title: "Live Class: Black History", date: "2025-03-05T10:00:00" },
    { title: "Parent Meeting", date: "2025-03-06T14:00:00" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">Your Calendar</h1>
      <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-glow border-teal-300 dark:border-cyan-600">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={mockEvents}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </div>
    </div>
  );
}