import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { theme } from '@/theme';

type HomeProps = {
  onStartGame: (playerFirst: boolean) => void;
};

export const Home: React.FC<HomeProps> = ({ onStartGame }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>

      <Text style={styles.subtitle}>Who goes first?</Text>

      <View style={styles.buttonContainer}>
        <Button title="I go first" onPress={() => onStartGame(true)} style={styles.button} />
        <Button
          title="Computer goes first"
          onPress={() => onStartGame(false)}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xxlarge,
    marginBottom: 16,
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.large,
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    marginBottom: 16,
  },
});
