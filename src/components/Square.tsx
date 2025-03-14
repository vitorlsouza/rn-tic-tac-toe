import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '@/theme';

type SquareProps = {
  value: string | null;
  onPress: () => void;
  disabled?: boolean;
  index: number;
};

export const Square: React.FC<SquareProps> = ({ value, onPress, disabled = false, index }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={disabled}>
      <View style={styles.square}>
        <Text style={styles.squareText}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    width: 90,
    height: 90,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  squareText: {
    fontSize: theme.typography.fontSize.title,
    fontFamily: theme.typography.fontFamily.bold,
  },
});
