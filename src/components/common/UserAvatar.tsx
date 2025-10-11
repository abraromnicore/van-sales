import type { UserType } from '@/types/um/users/user.type';

type UserAvatarProps = {
  user: UserType;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
};

export const UserAvatar = ({ user, size = 'md', showName = false }: UserAvatarProps) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-xs';
      case 'lg':
        return 'w-12 h-12 text-lg';
      default:
        return 'w-10 h-10 text-sm';
    }
  };

  const getBackgroundColor = (firstName: string, lastName: string) => {
    // Generate a consistent color based on name
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-teal-500',
    ];
    
    const nameHash = (firstName + lastName).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return colors[Math.abs(nameHash) % colors.length];
  };

  return (
    <div className="flex items-center space-x-3">
      <div className={`${getSizeClasses()} ${getBackgroundColor(user.firstName, user.lastName)} rounded-full flex items-center justify-center text-white font-semibold`}>
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          getInitials(user.firstName, user.lastName)
        )}
      </div>
      {showName && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-xs text-gray-500">{user.email}</span>
        </div>
      )}
    </div>
  );
};
