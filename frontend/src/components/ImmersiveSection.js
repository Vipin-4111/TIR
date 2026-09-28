'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ImmersiveSection({
  eyebrow,
  title,
  text,
  image,
  video,
  align = 'left',
  number,
}) {
  const ref = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // Text reveal
      gsap.fromTo(
        '.immersive-copy',
        {
          y: reduceMotion ? 0 : 50,
          opacity: 0,
          rotateX: reduceMotion ? 0 : 8,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: reduceMotion ? 0.4 : 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 72%',
            once: true,
          },
        }
      );

      // Cinematic media zoom
      if (!reduceMotion && mediaRef.current) {
        gsap.fromTo(
          mediaRef.current,
          {
            scale: 1.12,
            y: 30,
          },
          {
            scale: 1,
            y: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden"
    >
      <div
        className={`max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-20 items-center ${
          align === 'right'
            ? 'lg:[&>.immersive-copy]:order-2'
            : ''
        }`}
      >

        {/* TEXT */}
        <div
          className="lg:col-span-5 immersive-copy relative z-10"
          style={{ perspective: '1200px' }}
        >
          {number && (
            <span className="section-number">
              {number}
            </span>
          )}

          <span className="eyebrow block mb-4">
            {eyebrow}
          </span>

          <h2 className="section-title mb-6">
            {title}
          </h2>

          <p className="supporting-text">
            {text}
          </p>
        </div>

        {/* MEDIA */}
        <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden rounded-2xl bg-charcoal">

          <div
            ref={mediaRef}
            className="absolute inset-0 will-change-transform"
          >

            {video ? (
              <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
              />
            ) : null}

          </div>

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />

        </div>

      </div>
    </section>
  );
}