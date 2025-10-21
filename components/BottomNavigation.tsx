import { View, Text, Pressable } from 'react-native';
import { Search, Calendar, User } from 'lucide-react-native';
import { ViewType } from '../types';

interface BottomNavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function BottomNavigation({ currentView, onViewChange }: BottomNavigationProps) {
  const navItems = [
    { id: 'auctions' as const, label: '', icon: Search },
    { id: 'my-bids' as const, label: '', icon: Calendar },
    { id: 'profile' as const, label: '', icon: User },
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
      <View className="flex-row justify-between">
        {navItems.map(({ id, label, icon: Icon }) => (
          <Pressable
            key={id}
            onPress={() => onViewChange(id)}
            className={`flex-col items-center gap-1 px-4 py-2 rounded-lg ${
              currentView === id ? '' : ''
            }`}
          >
            <Icon
              size={24}
              color={currentView === id ? '#db2777' : '#9ca3af'}
            />
            <Text
              className={`text-xs font-medium ${
                currentView === id ? 'text-pink-600' : 'text-gray-400'
              }`}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
