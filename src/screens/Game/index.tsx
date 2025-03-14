import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Board } from '@/components/Board';
import { theme } from '@/theme';
import { Button } from '@/components/Button';
import { ScoreBoard } from '@/components/ScoreBoard';
import { GameOverModal } from '@/components/GameOverModal';
import { useGame } from '@/hooks/useGame';

type GameProps = {
  playerFirst: boolean;
  onBackToHome: () => void;
};

export const Game: React.FC<GameProps> = ({ playerFirst, onBackToHome }) => {
  const {
    board,
    gameState,
    isPlayerTurn,
    isComputerThinking,
    score,
    handleSquarePress,
    startNewGame,
  } = useGame(playerFirst);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <ScoreBoard
        playerScore={score.player}
        computerScore={score.computer}
        tiesScore={score.ties}
      />
      <Board
        board={board}
        onSquarePress={handleSquarePress}
        disabled={!isPlayerTurn || gameState !== 'playing' || isComputerThinking}
      />
      <Button
        title="Back to Home"
        onPress={onBackToHome}
        variant="secondary"
        style={styles.button}
      />
      <GameOverModal gameState={gameState} onNewGame={startNewGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 10,
  },
  title: {
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xxlarge,
    marginBottom: 30,
  },
});
