import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Heart, Trophy, Star, Zap, Plus } from 'lucide-react';
import { useDialog } from '../../contexts/DialogContext';
import { useToast } from '../ui/use-toast';

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
      return <Trophy className="h-4 w-4 text-primary" />;
    case 'kudos':
      return <Heart className="h-4 w-4 text-primary" />;
    case 'milestone':
      return <Star className="h-4 w-4 text-primary" />;
    default:
      return <Zap className="h-4 w-4 text-primary" />;
  }
};

const getTypeVariant = (type: string) => {
  switch (type) {
    case 'achievement':
      return 'default';
    case 'kudos':
      return 'secondary';
    case 'milestone':
      return 'outline';
    default:
      return 'secondary';
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
  const [recognitions, setRecognitions] = useState(mockRecognitions);
  const { openDialog } = useDialog();
  const { toast } = useToast();

  const handleReactionClick = (recognitionId: string, emoji: string) => {
    setRecognitions(prev => prev.map(recognition => {
      if (recognition.id === recognitionId) {
        const existingReaction = recognition.reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...recognition,
            reactions: recognition.reactions.map(r => 
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            )
          };
        } else {
          return {
            ...recognition,
            reactions: [...recognition.reactions, { emoji, count: 1, users: [] }]
          };
        }
      }
      return recognition;
    }));

    toast({
      title: "Reaction added",
      description: `You reacted with ${emoji}`,
    });
  };

  const handleGiveRecognition = () => {
    openDialog('team-feed');
    toast({
      title: "Give Recognition",
      description: "Opening team feed to give recognition...",
    });
  };

  const handleRecognitionClick = (recognition: any) => {
    toast({
      title: "Recognition Details",
      description: `${recognition.recipient.name} - ${recognition.message}`,
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recognition Wall</span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleGiveRecognition}
            className="h-8 px-3 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            Give Recognition
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            {recognitions.map((recognition) => (
              <Card
                key={recognition.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleRecognitionClick(recognition)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(recognition.type)}
                      <Badge variant={getTypeVariant(recognition.type) as any}>
                        {recognition.type}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(recognition.createdAt)}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 pb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={recognition.recipient.avatar} alt={recognition.recipient.name} />
                      <AvatarFallback>
                        {recognition.recipient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">
                        {recognition.recipient.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {recognition.recipient.role}
                      </p>
                    </div>
                  </div>

                  <Card>
                    <CardContent className="p-3">
                      <p className="text-sm text-foreground italic">
                        &ldquo;{recognition.message}&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={recognition.sender.avatar} alt={recognition.sender.name} />
                        <AvatarFallback className="text-xs">
                          {recognition.sender.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        from {recognition.sender.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {recognition.reactions.map((reaction, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReactionClick(recognition.id, reaction.emoji);
                          }}
                        >
                          <span>{reaction.emoji}</span>
                          <span className="ml-1 text-muted-foreground">
                            {reaction.count}
                          </span>
                        </Button>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          const emojis = ['👍', '❤️', '👏', '🎉', '🚀'];
                          const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                          handleReactionClick(recognition.id, randomEmoji);
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        React
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter>
        <Card className="w-full">
          <CardContent className="p-3">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{recognitions.length} recognitions</span>
              <span>This week</span>
            </div>
          </CardContent>
        </Card>
      </CardFooter>
    </Card>
  );
};