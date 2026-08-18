import { useEffect, useRef, useState } from 'react';

const SEEN_KEY = 'malab-intro-seen';
const FRAMES = [
  '/assets/malab-octopus.png',
  '/assets/malab-octopus-01.png',
  '/assets/malab-octopus-03.png',
  '/assets/malab-octopus-04.png',
  '/assets/malab-octopus-06.png',
];
const FRAME_MS = 280;

const MIN_SIZE_VMAX = 13;
const CONTAINED_SIZE_VMAX = 60;
const MAX_SIZE_VMAX = 280;
const GROW_END = 0.4;
const FADE_END = 0.7;
const LABEL_FADE_END = 0.18;
const KEY_STEP = 0.3;
const EASE = 0.1;
const SETTLE_EPSILON = 0.0008;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const computeSize = (p: number) => {
  if (p <= GROW_END) return MIN_SIZE_VMAX + (p / GROW_END) * (CONTAINED_SIZE_VMAX - MIN_SIZE_VMAX);
  if (p <= FADE_END) return CONTAINED_SIZE_VMAX;
  return CONTAINED_SIZE_VMAX + ((p - FADE_END) / (1 - FADE_END)) * (MAX_SIZE_VMAX - CONTAINED_SIZE_VMAX);
};

const computeFade = (p: number) => {
  if (p <= GROW_END) return 0;
  if (p >= FADE_END) return 1;
  return (p - GROW_END) / (FADE_END - GROW_END);
};

export const IntroReveal = () => {
  const [visible, setVisible] = useState(false);
  const targetRef = useRef(0);
  const renderedRef = useRef(0);
  const visibleRef = useRef(false);
  const orangeRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<HTMLDivElement>(null);
  const estRef = useRef<HTMLSpanElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const forceReplay = new URLSearchParams(window.location.search).has('intro');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const setMaskFrame = (src: string) => {
      if (orangeRef.current) {
        orangeRef.current.style.webkitMaskImage = `url(${src})`;
        orangeRef.current.style.maskImage = `url(${src})`;
      }
      if (holeRef.current) {
        holeRef.current.style.webkitMaskImage = `linear-gradient(#000, #000), url(${src})`;
        holeRef.current.style.maskImage = `linear-gradient(#000, #000), url(${src})`;
      }
    };

    let lockedScrollY = 0;

    const lockScroll = () => {
      lockedScrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${lockedScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, lockedScrollY);
    };

    const show = (startValue: number) => {
      visibleRef.current = true;
      targetRef.current = startValue;
      renderedRef.current = startValue;
      setVisible(true);
      lockScroll();
    };

    const hide = () => {
      visibleRef.current = false;
      sessionStorage.setItem(SEEN_KEY, '1');
      unlockScroll();
      setVisible(false);
    };

    const applyDelta = (delta: number) => {
      if (!visibleRef.current) return;
      targetRef.current = clamp01(targetRef.current + delta / 900);
    };

    const onWheel = (e: WheelEvent) => {
      if (visibleRef.current) {
        e.preventDefault();
        applyDelta(e.deltaY);
        return;
      }
      if (window.scrollY <= 0 && e.deltaY < 0) {
        e.preventDefault();
        show(1);
        applyDelta(e.deltaY);
      }
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const dy = touchY - y;
      if (visibleRef.current) {
        e.preventDefault();
        applyDelta(dy);
        touchY = y;
        return;
      }
      if (window.scrollY <= 0 && dy < 0) {
        e.preventDefault();
        show(1);
        applyDelta(dy);
      }
      touchY = y;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!visibleRef.current) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        applyDelta(KEY_STEP * 900);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        applyDelta(-KEY_STEP * 900);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    const frameTimer = window.setInterval(() => {
      setMaskFrame(FRAMES[Math.floor(Date.now() / FRAME_MS) % FRAMES.length]);
    }, FRAME_MS);
    setMaskFrame(FRAMES[0]);

    let raf = 0;
    const renderTick = () => {
      const target = targetRef.current;
      const rendered = renderedRef.current;
      renderedRef.current = Math.abs(target - rendered) < SETTLE_EPSILON ? target : rendered + (target - rendered) * EASE;
      const p = renderedRef.current;

      const size = computeSize(p);
      const fade = computeFade(p);
      const labelOpacity = 1 - Math.min(1, p / LABEL_FADE_END);

      if (orangeRef.current) {
        orangeRef.current.style.webkitMaskSize = `${size}vmax`;
        orangeRef.current.style.maskSize = `${size}vmax`;
        orangeRef.current.style.opacity = String(1 - fade);
      }
      if (holeRef.current) {
        holeRef.current.style.webkitMaskSize = `100% 100%, ${size}vmax`;
        holeRef.current.style.maskSize = `100% 100%, ${size}vmax`;
      }
      if (estRef.current) estRef.current.style.opacity = String(labelOpacity);
      if (yearRef.current) yearRef.current.style.opacity = String(labelOpacity);

      if (visibleRef.current && target >= 1 && p > 1 - SETTLE_EPSILON * 4) hide();

      raf = requestAnimationFrame(renderTick);
    };
    raf = requestAnimationFrame(renderTick);

    if (!(sessionStorage.getItem(SEEN_KEY) && !forceReplay)) {
      show(0);
    }

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      window.clearInterval(frameTimer);
      cancelAnimationFrame(raf);
      if (visibleRef.current) unlockScroll();
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      <div
        ref={orangeRef}
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundColor: 'hsl(var(--secondary))',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: `${MIN_SIZE_VMAX}vmax`,
          maskSize: `${MIN_SIZE_VMAX}vmax`,
        }}
      />
      <div
        ref={holeRef}
        aria-hidden="true"
        className="absolute inset-0 bg-black"
        style={{
          WebkitMaskRepeat: 'no-repeat, no-repeat',
          maskRepeat: 'no-repeat, no-repeat',
          WebkitMaskPosition: 'center, center',
          maskPosition: 'center, center',
          WebkitMaskSize: `100% 100%, ${MIN_SIZE_VMAX}vmax`,
          maskSize: `100% 100%, ${MIN_SIZE_VMAX}vmax`,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <span
        ref={estRef}
        aria-hidden="true"
        className="absolute left-[10%] top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-white md:left-[16%] md:text-xs"
      >
        Est.
      </span>
      <span
        ref={yearRef}
        aria-hidden="true"
        className="absolute right-[10%] top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-white md:right-[16%] md:text-xs"
      >
        1994
      </span>
    </div>
  );
};
