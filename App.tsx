import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet, Platform } from 'react-native';
import { Home } from '@/screens/Home';
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';
import { Text } from 'react-native';
import { Game } from '@/screens/Game';
import * as ScreenOrientation from 'expo-screen-orientation';
import { theme } from '@/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  const [gameStarted, setGameStarted] = useState(false);
  const [playerFirst, setPlayerFirst] = useState(true);

  useEffect(() => {
    const setupOrientation = async () => {
      try {
        await ScreenOrientation.unlockAsync();
      } catch (error) {
        console.error('Error unlocking orientation:', error);
      }
    };

    setupOrientation();
  }, []);

  const onStartGame = (playerFirst: boolean) => {
    setGameStarted(true);
    setPlayerFirst(playerFirst);
  };

  const onBackToHome = () => {
    setGameStarted(false);
    setPlayerFirst(true);
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={Platform.OS === 'android'}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={Platform.OS === 'android'}
      />
      {gameStarted ? (
        <Game playerFirst={playerFirst} onBackToHome={onBackToHome} />
      ) : (
        <Home onStartGame={onStartGame} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    color: theme.colors.text.primary,
    fontFamily: 'System',
    fontSize: 18,
  },
});
