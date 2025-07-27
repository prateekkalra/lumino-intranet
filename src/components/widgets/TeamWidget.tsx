import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { useUserStore } from '../../store/userStore';
import { useDialog } from '../../contexts/DialogContext';
import { useToast } from '../ui/use-toast';
import { MessageCircle, Phone, Calendar, Plus } from 'lucide-react';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-primary';
    case 'busy':
      return 'bg-destructive';
    case 'away':
      return 'bg-secondary';
    case 'offline':
      return 'bg-muted-foreground';
    default:
      return 'bg-muted-foreground';
  }
};

export const TeamWidget = () => {
  const { teamMembers } = useUserStore();
  const { openDialog } = useDialog();
  const { toast } = useToast();
  const [memberStatuses, setMemberStatuses] = useState<Record<string, string>>({});

  const handleMemberClick = (member: any) => {
    openDialog('directory');
    toast({
      title: "Profile opened",
      description: `Viewing ${member.name}'s profile`,
    });
  };

  const handleMessage = (member: any, e: React.MouseEvent) => {
    e.stopPropagation();
    openDialog('team-feed');
    toast({
      title: "Message started",
      description: `Opening chat with ${member.name}`,
    });
  };

  const handleCall = (member: any, e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Calling...",
      description: `Initiating call with ${member.name}`,
    });
  };

  const handleSchedule = (member: any, e: React.MouseEvent) => {
    e.stopPropagation();
    openDialog('calendar');
    toast({
      title: "Calendar opened",
      description: `Schedule a meeting with ${member.name}`,
    });
  };

  const handleStatusClick = (member: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentStatus = memberStatuses[member.id] || member.status;
    const statusCycle = ['available', 'busy', 'away', 'offline'];
    const currentIndex = statusCycle.indexOf(currentStatus);
    const newStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
    
    setMemberStatuses(prev => ({
      ...prev,
      [member.id]: newStatus
    }));
    
    toast({
      title: "Status updated",
      description: `${member.name} is now ${newStatus}`,
    });
  };

  const getMemberStatus = (member: any) => memberStatuses[member.id] || member.status;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Team Members</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => openDialog('directory')}
            className="h-8 px-3 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            View All
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <ScrollArea className="h-full">
          <div className="space-y-3">
            {teamMembers.slice(0, 8).map((member) => (
              <Card
                key={member.id}
                className="cursor-pointer hover:shadow-md transition-shadow group"
                onClick={() => handleMemberClick(member)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => handleStatusClick(member, e)}
                        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 p-0 rounded-full border-2 border-background hover:scale-110 transition-transform ${getStatusColor(getMemberStatus(member))}`}
                        title="Click to change status"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-medium truncate">
                        {member.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground truncate">
                        {member.role}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {getMemberStatus(member)}
                      </p>
                    </div>
                    
                    <Card className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <CardContent className="p-1">
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => handleMessage(member, e)}
                            className="h-6 w-6 p-0"
                            title="Send message"
                          >
                            <MessageCircle className="h-3 w-3 text-primary" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => handleCall(member, e)}
                            className="h-6 w-6 p-0"
                            title="Start call"
                          >
                            <Phone className="h-3 w-3 text-primary" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => handleSchedule(member, e)}
                            className="h-6 w-6 p-0"
                            title="Schedule meeting"
                          >
                            <Calendar className="h-3 w-3 text-primary" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter>
        <Card className="w-full">
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground text-center">
              {teamMembers.filter(m => getMemberStatus(m) === 'available').length} available • {teamMembers.length} total
            </p>
          </CardContent>
        </Card>
      </CardFooter>
    </Card>
  );
};