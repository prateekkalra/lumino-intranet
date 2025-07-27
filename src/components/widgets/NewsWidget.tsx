import React, { useState, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { EnhancedScrollArea } from '../ui/scroll-area';
import { useToast } from '../ui/use-toast';
import { useDialog } from '../../contexts/DialogContext';
import {
  Heart,
  MessageCircle,
  Share2,
  Filter,
  User,
  Plus,
} from 'lucide-react';
import type { NewsPost } from '../../types/data';
import { useSearchProvider } from '../../hooks/useSearchProvider';
import { SearchResult } from '../../types/search';

// Mock news data
const mockNewsData: NewsPost[] = [
  {
    id: '1',
    title: 'Q4 Company Results Exceed Expectations',
    content: 'We\'re thrilled to announce that our Q4 results have exceeded all expectations, with a 23% increase in revenue compared to last quarter. This success is a testament to the hard work and dedication of our entire team.',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b60bb8d9?w=150&h=150&fit=crop&crop=face',
      role: 'CEO',
    },
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    category: 'announcement',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop',
    likes: 47,
    isLiked: false,
    comments: [
      {
        id: 'c1',
        author: { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
        content: 'Fantastic news! Great work everyone!',
        createdAt: new Date('2024-01-15T11:00:00Z'),
        likes: 5,
        isLiked: false,
      },
    ],
    tags: ['quarterly-results', 'growth'],
  },
  {
    id: '2',
    title: 'New Employee Wellness Program Launch',
    content: 'Starting next month, we\'re launching a comprehensive wellness program including yoga classes, mental health support, and flexible working arrangements. Sign-ups begin today!',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      role: 'HR Director',
    },
    publishedAt: new Date('2024-01-14T14:30:00Z'),
    category: 'update',
    likes: 32,
    isLiked: true,
    comments: [],
    tags: ['wellness', 'benefits'],
  },
  {
    id: '3',
    title: 'Tech Conference 2024 - Save the Date',
    content: 'Mark your calendars! Our annual tech conference is scheduled for March 15-17. Early bird registration opens next week with exciting speakers and workshops planned.',
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      role: 'Event Coordinator',
    },
    publishedAt: new Date('2024-01-13T09:15:00Z'),
    category: 'event',
    likes: 28,
    isLiked: false,
    comments: [],
    tags: ['conference', 'tech', 'professional-development'],
  },
];

const categoryColors = {
  announcement: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  update: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  event: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
  achievement: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
};

const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }
};

export const NewsWidget: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set(['2']));
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({
    '1': 1,
    '2': 0,
    '3': 0,
  });
  const { toast } = useToast();
  const { openDialog } = useDialog();

  // Create search provider for news
  const searchProvider = useMemo(() => ({
    getSearchableData: (): SearchResult[] => {
      return mockNewsData.map(post => ({
        id: post.id,
        title: post.title,
        description: post.content.substring(0, 150) + '...',
        type: 'news' as const,
        category: post.category,
        content: `${post.title} ${post.content} ${post.author.name} ${post.tags?.join(' ') || ''}`,
        widget: 'NewsWidget',
        metadata: {
          author: post.author.name,
          category: post.category,
          likes: post.likes,
          date: post.publishedAt,
          tags: post.tags
        },
        action: () => {
          toast({
            title: "News Article",
            description: `Opening: ${post.title}`,
          });
        }
      }));
    }
  }), [toast]);

  // Register with search service
  useSearchProvider('NewsWidget', searchProvider);

  const categories = ['announcement', 'update', 'event', 'achievement'];

  const filteredNews = useMemo(() => {
    if (!selectedCategory) return mockNewsData;
    return mockNewsData.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newLiked = new Set(prev);
      const isLiking = !newLiked.has(postId);
      
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      
      toast({
        title: isLiking ? "Post liked!" : "Like removed",
        description: isLiking ? "You liked this post" : "You unliked this post",
      });
      
      return newLiked;
    });
  };

  const handleComment = (postId: string) => {
    setCommentCounts(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }));
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully",
    });
  };

  const handleShare = (postId: string) => {
    const post = mockNewsData.find(p => p.id === postId);
    
    // Simulate sharing to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Check out this post: "${post?.title}"`);
      toast({
        title: "Post shared",
        description: "Link copied to clipboard",
      });
    } else {
      toast({
        title: "Post shared",
        description: "Sharing functionality activated",
      });
    }
  };

  const handleAuthorClick = (authorName: string) => {
    openDialog('directory');
    toast({
      title: "Profile opened",
      description: `Viewing ${authorName}'s profile in directory`,
    });
  };

  const handleCreatePost = () => {
    openDialog('team-feed');
    toast({
      title: "Team feed opened",
      description: "Create a new post for your team",
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Filter and Create Post */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <div className="flex gap-1 flex-wrap">
            <Button
              size="sm"
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              className="h-6 px-2 text-xs"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="h-6 px-2 text-xs capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCreatePost}
          className="h-6 px-2 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          Post
        </Button>
      </div>

      {/* News Feed */}
      <EnhancedScrollArea className="flex-1 pr-2">
        <div className="space-y-4">
          {filteredNews.map((post) => (
            <div
              key={post.id}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleAuthorClick(post.author.name)}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </button>
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => handleAuthorClick(post.author.name)}
                      className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                    >
                      {post.author.name}
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {post.author.role} • {getTimeAgo(post.publishedAt)}
                    </p>
                  </div>
                </div>
                <Badge className={categoryColors[post.category]} variant="secondary">
                  {post.category}
                </Badge>
              </div>

              {/* Post Content */}
              <div className="mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {post.content}
                </p>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="mb-3">
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleLike(post.id)}
                    className={`h-7 px-2 gap-1 transition-all duration-200 hover:scale-105 ${
                      likedPosts.has(post.id)
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Heart
                      className={`h-3 w-3 transition-all duration-200 ${
                        likedPosts.has(post.id) ? 'fill-current scale-110' : ''
                      }`}
                    />
                    <span className="text-xs">
                      {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleComment(post.id)}
                    className="h-7 px-2 gap-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105"
                  >
                    <MessageCircle className="h-3 w-3" />
                    <span className="text-xs">
                      {(commentCounts[post.id] || post.comments.length)}
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleShare(post.id)}
                    className="h-7 px-2 gap-1 text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 hover:scale-105"
                  >
                    <Share2 className="h-3 w-3" />
                    <span className="text-xs">Share</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </EnhancedScrollArea>

      {/* Footer */}
      <div className="mt-3 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>{filteredNews.length} posts</span>
          <span>Updated 2 min ago</span>
        </div>
      </div>
    </div>
  );
};