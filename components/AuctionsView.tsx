import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          No more auctions
        </Text>
        <Text style={styles.emptyText}>
          Check back later for new people to bid on!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Date</Text>
      </View>

      <View style={styles.cardContainer}>
        {people.slice(currentIndex, currentIndex + 2).map((person) => (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingBottom: 80,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  cardContainer: {
    flex: 1,
    position: 'relative',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyText: {
    color: '#4b5563',
    textAlign: 'center',
  },
});
