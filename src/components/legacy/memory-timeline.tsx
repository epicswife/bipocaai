"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Heart, Share2, Award, Globe } from "lucide-react";

interface Memory {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "text" | "image" | "video";
  content: string;
  author: string;
  date: string;
  likes: number;
  shares: number;
  location?: string;
  verificationStatus?: "pending" | "verified" | "featured";
}

interface MemoryTimelineProps {
  memories: Memory[];
  onMemorySelect: (memory: Memory) => void;
}

export function MemoryTimeline({ memories, onMemorySelect }: MemoryTimelineProps) {
  const timelineItems = useMemo(() => {
    const sorted = [...memories].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const groups = sorted.reduce((acc, memory) => {
      const year = new Date(memory.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(memory);
      return acc;
    }, {} as Record<number, Memory[]>);

    return Object.entries(groups)
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
      .map(([year, items]) => ({
        year: Number(year),
        items
      }));
  }, [memories]);

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="relative p-6">
        <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-muted-foreground/20" />
        
        <div className="space-y-12">
          {timelineItems.map(({ year, items }) => (
            <div key={year} className="relative">
              <div className="sticky top-0 z-20 mb-4 flex items-center">
                <div className="flex h-9 items-center justify-center rounded-full bg-muted px-3 text-sm font-semibold">
                  {year}
                </div>
              </div>

              <div className="space-y-6">
                {items.map((memory) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative pl-8">
                      <div
                        className={cn(
                          "absolute left-0 top-3 h-3 w-3 rounded-full border-2 border-white",
                          memory.verificationStatus === "featured"
                            ? "bg-amber-500"
                            : memory.verificationStatus === "verified"
                            ? "bg-emerald-500"
                            : "bg-muted-foreground/50"
                        )}
                      />
                      <Card
                        className={cn(
                          "overflow-hidden cursor-pointer transition-all duration-300",
                          "hover:shadow-lg border-muted/50 hover:border-amber-200/50",
                          memory.verificationStatus === "featured" && "ring-2 ring-amber-400 ring-offset-2"
                        )}
                        onClick={() => onMemorySelect(memory)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={cn(
                                  "text-white",
                                  memory.category === "Black" && "bg-amber-500",
                                  memory.category === "Indigenous" && "bg-red-500",
                                  memory.category === "POC" && "bg-orange-500",
                                  memory.category === "Ally" && "bg-teal-500"
                                )}
                              >
                                {memory.category}
                              </Badge>
                              {memory.verificationStatus === "verified" && (
                                <Badge className="bg-emerald-500/90 text-white border-none">
                                  <Award className="h-3 w-3 mr-1" /> Verified
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(memory.date), "MMM d")}
                            </span>
                          </div>

                          <h3 className="font-semibold mb-1">{memory.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {memory.description}
                          </p>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{memory.author}</span>
                              {memory.location && (
                                <Badge variant="outline" className="gap-1">
                                  <Globe className="h-3 w-3" /> {memory.location}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Heart className="h-3 w-3" /> {memory.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <Share2 className="h-3 w-3" /> {memory.shares}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
