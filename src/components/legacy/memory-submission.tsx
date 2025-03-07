"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MemoryPreview } from "./memory-preview";
import { Upload, Loader2, Wand2, X, Tag as TagIcon, MapPin, Sparkles } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

interface FormData {
  title: string;
  description: string;
  category: string;
  type: "text" | "image" | "video";
  content: string;
  mediaFile?: File;
  location?: string;
  tags: string[];
}

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  content?: string;
  mediaFile?: string;
}

export function MemorySubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTab, setCurrentTab] = useState<"edit" | "preview">("edit");
  const [newTag, setNewTag] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    type: "text",
    content: "",
    location: "",
    tags: []
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.type === "text" && !formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if ((formData.type === "image" || formData.type === "video") && !formData.mediaFile) {
      newErrors.mediaFile = "Media file is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        type: "text",
        content: "",
        location: "",
        tags: []
      });
      setCurrentTab("edit");
    } catch (error) {
      console.error("Error submitting memory:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormData(prev => ({
        ...prev,
        description: prev.description + "\n\nAI-enhanced description: This powerful memory captures a pivotal moment in history...",
        tags: [...prev.tags, "historical", "significant", "cultural-impact"]
      }));
    } catch (error) {
      console.error("Error generating with AI:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(newTag.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }));
      }
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    
    const file = acceptedFiles[0];
    const maxSize = formData.type === 'image' ? 10 * 1024 * 1024 : 100 * 1024 * 1024;

    if (file.size > maxSize) {
      setErrors(prev => ({
        ...prev,
        mediaFile: `File size must be less than ${formData.type === 'image' ? '10MB' : '100MB'}`
      }));
      return;
    }
    setFormData(prev => ({ ...prev, mediaFile: file }));
    setErrors(prev => ({ ...prev, mediaFile: undefined }));
  }, [formData.type]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: formData.type === 'image' 
      ? { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }
      : { 'video/*': ['.mp4', '.webm', '.ogg'] },
    maxFiles: 1,
    multiple: false
  });

  return (
    <Card className="relative overflow-hidden border-amber-500/30 bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/10 dark:to-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
            Share Your Story
          </CardTitle>
          <Sparkles className="w-5 h-5 text-amber-500" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="button"
            onClick={handleGenerateWithAI}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all"
            disabled={isGenerating}
          >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Wand2 className="w-4 h-4 mr-2" />
          )}
          Enhance with AI
          </Button>
        </motion.div>
      </CardHeader>
      <CardContent>
        <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as "edit" | "preview")}>
          <TabsList className="mb-4 p-1 bg-amber-50/50 dark:bg-amber-950/10 backdrop-blur-sm">
            <TabsTrigger 
              value="edit"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-background data-[state=active]:text-amber-600"
            >
              Edit
            </TabsTrigger>
            <TabsTrigger 
              value="preview"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-background data-[state=active]:text-amber-600"
            >
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border-amber-500/30 focus:border-amber-500"
              placeholder="Give your memory a title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="border-amber-500/30 focus:border-amber-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Black">Black History</SelectItem>
                <SelectItem value="Indigenous">Indigenous Heritage</SelectItem>
                <SelectItem value="POC">POC Experiences</SelectItem>
                <SelectItem value="Ally">Ally Stories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Content Type</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value: "text" | "image" | "video") => 
                setFormData({ ...formData, type: value })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text">Text</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image" id="image" />
                <Label htmlFor="image">Image</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video">Video</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-amber-500/30 focus:border-amber-500"
              placeholder="Provide a brief description of your memory"
              required
            />
          </div>

          {formData.type === "text" ? (
            <div className="space-y-2">
              <Label htmlFor="content">Your Story</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="border-amber-500/30 focus:border-amber-500 min-h-[200px]"
                placeholder="Share your memory in detail"
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Upload {formData.type === "image" ? "Image" : "Video"}</Label>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  {...getRootProps()}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200",
                    isDragActive
                      ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/10 scale-102"
                      : "border-amber-500/30 hover:border-amber-500/50 hover:bg-amber-50/30 dark:hover:bg-amber-950/5"
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="cursor-pointer flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload className="w-8 h-8" />
                    <span>{isDragActive ? "Drop it like it's hot! 🔥" : "Click to upload or drag and drop"}</span>
                    <span className="text-sm">
                      {formData.type === "image" 
                        ? "PNG, JPG up to 10MB"
                        : "MP4, WebM up to 100MB"
                      }
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    {formData.mediaFile && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-foreground"
                      >
                        Selected: {formData.mediaFile.name}
                      </motion.p>
                    )}
                    {errors.mediaFile && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-500"
                      >
                        {errors.mediaFile}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="pl-10 border-amber-500/30 focus:border-amber-500"
                  placeholder="Location (optional)"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-muted/20 flex items-center gap-1"
                  >
                    #{tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="relative">
                <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="pl-10 border-amber-500/30 focus:border-amber-500"
                  placeholder="Add tags (press Enter)"
                />
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all"
                disabled={isSubmitting}
              >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Memory"
              )}
              </Button>
            </motion.div>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="preview">
        <MemoryPreview formData={formData} />
      </TabsContent>
    </Tabs>
  </CardContent>
</Card>
  );
}
