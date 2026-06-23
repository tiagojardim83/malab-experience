import { useEffect, useRef, useState } from 'react';

interface ParallaxDividerProps {
  image: { url: string };
  alt?: string;
  height?: string;
  position?: string;
  quote?: string;
  /** Max pixel translation at viewport edges. Lower = mais sutil. Default 28. */
  intensity?: number;
  /** Easing transition duration in ms. Higher = mais suave/lento. Default 220. */
  smoothing?: number;
}

/**
 * Full-bleed parallax divider between sections.
 * Subtle B&W photo with gentle scroll-linked translation.
 */
export const ParallaxDivider = ({
  image,
  alt = '',
  height = 'h-[55vh] md:h-[65vh]',
  position = 'center',
  quote,
  intensity = 120,
  smoothing = 0,

}: ParallaxDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const activeRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Scroll progress within viewport: 0 when section starts entering from the
      // bottom, 1 when it has fully exited the top. 0.5 means centered.
      const total = vh + rect.height;
      const traveled = vh - rect.top;
      const raw = traveled / total;
      const progress = Math.max(0, Math.min(1, raw));

      // Map 0..1 -> -1..1 and translate, so the image moves the full
      // ±intensity range across the entire visible journey.
      const signed = progress * 2 - 1;
      setOffset(-signed * intensity);
    };


    // IntersectionObserver decides when to run the rAF loop at all
    const io = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          const loop = () => {
            update();
            if (activeRef.current) rafRef.current = requestAnimationFrame(loop);
          };
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(loop);
        } else {
          cancelAnimationFrame(rafRef.current);
          // settle position when leaving so it doesn't freeze mid-motion
          update();
        }
      },
      { threshold: [0, 0.01, 0.5, 1], rootMargin: '10% 0px 10% 0px' }
    );

    io.observe(el);
    update();
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [intensity]);



  // scale just enough to cover the max translation without exposing edges
  const coverScale = 1 + (intensity * 2) / 300; // enough headroom to cover translation

  return (
    <div
      ref={ref}
      aria-label={alt}
      role="img"
      className={`relative w-full overflow-hidden ${height}`}
      style={{ backgroundColor: '#3a1a5c' }}
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${offset}px, 0) scale(${coverScale})`,
          transition: smoothing > 0 ? `transform ${smoothing}ms linear` : 'none',
        }}
      >
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundPosition: position,
            filter: 'grayscale(100%) contrast(1.05) brightness(0.95)',
          }}
        />
      </div>

      {/* subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />



      {quote && (
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <p className="max-w-3xl text-center text-background text-2xl md:text-4xl font-light italic leading-snug tracking-tight">
            {quote}
          </p>
        </div>
      )}
    </div>
  );
};

