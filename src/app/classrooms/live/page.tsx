"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LiveClassroom() {
  const [message, setMessage] = useState("");
  const mockMessages = [
    { sender: "Teacher", text: "Welcome to today’s class!" },
    { sender: "Student 1", text: "Can you explain that again?" },
  ];

  const handleSendMessage = () => {
    // Mock send message (post-MVP: Firebase integration)
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">Live Classroom</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-gray-700 border-teal-300 dark:border-cyan-600 shadow-glow">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">Live Video (Placeholder)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 dark:bg-gray-600 h-64 flex items-center justify-center">
                <p className="text-gray-700 dark:text-gray-300">LiveKit Integration Coming Soon!</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="bg-white dark:bg-gray-700 border-teal-300 dark:border-cyan-600">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">Live Discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMessages.map((msg, index) => (
                  <div key={index} className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg">
                    <span className="font-semibold text-black dark:text-white">{msg.sender}:</span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">{msg.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask a question..."
                  className="bg-gray-100 dark:bg-gray-600"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500"
                >
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}