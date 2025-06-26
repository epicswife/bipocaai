"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ClipboardCheck, ChevronRight, ChevronLeft, Send, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Timestamp } from "firebase/firestore";
import { auth } from "@/lib/firebase";
// Using API route instead of direct Firebase Admin SDK access
import { onAuthStateChanged } from "firebase/auth";

import { AnswerValue, isScaleAnswer, isMultiSelectAnswer, isTextAnswer } from "@/types/mental-health";

// Type definitions
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface Question {
  id: string;
  text: string;
  type: "scale" | "multiselect" | "text";
  options?: string[];
  required: boolean;
}

// Using shared types from @/types/mental-health.ts for type safety and consistency

export default function MentalHealthAssessmentPage() {
  const [user, setUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<{
    score: {
      anxiety: number;
      depression: number;
      stress: number;
      wellbeing: number;
    };
    recommendedResources: string[];
  } | null>(null);
  const router = useRouter();

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Assessment questions
  const questions: Question[] = [
    {
      id: "feeling_nervous",
      text: "Over the past 2 weeks, how often have you felt nervous, anxious, or on edge?",
      type: "scale",
      required: true
    },
    {
      id: "worrying",
      text: "Over the past 2 weeks, how often have you been unable to stop or control worrying?",
      type: "scale",
      required: true
    },
    {
      id: "little_interest",
      text: "Over the past 2 weeks, how often have you had little interest or pleasure in doing things?",
      type: "scale",
      required: true
    },
    {
      id: "feeling_down",
      text: "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
      type: "scale",
      required: true
    },
    {
      id: "sleep_issues",
      text: "Over the past 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
      type: "scale",
      required: true
    },
    {
      id: "tired",
      text: "Over the past 2 weeks, how often have you felt tired or had little energy?",
      type: "scale",
      required: true
    },
    {
      id: "appetite",
      text: "Over the past 2 weeks, how often have you had poor appetite or been overeating?",
      type: "scale",
      required: true
    },
    {
      id: "concentration",
      text: "Over the past 2 weeks, how often have you had trouble concentrating on things, such as reading or watching TV?",
      type: "scale",
      required: true
    },
    {
      id: "stress_sources",
      text: "What are your main sources of stress right now? (Select all that apply)",
      type: "multiselect",
      options: [
        "Academic pressure",
        "Social relationships",
        "Family issues",
        "Financial concerns",
        "Health issues",
        "Future uncertainty",
        "Work-related stress",
        "Identity/personal issues",
        "Other"
      ],
      required: false
    },
    {
      id: "coping_mechanisms",
      text: "What coping mechanisms do you currently use? (Select all that apply)",
      type: "multiselect",
      options: [
        "Exercise",
        "Meditation/mindfulness",
        "Talking with friends/family",
        "Creative activities",
        "Professional help",
        "Journaling",
        "Nature/outdoor activities",
        "Music/art",
        "None of these"
      ],
      required: false
    },
    {
      id: "additional_info",
      text: "Is there anything else you'd like to share about your mental health or specific concerns?",
      type: "text",
      required: false
    }
  ];

  // Scale options
  const scaleOptions = [
    "Not at all",
    "Several days",
    "More than half the days",
    "Nearly every day"
  ];

  // Handle scale question answer
  const handleScaleAnswer = (value: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers({
      ...answers,
      [currentQuestion.id]: parseInt(value)
    });
    
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    }
  };

  // Handle multiselect question answer
  const handleMultiselectAnswer = (option: string, checked: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentValue = answers[currentQuestion.id];
    
    // Initialize as empty array if undefined or convert existing value to array
    const currentAnswers: string[] = isMultiSelectAnswer(currentValue) ? currentValue : [];
    
    let newAnswers: string[];
    if (checked) {
      newAnswers = [...currentAnswers, option];
    } else {
      newAnswers = currentAnswers.filter((item: string) => item !== option);
    }
    
    setAnswers({
      ...answers,
      [currentQuestion.id]: newAnswers
    });
  };

  // Handle text question answer
  const handleTextAnswer = (value: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Check if current question is required and has an answer
    if (currentQuestion.required) {
      const answer = answers[currentQuestion.id];
      if (answer === undefined || (Array.isArray(answer) && answer.length === 0) || answer === "") {
        toast.error("Please answer this question before proceeding");
        return;
      }
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };

  // Navigate to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate assessment results
  const calculateResults = () => {
    // Get scale answers with fallback to 0 if not answered or not a number
    const getScaleValue = (id: string): number => {
      const value = answers[id];
      return isScaleAnswer(value) ? value : 0;
    };
    
    // Calculate scores
    const anxietyScore = (getScaleValue('feeling_nervous') + getScaleValue('worrying')) / 2;
    const depressionScore = (getScaleValue('little_interest') + getScaleValue('feeling_down')) / 2;
    const stressScore = (getScaleValue('sleep_issues') + getScaleValue('tired') + getScaleValue('concentration')) / 3;
    const wellbeingScore = 3 - (getScaleValue('appetite') / 3);
    
    // Determine recommended resources based on scores
    const recommendedResources: string[] = [];
    
    if (anxietyScore >= 2) {
      recommendedResources.push("anxiety-resources");
      recommendedResources.push("mindfulness-exercises");
    }
    
    if (depressionScore >= 2) {
      recommendedResources.push("depression-resources");
      recommendedResources.push("mood-tracking");
    }
    
    if (stressScore >= 2) {
      recommendedResources.push("stress-management");
      recommendedResources.push("sleep-improvement");
    }
    
    if (wellbeingScore < 1.5) {
      recommendedResources.push("self-care-resources");
      recommendedResources.push("nutrition-wellness");
    }
    
    // Add counseling recommendation if scores are high
    if (anxietyScore >= 2.5 || depressionScore >= 2.5 || stressScore >= 2.5) {
      recommendedResources.push("counseling-services");
    }
    
    setAssessmentResults({
      score: {
        anxiety: anxietyScore,
        depression: depressionScore,
        stress: stressScore,
        wellbeing: wellbeingScore
      },
      recommendedResources
    });
    
    setShowResults(true);
  };

  // Submit assessment results to Firestore via API route
  const handleSubmitResults = async () => {
    if (!assessmentResults) return;
    
    try {
      setSubmitting(true);
      
      // Convert answers to the correct type expected by the server
      // The server expects Record<string, number | string | string[]>
      const typedAnswers: Record<string, number | string | string[]> = {};
      
      // Process each answer to ensure it matches the server-side type
      Object.entries(answers).forEach(([key, value]) => {
        typedAnswers[key] = value;
      });
      
      const assessmentData = {
        userId: user?.uid || "anonymous",
        userName: isAnonymous ? null : user?.displayName,
        userEmail: isAnonymous ? null : user?.email,
        anonymous: isAnonymous,
        answers: typedAnswers,
        score: assessmentResults.score,
        recommendedResources: assessmentResults.recommendedResources,
        timestamp: Timestamp.now()
      };
      
      // Use the API route instead of direct Firebase Admin SDK access
      const response = await fetch('/api/mental-health/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessmentData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save assessment');
      }
      
      toast.success("Assessment results saved successfully");
      
      // Redirect to resources page after short delay
      setTimeout(() => {
        router.push("/mental-health/resources");
      }, 1500);
      
    } catch (error) {
      console.error("Error saving assessment results:", error);
      toast.error("Failed to save assessment results");
    } finally {
      setSubmitting(false);
    }
  };

  // Get score level description
  const getScoreLevel = (score: number): string => {
    if (score < 1) return "Low";
    if (score < 2) return "Mild";
    if (score < 3) return "Moderate";
    return "Severe";
  };

  // Get score level color
  const getScoreColor = (score: number, isWellbeing: boolean = false): string => {
    if (isWellbeing) {
      // For wellbeing, higher is better
      if (score > 2) return "bg-green-500";
      if (score > 1) return "bg-yellow-500";
      return "bg-red-500";
    } else {
      // For other metrics, lower is better
      if (score < 1) return "bg-green-500";
      if (score < 2) return "bg-yellow-500";
      if (score < 3) return "bg-orange-500";
      return "bg-red-500";
    }
  };

  // Render current question
  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {currentQuestion.text}
          </h3>
          {currentQuestion.required && (
            <p className="text-sm text-red-500">* Required</p>
          )}
        </div>
        
        {currentQuestion.type === "scale" && (
          <RadioGroup
            value={answers[currentQuestion.id]?.toString() || ""}
            className="space-y-3"
            onValueChange={handleScaleAnswer}
          >
            {scaleOptions.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-foreground">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
        
        {currentQuestion.type === "multiselect" && (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`option-${index}`}
                  checked={isMultiSelectAnswer(answers[currentQuestion.id]) ? 
                    (answers[currentQuestion.id] as string[]).includes(option) : false}
                  onCheckedChange={(checked) => handleMultiselectAnswer(option, checked === true)}
                />
                <Label htmlFor={`option-${index}`} className="text-foreground">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        )}
        
        {currentQuestion.type === "text" && (
          <Textarea
            value={isTextAnswer(answers[currentQuestion.id]) ? answers[currentQuestion.id] : ""}
            onChange={(e) => handleTextAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-[120px]"
          />
        )}
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={handleNextQuestion}
            className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground gap-2"
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    );
  };

  // Render results
  const renderResults = () => {
    if (!assessmentResults) return null;
    
    const { score, recommendedResources } = assessmentResults;
    
    // Resource mapping
    const resourceInfo: Record<string, { title: string, description: string, link: string }> = {
      "anxiety-resources": {
        title: "Anxiety Management Resources",
        description: "Tools and techniques to help manage anxiety symptoms",
        link: "/mental-health/resources#anxiety"
      },
      "depression-resources": {
        title: "Depression Support",
        description: "Resources for understanding and coping with depression",
        link: "/mental-health/resources#depression"
      },
      "stress-management": {
        title: "Stress Reduction Techniques",
        description: "Practical methods to reduce and manage stress",
        link: "/mental-health/resources#stress"
      },
      "mindfulness-exercises": {
        title: "Mindfulness Practices",
        description: "Guided mindfulness exercises for mental wellbeing",
        link: "/mental-health/mindfulness"
      },
      "self-care-resources": {
        title: "Self-Care Strategies",
        description: "Activities and practices to improve self-care",
        link: "/mental-health/self-care"
      },
      "sleep-improvement": {
        title: "Sleep Improvement Guide",
        description: "Tips and techniques for better sleep quality",
        link: "/mental-health/resources#sleep"
      },
      "mood-tracking": {
        title: "Mood Tracking Tools",
        description: "Resources to help track and understand mood patterns",
        link: "/mental-health/resources#mood"
      },
      "nutrition-wellness": {
        title: "Nutrition & Wellness",
        description: "Information on how nutrition affects mental health",
        link: "/mental-health/resources#nutrition"
      },
      "counseling-services": {
        title: "Counseling Services",
        description: "Professional mental health support options",
        link: "/mental-health/appointments"
      }
    };
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Your Assessment Results
          </h3>
          <p className="text-muted-foreground mb-6">
            Based on your responses, we&apos;ve generated a summary of your current mental health status.
            These results are not a clinical diagnosis but can help you understand areas that may need attention.
          </p>
          
          <div className="space-y-6 mb-8">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-foreground font-medium">Anxiety Level</span>
                <span className="text-foreground">{getScoreLevel(score.anxiety)}</span>
              </div>
              <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getScoreColor(score.anxiety)}`} 
                  style={{ width: `${(score.anxiety / 3) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-foreground font-medium">Depression Level</span>
                <span className="text-foreground">{getScoreLevel(score.depression)}</span>
              </div>
              <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getScoreColor(score.depression)}`} 
                  style={{ width: `${(score.depression / 3) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-foreground font-medium">Stress Level</span>
                <span className="text-foreground">{getScoreLevel(score.stress)}</span>
              </div>
              <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getScoreColor(score.stress)}`} 
                  style={{ width: `${(score.stress / 3) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-foreground font-medium">Overall Wellbeing</span>
                <span className="text-foreground">{getScoreLevel(3 - score.wellbeing)}</span>
              </div>
              <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getScoreColor(score.wellbeing, true)}`} 
                  style={{ width: `${(score.wellbeing / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Recommended Resources
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendedResources.map((resourceId, index) => {
              const resource = resourceInfo[resourceId];
              if (!resource) return null;
              
              return (
                <Card key={index} className="border-primary/20 dark:border-secondary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={resource.link} className="w-full">
                      <Button variant="outline" className="w-full">
                        Explore Resources
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked === true)}
            />
            <Label htmlFor="anonymous" className="text-foreground">
              Submit results anonymously (your name and email won&apos;t be stored)
            </Label>
          </div>
          
          <Button
            onClick={handleSubmitResults}
            className="w-full bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Results...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Save Results & View Resources
              </>
            )}
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <ClipboardCheck className="h-16 w-16 mx-auto mb-6 text-teal-500" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Mental Health Assessment
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Understand your mental wellbeing and get personalized resources
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

      {/* Main Content */}
      <section className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                {showResults ? "Your Assessment Results" : "Mental Health Assessment"}
              </CardTitle>
              <CardDescription>
                {showResults 
                  ? "Review your results and explore recommended resources"
                  : "This assessment takes about 5 minutes to complete and will help identify areas where you might benefit from support"
                }
              </CardDescription>
              
              {!showResults && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span>{Math.round((currentQuestionIndex / questions.length) * 100)}% Complete</span>
                  </div>
                  <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              <AnimatePresence mode="wait">
                {showResults ? renderResults() : renderQuestion()}
              </AnimatePresence>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              This assessment is not a diagnostic tool. If you&apos;re experiencing severe distress, 
              please contact a mental health professional or call the 988 Suicide & Crisis Lifeline.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
