import { useState } from 'react';
import { View } from 'react-native';
import { ViewType, Person } from '../types';
import { usePeople } from '../hooks/usePeople';
import { useBids } from '../hooks/useBids';
import { AuctionsView } from '../components/AuctionsView';
import { MyBidsView } from '../components/MyBidsView';
import { UserProfileView } from '../components/UserProfileView';
import { BottomNavigation } from '../components/BottomNavigation';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';
import { useRouter } from 'expo-router';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('auctions');
  const router = useRouter();
  
  // TODO: Replace with actual user authentication
  const userId = 'demo-user-id';
  
  const { people, loading, error } = usePeople();
  const { placeBid } = useBids(userId);

  const handlePersonSelect = (person: Person) => {
    router.push(`/profile/${person.id}`);
  };

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView error={error} />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      {currentView === 'auctions' && (
        <AuctionsView
          people={people}
          onPersonSelect={handlePersonSelect}
        />
      )}
      
      {currentView === 'my-bids' && (
        <MyBidsView
          people={people}
          onPersonSelect={handlePersonSelect}
        />
      )}
      
      {currentView === 'profile' && <UserProfileView />}

      <BottomNavigation
        currentView={currentView}
        onViewChange={setCurrentView}
      />
    </View>
  );
}
