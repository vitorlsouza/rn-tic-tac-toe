import { renderHook, act } from '@testing-library/react-native';
import { useGame } from './useGame';
import { PLAYER_X, PLAYER_O } from '@/constants';
import * as gameLogic from '@/utils/gameLogic';

jest.mock('@/utils/gameLogic', () => ({
  calculateWinner: jest.fn(),
  isBoardFull: jest.fn(),
  findBestMove: jest.fn(),
  minimax: jest.fn(),
}));

const gameLogicMock = jest.requireMock('@/utils/gameLogic');

describe('useGame Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    gameLogicMock.calculateWinner.mockReturnValue(null);
    gameLogicMock.isBoardFull.mockReturnValue(false);
    gameLogicMock.findBestMove.mockReturnValue(4); // Center square
  });

  it('initializes with correct state when player goes first', () => {
    const { result } = renderHook(() => useGame(true));

    expect(result.current.board).toEqual(Array(9).fill(null));
    expect(result.current.gameState).toBe('playing');
    expect(result.current.isPlayerTurn).toBe(true);
    expect(result.current.isComputerThinking).toBe(false);
    expect(result.current.score).toEqual({ player: 0, computer: 0, ties: 0 });
  });

  it('initializes with correct state when computer goes first', () => {
    const { result } = renderHook(() => useGame(false));

    expect(result.current.board).toEqual(Array(9).fill(null));
    expect(result.current.gameState).toBe('playing');
    expect(result.current.isPlayerTurn).toBe(false);
    expect(result.current.isComputerThinking).toBe(true);
    expect(result.current.score).toEqual({ player: 0, computer: 0, ties: 0 });
  });

  it('handles player move correctly', () => {
    const { result } = renderHook(() => useGame(true));

    act(() => {
      result.current.handleSquarePress(0);
    });

    expect(result.current.board[0]).toBe(PLAYER_X);
    expect(result.current.isPlayerTurn).toBe(false);
  });

  it('updates game state when player wins', () => {
    gameLogicMock.calculateWinner.mockImplementation((board: any) => {
      if (board[0] === PLAYER_X && board[1] === PLAYER_X && board[2] === PLAYER_X) {
        return PLAYER_X;
      }
      return null;
    });

    const { result } = renderHook(() => useGame(true));

    act(() => {
      result.current.board[0] = PLAYER_X;
      result.current.board[1] = PLAYER_X;
      result.current.board[2] = PLAYER_X;

      result.current.handleSquarePress(3);
    });

    expect(result.current.gameState).toBe('won');
    expect(result.current.score.player).toBe(1);
  });

  it('updates game state when computer wins', () => {
    gameLogicMock.calculateWinner.mockImplementation((board: any) => {
      if (board[0] === PLAYER_O && board[1] === PLAYER_O && board[2] === PLAYER_O) {
        return PLAYER_O;
      }
      return null;
    });

    const { result } = renderHook(() => useGame(true));

    act(() => {
      result.current.board[0] = PLAYER_O;
      result.current.board[1] = PLAYER_O;
      result.current.board[2] = PLAYER_O;

      result.current.handleSquarePress(3);
    });

    expect(result.current.gameState).toBe('lost');
    expect(result.current.score.computer).toBe(1);
  });

  it('updates game state when there is a tie', () => {
    gameLogicMock.isBoardFull.mockReturnValue(true);

    const { result } = renderHook(() => useGame(true));

    act(() => {
      result.current.handleSquarePress(0);
    });

    expect(result.current.gameState).toBe('tie');
    expect(result.current.score.ties).toBe(1);
  });

  it('resets the game state when startNewGame is called', () => {
    const { result } = renderHook(() => useGame(true));

    act(() => {
      result.current.handleSquarePress(0);
      result.current.board[1] = PLAYER_O;
      result.current.isPlayerTurn = true;
    });

    act(() => {
      result.current.startNewGame();
    });

    expect(result.current.board).toEqual(Array(9).fill(null));
    expect(result.current.gameState).toBe('playing');
    expect(result.current.isPlayerTurn).toBe(true);
  });
});
