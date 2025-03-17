import { calculateWinner, findBestMove, isBoardFull } from '@/utils/gameLogic';
import { GameState, BoardState } from '@/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PLAYER_X, PLAYER_O } from '@/constants';

export const useGame = (playerFirst: boolean) => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [gameState, setGameState] = useState<GameState>('playing');
  const [isPlayerTurn, setIsPlayerTurn] = useState(playerFirst);
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastMove, setLastMove] = useState<{ player: string | null; index: number | null }>({
    player: null,
    index: null,
  });

  const isBoardEmpty = useMemo(() => board.every((cell) => cell === null), [board]);

  const makeComputerMove = useCallback(() => {
    setIsComputerThinking(true);

    setTimeout(() => {
      const bestMove = findBestMove(board);
      if (bestMove !== -1) {
        setIsAnimating(true);
        const newBoard = [...board];
        newBoard[bestMove] = PLAYER_O;
        setBoard(newBoard);
        setLastMove({ player: PLAYER_O, index: bestMove });
        setIsPlayerTurn(true);
      }
      setIsComputerThinking(false);
    }, 500);
  }, [board]);

  const handleSquarePress = (index: number) => {
    if (!isPlayerTurn || board[index] || gameState !== 'playing' || isComputerThinking) return;

    setIsAnimating(true);
    const newBoard = [...board];
    newBoard[index] = PLAYER_X;
    setBoard(newBoard);
    setLastMove({ player: PLAYER_X, index });
    setIsPlayerTurn(false);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  const startNewGame = () => {
    setBoard(Array(9).fill(null));
    setGameState('playing');
    setIsPlayerTurn(playerFirst);
    setIsAnimating(false);
    setLastMove({ player: null, index: null });

    if (!playerFirst) {
      setTimeout(() => {
        setIsComputerThinking(false);
      }, 100);
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && !isPlayerTurn && !isComputerThinking && !isAnimating) {
      makeComputerMove();
    }
  }, [gameState, isPlayerTurn, board, isComputerThinking, isAnimating, makeComputerMove]);

  useEffect(() => {
    if (gameState === 'playing' && !isAnimating) {
      const winner = calculateWinner(board);

      if (winner) {
        if (winner === PLAYER_X) {
          setGameState('won');
          setScore({ ...score, player: score.player + 1 });
        } else if (winner === PLAYER_O && lastMove.player === PLAYER_O) {
          setGameState('lost');
          setScore({ ...score, computer: score.computer + 1 });
        }
      } else if (isBoardFull(board)) {
        setGameState('tie');
        setScore({ ...score, ties: score.ties + 1 });
      }
    }
  }, [board, gameState, score, isAnimating, lastMove]);

  return {
    board,
    gameState,
    isPlayerTurn,
    isComputerThinking,
    score,
    handleSquarePress,
    startNewGame,
    isBoardEmpty,
    handleAnimationComplete,
    lastMove,
  };
};
