import { useState } from 'react';
import { View, Text } from 'react-native';
import { Person } from '../types';
import { AuctionCard } from './AuctionCard';
import { SwipeButtons } from './SwipeButtons';

interface AuctionsViewProps {
  people: Person[];
  onPersonSelect: (person: Person) => void;
}

export function AuctionsView({ people, onPersonSelect }: AuctionsViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      onPersonSelect(people[currentIndex]);
    }
    setCurrentIndex((prev) => Math.min(prev + 1, people.length - 1));
  };

  const handleTap = () => {
    onPersonSelect(people[currentIndex]);
  };

  if (currentIndex >= people.length) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          No more auctions
        </Text>
        <Text className="text-gray-600 text-center">
          Check back later for new people to bid on!
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 pt-12 pb-20">
      <View className="px-6 mb-6">
        <Text className="text-3xl font-bold text-gray-800">Date</Text>
      </View>

      <View className="flex-1 relative">
        {people.slice(currentIndex, currentIndex + 2).map((person, index) => (
          <AuctionCard
            key={person.id}
            person={person}
            onSwipe={handleSwipe}
            onTap={handleTap}
          />
        ))}
      </View>

      <SwipeButtons
        onSwipeLeft={() => handleSwipe('left')}
        onSwipeRight={() => handleSwipe('right')}
      />
    </View>
  );
}
