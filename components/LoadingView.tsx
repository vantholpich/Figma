import { View, Text, ActivityIndicator } from 'react-native';

export function LoadingView() {
  return (
    <View className="flex-1 bg-gray-50 items-center justify-center">
      <ActivityIndicator size="large" color="#ec4899" />
      <Text className="mt-4 text-gray-600">Loading...</Text>
    </View>
  );
}
