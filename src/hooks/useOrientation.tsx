import { useState, useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

type OrientationType = 'portrait' | 'landscape';

const getCurrentOrientation = async (): Promise<OrientationType> => {
  const orientation = await ScreenOrientation.getOrientationAsync();
  const isPortrait =
    orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
    orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN;
  return isPortrait ? 'portrait' : 'landscape';
};

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initOrientation = async () => {
      const currentOrientation = await getCurrentOrientation();
      setOrientation(currentOrientation);
    };

    const setupOrientation = async () => {
      try {
        await ScreenOrientation.unlockAsync();
        await initOrientation();
        setLoading(false);
      } catch (error) {
        console.error('Error unlocking orientation:', error);
      }
    };

    setupOrientation();

    const orientationSubscription =
      ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientationSubscription);
    };
  }, []);

  const handleOrientationChange = (event: ScreenOrientation.OrientationChangeEvent) => {
    const isPortrait =
      event.orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
      event.orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN;

    setOrientation(isPortrait ? 'portrait' : 'landscape');
  };

  return {
    orientation,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
    loading,
  };
};
