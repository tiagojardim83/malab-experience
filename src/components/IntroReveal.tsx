import { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import heroPoster from '@/assets/hero-concert.jpg';

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
const MAX_SIZE_VMAX = 280;
const GROWTH_EXPONENT = 1.6;
const FADE_END = 0.28;
const LABEL_FADE_END = 0.18;
const KEY_STEP = 0.3;
const EASE = 0.1;
const SETTLE_EPSILON = 0.0008;
const MAX_ACTIVE_MS = 20000;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const computeSize = (p: number) => MIN_SIZE_VMAX + Math.pow(p, GROWTH_EXPONENT) * (MAX_SIZE_VMAX - MIN_SIZE_VMAX);

export const IntroReveal = () => {
  const [visible, setVisible] = useState(false);
  const targetRef = useRef(0);
  const renderedRef = useRef(0);
  const visibleRef = useRef(false);
  const photoRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const estRef = useRef<HTMLSpanElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    const forceReplay = new URLSearchParams(window.location.search).has('intro');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const setMaskFrame = (src: string) => {
      if (photoRef.current) {
        photoRef.current.style.webkitMaskImage = `url(${src})`;
        photoRef.current.style.maskImage = `url(${src})`;
      }
      if (orangeRef.current) {
        orangeRef.current.style.webkitMaskImage = `url(${src})`;
        orangeRef.current.style.maskImage = `url(${src})`;
      }
    };

    let lockedScrollY = 0;

    const lockScroll = () => {
      lockedScrollY = window.scrollY;
      lenisRef.current?.stop();
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
      lenisRef.current?.start();
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
    let activeSince: number | null = null;
    const renderTick = (now: number) => {
      const target = targetRef.current;
      const rendered = renderedRef.current;
      renderedRef.current = Math.abs(target - rendered) < SETTLE_EPSILON ? target : rendered + (target - rendered) * EASE;
      const p = renderedRef.current;

      const size = computeSize(p);
      const fade = clamp01(p / FADE_END);
      const labelOpacity = 1 - Math.min(1, p / LABEL_FADE_END);

      if (photoRef.current) {
        photoRef.current.style.webkitMaskSize = `${size}vmax`;
        photoRef.current.style.maskSize = `${size}vmax`;
      }
      if (orangeRef.current) {
        orangeRef.current.style.webkitMaskSize = `${size}vmax`;
        orangeRef.current.style.maskSize = `${size}vmax`;
        orangeRef.current.style.opacity = String(1 - fade);
      }
      if (estRef.current) estRef.current.style.opacity = String(labelOpacity);
      if (yearRef.current) yearRef.current.style.opacity = String(labelOpacity);

      if (visibleRef.current && target >= 1 && p > 1 - SETTLE_EPSILON * 4) hide();

      // Safety net: never leave the overlay stuck indefinitely if input handling misbehaves.
      if (visibleRef.current) {
        if (activeSince === null) activeSince = now;
        if (now - activeSince > MAX_ACTIVE_MS) hide();
      } else {
        activeSince = null;
      }

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
    <div className="fixed inset-0 z-[9999] bg-black">
      <div
        ref={photoRef}
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroPoster})`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: `${MIN_SIZE_VMAX}vmax`,
          maskSize: `${MIN_SIZE_VMAX}vmax`,
        }}
      />
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

      <span
        ref={estRef}
        aria-hidden="true"
        className="absolute left-[10%] top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary md:left-[16%] md:text-xs"
      >
        Est.
      </span>
      <span
        ref={yearRef}
        aria-hidden="true"
        className="absolute right-[10%] top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary md:right-[16%] md:text-xs"
      >
        1994
      </span>
    </div>
  );
};
