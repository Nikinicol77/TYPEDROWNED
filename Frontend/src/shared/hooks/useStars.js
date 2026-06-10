import { useMemo } from 'react';

export function useStars(total = 160) {
  return useMemo(() => Array.from({ length: total }, (_, index) => ({
    id: index,
    size: Math.random() * 2.2 + 0.6,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 5,
  })), [total]);
}
