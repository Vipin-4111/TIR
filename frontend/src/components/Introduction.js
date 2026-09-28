'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Feather, Sun, Shield, Compass } from 'lucide-react';

export default function Introduction() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const imageOneRef = useRef(null);
  const imageTwoRef = useRef(null);
  const textColRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Kinetic text highlight reveal
      gsap.fromTo('.intro-reveal', 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.18,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Differential parallax on two overlapping editorial photos
      gsap.to(imageOneRef.current, {
        y: -90,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      gsap.to(imageTwoRef.current, {
        y: -160,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });

      // Subtle float on text side column
      gsap.fromTo(textColRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: textColRef.current,
            start: 'top 82%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="introduction"
      ref={sectionRef}
      className="relative py-28 md:py-40 bg-canvas overflow-hidden border-b border-sand/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Subtitle Label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-12 h-[1px] bg-terracotta" />
          <span className="text-xs uppercase tracking-ultra text-terracotta font-semibold">
            The Studio Manifesto
          </span>
        </div>

        {/* Large Statement / Kinetic Headline */}
        <div ref={quoteRef} className="max-w-5xl mb-20 md:mb-28 space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-charcoal leading-[1.15] tracking-tight">
            <span className="intro-reveal block">More than a studio.</span>
            <span className="intro-reveal block italic font-normal text-terracotta-dark">
              A space to feel alive.
            </span>
          </h2>
          <p className="intro-reveal text-charcoal-soft text-lg md:text-2xl font-light leading-relaxed max-w-3xl pt-4">
            In the heart of Gurgaon’s high-velocity urban grid, we carved out a rare sanctuary of acoustic clarity, Siberian maple, raw clay, and natural light. Here, the noise stops, and the body speaks.
          </p>
        </div>

        {/* Two-Column Multi-Plane Editorial Parallax Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Overlapping Parallax Photos with Depth */}
          <div className="lg:col-span-7 relative min-h-[500px] md:min-h-[640px] flex items-center">
            
            {/* Primary Image: Architectural Studio & Light */}
            <div
              ref={imageOneRef}
              className="relative w-[80%] md:w-[75%] h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-xl border border-sand/50 z-10"
            >
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Sun-drenched architectural interior with high ceilings and natural light"
                fill
                sizes="(max-width: 768px) 80vw, 45vw"
                className="object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 bg-canvas/90 backdrop-blur-md px-3.5 py-1.5 rounded text-[10px] uppercase tracking-widest text-charcoal font-medium border border-sand/40">
                Studio Alpha • 2,400 Sq. Ft. Sprung Floor
              </div>
            </div>

            {/* Secondary Floating Overlap Image: Expressive Movement & Breath */}
            <div
              ref={imageTwoRef}
              className="absolute right-0 top-1/4 w-[50%] md:w-[48%] h-[320px] md:h-[380px] rounded-2xl overflow-hidden shadow-2xl border-4 border-canvas z-20 hidden sm:block"
            >
              <Image
                src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1000&q=85"
                alt="Contemporary movement artist expressing emotion through motion"
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
                className="object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 bg-charcoal/85 backdrop-blur-md px-3.5 py-1.5 rounded text-[10px] uppercase tracking-widest text-canvas font-medium">
                Presence & Breath
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Principles */}
          <div ref={textColRef} className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
                The Architecture of Sensory Presence
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-normal text-charcoal leading-snug">
                Built from the ground up for acoustic resonance and somatic release.
              </h3>
              <p className="text-charcoal-soft text-sm md:text-base leading-relaxed font-light">
                Every surface in The Immersion Room was chosen to support presence. Sprung Siberian maple floors protect joints through high-velocity dance leaps, lime-plastered walls absorb unwanted harsh acoustics, and diffused northern skylights wash the space in steady, calming daylight without glare.
              </p>
            </div>

            {/* Feature Badges Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-sand/60">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-canvas-subtle border border-sand/70 flex items-center justify-center text-terracotta">
                  <Sun size={17} />
                </div>
                <h4 className="font-serif text-lg text-charcoal font-medium">Natural North Light</h4>
                <p className="text-xs text-charcoal-soft leading-normal">Continuous circadian daylight for mental clarity and stillness.</p>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-canvas-subtle border border-sand/70 flex items-center justify-center text-terracotta">
                  <Feather size={17} />
                </div>
                <h4 className="font-serif text-lg text-charcoal font-medium">Somatic Sprung Floor</h4>
                <p className="text-xs text-charcoal-soft leading-normal">Triple-cushioned basketweave wood for gravity-defying leaps.</p>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-canvas-subtle border border-sand/70 flex items-center justify-center text-terracotta">
                  <Shield size={17} />
                </div>
                <h4 className="font-serif text-lg text-charcoal font-medium">Acoustic Stillness</h4>
                <p className="text-xs text-charcoal-soft leading-normal">Sound isolation engineered to block NCR traffic noise entirely.</p>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-canvas-subtle border border-sand/70 flex items-center justify-center text-terracotta">
                  <Compass size={17} />
                </div>
                <h4 className="font-serif text-lg text-charcoal font-medium">Interdisciplinary Lab</h4>
                <p className="text-xs text-charcoal-soft leading-normal">Where dancers sculpt clay and actors study physical breathwork.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
