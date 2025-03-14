import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Board } from '@/components/Board';
import { BoardState, GameState } from '@/types';
import { PLAYER } from '@/constants';
import { theme } from '@/theme';
import { Button } from '@/components/Button';

type GameProps = {
  playerFirst: boolean;
  onBackToHome: () => void;
};

export const Game: React.FC<GameProps> = ({ playerFirst, onBackToHome }) => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [gameState, setGameState] = useState<GameState>('start');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  const handleSquarePress = (index: number) => {
    if (!isPlayerTurn || board[index] || gameState !== 'playing' || isComputerThinking) return;

    const newBoard = [...board];
    newBoard[index] = PLAYER;
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  return (
    <View style={styles.container}>
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
});
