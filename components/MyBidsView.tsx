import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { Calendar, DollarSign, Clock } from 'lucide-react-native';
import { Person } from '../types';

interface MyBidsViewProps {
  people: Person[];
  onPersonSelect: (person: Person) => void;
}

export function MyBidsView({ people, onPersonSelect }: MyBidsViewProps) {
  // Mock bid data - in a real app this would come from a backend
  const myBids = [
    { person: people[0], amount: 150, status: 'winning', timeLeft: '2h 15m' },
    { person: people[1], amount: 120, status: 'outbid', timeLeft: '5h 30m' },
    { person: people[2], amount: 200, status: 'winning', timeLeft: '1d 3h' },
  ];

  return (
    <View className="flex-1 bg-gray-50 pb-20">
      {/* Header */}
      <View className="bg-white px-6 py-4 pt-12 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">My Bids</Text>
        <Text className="text-gray-600 mt-1">{myBids.length} active bids</Text>
      </View>

      {/* Bids List */}
      <ScrollView className="px-6 py-4">
        {myBids.length === 0 ? (
          <View className="items-center py-12">
            <Calendar size={64} color="#d1d5db" />
            <Text className="text-xl font-semibold text-gray-600 mb-2 mt-4">No bids yet</Text>
            <Text className="text-gray-500">Start bidding on auctions to see them here!</Text>
          </View>
        ) : (
          <View className="gap-4">
            {myBids.map((bid, index) => (
              <Pressable
                key={index}
                onPress={() => onPersonSelect(bid.person)}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                <View className="flex-row items-center gap-4">
                  <View className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200">
                    <Image
                      source={{ uri: bid.person.image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                  
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="font-semibold text-lg">
                        {bid.person.name}, {bid.person.age}
                      </Text>
                      <View
                        className={`px-2 py-1 rounded-full ${
                          bid.status === 'winning' ? 'bg-green-100' : 'bg-red-100'
                        }`}
                      >
                        <Text
                          className={`text-xs font-medium ${
                            bid.status === 'winning' ? 'text-green-700' : 'text-red-700'
                          }`}
                        >
                          {bid.status === 'winning' ? 'Winning' : 'Outbid'}
                        </Text>
                      </View>
                    </View>
                    
                    <View className="flex-row items-center gap-4">
                      <View className="flex-row items-center gap-1">
                        <DollarSign size={16} color="#6b7280" />
                        <Text className="text-sm text-gray-600">${bid.amount}</Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <Clock size={16} color="#6b7280" />
                        <Text className="text-sm text-gray-600">{bid.timeLeft} left</Text>
                      </View>
                    </View>
                    
                    <Text className="text-sm text-gray-500 mt-1" numberOfLines={1}>
                      {bid.person.bio}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
