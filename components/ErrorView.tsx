import { View, Text, StyleSheet } from 'react-native';

interface ErrorViewProps {
  error: string;
}

export function ErrorView({ error }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Error: {error}</Text>
      <Text style={styles.helpText}>
        Make sure your Supabase credentials are configured in .env.local
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
  },
});
