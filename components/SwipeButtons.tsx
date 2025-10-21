import { View, Pressable, StyleSheet } from 'react-native';
import { X, Heart } from 'lucide-react-native';

interface SwipeButtonsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function SwipeButtons({ onSwipeLeft, onSwipeRight }: SwipeButtonsProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onSwipeLeft}
        style={styles.leftButton}
      >
        <X size={32} color="#ef4444" />
      </Pressable>
      
      <Pressable
        onPress={onSwipeRight}
        style={styles.rightButton}
      >
        <Heart size={36} color="#ffffff" fill="#ffffff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  leftButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  rightButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ec4899',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
