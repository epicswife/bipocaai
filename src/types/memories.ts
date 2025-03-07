export interface Memory {
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

export interface FilterState {
  search: string;
  category: string;
  type: string;
  dateRange: {
    from?: Date;
    to?: Date;
  };
  tags: string[];
  aiEnhanced: boolean;
  relevanceThreshold: number;
  sortBy: "date" | "relevance" | "likes" | "shares";
  timeRange: "all" | "historical" | "recent";
  location?: string;
}

export interface MemoryMapProps {
  memories: Memory[];
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  onMemorySelect: (memory: Memory) => void;
}

export interface MemoryDetailProps {
  memory: Memory;
  onClose: () => void;
}

export interface MemoryTimelineProps {
  memories: Memory[];
  onMemorySelect: (memory: Memory) => void;
}
