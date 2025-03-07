"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { MemoryDetail } from "./memory-detail";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Heart, Share2, Play, Search, SlidersHorizontal, Map, 
         Sparkles, TrendingUp, Filter, ChevronDown, Clock, Award, X } from "lucide-react";
// Remove unused dynamic import
import { Memory, FilterState } from "@/types/memories";

// Import mock data
import { mockMemories } from "@/data/mockMemories";

// Import the map component directly, not with dynamic
import MemoryMap from './memory-map';
import { MemoryTimeline } from "./memory-timeline";

// Define local interface for component-specific Memory type
export interface LocalMemory {
  id: string;
  type: "text" | "image" | "video";
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  category: "Indigenous" | "Black" | "POC" | "Ally";
  tags?: string[];
  location?: string;
  coordinates?: { lat: number; lng: number };
  mediaUrl?: string;
  likes: number;
  shares: number;
  aiScore?: number;
  verificationStatus?: "pending" | "verified" | "featured";
}

export function MemoryBrowser() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    type: "all",
    dateRange: {},
    tags: [],
    aiEnhanced: false,
    relevanceThreshold: 0.7,
    sortBy: "date",
    timeRange: "all",
    location: undefined
  });
  
  const [view, setView] = useState<"grid" | "map" | "timeline">("grid");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<LocalMemory | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [mapZoom] = useState(4);
  const [isLoading] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev: FilterState) => ({ ...prev, [key]: value }));
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      "Black": "bg-amber-500",
      "Indigenous": "bg-emerald-500",
      "POC": "bg-blue-500",
      "Ally": "bg-purple-500"
    };
    return colors[category] || "bg-gray-500";
  };
  
  const filteredMemories = useMemo(() => {
    let filtered = [...mockMemories] as unknown as LocalMemory[];

    if (filters.category !== "all") {
      filtered = filtered.filter(memory => 
        memory.category === filters.category
      );
    }
    
    if (filters.aiEnhanced) {
      filtered = filtered.filter(memory => 
        (memory.aiScore || 0) >= filters.relevanceThreshold
      );
    }

    if (filters.location) {
      filtered = filtered.filter(memory =>
        memory.location?.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(memory =>
        selectedTags.every(tag => memory.tags?.includes(tag))
      );
    }

    if (filters.dateRange.from) {
      filtered = filtered.filter(memory =>
        new Date(memory.date) >= filters.dateRange.from!
      );
    }
    if (filters.dateRange.to) {
      filtered = filtered.filter(memory =>
        new Date(memory.date) <= filters.dateRange.to!
      );
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(memory =>
        memory.title.toLowerCase().includes(query) ||
        memory.description.toLowerCase().includes(query) ||
        memory.author.toLowerCase().includes(query) ||
        memory.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        memory.location?.toLowerCase().includes(query) ||
        memory.content.toLowerCase().includes(query)
      );
    }

    if (filters.timeRange !== "all") {
      const cutoffDate = new Date();
      if (filters.timeRange === "historical") {
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 50);
        filtered = filtered.filter(memory => new Date(memory.date) < cutoffDate);
      } else {
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 50);
        filtered = filtered.filter(memory => new Date(memory.date) >= cutoffDate);
      }
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "relevance":
          return (b.aiScore || 0) - (a.aiScore || 0);
        case "likes":
          return b.likes - a.likes;
        case "shares":
          return b.shares - a.shares;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, selectedTags]);

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    mockMemories.forEach(memory => {
      memory.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, []);

  const availableLocations = useMemo(() => {
    const locationSet = new Set<string>();
    mockMemories.forEach(memory => {
      if (memory.location) locationSet.add(memory.location);
    });
    return Array.from(locationSet).sort();
  }, []);

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
            Cultural Memories
          </h2>
          <Badge variant="outline" className="bg-amber-50/50 text-amber-700 border-amber-200">
            {filteredMemories.length} stories
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            console.log('Current filters:', filters);
            console.log('Selected tags:', selectedTags);
            console.log('Filtered memories:', filteredMemories);
            console.log('Mock memories:', mockMemories);
          }}>
            <Filter className="h-4 w-4 mr-2" /> Debug ({filteredMemories.length})
          </Button>
        </div>
      </motion.div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10 bg-muted/5"
              placeholder="Search memories by title, content, location..."
            />
          </div>

          <Select value={filters.sortBy} onValueChange={(v) => handleFilterChange("sortBy", v)}>
            <SelectTrigger className="w-[180px]">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Most Recent</SelectItem>
              <SelectItem value="likes">Most Impactful</SelectItem>
              <SelectItem value="shares">Most Shared</SelectItem>
              <SelectItem value="relevance">AI Relevance</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className={cn(
              "gap-2",
              showAdvancedFilters && "bg-amber-50 text-amber-900 border-amber-200"
            )}
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className="h-4 w-4" />
          </Button>

          <Button
            variant={filters.aiEnhanced ? "default" : "outline"}
            className="gap-2"
            onClick={() => handleFilterChange("aiEnhanced", !filters.aiEnhanced)}
          >
            <Sparkles className="h-4 w-4" />
            AI Enhanced
          </Button>
        </div>

        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <Card className="p-4 bg-muted/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Category</Label>
                    <Select value={filters.category} onValueChange={(v) => handleFilterChange("category", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Black">Black History</SelectItem>
                        <SelectItem value="Indigenous">Indigenous Heritage</SelectItem>
                        <SelectItem value="POC">POC Experiences</SelectItem>
                        <SelectItem value="Ally">Ally Stories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Time Period</Label>
                    <Select value={filters.timeRange} onValueChange={(v) => handleFilterChange("timeRange", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="historical">Historical (Pre-1975)</SelectItem>
                        <SelectItem value="recent">Modern Era</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Location</Label>
                    <Select value={filters.location} onValueChange={(v) => handleFilterChange("location", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {availableLocations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 col-span-full">
                    <Label className="text-sm font-medium">Tags</Label>
                    <ScrollArea className="h-20 w-full rounded-md border">
                      <div className="p-4 flex flex-wrap gap-2">
                        {availableTags.map((tag: string) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className={cn(
                              "cursor-pointer transition-colors",
                              selectedTags.includes(tag)
                                ? "bg-amber-100 text-amber-900 border-amber-200"
                                : "hover:bg-muted"
                            )}
                            onClick={() => {
                              setSelectedTags(prev =>
                                prev.includes(tag)
                                  ? prev.filter(t => t !== tag)
                                  : [...prev, tag]
                              );
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {filters.aiEnhanced && (
                    <div className="col-span-full space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">AI Relevance Threshold</Label>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(filters.relevanceThreshold * 100)}%
                        </span>
                      </div>
                      <Slider
                        value={[filters.relevanceThreshold * 100]}
                        onValueChange={([value]) => handleFilterChange("relevanceThreshold", value / 100)}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Tabs defaultValue="grid" value={view} onValueChange={(v) => setView(v as typeof view)} className="w-full mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
          <TabsTrigger value="grid" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Grid
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="h-4 w-4" /> Map
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Timeline
          </TabsTrigger>
        </TabsList>

        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" onClick={() => setSelectedMemory(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <MemoryDetail memory={selectedMemory} onClose={() => setSelectedMemory(null)} />
            </div>
          </div>
        )}

        <TabsContent value="grid" className="mt-0">
          <ScrollArea className="h-[calc(100vh-20rem)]">
            {isLoading ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
              </div>
            ) : filteredMemories.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center p-4">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No memories found</h3>
                <p className="text-muted-foreground max-w-md">
                  Try adjusting your filters or search criteria to find more memories.
                </p>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredMemories.map((memory) => (
                    <motion.div
                      key={memory.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className={cn(
                          "overflow-hidden cursor-pointer group",
                          "hover:shadow-lg transition-all duration-300",
                          "border-muted/50 hover:border-amber-200/50",
                          memory.verificationStatus === "featured" && "ring-2 ring-amber-400 ring-offset-2"
                        )}
                        onClick={() => setSelectedMemory(memory)}
                      >
                        {memory.type === "image" && memory.mediaUrl && (
                          <div className="relative h-48 bg-muted overflow-hidden">
                            <Image
                              src={memory.mediaUrl}
                              alt={memory.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {memory.verificationStatus === "verified" && (
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-emerald-500/90 text-white border-none">
                                  <Award className="h-3 w-3 mr-1" /> Verified
                                </Badge>
                              </div>
                            )}
                            {memory.verificationStatus === "featured" && (
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-amber-500/90 text-white border-none">
                                  <Sparkles className="h-3 w-3 mr-1" /> Featured
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}
                        {memory.type === "video" && memory.mediaUrl && (
                          <div className="relative h-48 bg-muted overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 group-hover:bg-black/30">
                              <Play className="h-12 w-12 text-white/90" />
                            </div>
                            {memory.verificationStatus === "verified" && (
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-emerald-500/90 text-white border-none">
                                  <Award className="h-3 w-3 mr-1" /> Verified
                                </Badge>
                              </div>
                            )}
                            {memory.verificationStatus === "featured" && (
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-amber-500/90 text-white border-none">
                                  <Sparkles className="h-3 w-3 mr-1" /> Featured
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}
                        <CardContent className="p-4 space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={cn(
                                  "text-white",
                                  getCategoryColor(memory.category)
                                )}
                              >
                                {memory.category}
                              </Badge>
                              {memory.aiScore && (
                                <Badge variant="outline" className="text-xs">
                                  AI Score: {Math.round(memory.aiScore * 100)}%
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-semibold leading-tight line-clamp-2">
                              {memory.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {memory.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <span>{memory.author}</span>
                              <span>·</span>
                              <span>{format(new Date(memory.date), "MMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span>{memory.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Share2 className="h-4 w-4" />
                                <span>{memory.shares}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="map" className="mt-0">
          <div className="h-[calc(100vh-20rem)] rounded-lg overflow-hidden">
            <MemoryMap
              memories={filteredMemories as any}
              center={mapCenter}
              zoom={mapZoom}
              onMemorySelect={(memory: LocalMemory) => setSelectedMemory(memory)}
            />
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-0">
          <MemoryTimeline
            memories={filteredMemories as any}
            onMemorySelect={(memory) => {
              const fullMemory = filteredMemories.find(m => m.id === memory.id);
              if (fullMemory) setSelectedMemory(fullMemory);
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}