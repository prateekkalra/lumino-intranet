import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { EnhancedScrollArea } from '../ui/scroll-area';
import { Heart, Trophy, Star, Zap } from 'lucide-react';

const mockRecognitions = [
  {
    id: '1',
    recipient: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b60bb8d9?w=150&h=150&fit=crop&crop=face',
      role: 'Product Manager',
    },
    sender: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    message: 'Outstanding leadership on the Q4 project launch!',
    type: 'achievement',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    reactions: [
      { emoji: '👏', count: 8, users: [] },
      { emoji: '🎉', count: 5, users: [] },
    ],
  },
  {
    id: '2',
    recipient: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      role: 'Senior Developer',
    },
    sender: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    message: 'Thanks for helping with the bug fix over the weekend!',
    type: 'kudos',
    createdAt: new Date('2024-01-14T14:30:00Z'),
    reactions: [
      { emoji: '🙏', count: 12, users: [] },
      { emoji: '💪', count: 6, users: [] },
    ],
  },
  {
    id: '3',
    recipient: {
      name: 'Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      role: 'UX Designer',
    },
    sender: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    },
    message: 'Incredible design work on the new dashboard!',
    type: 'milestone',
    createdAt: new Date('2024-01-13T09:15:00Z'),
    reactions: [
      { emoji: '🎨', count: 15, users: [] },
      { emoji: '✨', count: 9, users: [] },
    ],
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'achievement':
      return <Trophy className="h-4 w-4 text-yellow-500" />;
    case 'kudos':
      return <Heart className="h-4 w-4 text-red-500" />;
    case 'milestone':
      return <Star className="h-4 w-4 text-purple-500" />;
    default:
      return <Zap className="h-4 w-4 text-blue-500" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'achievement':
      return 'bg-yellow-100 text-yellow-800';
    case 'kudos':
      return 'bg-red-100 text-red-800';
    case 'milestone':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
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

export const RecognitionWidget = () => {
  return (
    <div className="h-full flex flex-col">
      <EnhancedScrollArea className="flex-1 pr-2">
        <div className="space-y-4">
          {mockRecognitions.map((recognition) => (
            <div
              key={recognition.id}
              className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(recognition.type)}
                  <Badge className={getTypeColor(recognition.type)} variant="secondary">
                    {recognition.type}
                  </Badge>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {getTimeAgo(recognition.createdAt)}
                </span>
              </div>

              {/* Recipient */}
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={recognition.recipient.avatar} alt={recognition.recipient.name} />
                  <AvatarFallback>
                    {recognition.recipient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {recognition.recipient.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {recognition.recipient.role}
                  </p>
                </div>
              </div>

              {/* Message */}
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 italic">
                &ldquo;{recognition.message}&rdquo;
              </p>

              {/* Footer with sender and reactions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={recognition.sender.avatar} alt={recognition.sender.name} />
                    <AvatarFallback className="text-xs">
                      {recognition.sender.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    from {recognition.sender.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {recognition.reactions.map((reaction, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs">
                      <span>{reaction.emoji}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {reaction.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </EnhancedScrollArea>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>{mockRecognitions.length} recognitions</span>
          <span>This week</span>
        </div>
      </div>
    </div>
  );
};