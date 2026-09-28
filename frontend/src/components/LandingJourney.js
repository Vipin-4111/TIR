'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Feather,
  Sun,
  Shield,
  Compass,
} from 'lucide-react';

import ScrollMedia from '@/components/ScrollMedia';

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    number: '01',
    eyebrow: 'Arrive',
    title: 'A room that asks nothing from you.',
    text: 'Step away from the pace outside. The first practice is simply noticing where you are — breath, light, floor, sound.',
    image:
      '/gallery/room.jpg',
  },
  {
    number: '02',
    eyebrow: 'Move',
    title: 'Let the body become the guide.',
    text: 'Movement, yoga, sound and creative practice share the same room because the point is not the discipline. It is what you feel after.',
    image:
      '/gallery/yoga.jpg',
  },
  {
    number: '03',
    eyebrow: 'Connect',
    title: 'Be around people without having to perform.',
    text: 'A drum circle, a shared table, a workshop, an open evening. Community here is spacious enough for conversation and quiet.',
    image:
      '/gallery/people.jpg',
  },
];

export default function Introduction() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const imageOneRef = useRef(null);
  const imageTwoRef = useRef(null);
  const textColRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      /*
       * ---------------------------------------------------------
       * INTRODUCTION REVEAL
       * ---------------------------------------------------------
       */

      gsap.fromTo(
        quoteRef.current?.querySelectorAll('.intro-reveal'),
        {
          y: reduceMotion ? 0 : 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: reduceMotion ? 0 : 0.18,
          duration: reduceMotion ? 0.4 : 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      /*
       * ---------------------------------------------------------
       * MAIN EDITORIAL IMAGE PARALLAX
       * ---------------------------------------------------------
       */

      if (!reduceMotion) {
        gsap.to(imageOneRef.current, {
          y: -90,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        gsap.to(imageTwoRef.current, {
          y: -160,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }

      /*
       * ---------------------------------------------------------
       * ARCHITECTURE TEXT REVEAL
       * ---------------------------------------------------------
       */

      gsap.fromTo(
        textColRef.current,
        {
          y: reduceMotion ? 0 : 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: reduceMotion ? 0.4 : 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textColRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );

      /*
       * ---------------------------------------------------------
       * JOURNEY SECTION REVEALS
       * ---------------------------------------------------------
       */

      gsap.utils.toArray('.journey-scene').forEach((scene) => {
        const copy = scene.querySelector('.scene-copy');
        const orb = scene.querySelector('.scene-orb');

        gsap.fromTo(
          copy,
          {
            opacity: 0,
            y: reduceMotion ? 0 : 70,
            rotateX: reduceMotion ? 0 : 8,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: reduceMotion ? 0.4 : 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scene,
              start: 'top 72%',
              once: true,
            },
          }
        );

        if (!reduceMotion && orb) {
          const direction =
            Number(scene.dataset.index) % 2 ? -22 : 22;
          const rotation =
            Number(scene.dataset.index) % 2 ? -10 : 10;

          gsap.to(orb, {
            yPercent: direction,
            rotate: rotation,
            ease: 'none',
            scrollTrigger: {
              trigger: scene,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });

      /*
       * ---------------------------------------------------------
       * FINAL INVITATION
       * ---------------------------------------------------------
       */

      gsap.fromTo(
        '.invitation-content',
        {
          opacity: 0,
          y: reduceMotion ? 0 : 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0.4 : 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.invitation-content',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="introduction"
      ref={sectionRef}
      className="relative bg-canvas overflow-hidden"
    >

      {/* =====================================================
          01 — STUDIO MANIFESTO
      ====================================================== */}

      <section className="relative py-28 md:py-40 border-b border-sand/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Editorial Label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-12 h-[1px] bg-terracotta" />

            <span className="text-xs uppercase tracking-ultra text-terracotta font-semibold">
              The Studio Manifesto
            </span>
          </div>

          {/* Main Statement */}
          <div
            ref={quoteRef}
            className="max-w-5xl mb-20 md:mb-28 space-y-4"
          >
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-charcoal leading-[1.15] tracking-tight">

              <span className="intro-reveal block">
                More than a studio.
              </span>

              <span className="intro-reveal block italic font-normal text-terracotta-dark">
                A space to feel alive.
              </span>

            </h2>

            <p className="intro-reveal text-charcoal-soft text-lg md:text-2xl font-light leading-relaxed max-w-3xl pt-4">
              In the heart of Gurgaon’s high-velocity urban grid,
              we carved out a rare sanctuary of acoustic clarity,
              movement, natural material, and natural light. Here,
              the noise slows down, and the body speaks.
            </p>
          </div>

          {/* =================================================
              ARCHITECTURAL IMAGE COMPOSITION
          ================================================== */}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Images */}
            <div className="lg:col-span-7 relative min-h-[500px] md:min-h-[640px] flex items-center">

              {/* Primary Image */}
              <div
                ref={imageOneRef}
                className="relative w-[80%] md:w-[75%] h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-xl border border-sand/50 z-10"
              >
                <Image
                  src="/gallery/image1.jpg"
                  alt="Sunlit architectural interior"
                  fill
                  sizes="(max-width: 768px) 80vw, 45vw"
                  className="object-cover object-center"
                />

                <div className="absolute bottom-4 left-4 bg-canvas/90 backdrop-blur-md px-3.5 py-1.5 rounded text-[10px] uppercase tracking-widest text-charcoal font-medium border border-sand/40">
                  The Studio
                </div>
              </div>

              {/* Secondary Image */}
              <div
                ref={imageTwoRef}
                className="absolute right-0 top-1/4 w-[50%] md:w-[48%] h-[320px] md:h-[380px] rounded-2xl overflow-hidden shadow-2xl border-4 border-canvas z-20 hidden sm:block"
              >
                <Image
                  src="/gallery/image2.jpg"
                  alt="Contemporary movement practice"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover object-center"
                />

                <div className="absolute bottom-4 left-4 bg-charcoal/85 backdrop-blur-md px-3.5 py-1.5 rounded text-[10px] uppercase tracking-widest text-canvas font-medium">
                  Presence & Breath
                </div>
              </div>

            </div>

            {/* Architecture Copy */}
            <div
              ref={textColRef}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-4">

                <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
                  The Architecture of Sensory Presence
                </span>

                <h3 className="font-serif text-2xl md:text-3xl font-normal text-charcoal leading-snug">
                  Built around the body, the senses, and the feeling of being present.
                </h3>

                <p className="text-charcoal-soft text-sm md:text-base leading-relaxed font-light">
                  Every surface and detail of The Immersion Room is
                  considered to support presence — from the floor beneath
                  your feet to the quality of light and the quietness of
                  the room.
                </p>

              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-sand/60">

                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-full bg-canvas-subtle border border-sand/70 flex items-center justify-center text-terracotta">
                    <Sun size={17} />
                  </div>

                  <h4 className="font-serif text-lg text-charcoal font-medium">
                    Natural Light
                  </h4>

                  <p className="text-xs text-charcoal-soft leading-normal">
                    Daylight that keeps the room calm, open and grounded.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-full bg-canvas-subtle border border-sand/70 flex items-center justify-center text-terracotta">
                    <Feather size={17} />
                  </div>

                  <h4 className="font-serif text-lg text-charcoal font-medium">
                    Body First
                  </h4>

                  <p className="text-xs text-charcoal-soft leading-normal">
                    A physical environment designed around movement and ease.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-full bg-canvas-subtle border border-sand/70 flex items-center justify-center text-terracotta">
                    <Shield size={17} />
                  </div>

                  <h4 className="font-serif text-lg text-charcoal font-medium">
                    Acoustic Stillness
                  </h4>

                  <p className="text-xs text-charcoal-soft leading-normal">
                    A quieter environment for deeper attention and practice.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-full bg-canvas-subtle border border-sand/70 flex items-center justify-center text-terracotta">
                    <Compass size={17} />
                  </div>

                  <h4 className="font-serif text-lg text-charcoal font-medium">
                    Interdisciplinary
                  </h4>

                  <p className="text-xs text-charcoal-soft leading-normal">
                    Dance, theatre, yoga, art and community in one room.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          02 — JOURNEY INTRO
      ====================================================== */}

      <section className="px-6 md:px-12 py-24 md:py-36">
        <div className="max-w-5xl mx-auto text-center">

          <span className="text-xs uppercase tracking-ultra text-terracotta font-semibold">
            Not a schedule. A way of being.
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light text-charcoal leading-[.95] mt-5">
            Come for one thing.
            <br />
            <span className="italic text-terracotta-dark">
              Leave with a little more space.
            </span>
          </h2>

          <p className="text-charcoal-soft text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mt-7">
            The Immersion Room is a multidisciplinary space for
            movement, yoga, theatre, art, sound and connection.
            Some days begin with movement. Some end around a table.
            What connects them is the feeling the room is designed to hold.
          </p>

        </div>
      </section>


      {/* =====================================================
          03 — AMBIENT VIDEO
      ====================================================== */}

      <section className="px-4 md:px-8 py-10 md:py-20">

        <div className="max-w-[1500px] mx-auto relative overflow-hidden rounded-[1.5rem] border border-sand/50 shadow-2xl aspect-[16/8] bg-charcoal">

          <video
            src="/media/immersion-ambient.mp4"
            poster="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=88"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/15 to-transparent" />

          <div className="absolute inset-0 flex items-center px-8 md:px-16">

            <div className="max-w-xl text-canvas">

              <span className="text-xs uppercase tracking-ultra text-ochre">
                A room in motion
              </span>

              <h2 className="font-serif text-5xl md:text-8xl font-light leading-[.86] mt-5">
                Notice how the atmosphere changes you.
              </h2>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          04 — THREE PART JOURNEY
      ====================================================== */}

      <div className="relative">

        {scenes.map((scene, index) => (

          <section
            key={scene.number}
            data-index={index}
            className="journey-scene relative py-24 md:py-40 px-6 md:px-12 overflow-hidden"
          >

            {/* Decorative depth orb */}
            <div
              className="scene-orb depth-orb"
              style={{
                left: index % 2 ? '72%' : '-7%',
                top: '28%',
              }}
            />

            <div
              className={`max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                index % 2
                  ? 'lg:[&>.scene-copy]:order-2'
                  : ''
              }`}
            >

              {/* Copy */}
              <div
                className="scene-copy lg:col-span-5 relative z-10"
                style={{
                  perspective: '1200px',
                }}
              >

                <span className="block text-terracotta text-sm tracking-[0.2em] font-medium mb-3">
                  {scene.number}
                </span>

                <span className="block text-xs uppercase tracking-ultra text-terracotta font-semibold mb-5">
                  {scene.eyebrow}
                </span>

                <h2 className="font-serif text-4xl md:text-6xl font-light text-charcoal leading-[.95] mb-6">
                  {scene.title}
                </h2>

                <p className="text-charcoal-soft text-base md:text-lg font-light leading-relaxed max-w-md">
                  {scene.text}
                </p>

              </div>

              {/* Image */}
              <ScrollMedia
                src={scene.image}
                alt={scene.title}
                className="lg:col-span-7 aspect-[4/3]"
              />

            </div>
          </section>

        ))}

      </div>


      {/* =====================================================
          05 — FINAL INVITATION
      ====================================================== */}

      <section className="px-6 md:px-12 py-32 md:py-48">

        <div className="invitation-content max-w-4xl mx-auto text-center">

          <span className="text-xs uppercase tracking-ultra text-terracotta font-semibold">
            The Invitation
          </span>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl font-light text-charcoal leading-[.88] mt-6 max-w-[11ch] mx-auto">
            Enter when you are ready.
          </h2>

          <p className="text-charcoal-soft text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mt-8">
            Explore a practice, wander through the room, meet the
            people in it, or simply begin with a breath. The rest
            can unfold from there.
          </p>

          <div className="mt-10">
            <a
              href="#schedule"
              className="inline-flex items-center justify-center rounded-full border border-charcoal px-7 py-3 text-sm uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-canvas"
            >
              Explore the room
            </a>
          </div>

        </div>

      </section>

    </section>
  );
}