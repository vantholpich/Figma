import { View, Text, Pressable, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.navContainer}>
        {navItems.map(({ id, label, icon: Icon }) => (
          <Pressable
            key={id}
            onPress={() => onViewChange(id)}
            style={styles.navItem}
          >
            <Icon
              size={24}
              color={currentView === id ? '#db2777' : '#9ca3af'}
            />
            <Text
              style={[
                styles.navLabel,
                currentView === id ? styles.navLabelActive : styles.navLabelInactive
              ]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#db2777',
  },
  navLabelInactive: {
    color: '#9ca3af',
  },
});
