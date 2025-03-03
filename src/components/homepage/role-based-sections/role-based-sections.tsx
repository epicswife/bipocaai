"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UserRole = "student" | "teacher" | "parent" | "admin" | "counselor" | "social_worker";
interface Section {
  title: string;
  content: string;
}
interface Sections {
  [key: string]: Section;
  student: Section;
  teacher: Section;
  parent: Section;
  admin: Section;
  counselor: Section;
  social_worker: Section;
}

export default function RoleBasedSections() {
  const mockUser = { role: "student" as UserRole };
  const sections: Sections = {
    student: { title: "Students", content: "Access courses and quizzes." },
    teacher: { title: "Teachers", content: "Upload lessons and track progress." },
    parent: { title: "Parents", content: "Support your child’s learning." },
    admin: { title: "Admins", content: "Manage district dashboards." },
    counselor: { title: "Counselors", content: "Support students and parents." },
    social_worker: { title: "Social Workers", content: "Assist families with resources." },
  };

  const role = mockUser.role;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-black dark:text-white mb-8">
        Your Learning Path
      </h2>
      <div className="max-w-5xl mx-auto">
        <Card className="bg-white dark:bg-gray-700 border-gold-300 dark:border-teal-700 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">
              {sections[role].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{sections[role].content}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}