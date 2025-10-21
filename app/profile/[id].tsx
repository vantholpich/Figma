import { useLocalSearchParams, useRouter } from 'expo-router';
import { ProfileView } from '../../components/ProfileView';
import { usePeople } from '../../hooks/usePeople';
import { useBids } from '../../hooks/useBids';
import { LoadingView } from '../../components/LoadingView';
import { Alert } from 'react-native';

export default function ProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { people, loading } = usePeople();
  const { placeBid } = useBids('demo-user-id');

  const person = people.find(p => p.id === id);

  const handleBack = () => {
    router.back();
  };

  const handlePlaceBid = async (amount: number, message?: string) => {
    if (!person) return;

    const result = await placeBid(person.id, amount, message);

    if (result.success) {
      Alert.alert('Success', 'Bid placed successfully!');
      router.back();
    } else {
      Alert.alert('Error', result.error || 'Failed to place bid');
    }
  };

  const handleMessage = () => {
    Alert.alert('Info', 'Message sent!');
  };

  if (loading || !person) {
    return <LoadingView />;
  }

  return (
    <ProfileView
      person={person}
      onBack={handleBack}
      onPlaceBid={handlePlaceBid}
      onMessage={handleMessage}
    />
  );
}
