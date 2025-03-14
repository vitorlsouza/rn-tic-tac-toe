import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Board } from '@/components/Board';
import { BoardState, GameState } from '@/types';
import { PLAYER_X, PLAYER_O } from '@/constants';
import { theme } from '@/theme';
import { Button } from '@/components/Button';
import { ScoreBoard } from '@/components/ScoreBoard';
import { calculateWinner, findBestMove, isBoardFull } from '@/utils/gameLogic';
import { GameOverModal } from '@/components/GameOverModal';

type GameProps = {
  playerFirst: boolean;
  onBackToHome: () => void;
};

export const Game: React.FC<GameProps> = ({ playerFirst, onBackToHome }) => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [gameState, setGameState] = useState<GameState>('playing');
  const [isPlayerTurn, setIsPlayerTurn] = useState(playerFirst);
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 });

  useEffect(() => {
    if (gameState === 'playing' && !isPlayerTurn && !isComputerThinking) {
      makeComputerMove();
    }
  }, [gameState, isPlayerTurn, board, isComputerThinking]);

  useEffect(() => {
    if (gameState === 'playing') {
      const winner = calculateWinner(board);

      if (winner) {
        if (winner === PLAYER_X) {
          setGameState('won');
          setScore({ ...score, player: score.player + 1 });
        } else {
          setGameState('lost');
          setScore({ ...score, computer: score.computer + 1 });
        }
      } else if (isBoardFull(board)) {
        setGameState('tie');
        setScore({ ...score, ties: score.ties + 1 });
      }
    }
  }, [board]);

  const handleSquarePress = (index: number) => {
    if (!isPlayerTurn || board[index] || gameState !== 'playing' || isComputerThinking) return;

    const newBoard = [...board];
    newBoard[index] = PLAYER_X;
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const makeComputerMove = () => {
    setIsComputerThinking(true);

    setTimeout(() => {
      const bestMove = findBestMove(board);
      if (bestMove !== -1) {
        const newBoard = [...board];
        newBoard[bestMove] = PLAYER_O;
        setBoard(newBoard);
        setIsPlayerTurn(true);
      }
      setIsComputerThinking(false);
    }, 500);
  };

  const startNewGame = () => {
    setBoard(Array(9).fill(null));
    setGameState('playing');
    setIsPlayerTurn(playerFirst);

    if (!playerFirst) {
      setTimeout(() => {
        setIsComputerThinking(false);
      }, 100);
    }
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
