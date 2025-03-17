import { renderHook, act } from '@testing-library/react-native';
import { useGame } from './useGame';
import { PLAYER_X, PLAYER_O } from '@/constants';

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
