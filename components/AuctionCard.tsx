import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Person } from '../types';
import { Heart } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
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
      'worklet';
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      'worklet';
      translateX.value = startX.value + event.translationX;
    })
    .onEnd((event) => {
      'worklet';
      if (event.translationX > 100) {
        onSwipe('right');
        translateX.value = withSpring(0);
      } else if (event.translationX < -100) {
        onSwipe('left');
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
      <Animated.View style={[styles.card, animatedStyle]}>
        <Pressable onPress={onTap} style={styles.pressable}>
          <View style={styles.container}>
            <Image
              source={{ uri: person.image }}
              style={styles.image}
              resizeMode="cover"
            />
            
            {/* Gradient overlay */}
            <View style={styles.gradient} />
            
            {/* Content */}
            <View style={styles.content}>
              <View style={styles.bidsContainer}>
                <Heart size={20} color="#ec4899" fill="#ec4899" />
                <Text style={styles.bidsText}>{person.bids} Likes</Text>
              </View>
              
              <Text style={styles.name}>
                {person.name}, {person.age}
              </Text>
              
              <Text style={styles.bio} numberOfLines={2}>
                {person.bio}
              </Text>
              
              <Text style={styles.auctionedBy}>
                Posted by {person.auctionedBy}
              </Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 25,
    overflow: 'hidden',
  },
  pressable: {
    height: '100%',
  },
  container: {
    position: 'relative',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  bidsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  bidsText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ffffff',
  },
  bio: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 12,
  },
  auctionedBy: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.75,
  },
});
