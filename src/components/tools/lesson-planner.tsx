"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, FileUp, Download, Loader2 } from "lucide-react";

interface LessonPlan {
  title: string;
  subject: string;
  gradeLevel: string;
  duration: string;
  objectives: string[];
  materials: string[];
  activities: {
    type: string;
    description: string;
    duration: string;
  }[];
  assessment: string;
  standards: string[];
}

const initialLessonPlan: LessonPlan = {
  title: "",
  subject: "",
  gradeLevel: "",
  duration: "60",
  objectives: [""],
  materials: [""],
  activities: [{ type: "Introduction", description: "", duration: "10" }],
  assessment: "",
  standards: [""],
};

export function LessonPlanner() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lessonPlan, setLessonPlan] = useState<LessonPlan>(initialLessonPlan);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Placeholder for AI generation
    setTimeout(() => {
      setIsGenerating(false);
      // Set mock generated lesson plan
      setLessonPlan({
        ...lessonPlan,
        objectives: ["Students will understand the significance of the Civil Rights Movement", "Students will analyze primary sources"],
        materials: ["Historical photographs", "Primary source documents", "Interactive timeline"],
        activities: [
          { type: "Introduction", description: "Overview of Civil Rights timeline", duration: "10" },
          { type: "Main Activity", description: "Analysis of MLK's 'I Have a Dream' speech", duration: "30" },
          { type: "Discussion", description: "Group discussion on civil rights today", duration: "15" },
        ],
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lesson Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-orbitron font-bold text-foreground">Lesson Planner</h2>
            <div className="flex gap-2">
              <Button
                onClick={handleGenerate}
                className="bg-teal-500 hover:bg-teal-600 text-white"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4 mr-2" />
                )}
                Generate with AI
              </Button>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                <FileUp className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50">
                Save
              </Button>
            </div>
          </div>
          <Input placeholder="Lesson Title" />
          <Textarea placeholder="Lesson Content" />
        </div>
      </CardContent>
    </Card>
  );
}
