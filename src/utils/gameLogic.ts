import { BoardState, Player } from '@/types';
import { PLAYER_X, PLAYER_O } from '@/constants';

export const calculateWinner = (squares: BoardState): Player | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] as Player;
    }
  }

  return null;
};

export const isBoardFull = (board: BoardState): boolean => {
  return !board.includes(null);
};

export const minimax = (board: BoardState, depth: number, isMaximizing: boolean): number => {
  const winner = calculateWinner(board);

  // Terminal states
  if (winner === PLAYER_X) return -10 + depth;
  if (winner === PLAYER_O) return 10 - depth;
  if (isBoardFull(board)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = PLAYER_O;
        const score = minimax(newBoard, depth + 1, false);
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = PLAYER_X;
        const score = minimax(newBoard, depth + 1, true);
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

export const findBestMove = (board: BoardState): number => {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const newBoard = [...board];
      newBoard[i] = PLAYER_O;
      const score = minimax(newBoard, 0, false);

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
};
