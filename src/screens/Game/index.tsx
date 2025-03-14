import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Board } from '@/components/Board';
import { BoardState, GameState } from '@/types';
import { PLAYER_X } from '@/constants';
import { theme } from '@/theme';
import { Button } from '@/components/Button';
import { ScoreBoard } from '@/components/ScoreBoard';

type GameProps = {
  playerFirst: boolean;
  onBackToHome: () => void;
};

export const Game: React.FC<GameProps> = ({ playerFirst, onBackToHome }) => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [gameState, setGameState] = useState<GameState>('playing');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 });

  const handleSquarePress = (index: number) => {
    if (!isPlayerTurn || board[index] || gameState !== 'playing' || isComputerThinking) return;

    const newBoard = [...board];
    newBoard[index] = PLAYER_X;
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

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
