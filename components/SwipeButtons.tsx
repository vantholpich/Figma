import { View, Pressable } from 'react-native';
import { X, Heart } from 'lucide-react-native';

interface SwipeButtonsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function SwipeButtons({ onSwipeLeft, onSwipeRight }: SwipeButtonsProps) {
  return (
    <View className="flex-row justify-center gap-8 px-6 pb-6">
      <Pressable
        onPress={onSwipeLeft}
        className="w-16 h-16 rounded-full bg-white shadow-lg items-center justify-center border border-gray-200"
      >
        <X size={32} color="#ef4444" />
      </Pressable>
      
      <Pressable
        onPress={onSwipeRight}
        className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-red-500 shadow-lg items-center justify-center"
      >
        <Heart size={36} color="#ffffff" fill="#ffffff" />
      </Pressable>
    </View>
  );
}
