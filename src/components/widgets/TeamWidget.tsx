import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { EnhancedScrollArea } from '../ui/scroll-area';
import { useUserStore } from '../../store/userStore';
import { useDialog } from '../../contexts/DialogContext';
import { useToast } from '../ui/use-toast';
import { MessageCircle, Phone, Calendar, Plus } from 'lucide-react';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-green-500';
    case 'busy':
      return 'bg-red-500';
    case 'away':
      return 'bg-yellow-500';
    case 'offline':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Team Members</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={() => openDialog('directory')}
          className="h-6 px-2 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          View All
        </Button>
      </div>

      <EnhancedScrollArea className="flex-1 pr-2">
        <div className="space-y-3">
          {teamMembers.slice(0, 8).map((member) => (
            <div key={member.id} className="group relative">
              <div
                onClick={() => handleMemberClick(member)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-xs">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={(e) => handleStatusClick(member, e)}
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 hover:scale-110 transition-transform cursor-pointer ${getStatusColor(getMemberStatus(member))}`}
                    title="Click to change status"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                    {getMemberStatus(member)}
                  </p>
                </div>
                
                {/* Quick Actions - Show on hover */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => handleMessage(member, e)}
                    className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                    title="Send message"
                  >
                    <MessageCircle className="h-3 w-3 text-blue-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => handleCall(member, e)}
                    className="h-6 w-6 p-0 hover:bg-green-100 dark:hover:bg-green-900/20"
                    title="Start call"
                  >
                    <Phone className="h-3 w-3 text-green-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => handleSchedule(member, e)}
                    className="h-6 w-6 p-0 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                    title="Schedule meeting"
                  >
                    <Calendar className="h-3 w-3 text-purple-600" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </EnhancedScrollArea>
      
      {/* Footer Stats */}
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
          {teamMembers.filter(m => getMemberStatus(m) === 'available').length} available • {teamMembers.length} total
        </p>
      </div>
    </div>
  );
};