import { useLayoutEffect } from 'react';

const CONTENT_SELECTOR = [
  '#root section > .container',
  '#root section > div > .container',
  '#root footer > .container',
].join(', ');

const IMAGE_SELECTOR = '#root img[class*="object-cover"], #root [data-motion-photo]';
const NUMBER_SELECTOR = '#root [data-motion-number]';

const SLIDE_DISTANCE_PX = 130;
const REVEAL_START_VH = 0.94;
const REVEAL_END_VH = 0.5;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const ViewportMotion = () => {
  useLayoutEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;

    const contentTargets = Array.from(new Set(document.querySelectorAll<HTMLElement>(CONTENT_SELECTOR)));
    const imageTargets = Array.from(document.querySelectorAll<HTMLElement>(IMAGE_SELECTOR));
    const numberTargets = Array.from(document.querySelectorAll<HTMLElement>(NUMBER_SELECTOR));
    const revealMap = new Map<HTMLElement, Set<HTMLElement>>();

    const registerTarget = (observed: HTMLElement, revealed: HTMLElement) => {
      const targets = revealMap.get(observed) ?? new Set<HTMLElement>();
      targets.add(revealed);
      revealMap.set(observed, targets);
    };

    const sectionDirections = new Map<Element, 'left' | 'right'>();
    let sectionCount = 0;
    const slideTargets: { el: HTMLElement; direction: 1 | -1 }[] = [];
    contentTargets.forEach((target) => {
      const sectionEl = target.closest('section, footer');
      let direction = sectionEl ? sectionDirections.get(sectionEl) : undefined;
      if (!direction) {
        direction = sectionCount % 2 === 0 ? 'left' : 'right';
        sectionCount += 1;
        if (sectionEl) sectionDirections.set(sectionEl, direction);
      }
      slideTargets.push({ el: target, direction: direction === 'left' ? -1 : 1 });
    });

    imageTargets.forEach((target, index) => {
      target.dataset.motionImage = index % 2 === 1 ? 'reverse' : 'forward';
      registerTarget(target.parentElement ?? target, target);
    });
    numberTargets.forEach((target) => registerTarget(target, target));
    root.classList.add('motion-enabled');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      numberTargets.forEach((target) => {
        target.dataset.motionVisible = 'true';
      });
      imageTargets.forEach((target) => {
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

    let raf = 0;
    const updateSlides = () => {
      raf = 0;
      const vh = window.innerHeight;
      const start = vh * REVEAL_START_VH;
      const end = vh * REVEAL_END_VH;
      slideTargets.forEach(({ el, direction }) => {
        const top = el.getBoundingClientRect().top;
        const progress = easeOutCubic(clamp01((start - top) / (start - end)));
        el.style.opacity = String(progress);
        el.style.transform = `translate3d(${direction * (1 - progress) * SLIDE_DISTANCE_PX}px, 0, 0)`;
      });
    };
    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(updateSlides);
    };

    updateSlides();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove('motion-enabled');
    };
  }, []);

  return null;
};
