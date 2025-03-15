import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Button } from '@/components/Button';
import { theme } from '@/theme';
import { useOrientation } from '@/hooks/useOrientation';

type HomeProps = {
  onStartGame: (playerFirst: boolean) => void;
};

export const Home: React.FC<HomeProps> = ({ onStartGame }) => {
  const { isLandscape } = useOrientation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={isLandscape ? styles.landscapeLayout : styles.portraitLayout}>
        <View style={isLandscape ? styles.leftColumn : styles.topSection}>
          <Text style={styles.title}>Tic Tac Toe</Text>
          <Text style={styles.subtitle}>Who goes first?</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="I go first" onPress={() => onStartGame(true)} style={styles.button} />
          <Button
            title="Computer goes first"
            onPress={() => onStartGame(false)}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  portraitLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  landscapeLayout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  leftColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
  },
  title: {
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xxlarge,
    marginBottom: 16,
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
    width: '100%',
  },
});
