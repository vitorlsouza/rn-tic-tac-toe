import React from 'react';
import { render } from '@testing-library/react-native';
import { Game } from '@/screens/Game';

jest.mock('@/hooks/useOrientation', () => ({
  useOrientation: () => ({ isLandscape: false, loading: false }),
}));

describe('Game Screen', () => {
  it('renders correctly when player goes first', () => {
    const onBackToHomeMock = jest.fn();
    const { getByText, getByTestId } = render(
      <Game playerFirst={true} onBackToHome={onBackToHomeMock} />,
    );

    expect(getByText('Tic Tac Toe')).toBeTruthy();
    expect(getByText('Your turn')).toBeTruthy();

    expect(getByTestId('board-component')).toBeTruthy();
    expect(getByTestId('score-board-component')).toBeTruthy();
  });

  it('renders correctly when computer goes first', () => {
    const onBackToHomeMock = jest.fn();
    const { getByText, getByTestId } = render(
      <Game playerFirst={false} onBackToHome={onBackToHomeMock} />,
    );

    expect(getByText('Tic Tac Toe')).toBeTruthy();
    expect(getByText('Computer turn')).toBeTruthy();

    expect(getByTestId('board-component')).toBeTruthy();
    expect(getByTestId('score-board-component')).toBeTruthy();
  });

  it('renders correctly in landscape mode', () => {
    jest.spyOn(require('@/hooks/useOrientation'), 'useOrientation').mockReturnValue({
      isLandscape: true,
      loading: false,
    });

    const onBackToHomeMock = jest.fn();
    const { getByText, getByTestId } = render(
      <Game playerFirst={true} onBackToHome={onBackToHomeMock} />,
    );

    expect(getByText('Tic Tac Toe')).toBeTruthy();
    expect(getByText('Your turn')).toBeTruthy();

    expect(getByTestId('board-component')).toBeTruthy();
    expect(getByTestId('score-board-component')).toBeTruthy();
  });

  it('shows loading state when orientation is loading', () => {
    jest.spyOn(require('@/hooks/useOrientation'), 'useOrientation').mockReturnValue({
      isLandscape: false,
      loading: true,
    });

    const onBackToHomeMock = jest.fn();
    const { getByText } = render(<Game playerFirst={true} onBackToHome={onBackToHomeMock} />);

    expect(getByText('Loading...')).toBeTruthy();
  });
});
