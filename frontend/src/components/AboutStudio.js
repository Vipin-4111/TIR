'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Wind, Sparkles, Coffee, Music, SunMedium } from 'lucide-react';
import { soundscape } from '@/lib/soundscape';

export default function AboutStudio({ onOpenBooking }) {
  const containerRef = useRef(null);
  const parallaxImgRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scrubbed parallax on studio architectural showcase image
      gsap.to(parallaxImgRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-28 md:py-40 bg-canvas overflow-hidden border-b border-sand/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-[1px] bg-terracotta" />
          <span className="text-xs uppercase tracking-ultra text-terracotta font-semibold">
            The Physical Space & Sanctuary
          </span>
        </div>

        {/* Section Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-tight leading-[1.15]">
              An Architectural Oasis on Gurgaon’s Horizon
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-charcoal-soft text-sm sm:text-base font-light leading-relaxed">
              Conceived as a counterweight to Gurgaon’s high-pressure corporate towers, The Immersion Room offers 4,500 square feet of acoustically decoupled, naturally illuminated sanctuary designed exclusively for deep human expression.
            </p>
          </div>
        </div>

        {/* Big Parallax Architectural Showcase Frame */}
        <div className="relative w-full h-[380px] sm:h-[500px] md:h-[620px] rounded-3xl overflow-hidden shadow-2xl border border-sand/50 mb-16">
          <div ref={parallaxImgRef} className="relative w-full h-[130%] -top-[15%]">
            <Image
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=85"
              alt="Warm minimal architectural studio interior with morning daylight"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/20" />
          </div>

          {/* Floating Architectural Details Pill */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-wrap items-center justify-between gap-4 text-canvas">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-ultra text-ochre font-semibold">
                <MapPin size={14} />
                <span>Sector 54, Golf Course Road, Gurgaon</span>
              </div>
              <p className="font-serif text-2xl sm:text-3xl text-canvas font-light">
                Studio Alpha & The Zen Courtyard
              </p>
            </div>
            <button
              onClick={() => {
                soundscape.playChime(600);
                onOpenBooking('workshops');
              }}
              className="px-6 py-3 bg-canvas text-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-terracotta hover:text-canvas transition-colors duration-300 rounded-sm shadow-lg"
            >
              Book Studio Walkthrough
            </button>
          </div>
        </div>

        {/* 4 Architectural Features Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-y border-sand/50">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-canvas-subtle border border-sand/60 flex items-center justify-center text-terracotta">
              <SunMedium size={18} />
            </div>
            <h4 className="font-serif text-xl text-charcoal font-medium">Circadian Skylights</h4>
            <p className="text-xs text-charcoal-soft font-light leading-relaxed">
              Engineered diffuse northern skylights cast zero harsh shadows, keeping practitioners connected with natural daylight shifts.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-canvas-subtle border border-sand/60 flex items-center justify-center text-terracotta">
              <Wind size={18} />
            </div>
            <h4 className="font-serif text-xl text-charcoal font-medium">Sprung Maple Floors</h4>
            <p className="text-xs text-charcoal-soft font-light leading-relaxed">
              Triple-cushioned basketweave substructure prevents shin splints and absorbs kinetic shock from rigorous jumps and falls.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-canvas-subtle border border-sand/60 flex items-center justify-center text-terracotta">
              <Music size={18} />
            </div>
            <h4 className="font-serif text-xl text-charcoal font-medium">Decoupled Acoustics</h4>
            <p className="text-xs text-charcoal-soft font-light leading-relaxed">
              Sound-isolated room-within-a-room construction with mineral wool dampening and Genelec spatial audio monitoring.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-canvas-subtle border border-sand/60 flex items-center justify-center text-terracotta">
              <Coffee size={18} />
            </div>
            <h4 className="font-serif text-xl text-charcoal font-medium">Artisanal Herbal Tea Bar</h4>
            <p className="text-xs text-charcoal-soft font-light leading-relaxed">
              Slow-pour Himalayan herbal tisanes, organic ceremonial matcha, and an art library for contemplation before or after class.
            </p>
          </div>
        </div>

        {/* Numeric Studio Benchmarks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 text-center">
          <div>
            <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-charcoal block">4,500</span>
            <span className="text-[11px] uppercase tracking-ultra text-terracotta font-medium mt-1 block">Square Feet Sanctuary</span>
          </div>
          <div>
            <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-charcoal block">18 Ft</span>
            <span className="text-[11px] uppercase tracking-ultra text-terracotta font-medium mt-1 block">Ceiling Clearance</span>
          </div>
          <div>
            <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-charcoal block">16 Max</span>
            <span className="text-[11px] uppercase tracking-ultra text-terracotta font-medium mt-1 block">Students per Cohort</span>
          </div>
          <div>
            <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-charcoal block">100%</span>
            <span className="text-[11px] uppercase tracking-ultra text-terracotta font-medium mt-1 block">Natural Daylit Halls</span>
          </div>
        </div>

      </div>
    </section>
  );
}
