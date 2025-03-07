"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, MapPin, Tag } from "lucide-react";

interface PreviewProps {
  formData: {
    title: string;
    description: string;
    category: string;
    type: "text" | "image" | "video";
    content: string;
    mediaFile?: File;
    location?: string;
    tags?: string[];
  };
}

export function MemoryPreview({ formData }: PreviewProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getMediaPreview = () => {
    if (!formData.mediaFile) return null;

    if (formData.type === "image") {
      const url = URL.createObjectURL(formData.mediaFile);
      return (
        <div className="relative h-48 w-full rounded-md overflow-hidden">
          <Image
            src={url}
            alt={formData.title}
            fill
            className="object-cover"
            onLoad={() => URL.revokeObjectURL(url)}
          />
        </div>
      );
    }

    if (formData.type === "video") {
      const url = URL.createObjectURL(formData.mediaFile);
      return (
        <video
          src={url}
          controls
          className="w-full rounded-md"
          onLoad={() => URL.revokeObjectURL(url)}
        />
      );
    }

    return null;
  };

  return (
    <Card className="border-amber-500/30">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="outline" className="mb-2">
              {formData.category || "Select Category"}
            </Badge>
            <CardTitle>{formData.title || "Enter Title"}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(new Date())}
          </div>
          {formData.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {formData.location}
            </div>
          )}
        </div>

        <p className="text-foreground">{formData.description || "Enter Description"}</p>

        {getMediaPreview()}

        {formData.type === "text" && formData.content && (
          <div className="prose prose-amber dark:prose-invert max-w-none">
            {formData.content.split("\\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}

        {formData.tags && formData.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-muted/20">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
