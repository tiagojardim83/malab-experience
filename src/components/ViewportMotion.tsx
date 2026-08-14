import { useLayoutEffect } from 'react';

const CONTENT_SELECTOR = [
  '#root section > .container',
  '#root section > div > .container',
  '#root footer > .container',
].join(', ');

const IMAGE_SELECTOR = '#root img[class*="object-cover"], #root [data-motion-photo]';
const NUMBER_SELECTOR = '#root [data-motion-number]';

export const ViewportMotion = () => {
  useLayoutEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;

    const contentTargets = Array.from(new Set(document.querySelectorAll<HTMLElement>(CONTENT_SELECTOR)));
    const imageTargets = Array.from(document.querySelectorAll<HTMLElement>(IMAGE_SELECTOR));
    const numberTargets = Array.from(document.querySelectorAll<HTMLElement>(NUMBER_SELECTOR));
    const allTargets = [...contentTargets, ...imageTargets, ...numberTargets];
    const revealMap = new Map<HTMLElement, Set<HTMLElement>>();

    const registerTarget = (observed: HTMLElement, revealed: HTMLElement) => {
      const targets = revealMap.get(observed) ?? new Set<HTMLElement>();
      targets.add(revealed);
      revealMap.set(observed, targets);
    };

    contentTargets.forEach((target) => {
      target.dataset.motionReveal = 'true';
      registerTarget(target, target);
    });
    imageTargets.forEach((target, index) => {
      target.dataset.motionImage = index % 2 === 1 ? 'reverse' : 'forward';
      registerTarget(target.parentElement ?? target, target);
    });
    numberTargets.forEach((target) => registerTarget(target, target));
    root.classList.add('motion-enabled');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      allTargets.forEach((target) => {
        target.dataset.motionVisible = 'true';
      });
      return () => root.classList.remove('motion-enabled');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealMap.get(entry.target as HTMLElement)?.forEach((target) => {
            target.dataset.motionVisible = 'true';
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    revealMap.forEach((_, target) => observer.observe(target));

    return () => {
      observer.disconnect();
      root.classList.remove('motion-enabled');
    };
  }, []);

  return null;
};
