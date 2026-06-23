import { useState, useEffect, useRef } from 'react';

interface CounterAnimationProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const CounterAnimation = ({ end, duration = 2000, suffix = '', prefix = '', className = 'text-4xl font-bold text-gradient-accent' }: CounterAnimationProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCount(Math.floor(end * progress));

      if (progress >= 1) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};