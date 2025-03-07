"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Heart, Share2, BookmarkPlus, X, Play, Calendar, User } from "lucide-react";

interface Memory {
  id: string;
  title: string;
  description: string;
  category: "Black" | "Indigenous" | "POC" | "Ally";
  type: "text" | "image" | "video";
  content: string;
  author: string;
  date: string;
  likes: number;
  shares: number;
  location?: string;
  tags?: string[];
  relatedMemories?: string[];
}

interface MemoryDetailProps {
  memory: Memory | null;
  onClose: () => void;
}

export function MemoryDetail({ memory, onClose }: MemoryDetailProps) {
  if (!memory) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <Dialog open={!!memory} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-2" variant="outline">
                {memory.category}
              </Badge>
              <DialogTitle className="text-2xl font-orbitron">{memory.title}</DialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="h-full px-6 py-4">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {memory.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(memory.date)}
              </div>
              {memory.location && (
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  {memory.location}
                </div>
              )}
            </div>

            <p className="text-lg text-foreground">{memory.description}</p>

            {memory.type === "image" && (
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={memory.content}
                  alt={memory.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {memory.type === "video" && (
              <div className="relative h-96 w-full rounded-lg overflow-hidden bg-black/10 flex items-center justify-center">
                <Button size="lg" variant="ghost" className="text-amber-500">
                  <Play className="h-12 w-12" />
                </Button>
              </div>
            )}

            {memory.type === "text" && (
              <div className="prose prose-amber dark:prose-invert max-w-none">
                {memory.content.split("\\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}

            {memory.tags && memory.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {memory.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-muted/20">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {memory.relatedMemories && memory.relatedMemories.length > 0 && (
              <div className="border-t pt-4 mt-8">
                <h3 className="text-lg font-semibold mb-4">Related Memories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {memory.relatedMemories.map((title) => (
                    <Button
                      key={title}
                      variant="outline"
                      className="justify-start text-left h-auto p-4"
                    >
                      {title}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t px-6 py-4 flex justify-between items-center bg-background">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-amber-500">
              <Heart className="w-4 h-4 mr-1" />
              {memory.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-amber-500">
              <Share2 className="w-4 h-4 mr-1" />
              {memory.shares}
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-amber-500">
            <BookmarkPlus className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
