import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, ModalProps } from 'react-native';
import { Button } from './Button';
import { theme } from '@/theme';
import { GameState } from '@/types';
import LottieView from 'lottie-react-native';
import { useOrientation } from '@/hooks/useOrientation';

type GameOverModalProps = ModalProps & {
  gameState: GameState;
  onNewGame: () => void;
  onBackToHome: () => void;
};

export const GameOverModal: React.FC<GameOverModalProps> = ({
  gameState,
  onNewGame,
  onBackToHome,
  ...rest
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isLandscape } = useOrientation();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    const isGameOver = gameState === 'won' || gameState === 'lost' || gameState === 'tie';

    if (isGameOver) {
      setModalVisible(true);

      if (animationRef.current) {
        animationRef.current.reset();
        animationRef.current.play();
      }
    } else {
      setModalVisible(false);
    }
  }, [gameState]);

  const handleNewGame = () => {
    onNewGame();
  };

  let title = '';
  let message = '';
  let animationSource = null;

  if (gameState === 'won') {
    title = 'Congratulations!';
    message = 'You won!';
    animationSource = require('@/assets/animations/victory.json');
  } else if (gameState === 'lost') {
    title = 'Too bad!';
    message = 'You lost!';
    animationSource = require('@/assets/animations/defeat.json');
  } else if (gameState === 'tie') {
    title = 'Tie!';
    message = 'Nobody won.';
    animationSource = require('@/assets/animations/tie.json');
  }

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="fade"
      onRequestClose={handleNewGame}
      supportedOrientations={['portrait', 'landscape']}
      {...rest}
    >
      <TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {animationSource && (
              <View
                style={[
                  styles.animationContainer,
                  isLandscape && styles.animationContainerLandscape,
                ]}
              >
                <LottieView
                  ref={animationRef}
                  source={animationSource}
                  autoPlay
                  loop={false}
                  style={styles.animation}
                />
              </View>
            )}
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalText}>{message}</Text>
            <View style={[styles.buttonContainer, isLandscape && styles.buttonContainerLandscape]}>
              <Button title="New Game" onPress={handleNewGame} />
              <Button title="Back to Home" onPress={onBackToHome} />
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
    maxWidth: 370,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  animationContainer: {
    width: '100%',
    height: 150,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainerLandscape: {
    width: '100%',
    height: 80,
  },
  animation: {
    width: '100%',
    height: '100%',
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
    gap: 16,
  },
  buttonContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
