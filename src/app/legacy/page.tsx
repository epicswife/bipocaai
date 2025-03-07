"use client";

import { MemoryBrowser } from "@/components/legacy/memory-browser";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LegacyPage() {
  const router = useRouter();
  
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-orbitron font-bold text-foreground">Legacies around the World</h1>
        <Button 
          onClick={() => router.push("/legacy/submit")}
          className="bg-amber-500 hover:bg-amber-600 text-white"
        >
          Share Your Story
        </Button>
      </div>

      {/* Simplified page structure - no tabs needed */}
      <div className="space-y-6">
        <MemoryBrowser />
      </div>
    </div>
  );
}