import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { theme } from '@/theme';
import { PLAYER_X } from '@/constants';
import { useOrientation } from '@/hooks/useOrientation';
import { Canvas, Path } from '@shopify/react-native-skia';
import { useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';

type SquareProps = {
  value: string | null;
  onPress: () => void;
  disabled?: boolean;
  index: number;
  onAnimationComplete?: () => void;
};

export const Square: React.FC<SquareProps> = ({
  value,
  onPress,
  disabled = false,
  index,
  onAnimationComplete,
}) => {
  const { isLandscape } = useOrientation();
  const progress = useSharedValue(0);
  const color = value === PLAYER_X ? theme.colors.playerX : theme.colors.playerO;

  const xPath = 'M 25 25 L 75 75 M 75 25 L 25 75';
  const circlePath = 'M 50 25 A 25 25 0 1 0 50 75 A 25 25 0 1 0 50 25';

  useEffect(() => {
    if (value) {
      progress.value = withTiming(1, { duration: 500 }, (finished) => {
        if (finished && onAnimationComplete) {
          runOnJS(onAnimationComplete)();
        }
      });
    } else {
      progress.value = 0;
    }
  }, [value, onAnimationComplete, progress]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={styles.touchable}
    >
      <View style={styles.square}>
        <Canvas
          style={[styles.canvas, isLandscape ? styles.canvasLandscape : styles.canvasPortrait]}
        >
          <Path
            path={value === PLAYER_X ? xPath : circlePath}
            color={color}
            style="stroke"
            strokeWidth={isLandscape ? 8 : 6}
            start={0}
            end={progress}
          />
        </Canvas>
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
  canvas: {
    position: 'absolute',
  },
  canvasLandscape: {
    width: '100%',
    height: '100%',
  },
  canvasPortrait: {
    width: '90%',
    height: '90%',
  },
});
