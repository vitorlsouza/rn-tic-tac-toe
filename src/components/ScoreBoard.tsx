import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/theme';
import { typography } from '@/theme/typography';

type ScoreBoardProps = {
  playerScore: number;
  computerScore: number;
  tiesScore: number;
};

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  playerScore,
  computerScore,
  tiesScore,
}) => {
  return (
    <View style={styles.scoreBoard}>
      <View style={styles.scoreItem}>
        <Text style={[styles.scoreLabel, { color: theme.colors.playerX }]}>You (X)</Text>
        <Text style={styles.scoreValue}>{playerScore}</Text>
      </View>
      <View style={styles.scoreItem}>
        <Text style={styles.scoreLabel}>Ties</Text>
        <Text style={styles.scoreValue}>{tiesScore}</Text>
      </View>
      <View style={styles.scoreItem}>
        <Text style={[styles.scoreLabel, { color: theme.colors.playerO }]}>CPU (O)</Text>
        <Text style={styles.scoreValue}>{computerScore}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 300,
    marginBottom: 30,
  },
  scoreItem: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: 10,
    width: 90,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scoreLabel: {
    color: theme.colors.text.primary,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.small,
    textAlign: 'center',
  },
  scoreValue: {
    color: theme.colors.text.primary,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xlarge,
  },
});
