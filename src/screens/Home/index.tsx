import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Button } from '@/components/Button';
import { theme } from '@/theme';
import { useOrientation } from '@/hooks/useOrientation';
import LottieView from 'lottie-react-native';

const createColorFilter = (keypath: string, color: string) => ({ keypath, color });

const GRID_LINES = ['Line 1', 'Line 2', 'Line 3', 'Line 4'].map((line) =>
  createColorFilter(line, theme.colors.text.primary),
);

const X_SYMBOLS = ['x1', 'x2', 'x3'].map((x) => createColorFilter(x, theme.colors.playerX));

const O_SYMBOLS = ['o1', 'o2', 'o3'].map((o) => createColorFilter(o, theme.colors.playerO));

const LOGO_COLOR_FILTERS = [...GRID_LINES, ...X_SYMBOLS, ...O_SYMBOLS];

type HomeProps = {
  onStartGame: (playerFirst: boolean) => void;
};

export const Home: React.FC<HomeProps> = ({ onStartGame }) => {
  const { isLandscape } = useOrientation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={isLandscape ? styles.landscapeLayout : styles.portraitLayout}>
        <View style={isLandscape ? styles.leftColumn : styles.topSection}>
          <View style={styles.logoContainer}>
            <LottieView
              source={require('@/assets/animations/logo.json')}
              autoPlay
              loop
              style={styles.logo}
              colorFilters={LOGO_COLOR_FILTERS}
            />
          </View>
          <Text style={styles.title}>Tic Tac Toe</Text>
          <Text style={styles.subtitle}>Who goes first?</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            testID="button-I go first"
            title="I go first"
            onPress={() => onStartGame(true)}
            style={styles.button}
          />
          <Button
            testID="button-Computer goes first"
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
  logoContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '70%',
    height: '70%',
  },
  title: {
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.title,
    marginBottom: 16,
  },
  subtitle: {
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xlarge,
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
