import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '@/theme';
import { PLAYER_X } from '@/constants';
import { useOrientation } from '@/hooks/useOrientation';

type SquareProps = {
  value: string | null;
  onPress: () => void;
  disabled?: boolean;
  index: number;
};

export const Square: React.FC<SquareProps> = ({ value, onPress, disabled = false, index }) => {
  const { isLandscape } = useOrientation();
  const textStyle = value === PLAYER_X ? theme.colors.playerX : theme.colors.playerO;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={styles.touchable}
    >
      <View style={styles.square}>
        <Text
          style={[
            styles.squareText,
            { color: textStyle },
            isLandscape && styles.squareTextLandscape,
          ]}
        >
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  square: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 2,
  },
  squareText: {
    fontSize: theme.typography.fontSize.title,
    fontFamily: theme.typography.fontFamily.bold,
  },
  squareTextLandscape: {
    fontSize: theme.typography.fontSize.xxlarge,
  },
});
