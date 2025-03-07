"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserRole } from "@/lib/types";
import { getFeaturesByCategory } from "@/lib/permissions";
import { motion } from "framer-motion";

interface RoleBasedFeaturesProps {
  role: UserRole;
}

export default function RoleBasedFeatures({ role }: RoleBasedFeaturesProps) {
  const featuresByCategory = getFeaturesByCategory(role);
  
  // Khan Academy style icons (simplified with emoji for demonstration)
  const categoryIcons: Record<string, string> = {
    "Learning": "📚",
    "Student": "👨‍🎓",
    "Teaching": "👨‍🏫",
    "Administration": "🏢",
    "Support": "🤝",
    "Special Education": "♿",
    "Mental Health": "🧠",
    "Account": "👤"
  };
  
  return (
    <div className="space-y-8">
      {Object.entries(featuresByCategory).map(([category, features], categoryIndex) => (
        <motion.div 
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((feature, featureIndex) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (featureIndex * 0.05) }}
              >
                <Link href={feature.path} className="block h-full">
                  <Card className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow duration-300 h-full overflow-hidden border-0">
                    <div className="h-1 bg-[#1865f2] dark:bg-blue-600"></div>
                    <CardContent className="p-4 flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[#1865f2] dark:text-blue-300 text-lg">
                        {categoryIcons[category] || "🔍"}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
      
      {/* Khan Academy style mastery challenge section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12"
      >
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white overflow-hidden border-0">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Ready for a challenge?</h3>
              <p className="text-purple-100">Test your knowledge with a mastery challenge</p>
            </div>
            <Button className="bg-white text-purple-700 hover:bg-purple-100 hover:text-purple-800">
              Start Challenge
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
