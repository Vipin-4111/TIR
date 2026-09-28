'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

export default function Marquee3D() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Accelerate horizontal scroll based on vertical scroll speed
      gsap.to(trackRef.current, {
        x: -300,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const phrases = [
    "CONTEMPORARY DANCE",
    "PHYSICAL THEATRE",
    "MINDFUL YOGA",
    "TACTILE SCULPTURE",
    "ACOUSTIC STILLNESS",
    "SOMATIC PRESENCE",
    "GURGAON SANCTUARY",
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full py-12 md:py-16 overflow-hidden bg-charcoal text-canvas select-none border-y border-sand/20"
      style={{ perspective: '1200px' }}
    >
      <div
        ref={trackRef}
        className="flex items-center gap-12 whitespace-nowrap will-change-transform"
        style={{
          transform: 'rotateX(8deg) rotateY(-4deg) rotateZ(-1deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {[...phrases, ...phrases].map((text, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-wide uppercase text-canvas/90 hover:text-ochre transition-colors duration-300">
              {text}
            </span>
            <Sparkles size={18} className="text-terracotta shrink-0 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
