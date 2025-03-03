"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccessibilityFeatures() {
  const features = [
    { title: "Simple Mode", description: "Easy words, visuals, and audio for intellectual disabilities." },
    { title: "Calming Tools", description: "Music and breathing exercises for mental well-being." },
    { title: "Voice Navigation", description: "Hands-free control for physical disabilities." },
    { title: "Screen Reader Support", description: "Enhanced accessibility for visually impaired users." },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-black dark:text-white mb-8">
        Accessibility for All
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-white dark:bg-gray-700 border-red-400 dark:border-red-400 shadow-glow"
          >
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}