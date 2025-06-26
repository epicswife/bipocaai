"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useUser } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Search, AlertCircle, Clock, CheckCircle, UserPlus, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  useMentalHealthStore, 
  type MentalHealthRequest,
  type CounselorAvailability 
} from '@/stores/mental-health';
import { RequestStatus, RequestPriority } from '@/constants';
import { cn } from '@/lib/utils';

// Type-safe request categories
const REQUEST_CATEGORIES = [
  'anxiety',
  'depression',
  'stress',
  'relationships',
  'self-care',
  'crisis',
  'academic',
  'social',
  'family',
  'other'
] as const;

type RequestCategory = (typeof REQUEST_CATEGORIES)[number];

// Type-safe label mappings using enums
const PRIORITY_LABELS: Record<RequestPriority, string> = {
  [RequestPriority.LOW]: 'Low Priority',
  [RequestPriority.MEDIUM]: 'Medium Priority',
  [RequestPriority.HIGH]: 'High Priority',
  [RequestPriority.URGENT]: 'Urgent',
};

const STATUS_COLORS: Record<RequestStatus, string> = {
  [RequestStatus.PENDING]: 'bg-yellow-500/20 text-yellow-600',
  [RequestStatus.ASSIGNED]: 'bg-blue-500/20 text-blue-600',
  [RequestStatus.IN_PROGRESS]: 'bg-purple-500/20 text-purple-600',
  [RequestStatus.COMPLETED]: 'bg-green-500/20 text-green-600',
  [RequestStatus.CANCELLED]: 'bg-red-500/20 text-red-600',
};

const STATUS_LABELS: Record<RequestStatus, string> = {
  [RequestStatus.PENDING]: 'Pending Assignment',
  [RequestStatus.ASSIGNED]: 'Counselor Assigned',
  [RequestStatus.IN_PROGRESS]: 'In Progress',
  [RequestStatus.COMPLETED]: 'Completed',
  [RequestStatus.CANCELLED]: 'Cancelled',
};

export default function CounselorMentalHealthPage() {
  // Component state with type safety
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RequestCategory | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<RequestPriority | 'all'>('all');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // External state with proper type inference
  const { user } = useUser();
  const {
    requests,
    counselors,
    isLoading: storeLoading,
    error: storeError,
    subscribeToRequests,
    subscribeToCounselors,
    updateRequestStatus,
  } = useMentalHealthStore();
  
  // Derived state with type guards
  const isPageLoading = loading || storeLoading;
  const currentError = localError || storeError;
  
  // Type-safe request filtering
  const filteredRequests = requests
    ?.filter((request): request is MentalHealthRequest => {
      return !!request && 
        'requestType' in request && 
        'priority' in request && 
        'description' in request;
    })
    .filter(request => 
      selectedCategory === 'all' ? true : request.requestType === selectedCategory
    )
    .filter(request =>
      selectedPriority === 'all' ? true : request.priority === selectedPriority
    )
    .filter(request =>
      searchQuery ? request.description.toLowerCase().includes(searchQuery.toLowerCase()) : true
    ) ?? [];

  // Type-safe event handlers
  const handleSearch = useCallback((query: string): void => {
    setSearchQuery(query.trim());
  }, []);

  const handleCategoryChange = useCallback((category: RequestCategory | 'all'): void => {
    setSelectedCategory(category);
  }, []);

  const handlePriorityChange = useCallback((priority: string): void => {
    setSelectedPriority(priority as RequestPriority | 'all');
  }, []);

  const handleStatusUpdate = useCallback(async (requestId: string, newStatus: RequestStatus): Promise<void> => {
    try {
      setLoading(true);
      await updateRequestStatus(requestId, newStatus);
      toast.success(`Request ${newStatus.toLowerCase().replace('_', ' ')}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update request status';
      console.error('Error updating request status:', error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [updateRequestStatus]);

  // Type-safe status update handlers
  const handleStartProgress = useCallback((requestId: string) => {
    handleStatusUpdate(requestId, RequestStatus.IN_PROGRESS);
  }, [handleStatusUpdate]);

  const handleCompleteRequest = useCallback((requestId: string) => {
    handleStatusUpdate(requestId, RequestStatus.COMPLETED);
  }, [handleStatusUpdate]);

  // Load requests and counselors
  useEffect(() => {
    if (!user?.uid) return;

    let unsubRequests: () => void;
    let unsubCounselors: () => void;

    const loadData = async () => {
      try {
        setLoading(true);
        setLocalError(null);
        unsubRequests = subscribeToRequests(user.uid);
        unsubCounselors = subscribeToCounselors();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
        setLocalError(errorMessage);
        toast.error(errorMessage);
        console.error('Error in subscriptions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      unsubRequests?.();
      unsubCounselors?.();
    };
  }, [user?.uid, subscribeToRequests, subscribeToCounselors]);

  if (!user) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-lg font-medium">Please log in to access mental health services</h2>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-orbitron text-foreground">
            Mental Health Support Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track mental health support requests
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search requests..."
              className="w-64 pl-9"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {REQUEST_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
        {/* Request List */}
        <Card className="bg-card shadow-glow glassmorphism">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-orbitron text-foreground">
                  Active Requests
                </CardTitle>
                <CardDescription>
                  {requests.length} requests requiring attention
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setSelectedCategory('all')}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => handlePriorityChange('all')}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  All Priorities
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => handlePriorityChange('urgent')}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Urgent Only
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isPageLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start gap-4 animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 bg-muted rounded" />
                      <div className="h-3 w-1/2 bg-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12">
                <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium">No requests yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Create a new request to get started
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {requests
                    .filter((request): request is MentalHealthRequest => !!request && typeof request === 'object')
                    .filter(request => 
                      searchQuery
                        ? request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          request.requestType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          request.description.toLowerCase().includes(searchQuery.toLowerCase())
                        : true
                    )
                    .map((request) => (
                      <React.Fragment key={request.id}>
                        <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/75 transition-colors duration-200 border-primary/10">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-1">
                                  {request.confidential ? 'Anonymous Student' : request.studentName}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                  <Badge
                                    variant="secondary"
                                    className={cn(
                                      'bg-primary/20 text-primary',
                                      'font-medium'
                                    )}
                                  >
                                    {request.requestType}
                                  </Badge>
                                  <Badge
                                    variant="secondary"
                                    className={cn(
                                      STATUS_COLORS[request.status],
                                      'font-medium'
                                    )}
                                  >
                                    {STATUS_LABELS[request.status]}
                                  </Badge>
                                  <Badge
                                    variant="secondary"
                                    className={cn(
                                      'bg-secondary/20 text-secondary',
                                      'font-medium'
                                    )}
                                  >
                                    {PRIORITY_LABELS[request.priority]}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-muted-foreground hover:text-foreground"
                                  onClick={() => handleStartProgress(request.id)}
                                  disabled={request.status === 'in_progress'}
                                >
                                  <Clock className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-muted-foreground hover:text-foreground"
                                  onClick={() => handleCompleteRequest(request.id)}
                                  disabled={request.status === 'completed'}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="mt-3 text-sm text-muted-foreground">{request.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex flex-wrap items-center gap-2">
                                {request.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs font-normal"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(request.createdAt.seconds * 1000).toLocaleDateString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      </React.Fragment>
                    ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* Stats Card */}
        <div className="space-y-4">
          <Card className="bg-card shadow-glow glassmorphism">
            <CardHeader>
              <CardTitle className="text-lg font-orbitron text-foreground">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-primary/10">
                  <p className="text-sm text-muted-foreground">Active Requests</p>
                  <p className="text-2xl font-semibold text-foreground mt-1">
                    {requests.filter((r): r is MentalHealthRequest => !!r && r.status !== 'completed' && r.status !== 'cancelled').length}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/10">
                  <p className="text-sm text-muted-foreground">Available Counselors</p>
                  <p className="text-2xl font-semibold text-foreground mt-1">
                    {counselors.filter(c => c.status === 'available').length}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/10">
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-semibold text-foreground mt-1">
                    {requests.filter((r): r is MentalHealthRequest => !!r && r.priority === 'high' && r.status !== 'completed').length}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/10">
                  <p className="text-sm text-muted-foreground">Completed Today</p>
                  <p className="text-2xl font-semibold text-foreground mt-1">
                    {requests.filter((r): r is MentalHealthRequest => {
                      if (!r || r.status !== 'completed') return false;
                      const completedDate = new Date(r.updatedAt.seconds * 1000);
                      const today = new Date();
                      return completedDate.toDateString() === today.toDateString();
                    }).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-glow glassmorphism">
            <CardHeader>
              <CardTitle className="text-lg font-orbitron text-foreground">Available Counselors</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] pr-4">
                {isPageLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-muted-foreground" />
                    <p className="text-muted-foreground">Loading counselors...</p>
                  </div>
                ) : !counselors || counselors.length === 0 ? (
                  <div className="text-center py-8">
                    <UserPlus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No counselors available</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {counselors
                      .filter((c): c is CounselorAvailability => !!c && typeof c === 'object' && c.status === 'available')
                      .map((counselor) => (
                        <div
                          key={counselor.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-card/50 backdrop-blur-sm hover:bg-card/75 transition-colors duration-200"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{counselor.name}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              {counselor.specialties.map((specialty) => (
                                <Badge
                                  key={specialty}
                                  variant="outline"
                                  className="text-xs font-normal text-muted-foreground"
                                >
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-green-500/20 text-green-600"
                          >
                            Available
                          </Badge>
                        </div>
                      ))}
                    {!isPageLoading && filteredRequests.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No requests match your filters</p>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
          {currentError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{currentError}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
