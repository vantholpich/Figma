import { useState } from 'react';
import { ViewType, Person } from './types';
import { usePeople } from './hooks/usePeople';
import { useBids } from './hooks/useBids';
import { AuctionsView } from './components/AuctionsView';
import { ProfileView } from './components/ProfileView';
import { MyBidsView } from './components/MyBidsView';
import { UserProfileView } from './components/UserProfileView';
import { BottomNavigation } from './components/BottomNavigation';
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('auctions');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  
  // TODO: Replace with actual user authentication
  const userId = 'demo-user-id';
  
  const { people, loading, error } = usePeople();
  const { placeBid } = useBids(userId);

  const handlePersonSelect = (person: Person) => {
    setSelectedPerson(person);
  };

  const handleBackToAuctions = () => {
    setSelectedPerson(null);
  };

  const handlePlaceBid = async (amount: number, message?: string) => {
    if (!selectedPerson) return;
    
    const result = await placeBid(selectedPerson.id, amount, message);
    
    if (result.success) {
      toast.success('Bid placed successfully!');
      setSelectedPerson(null);
    } else {
      toast.error(result.error || 'Failed to place bid');
    }
  };

  const handleMessage = () => {
    toast.info('Message sent!');
  };

  // If a person is selected, show their profile
  if (selectedPerson) {
    return (
      <ProfileView
        person={selectedPerson}
        onBack={handleBackToAuctions}
        onPlaceBid={handlePlaceBid}
        onMessage={handleMessage}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <p className="mt-2 text-sm text-gray-600">Make sure your Supabase credentials are configured in .env.local</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
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

      {/* Bottom Navigation */}
      <BottomNavigation
        currentView={currentView}
        onViewChange={setCurrentView}
      />
    </div>
  );
}