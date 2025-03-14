import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Button } from './Button';
import { theme } from '@/theme';
import { GameState } from '@/types';
import { useOrientation } from '@/hooks/useOrientation';

type GameOverModalProps = {
  gameState: GameState;
  onNewGame: () => void;
};

export const GameOverModal: React.FC<GameOverModalProps> = ({ gameState, onNewGame }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isLandscape } = useOrientation();

  useEffect(() => {
    const isGameOver = gameState === 'won' || gameState === 'lost' || gameState === 'tie';

    if (isGameOver) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [gameState]);

  const handleNewGame = () => {
    onNewGame();
  };

  let title = '';
  let message = '';

  if (gameState === 'won') {
    title = 'Congratulations!';
    message = 'You won!';
  } else if (gameState === 'lost') {
    title = 'Too bad!';
    message = 'You lost!';
  } else if (gameState === 'tie') {
    title = 'Tie!';
    message = 'Nobody won.';
  }

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="fade"
      onRequestClose={handleNewGame}
      supportedOrientations={['portrait', 'landscape']}
    >
      <TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalText}>{message}</Text>
            <View style={styles.buttonContainer}>
              <Button title="New Game" onPress={handleNewGame} fullWidth />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.overlay,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    width: '80%',
    maxWidth: 320,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xxlarge,
    marginBottom: 16,
  },
  modalText: {
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.large,
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
});
