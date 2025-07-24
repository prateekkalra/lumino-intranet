import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { EnhancedScrollArea } from '../ui/scroll-area';
import { useUserStore } from '../../store/userStore';

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

  return (
    <div className="h-full flex flex-col">
      <EnhancedScrollArea className="flex-1 pr-2">
        <div className="space-y-4">
          {teamMembers.slice(0, 8).map((member) => (
            <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(member.status)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {member.role}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                  {member.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </EnhancedScrollArea>
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
          {teamMembers.filter(m => m.status === 'available').length} available • {teamMembers.length} total
        </p>
      </div>
    </div>
  );
};