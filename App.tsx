import React from 'react';
import { StatusBar } from 'react-native';
import { Home } from '@/screens/Home';
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';
import { Text } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  return (
    <>
      {fontsLoaded ? <Home /> : <Text>Loading...</Text>}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </>
  );
}
