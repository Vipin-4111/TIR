'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '@/data/experiences';
import { ArrowRight, Sparkles, Check, Clock, Award, Layers, Volume2, MoveHorizontal } from 'lucide-react';
import { soundscape } from '@/lib/soundscape';

export default function Experiences({ onOpenBooking }) {
  const pinTrackRef = useRef(null);
  const pinnedContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dragging & Meditative Singing Bowl State
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinTrackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinnedContainerRef.current,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const total = experiences.length;
          const newIdx = Math.min(total - 1, Math.floor(self.progress * total));
          if (newIdx !== activeIndex) {
            setActiveIndex(newIdx);
          }
        }
      });
    }, pinTrackRef);

    return () => ctx.revert();
  }, [activeIndex]);

  const handleTabClick = (idx) => {
    soundscape.playTingsha(2200 + idx * 100);
    setActiveIndex(idx);
    if (!pinTrackRef.current) return;

    const rect = pinTrackRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const trackStart = scrollTop + rect.top;
    const trackHeight = pinTrackRef.current.offsetHeight - window.innerHeight;
    const targetScroll = trackStart + (idx / experiences.length) * trackHeight + 50;

    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // --- MEDITATIVE DRAG & TIBETAN BOWL INTERACTION ---
  const onPointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    lastX.current = e.clientX;
    lastTime.current = Date.now();

    const cardFreqs = [432, 528, 639, 741, 852];
    soundscape.startSingingBowl(cardFreqs[activeIndex % cardFreqs.length]);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - dragStartX.current;
    setDragOffset(diff);

    const now = Date.now();
    const dt = Math.max(1, now - lastTime.current);
    const dx = currentX - lastX.current;
    const velocity = (dx / dt) * 100;
    lastX.current = currentX;
    lastTime.current = now;

    const normalizedX = 0.5 + (diff / (window.innerWidth || 1000));
    soundscape.updateSingingBowl(velocity, normalizedX);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    soundscape.stopSingingBowl();

    if (dragOffset < -75 && activeIndex < experiences.length - 1) {
      soundscape.playTingsha(2600);
      handleTabClick(activeIndex + 1);
    } else if (dragOffset > 75 && activeIndex > 0) {
      soundscape.playTingsha(2200);
      handleTabClick(activeIndex - 1);
    }

    setDragOffset(0);
  };

  return (
    <div ref={pinTrackRef} id="experiences" className="relative w-full h-[320vh] bg-canvas-subtle">
      {/* Pinned Viewport Container */}
      <section
        ref={pinnedContainerRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-16 md:py-20 px-6 md:px-12 bg-canvas-subtle select-none"
        style={{ perspective: '1600px' }}
      >
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
          
          {/* Top Header Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-sand/50">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-[1px] bg-terracotta" />
                <span className="text-xs uppercase tracking-ultra text-terracotta font-semibold">
                  3D Interactive Showcase
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-charcoal tracking-tight">
                The 5 Creative Immersion Fields
              </h2>
            </div>

            {/* Sound Guidance & Plane indicator */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-terracotta/10 border border-terracotta/30 text-[11px] font-medium text-terracotta">
                <Volume2 size={13} className="animate-pulse" />
                <span>Drag card to play singing bowl</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-canvas border border-sand/60 text-xs font-mono text-charcoal">
                <Layers size={13} className="text-terracotta" />
                <span>PLANE: 0{activeIndex + 1} / 05</span>
              </div>
              
              <div className="w-20 h-1.5 bg-sand/40 rounded-full overflow-hidden hidden md:block">
                <div
                  className="h-full bg-terracotta transition-all duration-200"
                  style={{ width: `${(scrollProgress * 100).toFixed(0)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Navigation Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
            {experiences.map((exp, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={exp.id}
                  onClick={() => handleTabClick(idx)}
                  data-cursor="SELECT"
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-medium rounded-full transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-charcoal text-canvas shadow-lg scale-105'
                      : 'bg-canvas text-charcoal-soft hover:text-charcoal border border-sand/40'
                  }`}
                >
                  <span className="font-mono text-[10px]">0{idx + 1}.</span>
                  <span>{exp.title.split('&')[0]}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-ping" />}
                </button>
              );
            })}
          </div>

          {/* 3D Z-Space Card Stack Area (With Smooth Drag Resonator + Counter-Parallax Window) */}
          <div
            className="relative flex-1 w-full my-4 flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            data-cursor="RESONATE"
          >
            {experiences.map((exp, idx) => {
              const delta = idx - activeIndex;
              const isCurrent = delta === 0;
              const isPast = delta < 0;
              const isFuture = delta > 0;

              let transformStyle = {};
              if (isCurrent) {
                const currentDragX = isDragging ? dragOffset : 0;
                const rotY = isDragging ? dragOffset * 0.08 : 0;
                const rotZ = isDragging ? dragOffset * 0.02 : 0;
                transformStyle = {
                  transform: `translate3d(${currentDragX}px, 0, 0px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(1)`,
                  opacity: 1,
                  zIndex: 20,
                  pointerEvents: 'auto',
                };
              } else if (isPast) {
                transformStyle = {
                  transform: `translate3d(0, -90px, ${Math.abs(delta) * 180}px) rotateX(12deg) scale(${1 + Math.abs(delta) * 0.05})`,
                  opacity: 0,
                  zIndex: 30,
                  pointerEvents: 'none',
                };
              } else {
                transformStyle = {
                  transform: `translate3d(0, ${delta * 22}px, -${delta * 140}px) scale(${1 - delta * 0.05})`,
                  opacity: Math.max(0, 0.6 - delta * 0.2),
                  zIndex: 20 - delta,
                  pointerEvents: 'none',
                };
              }

              // Counter-parallax on inner image
              const innerParallaxX = isCurrent && isDragging ? -dragOffset * 0.35 : 0;

              return (
                <div
                  key={exp.id}
                  className="absolute inset-0 max-w-6xl mx-auto bg-canvas rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-sand/50 transition-all duration-500 ease-out flex flex-col justify-center"
                  style={{
                    ...transformStyle,
                    willChange: 'transform, opacity',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                    
                    {/* Left: Photographic Display with Inner Window Counter-Parallax */}
                    <div className="lg:col-span-6 relative">
                      <div className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl border border-sand/40">
                        <div
                          className="relative w-[115%] h-full -left-[7.5%] pointer-events-none transition-transform duration-150 ease-out"
                          style={{
                            transform: `translate3d(${innerParallaxX}px, 0, 0) scale(1.08)`,
                            willChange: 'transform',
                          }}
                        >
                          <Image
                            src={exp.image}
                            alt={exp.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center transform transition-transform duration-700"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                        
                        <div className="absolute bottom-5 left-5 right-5 text-canvas pointer-events-none">
                          <span className="text-[10px] uppercase tracking-ultra text-sand-light font-semibold block">
                            Discipline 0{idx + 1}
                          </span>
                          <span className="font-serif text-2xl md:text-3xl text-canvas font-light">
                            {exp.title}
                          </span>
                        </div>
                      </div>

                      {/* Floating Inset Detail Photo */}
                      <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-40 md:w-36 md:h-44 rounded-xl overflow-hidden shadow-2xl border-4 border-canvas z-10 pointer-events-none">
                        <Image
                          src={exp.subImage}
                          alt={`${exp.title} detail`}
                          fill
                          sizes="150px"
                          className="object-cover object-center"
                        />
                      </div>
                    </div>

                    {/* Right: Editorial Narrative & Action */}
                    <div className="lg:col-span-6 space-y-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-terracotta text-xs uppercase tracking-ultra font-semibold">
                          <Sparkles size={14} />
                          <span>{exp.tagline}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-charcoal-soft bg-canvas-subtle px-2.5 py-1 rounded-full border border-sand/50">
                          <MoveHorizontal size={12} className="text-terracotta" />
                          <span>Drag to Resonate</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-charcoal leading-tight">
                        {exp.title}
                      </h3>

                      <p className="text-charcoal-soft text-xs sm:text-sm md:text-base leading-relaxed font-light line-clamp-3 md:line-clamp-none">
                        {exp.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2 border-y border-sand/50">
                        <div className="flex items-start gap-2.5">
                          <Clock size={15} className="text-terracotta mt-0.5 shrink-0" />
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-charcoal-soft block font-semibold">Schedule</span>
                            <span className="text-xs text-charcoal font-medium">{exp.schedule}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Award size={15} className="text-terracotta mt-0.5 shrink-0" />
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-charcoal-soft block font-semibold">Curator</span>
                            <span className="text-xs text-charcoal font-medium">{exp.curator}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-charcoal-soft">
                          {exp.features.slice(0, 4).map((f, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 rounded-full bg-moss/10 text-moss flex items-center justify-center shrink-0">
                                <Check size={9} />
                              </div>
                              <span className="text-[11px] truncate">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundscape.playTingsha(2400);
                            onOpenBooking(exp.id);
                          }}
                          data-cursor="BOOK"
                          className="px-6 py-3 bg-charcoal text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-terracotta transition-colors duration-300 rounded-full shadow-md flex items-center gap-2 group"
                        >
                          <span>Book {exp.title.split('&')[0]} Pass</span>
                          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <span className="text-[11px] text-charcoal-soft">Session passes from ?1,500</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Guidance Bar */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-ultra text-charcoal-soft pt-2">
            <span>Drag card sideways to hear singing bowl sound ? Scroll to travel through 3D planes</span>
            <span className="hidden sm:inline">Harmonic 432 Hz Solfeggio Scale</span>
          </div>

        </div>
      </section>
    </div>
  );
}
