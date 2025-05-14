import { useEffect } from 'react';

interface KeyboardNavigationInput {
  onLeftPress?: () => void;
  onRightPress?: () => void;
  enabled?: boolean;
}

export const useKeyboardNavigation = ({
  onLeftPress,
  onRightPress,
  enabled = true
}: KeyboardNavigationInput) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && onLeftPress) {
        onLeftPress();
      } else if (e.key === 'ArrowRight' && onRightPress) {
        onRightPress();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onLeftPress, onRightPress, enabled]);
};