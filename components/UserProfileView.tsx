import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { Settings, Edit, Heart, Users, DollarSign } from 'lucide-react-native';

export function UserProfileView() {
  return (
    <View className="flex-1 bg-gray-50 pb-20">
      <ScrollView>
        {/* Header */}
        <View className="bg-gradient-to-br from-pink-500 to-red-500 px-6 py-8 pt-12">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-2xl font-bold text-white">Profile</Text>
            <Pressable className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
              <Settings size={20} color="#ffffff" />
            </Pressable>
          </View>
          
          <View className="flex-row items-center gap-4">
            <View className="w-20 h-20 rounded-full overflow-hidden bg-white/20">
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE4NzcxMnww&ixlib=rb-4.1.0&q=80&w=1080" }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View>
              <Text className="text-xl font-semibold text-white">Alex Johnson</Text>
              <Text className="text-white/90">Member since Jan 2024</Text>
            </View>
          </View>
        </View>

        <View className="px-6 py-6 gap-6">
          {/* Stats */}
          <View className="flex-row gap-4">
            <View className="flex-1 bg-white p-4 rounded-xl items-center">
              <Heart size={24} color="#ec4899" />
              <Text className="text-2xl font-bold mt-2">12</Text>
              <Text className="text-sm text-gray-600">Likes Given</Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-xl items-center">
              <DollarSign size={24} color="#22c55e" />
              <Text className="text-2xl font-bold mt-2">$450</Text>
              <Text className="text-sm text-gray-600">Total Bids</Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-xl items-center">
              <Users size={24} color="#3b82f6" />
              <Text className="text-2xl font-bold mt-2">3</Text>
              <Text className="text-sm text-gray-600">Matches</Text>
            </View>
          </View>

          {/* Actions */}
          <View className="gap-3">
            <Pressable className="bg-white border border-gray-200 rounded-xl p-4 flex-row items-center gap-3">
              <Edit size={20} color="#6b7280" />
              <Text className="font-medium">Edit Profile</Text>
            </Pressable>
            
            <Pressable className="bg-white border border-gray-200 rounded-xl p-4 flex-row items-center gap-3">
              <Users size={20} color="#6b7280" />
              <Text className="font-medium">Auction a Friend</Text>
            </Pressable>
            
            <Pressable className="bg-white border border-gray-200 rounded-xl p-4 flex-row items-center gap-3">
              <Heart size={20} color="#6b7280" />
              <Text className="font-medium">Liked Profiles</Text>
            </Pressable>
            
            <Pressable className="bg-white border border-gray-200 rounded-xl p-4 flex-row items-center gap-3">
              <Settings size={20} color="#6b7280" />
              <Text className="font-medium">Settings</Text>
            </Pressable>
          </View>

          {/* Recent Activity */}
          <View>
            <Text className="font-semibold mb-3">Recent Activity</Text>
            <View className="gap-3">
              <View className="flex-row items-center gap-3 p-3 bg-white rounded-xl">
                <View className="w-2 h-2 bg-green-500 rounded-full" />
                <Text className="text-sm flex-1">You won the auction for Sarah M.</Text>
                <Text className="text-xs text-gray-500">2h ago</Text>
              </View>
              <View className="flex-row items-center gap-3 p-3 bg-white rounded-xl">
                <View className="w-2 h-2 bg-blue-500 rounded-full" />
                <Text className="text-sm flex-1">New bid placed on Marcus L.</Text>
                <Text className="text-xs text-gray-500">5h ago</Text>
              </View>
              <View className="flex-row items-center gap-3 p-3 bg-white rounded-xl">
                <View className="w-2 h-2 bg-pink-500 rounded-full" />
                <Text className="text-sm flex-1">You liked Emma T.'s profile</Text>
                <Text className="text-xs text-gray-500">1d ago</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
