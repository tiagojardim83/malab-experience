import { useEffect, useRef } from 'react';

interface ParallaxDividerProps {
  image: { url: string };
  alt?: string;
  height?: string;
  position?: string;
  quote?: string;
  intensity?: number;
  smoothing?: number;
}

export const ParallaxDivider = ({
  image,
  alt = '',
  height = 'h-[62vh] md:h-[78vh]',
  position = 'center',
  quote,
  intensity = 80,
  smoothing = 0,
}: ParallaxDividerProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageElement = imageRef.current;
    if (!section || !imageElement || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animationFrame = 0;
    let isVisible = false;

    const update = () => {
      animationFrame = 0;
      if (!isVisible) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      const offset = -(progress * 2 - 1) * intensity;
      imageElement.style.transform = `translate3d(0, ${offset}px, 0) scale(${1 + (intensity * 2) / 420})`;
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) requestUpdate();
    }, { rootMargin: '15% 0px' });

    observer.observe(section);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [intensity]);

  const [, posY = 'center'] = position.split(' ');

  return (
    <div ref={sectionRef} aria-label={alt} role="img" className={`relative w-full overflow-hidden bg-primary ${height}`}>
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{ transition: smoothing > 0 ? `transform ${smoothing}ms linear` : 'none' }}
      >
        <div data-motion-photo className="absolute inset-0">
          <div className="photo-pan-bg absolute inset-0 bg-cover" style={{ backgroundImage: `url(${image.url})`, backgroundPositionY: posY }} />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/35" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-background/30" />

      {quote ? (
        <div className="container relative z-10 flex h-full items-center justify-center">
          <p className="editorial-quote max-w-5xl text-center text-4xl italic leading-tight text-background md:text-7xl">{quote}</p>
        </div>
      ) : null}
    </div>
  );
};
