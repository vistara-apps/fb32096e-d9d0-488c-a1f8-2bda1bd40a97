interface User {
  userId: string;
  username: string;
  displayName?: string;
  avatar?: string;
}

interface UserAvatarStackProps {
  users: User[];
  maxVisible?: number;
}

export function UserAvatarStack({ users, maxVisible = 3 }: UserAvatarStackProps) {
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = users.length - maxVisible;

  return (
    <div className="flex -space-x-2">
      {visibleUsers.map((user, index) => (
        <div
          key={user.userId}
          className="relative"
          style={{ zIndex: visibleUsers.length - index }}
        >
          <img
            src={user.avatar || `https://via.placeholder.com/32x32?text=${user.username[0].toUpperCase()}`}
            alt={user.displayName || user.username}
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
            title={user.displayName || user.username}
          />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div
          className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center"
          style={{ zIndex: 0 }}
        >
          <span className="text-xs font-medium text-gray-600">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
}
