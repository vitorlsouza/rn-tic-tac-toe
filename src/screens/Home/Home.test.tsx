import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Home } from '@/screens/Home';

jest.mock('@/hooks/useOrientation', () => ({
  useOrientation: () => ({ isLandscape: false, loading: false }),
}));

describe('Home Screen', () => {
  it('renders correctly with title and subtitle', () => {
    const onStartGameMock = jest.fn();
    const { getByText } = render(<Home onStartGame={onStartGameMock} />);

    expect(getByText('Tic Tac Toe')).toBeTruthy();
    expect(getByText('Who goes first?')).toBeTruthy();
  });

  it('renders both game start options', () => {
    const onStartGameMock = jest.fn();
    const { getByText } = render(<Home onStartGame={onStartGameMock} />);

    expect(getByText('I go first')).toBeTruthy();
    expect(getByText('Computer goes first')).toBeTruthy();
  });

  it('calls onStartGame with true when player chooses to go first', () => {
    const onStartGameMock = jest.fn();
    const { getByTestId, debug } = render(<Home onStartGame={onStartGameMock} />);

    fireEvent.press(getByTestId('button-I go first'));

    expect(onStartGameMock).toHaveBeenCalledWith(true);
  });

  it('calls onStartGame with false when player chooses computer to go first', () => {
    const onStartGameMock = jest.fn();
    const { getByTestId } = render(<Home onStartGame={onStartGameMock} />);

    fireEvent.press(getByTestId('button-Computer goes first'));

    expect(onStartGameMock).toHaveBeenCalledWith(false);
  });

  it('renders correctly in landscape mode', () => {
    jest.spyOn(require('@/hooks/useOrientation'), 'useOrientation').mockReturnValue({
      isLandscape: true,
      loading: false,
    });

    const onStartGameMock = jest.fn();
    const { getByText } = render(<Home onStartGame={onStartGameMock} />);

    expect(getByText('Tic Tac Toe')).toBeTruthy();
    expect(getByText('Who goes first?')).toBeTruthy();
    expect(getByText('I go first')).toBeTruthy();
    expect(getByText('Computer goes first')).toBeTruthy();
  });
});
