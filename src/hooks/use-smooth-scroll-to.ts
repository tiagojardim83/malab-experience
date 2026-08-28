import { useLenis } from 'lenis/react';

export const useSmoothScrollTo = () => {
  const lenis = useLenis();

  return (target: string | HTMLElement) => {
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.1 });
      return;
    }
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
};
