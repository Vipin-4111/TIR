'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles, Volume2, Layers } from 'lucide-react';
import { soundscape } from '@/lib/soundscape';

export default function Hero() {
  const pinWrapperRef = useRef(null);
  const heroContainerRef = useRef(null);
  const imageFrameRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const bgTextRef = useRef(null);
  const bottomBarRef = useRef(null);
  const magneticBtnRef = useRef(null);

  const [depthPercent, setDepthPercent] = useState(0);

  // 3D Gyroscope Mouse Parallax on the frame
  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let targetTiltX = 0, targetTiltY = 0;
    let currentTiltX = 0, currentTiltY = 0;
    let rafId;

    const onMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetTiltX = ((e.clientY - cy) / cy) * -7;
      targetTiltY = ((e.clientX - cx) / cx) * 7;
    };

    const updateGyro = () => {
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;

      if (imageFrameRef.current && window.scrollY < window.innerHeight * 1.5) {
        imageFrameRef.current.style.transform = `perspective(1200px) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;
      }
      rafId = requestAnimationFrame(updateGyro);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateGyro);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Magnetic Button Physics
  const handleMagneticMove = (e) => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate3d(${x * 0.28}px, ${y * 0.28}px, 0) scale(1.04)`;
  };

  const handleMagneticLeave = () => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pinned 3D Depth Portal ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: heroContainerRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            setDepthPercent(Math.round(self.progress * 100));
          }
        }
      });

      // 1. Visceral 3D Letter-Scattering Matrix
      const letters = headlineRef.current?.querySelectorAll('.hero-letter');
      if (letters && letters.length) {
        letters.forEach((char, i) => {
          const randX = (i % 2 === 0 ? 1 : -1) * (30 + (i * 18));
          const randY = -80 - (i * 12);
          const randZ = 350 + (i * 20);
          const rotX = (i % 2 === 0 ? 30 : -25);
          const rotY = (i % 3 === 0 ? 40 : -35);

          tl.to(char, {
            x: randX,
            y: randY,
            z: randZ,
            rotateX: rotX,
            rotateY: rotY,
            opacity: 0,
            filter: 'blur(10px)',
            ease: 'power2.inOut',
            duration: 0.5,
          }, 0);
        });
      }

      // Background watermark text accelerates backward in depth
      tl.to(bgTextRef.current, {
        scale: 0.8,
        opacity: 0,
        y: -140,
        ease: 'power1.out',
        duration: 0.4,
      }, 0);

      // Subtitle & action buttons drift down and fade out
      tl.to(subtitleRef.current, {
        y: 110,
        opacity: 0,
        scale: 0.9,
        duration: 0.35,
        ease: 'power2.in',
      }, 0);

      // Bottom telemetry bar fades out
      tl.to(bottomBarRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.3,
      }, 0);

      // 2. Photographic Frame scales smoothly from inset card into full-bleed view
      tl.to(imageFrameRef.current, {
        scale: 1.12,
        borderRadius: '0px',
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        filter: 'brightness(0.9)',
        ease: 'power2.inOut',
        duration: 0.7,
      }, 0.2);

      // Initial luxury entrance
      gsap.fromTo(imageFrameRef.current,
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-anim-item',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );

    }, pinWrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToExperiences = () => {
    soundscape.playTingsha(2400);
    const target = document.querySelector('#journey');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to split text into individual 3D letters
  const renderLetters = (text, isItalic = false) => {
    return text.split('').map((char, idx) => (
      <span
        key={idx}
        className={`hero-letter inline-block transform-gpu will-change-transform ${char === ' ' ? 'w-4 md:w-6' : ''
          }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div ref={pinWrapperRef} id="hero" className="relative w-full h-[240vh] bg-canvas">
      {/* Pinned Viewport Container */}
      <section
        ref={heroContainerRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-canvas"
        style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
      >
        {/* 3D Deep Watermark */}
        <div
          ref={bgTextRef}
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="font-serif text-[22vw] font-light tracking-tighter text-charcoal/[0.035] whitespace-nowrap uppercase">
            IMMERSION
          </span>
        </div>

        {/* Dynamic 3D Photographic Portal Frame with Gyro Tilt */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-3 sm:p-6 md:p-12 pointer-events-none">
          <div
            ref={imageFrameRef}
            className="relative w-full h-full max-w-7xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-sand/50 pointer-events-auto transition-all duration-300"
            style={{
              willChange: 'transform, border-radius, width, height',
              transformStyle: 'preserve-3d'
            }}
          >
            <Image
              src="/gallery/room.jpg"
              alt="Contemporary dancer suspended in mid-flight in The Immersion Room studio"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transition-transform duration-1000"
            />

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 via-transparent to-charcoal/30" />

            {/* Film grain noise texture */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                backgroundSize: '4px 4px'
              }}
            />
          </div>
        </div>

        {/* Center Content Layer */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full pt-28 sm:pt-32 md:pt-36">

          {/* Eyebrow Tagline */}
          <div className="hero-anim-item overflow-hidden mb-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-canvas/15 backdrop-blur-md border border-canvas/25 text-canvas text-xs uppercase tracking-ultra font-medium drop-shadow-sm">
              <Sparkles size={13} className="text-ochre animate-pulse" />
              <span>A space for movement, sound, food & connection</span>
              <Sparkles size={13} className="text-ochre animate-pulse" />
            </div>
          </div>

          {/* 3D Per-Letter Scattering Title */}
          <div
            ref={headlineRef}
            className="mb-6 transform-gpu select-none"
            style={{ willChange: 'transform, opacity', transformStyle: 'preserve-3d' }}
          >
            <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-canvas leading-[0.93] drop-shadow-2xl">
              <span className="block whitespace-nowrap">
                {renderLetters("THE IMMERSION")}
              </span>
              <span className="block italic font-normal text-light whitespace-nowrap mt-1">
                {renderLetters("ROOM")}
              </span>
            </h1>
          </div>

          {/* Subtitle Narrative & Action Buttons */}
          <div ref={subtitleRef} className="max-w-2xl mx-auto space-y-6 transform-gpu" style={{ willChange: 'transform, opacity' }}>
            <p className="hero-anim-item text-sm sm:text-base md:text-lg text-canvas/90 font-light leading-relaxed drop-shadow">
              A multidisciplinary sanctuary where movement, sound, food, creativity and community meet - built around a simple intention: helping you feel more grounded, present, and less alone.
            </p>

            {/* Magnetic CTAs */}
            <div className="hero-anim-item flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                ref={magneticBtnRef}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                onClick={scrollToExperiences}
                data-cursor="EXPLORE"
                className="px-8 py-3.5 bg-canvas text-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-terracotta hover:text-canvas transition-colors duration-300 rounded-full shadow-2xl flex items-center gap-2.5 group"
                style={{ transition: 'transform 0.15s ease-out, background-color 0.3s ease' }}
              >
                <Compass size={15} className="text-terracotta group-hover:text-canvas group-hover:rotate-45 transition-transform duration-300" />
                <span>Begin the journey</span>
              </button>


            </div>
          </div>

        </div>

        {/* Bottom Telemetry & Controls Bar */}
        <div
          ref={bottomBarRef}
          className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-30 px-6 sm:px-12 flex items-center justify-between pointer-events-none"
        >
          {/* Spatial Audio Prompt Left */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal/70 backdrop-blur-md border border-canvas/20 text-canvas text-[10px] tracking-wider uppercase font-medium shadow-md pointer-events-auto">
            <Volume2 size={13} className="text-ochre" />
            <span>Spatial Audio Ready</span>
          </div>

          {/* Center Scroll Prompt */}
          <div
            onClick={scrollToExperiences}
            data-cursor="SCROLL"
            className="mx-auto flex flex-col items-center gap-1.5 cursor-pointer group text-canvas/80 hover:text-canvas transition-colors pointer-events-auto"
          >
            <span className="text-[9px] sm:text-[10px] uppercase tracking-ultra font-medium group-hover:tracking-widest transition-all duration-300">
              Scroll for 3D Dive
            </span>
            <div className="w-4 h-7 rounded-full border border-canvas/40 flex justify-center p-0.5">
              <div className="w-1 h-2 bg-terracotta rounded-full animate-bounce" />
            </div>
          </div>

          {/* 3D Depth HUD Indicator Right */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-charcoal/70 backdrop-blur-md border border-canvas/20 text-canvas text-[10px] tracking-ultra uppercase font-mono shadow-xl pointer-events-auto">
            <Layers size={13} className="text-ochre" />
            <span>DEPTH: {depthPercent.toString().padStart(2, '0')}%</span>
            <div className="w-10 sm:w-14 h-1.5 bg-canvas/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-ochre transition-all duration-100 ease-out"
                style={{ width: `${depthPercent}%` }}
              />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
