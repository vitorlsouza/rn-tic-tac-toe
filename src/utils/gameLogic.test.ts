import { calculateWinner, isBoardFull, findBestMove, minimax } from './gameLogic';
import { PLAYER_X, PLAYER_O } from '@/constants';

describe('Game Logic', () => {
  describe('calculateWinner', () => {
    it('should return null for an empty board', () => {
      const board = Array(9).fill(null);
      expect(calculateWinner(board)).toBeNull();
    });

    it('should return null when there is no winner', () => {
      const board = [
        PLAYER_X,
        PLAYER_O,
        PLAYER_X,
        PLAYER_O,
        PLAYER_X,
        PLAYER_O,
        PLAYER_O,
        PLAYER_X,
        PLAYER_O,
      ];
      expect(calculateWinner(board)).toBeNull();
    });

    it('should detect a winner in a horizontal line', () => {
      const board = [PLAYER_X, PLAYER_X, PLAYER_X, PLAYER_O, PLAYER_O, null, null, null, null];
      expect(calculateWinner(board)).toBe(PLAYER_X);
    });

    it('should detect a winner in a vertical line', () => {
      const board = [PLAYER_O, PLAYER_X, null, PLAYER_O, PLAYER_X, null, PLAYER_O, null, null];
      expect(calculateWinner(board)).toBe(PLAYER_O);
    });

    it('should detect a winner in a diagonal line', () => {
      const board = [PLAYER_X, null, null, PLAYER_O, PLAYER_X, null, PLAYER_O, null, PLAYER_X];
      expect(calculateWinner(board)).toBe(PLAYER_X);
    });
  });

  describe('isBoardFull', () => {
    it('should return false for an empty board', () => {
      const board = Array(9).fill(null);
      expect(isBoardFull(board)).toBe(false);
    });

    it('should return true for a completely filled board', () => {
      const board = [
        PLAYER_X,
        PLAYER_O,
        PLAYER_X,
        PLAYER_O,
        PLAYER_X,
        PLAYER_O,
        PLAYER_O,
        PLAYER_X,
        PLAYER_O,
      ];
      expect(isBoardFull(board)).toBe(true);
    });
  });

  describe('minimax', () => {
    it('should return a positive score when O can win', () => {
      const board = [PLAYER_O, PLAYER_O, null, PLAYER_X, PLAYER_X, null, null, null, null];

      const score = minimax(board, 0, true);
      expect(score).toBeGreaterThan(0);
    });

    it('should return a negative score when X can win', () => {
      const board = [PLAYER_X, PLAYER_X, null, PLAYER_O, null, null, null, null, null];

      const score = minimax(board, 0, false);
      expect(score).toBeLessThan(0);
    });

    it('should return 0 for a tie game', () => {
      const board = [
        PLAYER_X,
        PLAYER_O,
        PLAYER_X,
        PLAYER_X,
        PLAYER_O,
        PLAYER_X,
        PLAYER_O,
        PLAYER_X,
        PLAYER_O,
      ];
      const score = minimax(board, 0, true);
      expect(score).toBe(0);
    });
  });

  describe('findBestMove', () => {
    it('should find a winning move for O', () => {
      const board = [PLAYER_O, PLAYER_O, null, PLAYER_X, PLAYER_X, null, null, null, null];

      expect(findBestMove(board)).toBe(2);
    });

    it('should block a winning move for X', () => {
      const board = [PLAYER_X, PLAYER_X, null, null, PLAYER_O, null, null, null, null];

      expect(findBestMove(board)).toBe(2);
    });

    it('should return -1 for a full board', () => {
      const board = [
        PLAYER_X,
        PLAYER_O,
        PLAYER_X,
        PLAYER_O,
        PLAYER_X,
        PLAYER_O,
        PLAYER_O,
        PLAYER_X,
        PLAYER_O,
      ];
      expect(findBestMove(board)).toBe(-1);
    });
  });
});
