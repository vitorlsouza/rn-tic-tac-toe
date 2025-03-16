import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Board } from '@/components/Board';
import { theme } from '@/theme';
import { ScoreBoard } from '@/components/ScoreBoard';
import { GameOverModal } from '@/components/GameOverModal';
import { useGame } from '@/hooks/useGame';
import { useOrientation } from '@/hooks/useOrientation';

type GameProps = {
  playerFirst: boolean;
  onBackToHome: () => void;
};

export const Game: React.FC<GameProps> = ({ playerFirst, onBackToHome }) => {
  const { isLandscape, loading } = useOrientation();

  const {
    board,
    gameState,
    isPlayerTurn,
    isComputerThinking,
    score,
    handleSquarePress,
    startNewGame,
  } = useGame(playerFirst);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={isLandscape ? styles.landscapeLayout : styles.portraitLayout}>
        <View style={isLandscape ? styles.leftColumn : styles.topSection}>
          <Text style={[styles.title, isLandscape && styles.titleLandscape]}>Tic Tac Toe</Text>
          <ScoreBoard
            playerScore={score.player}
            computerScore={score.computer}
            tiesScore={score.ties}
          />
          <View style={styles.status}>
            <Text style={styles.statusText}>{isPlayerTurn ? 'Your turn' : 'Computer turn'}</Text>
          </View>
        </View>
        <View style={isLandscape ? styles.rightColumn : styles.bottomSection}>
          <Board
            board={board}
            onSquarePress={handleSquarePress}
            disabled={!isPlayerTurn || gameState !== 'playing' || isComputerThinking}
          />
        </View>
      </View>
      <GameOverModal
        testID="game-over-modal-component"
        gameState={gameState}
        onNewGame={startNewGame}
        onBackToHome={onBackToHome}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
  },
  portraitLayout: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  landscapeLayout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  topSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    flex: 0.4,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    flex: 0.6,
  },
  leftColumn: {
    flex: 0.4,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  rightColumn: {
    flex: 0.6,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  title: {
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xxlarge,
    marginBottom: 30,
    textAlign: 'center',
  },
  titleLandscape: {
    fontSize: theme.typography.fontSize.xlarge,
    marginBottom: 10,
  },
  status: {
    marginVertical: 20,
  },
  statusText: {
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.large,
  },
});
