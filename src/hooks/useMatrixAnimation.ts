
import { useState, useEffect } from 'react';
import { createMatrixRain, createMatrixTransition, getWelcomeAscii } from '../utils/asciiArt';

export const useMatrixAnimation = (screenSize: 'mobile' | 'tablet' | 'desktop') => {
  const [phase, setPhase] = useState<'rain' | 'transition' | 'complete'>('rain');
  const [displayText, setDisplayText] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // Phase 1: Matrix rain
    if (phase === 'rain') {
      intervalId = setInterval(() => {
        setDisplayText(createMatrixRain(screenSize));
      }, 100);

      // After 2 seconds, move to transition phase
      setTimeout(() => {
        setPhase('transition');
      }, 2000);
    }

    // Phase 2: Transition from rain to ASCII
    else if (phase === 'transition') {
      const finalAscii = getWelcomeAscii(screenSize);
      const totalLines = finalAscii.split('\n').length;
      let currentProgress = 0;

      intervalId = setInterval(() => {
        currentProgress += 0.5;
        setProgress(currentProgress);
        setDisplayText(createMatrixTransition(screenSize, currentProgress));

        if (currentProgress >= totalLines) {
          setPhase('complete');
        }
      }, 80);
    }

    // Phase 3: Show final ASCII
    else if (phase === 'complete') {
      setDisplayText(getWelcomeAscii(screenSize));
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [phase, screenSize]);

  return {
    displayText,
    isComplete: phase === 'complete'
  };
};
