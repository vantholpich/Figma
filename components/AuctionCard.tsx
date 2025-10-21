import { View, Text, Image, Pressable } from 'react-native';
import { Person } from '../types';
import { Heart } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface AuctionCardProps {
  person: Person;
  onSwipe: (direction: 'left' | 'right') => void;
  onTap: () => void;
}

export function AuctionCard({ person, onSwipe, onTap }: AuctionCardProps) {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > 100) {
        runOnJS(onSwipe)('right');
        translateX.value = withSpring(0);
      } else if (event.translationX < -100) {
        runOnJS(onSwipe)('left');
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = `${(translateX.value / 10)}deg`;
    return {
      transform: [
        { translateX: translateX.value },
        { rotate },
      ],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={animatedStyle}
        className="absolute inset-4 bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <Pressable onPress={onTap} className="h-full">
          <View className="relative h-full">
            <Image
              source={{ uri: person.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
            
            {/* Gradient overlay */}
            <View className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Content */}
            <View className="absolute bottom-0 left-0 right-0 p-6">
              <View className="flex-row items-center gap-2 mb-2">
                <Heart size={20} color="#ec4899" fill="#ec4899" />
                <Text className="text-sm text-white opacity-90">{person.bids} Likes</Text>
              </View>
              
              <Text className="text-2xl font-bold mb-1 text-white">
                {person.name}, {person.age}
              </Text>
              
              <Text className="text-sm text-white opacity-90 mb-3" numberOfLines={2}>
                {person.bio}
              </Text>
              
              <Text className="text-xs text-white opacity-75">
                Posted by {person.auctionedBy}
              </Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
}
