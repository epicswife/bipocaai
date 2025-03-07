"use client";

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy, Timestamp, where } from 'firebase/firestore';
import { Search, Book, FileText, Link as LinkIcon, Download, Plus, Bookmark } from 'lucide-react';


interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'link' | 'template' | 'guide';
  category: 'academic' | 'behavioral' | 'social' | 'career' | 'general';
  url: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  tags: string[];
  downloads?: number;
  favorite?: boolean;
}

interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  count: number;
}

export default function ResourcesPage() {
  const { user, loading } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteResources, setFavoriteResources] = useState<Set<string>>(new Set());

  const categories: ResourceCategory[] = [
    {
      id: 'academic',
      name: 'Academic Support',
      description: 'Resources for academic counseling and student support',
      count: resources.filter(r => r.category === 'academic').length
    },
    {
      id: 'behavioral',
      name: 'Behavioral Support',
      description: 'Tools and strategies for behavioral interventions',
      count: resources.filter(r => r.category === 'behavioral').length
    },
    {
      id: 'social',
      name: 'Social-Emotional',
      description: 'Resources for social and emotional development',
      count: resources.filter(r => r.category === 'social').length
    },
    {
      id: 'career',
      name: 'Career Guidance',
      description: 'Career counseling and planning materials',
      count: resources.filter(r => r.category === 'career').length
    },
    {
      id: 'general',
      name: 'General Resources',
      description: 'General counseling tools and references',
      count: resources.filter(r => r.category === 'general').length
    }
  ];

  const fetchResources = useCallback(async () => {
    if (!user?.uid) return;

    try {
      const resourcesQuery = query(
        collection(db, 'resources'),
        orderBy('updatedAt', 'desc')
      );
      
      const snapshot = await getDocs(resourcesQuery);
      const resourcesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Resource[];
      
      setResources(resourcesData);

      // Fetch user's favorite resources
      const favoritesQuery = query(
        collection(db, 'userFavorites'),
        where('userId', '==', user.uid)
      );
      const favoritesSnapshot = await getDocs(favoritesQuery);
      const favorites = new Set(favoritesSnapshot.docs.map(doc => doc.data().resourceId));
      setFavoriteResources(favorites);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'link':
        return <LinkIcon className="h-5 w-5" />;
      case 'template':
        return <Book className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  if (loading || isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-primary">Counseling Resources</h1>
        <Button className="bg-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Browse resources by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant={activeCategory === 'all' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveCategory('all')}
                >
                  <Book className="mr-2 h-4 w-4" />
                  All Resources
                  <span className="ml-auto">{resources.length}</span>
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <Book className="mr-2 h-4 w-4" />
                    {category.name}
                    <span className="ml-auto">{category.count}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="border-primary/20 mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      {getResourceIcon(resource.type)}
                      <CardTitle className="ml-2 text-lg">{resource.title}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={favoriteResources.has(resource.id) ? 'text-primary' : ''}
                      onClick={() => {
                        const newFavorites = new Set(favoriteResources);
                        if (newFavorites.has(resource.id)) {
                          newFavorites.delete(resource.id);
                        } else {
                          newFavorites.add(resource.id);
                        }
                        setFavoriteResources(newFavorites);
                      }}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Updated {new Date(resource.updatedAt.seconds * 1000).toLocaleDateString()}
                    </span>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
