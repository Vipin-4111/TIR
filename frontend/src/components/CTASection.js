'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundscape } from '@/lib/soundscape';

export default function CTASection({ onOpenBooking }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Cinematic scale-in reveal of background image
      gsap.fromTo(imageRef.current,
        { scale: 1.2, opacity: 0.8 },
        {
          scale: 1.0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          }
        }
      );

      // Text lift into 3D view
      gsap.fromTo(textRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 bg-charcoal overflow-hidden text-canvas"
      style={{ perspective: '1200px' }}
    >
      {/* Cinematic Background Image with Zoom */}
      <div className="absolute inset-0 z-0">
        <div ref={imageRef} className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=2000&q=85"
            alt="Dancer in flight amidst golden studio lighting"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/60" />
          <div className="absolute inset-0 bg-charcoal/40 mix-blend-multiply" />
        </div>
      </div>

      {/* Center Content */}
      <div ref={textRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-canvas/10 backdrop-blur-md border border-canvas/20 text-ochre text-xs uppercase tracking-ultra font-medium">
          <Sparkles size={14} />
          <span>Your Studio Pass Awaits</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] text-canvas">
          Find your space <br />
          <span className="italic font-normal text-sand-light">to express.</span>
        </h2>

        <p className="text-canvas/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
          Step away from routine. Whether you are stepping onto a dance floor for the first time or returning to deepen your physical craft, there is space here for you.
        </p>

        {/* Action Button */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              soundscape.playChime(760);
              onOpenBooking('dance');
            }}
            data-cursor="BEGIN"
            className="px-10 py-4 bg-canvas text-charcoal text-xs uppercase tracking-ultra font-semibold hover:bg-terracotta hover:text-canvas transition-all duration-300 rounded-sm shadow-2xl flex items-center gap-3 group"
          >
            <span>Reserve Your First Session</span>
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

        <div className="pt-4 flex items-center justify-center gap-6 text-xs text-canvas/60 font-light">
          <span>• First session passes include studio orientation</span>
          <span>• Private lockers & showers</span>
          <span>• No long-term lock-in</span>
        </div>
      </div>
    </section>
  );
}
