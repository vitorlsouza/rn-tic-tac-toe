import { theme } from '@/theme';
import { StyleSheet, Text, View } from 'react-native';

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
});
