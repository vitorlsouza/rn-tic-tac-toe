import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { Home } from '@/screens/Home';
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';
import { Text } from 'react-native';
import { Game } from '@/screens/Game';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  const [gameStarted, setGameStarted] = useState(false);
  const [playerFirst, setPlayerFirst] = useState(true);

  const onStartGame = (playerFirst: boolean) => {
    setGameStarted(true);
    setPlayerFirst(playerFirst);
  };

  const onBackToHome = () => {
    setGameStarted(false);
    setPlayerFirst(true);
  };

  return (
    <>
      {fontsLoaded ? (
        gameStarted ? (
          <Game playerFirst={playerFirst} onBackToHome={onBackToHome} />
        ) : (
          <Home onStartGame={onStartGame} />
        )
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
}
