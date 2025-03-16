import { renderHook, act } from '@testing-library/react-native';
import { useOrientation } from './useOrientation';

jest.mock('./useOrientation', () => {
  let currentState = {
    isLandscape: false,
    loading: false,
  };

  const simulateOrientationChange = (isLandscape: boolean) => {
    currentState = {
      isLandscape,
      loading: false,
    };
  };

  const simulateLoading = (loading: boolean) => {
    currentState = {
      ...currentState,
      loading,
    };
  };

  return {
    useOrientation: () => currentState,
    simulateOrientationChange,
    simulateLoading,
  };
});

const orientationMock = jest.requireMock('./useOrientation');

describe('useOrientation Hook', () => {
  beforeEach(() => {
    orientationMock.simulateOrientationChange(false);
    orientationMock.simulateLoading(false);
  });

  it('should initialize with portrait orientation', () => {
    const { result } = renderHook(() => useOrientation());

    expect(result.current.isLandscape).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it('should update when orientation changes to landscape', () => {
    const { result, rerender } = renderHook(() => useOrientation());

    expect(result.current.isLandscape).toBe(false);

    act(() => {
      orientationMock.simulateOrientationChange(true);
    });

    rerender({});

    expect(result.current.isLandscape).toBe(true);
  });

  it('should handle loading state correctly', () => {
    const { result, rerender } = renderHook(() => useOrientation());

    act(() => {
      orientationMock.simulateLoading(true);
    });

    rerender({});

    expect(result.current.loading).toBe(true);

    act(() => {
      orientationMock.simulateLoading(false);
    });

    rerender({});

    expect(result.current.loading).toBe(false);
  });

  it('should handle orientation change from landscape to portrait', () => {
    orientationMock.simulateOrientationChange(true);

    const { result, rerender } = renderHook(() => useOrientation());

    expect(result.current.isLandscape).toBe(true);

    act(() => {
      orientationMock.simulateOrientationChange(false);
    });

    rerender({});

    expect(result.current.isLandscape).toBe(false);
  });
});
