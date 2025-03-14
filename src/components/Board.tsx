import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Square } from './Square';
import { Player } from '@/types';

type BoardProps = {
  board: (Player | null)[];
  onSquarePress: (index: number) => void;
  disabled: boolean;
};

export const Board: React.FC<BoardProps> = ({ board, onSquarePress, disabled }) => {
  const [boardKey, setBoardKey] = useState<number>(0);

  useEffect(() => {
    if (board.every((square) => square === null)) {
      setBoardKey((prev) => prev + 1);
    }
  }, [board]);

  const renderSquare = (index: number) => {
    return (
      <View key={`${boardKey}-${index}`}>
        <Square
          value={board[index]}
          onPress={() => onSquarePress(index)}
          disabled={disabled || board[index] !== null}
          index={index}
        />
      </View>
    );
  };

  return (
    <View style={styles.board} key={`board-${boardKey}`}>
      <View style={styles.row}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.row}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.row}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
  },
});
