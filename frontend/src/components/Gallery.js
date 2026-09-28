'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Clock3, Headphones, Play, X } from 'lucide-react';
import { galleryCollections } from '@/data/gallery';

export default function Gallery() {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filters = ['All', 'Movement & Yoga', 'Workshops & Training'];
  const filteredCollections = activeFilter === 'All'
    ? galleryCollections
    : galleryCollections.filter((item) => item.category === activeFilter);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-card',
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeFilter]);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <>
      <section
        id="gallery"
        ref={containerRef}
        className="relative py-28 md:py-36 bg-charcoal text-canvas overflow-hidden border-b border-charcoal-muted"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-[1px] bg-terracotta" />
                <span className="text-xs uppercase tracking-ultra text-terracotta font-semibold">
                  Gallery • On-demand
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light tracking-tight leading-[0.98]">
                Return to the room, whenever you are ready.
              </h2>
              <p className="mt-6 text-sm md:text-base text-canvas/65 max-w-2xl font-light leading-relaxed">
                A quiet collection of guided practices and selected workshop recordings. Curated as a library, not a feed — no trending scores, no view counts, no pressure to keep up.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full border text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-canvas text-charcoal border-canvas'
                      : 'bg-transparent text-canvas/65 border-canvas/20 hover:border-canvas/50 hover:text-canvas'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {filteredCollections.map((item, index) => {
              const featured = index === 0;
              const span = featured ? 'md:col-span-7' : index % 3 === 0 ? 'md:col-span-7' : 'md:col-span-5';
              const height = featured ? 'h-[420px] md:h-[620px]' : 'h-[330px] md:h-[420px]';

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item)}
                  className={`gallery-card ${span} ${height} group relative overflow-hidden rounded-2xl border border-canvas/10 text-left opacity-0`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={featured ? '(max-width: 768px) 100vw, 58vw' : '(max-width: 768px) 100vw, 42vw'}
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal/60 backdrop-blur-md border border-canvas/15 text-[10px] uppercase tracking-widest text-canvas/80">
                        {item.label}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-canvas/65">
                        <Clock3 size={12} /> {item.duration}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-4xl font-light leading-tight text-canvas">
                      {item.title}
                    </h3>
                    <div className="flex items-end justify-between gap-5 mt-3">
                      <p className="text-xs md:text-sm text-canvas/65 font-light leading-relaxed max-w-xl line-clamp-2">
                        {item.description}
                      </p>
                      <span className="shrink-0 w-11 h-11 rounded-full bg-canvas text-charcoal flex items-center justify-center group-hover:bg-terracotta group-hover:text-canvas transition-colors duration-300">
                        <Play size={15} fill="currentColor" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-[80] bg-charcoal/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} series detail`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-canvas text-charcoal border border-sand/60 shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[300px] lg:min-h-[560px]">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                <div className="absolute left-5 right-5 bottom-5 flex items-center justify-between text-canvas">
                  <span className="text-[10px] uppercase tracking-ultra text-sand-light">{selected.category}</span>
                  <span className="inline-flex items-center gap-2 text-xs text-sand-light">
                    <Headphones size={14} /> {selected.duration}
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-10 relative">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full border border-sand/60 flex items-center justify-center hover:bg-canvas-subtle transition-colors"
                  aria-label="Close gallery detail"
                >
                  <X size={16} />
                </button>

                <span className="text-[10px] uppercase tracking-ultra text-terracotta font-semibold">{selected.label}</span>
                <h3 className="font-serif text-4xl md:text-5xl font-light leading-tight mt-3 pr-8">{selected.title}</h3>
                <p className="text-sm text-charcoal-soft font-light leading-relaxed mt-5">{selected.description}</p>

                <div className="mt-9 pt-6 border-t border-sand/50">
                  <span className="text-[10px] uppercase tracking-ultra text-charcoal-soft">Series detail</span>
                  <div className="mt-4 space-y-3">
                    {selected.sessions.map((session, index) => (
                      <div key={session} className="flex items-center justify-between gap-4 py-3 border-b border-sand/40 last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-terracotta">0{index + 1}</span>
                          <span className="text-sm text-charcoal">{session}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-charcoal-soft">Session</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-canvas-subtle border border-sand/50 text-xs text-charcoal-soft leading-relaxed">
                  This gallery is ready for recorded media to be connected. The supplied project does not include video/audio files, so the series detail remains intentionally quiet rather than showing placeholder playback.
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-charcoal text-canvas text-[10px] uppercase tracking-widest hover:bg-terracotta transition-colors"
                >
                  Close series detail
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
