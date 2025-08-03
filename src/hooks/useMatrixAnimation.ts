
import { useState, useEffect } from 'react';
import { getWelcomeAscii } from '../utils/asciiArt';

export const useMatrixAnimation = (screenSize: 'mobile' | 'tablet' | 'desktop') => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // For mobile, don't show ASCII art initially
    if (screenSize === 'mobile') {
      setDisplayText('');
      setIsComplete(true);
      return;
    }

    // For tablet and desktop, show ASCII art immediately
    setDisplayText(getWelcomeAscii(screenSize));
    setIsComplete(true);
  }, [screenSize]);

  return {
    displayText,
    isComplete
  };
};
