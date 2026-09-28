'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Users, Palette, Compass, Sparkles, Volume2 } from 'lucide-react';
import { soundscape } from '@/lib/soundscape';

function TiltCard({ pillar, idx }) {
  const cardRef = useRef(null);
  const sheenRef = useRef(null);
  const [isPressing, setIsPressing] = useState(false);
  const IconComponent = pillar.icon;

  const frequencies = [432, 528, 639, 741];
  const freq = frequencies[idx % frequencies.length];

  const handlePointerDown = (e) => {
    setIsPressing(true);
    soundscape.startSingingBowl(freq);
  };

  const handlePointerMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;

    if (sheenRef.current) {
      sheenRef.current.style.opacity = '1';
      sheenRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.4), transparent 70%)`;
    }

    if (isPressing) {
      const normalizedX = x / rect.width;
      soundscape.updateSingingBowl(150, normalizedX);
    }
  };

  const handlePointerUp = () => {
    setIsPressing(false);
    soundscape.stopSingingBowl();
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (sheenRef.current) {
      sheenRef.current.style.opacity = '0';
    }
    if (isPressing) {
      setIsPressing(false);
      soundscape.stopSingingBowl();
    }
  };

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseLeave={handleMouseLeave}
      data-cursor="RESONATE"
      className={`pillar-card group relative bg-canvas rounded-2xl overflow-hidden border border-sand/60 hover:border-terracotta/70 transition-transform duration-200 ease-out shadow-lg hover:shadow-2xl flex flex-col justify-between select-none cursor-grab active:cursor-grabbing ${
        isPressing ? 'ring-2 ring-terracotta/50 shadow-2xl' : ''
      }`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
      }}
    >
      {/* Specular Sheen */}
      <div
        ref={sheenRef}
        className="absolute inset-0 pointer-events-none z-30 opacity-0 transition-opacity duration-300"
      />

      {/* Top Image */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden pointer-events-none" style={{ transform: 'translateZ(10px)' }}>
        <Image
          src={pillar.image}
          alt={pillar.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
        
        {/* Number Badge */}
        <div className="absolute top-4 left-4" style={{ transform: 'translateZ(25px)' }}>
          <span className="font-serif text-sm font-light text-sand-light tracking-widest bg-charcoal/75 backdrop-blur-md px-3 py-1 rounded-full border border-sand/30">
            {pillar.number}
          </span>
        </div>

        {/* Category Tag */}
        <div className="absolute top-4 right-4" style={{ transform: 'translateZ(25px)' }}>
          <span className="text-[9px] uppercase tracking-ultra text-canvas/90 bg-terracotta/85 backdrop-blur-sm px-2.5 py-1 rounded-full font-semibold shadow-sm">
            {pillar.tag}
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-canvas" style={{ transform: 'translateZ(30px)' }}>
          <span className="text-[10px] uppercase tracking-ultra text-sand-light block mb-0.5">
            {pillar.subtitle}
          </span>
          <h3 className="font-serif text-2xl text-canvas font-medium">
            {pillar.title}
          </h3>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between pointer-events-none" style={{ transform: 'translateZ(15px)' }}>
        <p className="text-xs sm:text-sm text-charcoal-soft font-light leading-relaxed">
          {pillar.description}
        </p>

        <div className="pt-3 border-t border-sand/40 flex items-center justify-between text-xs text-terracotta font-medium group-hover:text-charcoal transition-colors">
          <span className="uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <Volume2 size={12} className="animate-pulse" />
            <span>Hold / Drag to Resonate</span>
          </span>
          <IconComponent size={16} className="group-hover:rotate-12 transition-transform" />
        </div>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('.pillar-card',
        { y: 80, rotateY: 12, opacity: 0 },
        {
          y: 0,
          rotateY: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      id: 'movement',
      number: '01',
      title: 'Movement',
      subtitle: 'Visceral & Unbound',
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1000&q=85',
      description: 'Reclaim the instinctive intelligence of your physical frame. Through gravity release, floor transitions, and rhythmic stamina, we release tension stored from sedentary screen routines.',
      tag: 'Dynamic Somatics'
    },
    {
      id: 'connection',
      number: '02',
      title: 'Connection',
      subtitle: 'Ensemble & Empathy',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85',
      description: 'A community where vulnerability is embraced as strength. Moving in unison, sharing breath in circle work, and encountering fellow creators in Gurgaon who value genuine artistic depth.',
      tag: 'Shared Energy'
    },
    {
      id: 'creativity',
      number: '03',
      title: 'Creativity',
      subtitle: 'Tactile Cross-Pollination',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=85',
      description: 'Art is not siloed. Here, actors mold clay to understand weight, dancers learn vocal projection, and painters discover the kinetic geometry of the human spine.',
      tag: 'Interdisciplinary'
    },
    {
      id: 'stillness',
      number: '04',
      title: 'Stillness',
      subtitle: 'Grounding & Sanctuary',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85',
      description: 'The courage to pause. Natural daylight, acoustic quiet, hand-beaten Tibetan singing bowls, and slow restorative breathwork that recalibrates the autonomic nervous system.',
      tag: 'Deep Reset'
    }
  ];

  return (
    <section
      id="why-us"
      ref={containerRef}
      className="relative py-28 md:py-36 bg-canvas-subtle overflow-hidden border-b border-sand/40"
      style={{ perspective: '1400px' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-canvas border border-sand/60 text-terracotta text-xs uppercase tracking-ultra font-semibold">
            <Sparkles size={13} />
            <span>The Four Core Pillars</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-tight">
            Why The Immersion Room
          </h2>
          <p className="text-charcoal-soft text-sm md:text-base font-light leading-relaxed">
            Drag or hold over any pillar card to activate its meditative harmonic resonance. We engineered an intentional environment where body, voice, and spirit converse freely.
          </p>
        </div>

        {/* 4 Pillars Grid with 3D Tilt & Singing Bowl Drag */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pillars.map((pillar, idx) => (
            <TiltCard key={pillar.id} pillar={pillar} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
