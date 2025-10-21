import { View, Text } from 'react-native';

interface ErrorViewProps {
  error: string;
}

export function ErrorView({ error }: ErrorViewProps) {
  return (
    <View className="flex-1 bg-gray-50 items-center justify-center px-6">
      <Text className="text-red-600 text-center mb-2">Error: {error}</Text>
      <Text className="text-sm text-gray-600 text-center">
        Make sure your Supabase credentials are configured in .env.local
      </Text>
    </View>
  );
}
