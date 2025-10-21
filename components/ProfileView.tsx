import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { ArrowLeft, MessageCircle, DollarSign } from 'lucide-react-native';
import { Person } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfileViewProps {
  person: Person;
  onBack: () => void;
  onPlaceBid: (amount: number, message?: string) => void;
  onMessage: () => void;
}

export function ProfileView({ person, onBack, onPlaceBid, onMessage }: ProfileViewProps) {
  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="relative">
          <View className="h-80 rounded-b-3xl overflow-hidden">
            <Image
              source={{ uri: person.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-black/30" />
          </View>
          
          <Pressable
            onPress={onBack}
            className="absolute top-12 left-6 w-10 h-10 bg-white/20 rounded-full items-center justify-center"
          >
            <ArrowLeft size={20} color="#ffffff" />
          </Pressable>
          
          <View className="absolute bottom-6 left-6">
            <Text className="text-3xl font-bold text-white">
              {person.name}, {person.age}
            </Text>
            <Text className="text-white/90">{person.auctionedBy}</Text>
          </View>
        </View>

        <View className="px-6 py-6 gap-6">
          {/* About Section */}
          <View>
            <Text className="text-xl font-semibold mb-3">About {person.name}</Text>
            <Text className="text-gray-700 leading-relaxed">{person.about}</Text>
          </View>

          {/* Occupation */}
          <View>
            <Text className="font-semibold mb-2">Occupation</Text>
            <Text className="text-gray-700">{person.occupation}</Text>
          </View>

          {/* Pros */}
          <View>
            <Text className="font-semibold mb-3">Pros</Text>
            <View className="gap-2">
              {person.pros.map((pro, index) => (
                <View key={index} className="flex-row items-center gap-2">
                  <View className="w-2 h-2 bg-green-500 rounded-full" />
                  <Text className="text-gray-700">{pro}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Cons */}
          <View>
            <Text className="font-semibold mb-3">Cons</Text>
            <View className="gap-2">
              {person.cons.map((con, index) => (
                <View key={index} className="flex-row items-center gap-2">
                  <View className="w-2 h-2 bg-red-500 rounded-full" />
                  <Text className="text-gray-700">{con}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Interests */}
          <View>
            <Text className="font-semibold mb-3">Interests</Text>
            <View className="flex-row flex-wrap gap-2">
              {person.interests.map((interest, index) => (
                <View key={index} className="bg-pink-100 px-3 py-1.5 rounded-full">
                  <Text className="text-pink-700 text-sm">{interest}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Photo Gallery */}
          <View>
            <Text className="font-semibold mb-3">Photo Gallery</Text>
            <View className="flex-row flex-wrap gap-3">
              {person.gallery.map((photo, index) => (
                <View key={index} className="w-[48%] aspect-square rounded-2xl overflow-hidden bg-gray-200">
                  <Image
                    source={{ uri: photo }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Testimonials */}
          <View className="pb-24">
            <Text className="font-semibold mb-3">Testimonials</Text>
            <View className="gap-4">
              {person.testimonials.map((testimonial, index) => (
                <View key={index} className="bg-white p-4 rounded-2xl shadow-sm">
                  <View className="flex-row items-center gap-3 mb-3">
                    <View className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        source={{ uri: testimonial.avatar }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>
                    <Text className="font-medium">{testimonial.name}</Text>
                  </View>
                  <Text className="text-gray-700 italic">"{testimonial.text}"</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
        <View className="flex-row gap-3">
          <Pressable
            onPress={onMessage}
            className="flex-1 border border-gray-300 rounded-lg py-3 flex-row items-center justify-center"
          >
            <MessageCircle size={16} color="#6b7280" />
            <Text className="ml-2 font-medium">Message</Text>
          </Pressable>
          <Pressable
            onPress={() => onPlaceBid(100)}
            className="flex-1 bg-pink-500 rounded-lg py-3 flex-row items-center justify-center"
          >
            <DollarSign size={16} color="#ffffff" />
            <Text className="ml-2 font-medium text-white">Place Bid</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
