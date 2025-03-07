"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, MinusCircle, Save } from "lucide-react";

interface Question {
  id: number;
  question: string;
  answer: string;
}

export function QuizCreator() {
  const [questions, setQuestions] = useState<Question[]>([{ id: 1, question: "", answer: "" }]);

  const handleInputChange = (id: number, field: "question" | "answer", value: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions([...questions, { id: newId, question: "", answer: "" }]);
  };

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleSave = () => {
    // Implement save functionality
    console.log("Saving quiz:", questions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        {questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <Input
              placeholder="Question"
              value={question.question}
              onChange={(e) => handleInputChange(question.id, "question", e.target.value)}
            />
            <Textarea
              placeholder="Answer"
              value={question.answer}
              onChange={(e) => handleInputChange(question.id, "answer", e.target.value)}
            />
            <Button variant="ghost" onClick={() => removeQuestion(question.id)}>
              <MinusCircle className="mr-2" /> Remove Question
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addQuestion}>
          <PlusCircle className="mr-2" /> Add Question
        </Button>
        <Button className="mt-4" onClick={handleSave}>
          <Save className="mr-2" /> Save Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
