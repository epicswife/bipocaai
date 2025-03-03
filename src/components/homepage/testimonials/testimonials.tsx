"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Testimonials() {
  const mockTestimonials = [
    { name: "Sarah M., Student", quote: "BIPOCA AI made learning Black history so engaging!" },
    { name: "John D., Teacher", quote: "I love how easy it is to create quizzes and lessons!" },
    { name: "Emily R., Parent", quote: "The mental health tools helped my child thrive." },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-purple-blue dark:bg-gradient-purple-blue">
      <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-white dark:text-white mb-8">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {mockTestimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="bg-white dark:bg-gray-700 border-blue-400 dark:border-purple-400 shadow-glow"
          >
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">
                {testimonial.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                &quot;{testimonial.quote}&quot;
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}