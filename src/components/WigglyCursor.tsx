import { useEffect, useRef, useState } from 'react';

/**
 * Custom octopus cursor that wiggles continuously and reacts to mouse
 * movement with extra tilt and a swinging "trail" rotation, so users can
 * actually feel the octopus moving as they push the mouse around.
 */
export const WigglyCursor = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);

    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let lastX = x;
    let lastY = y;
    let tilt = 0; // smoothed velocity-based tilt
    let lastT = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      lastT = now;

      const vx = (x - lastX) / dt; // px per ms
      const vy = (y - lastY) / dt;
      lastX = x;
      lastY = y;

      // Map horizontal velocity to tilt (clamped), smooth toward target.
      const target = Math.max(-35, Math.min(35, vx * 18));
      tilt += (target - tilt) * 0.18;

      // Slight vertical bob from vertical velocity
      const bob = Math.max(-6, Math.min(6, vy * 4));

      wrapper.style.transform = `translate3d(${x - 32}px, ${y - 32 + bob}px, 0)`;
      img.style.setProperty('--cursor-tilt', `${tilt.toFixed(2)}deg`);

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const onLeave = () => {
      wrapper.style.opacity = '0';
    };
    const onEnter = () => {
      wrapper.style.opacity = '1';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);
    document.documentElement.classList.add('wiggly-cursor-active');
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      document.documentElement.classList.remove('wiggly-cursor-active');
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      ref={wrapperRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-16 h-16"
      style={{ transform: 'translate3d(-100px, -100px, 0)', willChange: 'transform' }}
    >
      <img
        ref={imgRef}
        src="/cursor-octopus.png"
        alt=""
        className="w-full h-full select-none"
        style={{
          animation: 'octopus-wiggle 0.9s ease-in-out infinite',
          transformOrigin: '50% 30%',
          // base wiggle keyframes read this CSS var to add velocity tilt
          ['--cursor-tilt' as string]: '0deg',
        }}
        draggable={false}
      />
    </div>
  );
};
