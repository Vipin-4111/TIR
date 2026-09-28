  'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Clock3, Headphones, Pause, Play, X } from 'lucide-react';
import { galleryCategories, galleryCollections, galleryJourney } from '@/data/gallery';
import { soundscape } from '@/lib/soundscape';

export default function GalleryPage() {
  const pageRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selected, setSelected] = useState(null);
  const [ambientOn, setAmbientOn] = useState(false);

  const filtered = useMemo(() => (
    activeCategory === 'all'
      ? galleryCollections
      : galleryCollections.filter((item) => item.categoryId === activeCategory)
  ), [activeCategory]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-hero-copy', { y: 45, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.1,
      });

      gsap.utils.toArray('.journey-step').forEach((step, index) => {
        gsap.fromTo(step, { y: 55, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, delay: index * 0.04, ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 84%', once: true },
        });
      });

      gsap.utils.toArray('.gallery-item').forEach((card, index) => {
        gsap.fromTo(card, { y: 70, opacity: 0, rotateX: 4 }, {
          y: 0, opacity: 1, rotateX: 0, duration: 1.05, delay: Math.min(index * 0.06, 0.3),
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 86%', once: true },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [activeCategory]);

  useEffect(() => {
    if (!selected) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [selected]);

  const toggleAmbient = () => {
    const next = soundscape.toggle();
    setAmbientOn(next);
  };

  const chooseCategory = (id) => {
    setActiveCategory(id);
    soundscape.playChime(id === 'all' ? 528 : 620);
  };

  return (
    <main ref={pageRef} className="relative z-20 min-h-screen bg-canvas text-charcoal overflow-hidden">
      {/* Hero: deliberately padded below the floating navbar so nothing sits behind it. */}
      <section className="relative min-h-[92vh] pt-40 md:pt-48 pb-24 px-6 md:px-12 flex items-end">
        <div className="max-w-7xl mx-auto w-full">
          <div className="gallery-hero-copy max-w-5xl">
            <div className="flex items-center gap-3 mb-7">
              <span className="w-12 h-px bg-terracotta" />
              <span className="text-[10px] md:text-xs uppercase tracking-ultra text-terracotta">Gallery · On demand</span>
            </div>
            <p className="text-xs md:text-sm uppercase tracking-widest text-charcoal/45 mb-5">A digital doorway into The Immersion Room</p>
            <h1 className="font-serif text-6xl sm:text-7xl md:text-[8.5rem] leading-[0.82] font-light tracking-tight max-w-5xl">
              Come in.<br />Stay awhile.
            </h1>
            <p className="mt-9 max-w-2xl text-sm md:text-base text-charcoal/65 leading-[1.8] font-light">
              This is not a catalogue of things to buy. It is a small collection of moments from the room — practices, voices and ways of paying attention that you can return to when you need them.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleAmbient}
                className="inline-flex items-center gap-2 rounded-full border border-canvas/20 bg-canvas/5 px-4 py-2.5 text-[10px] uppercase tracking-widest text-charcoal/75 hover:border-terracotta/70 hover:text-charcoal transition-all"
              >
                {ambientOn ? <Pause size={13} /> : <Headphones size={13} />}
                {ambientOn ? 'Quiet the room' : 'Enter with sound'}
              </button>
              <a href="#collections" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-charcoal/45 hover:text-charcoal transition-colors">
                Explore the room <ArrowDown size={13} />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute right-[8%] top-[34%] hidden md:block w-28 h-28 rounded-full border border-terracotta/25 animate-[galleryFloat_7s_ease-in-out_infinite]" aria-hidden="true">
          <div className="absolute inset-5 rounded-full border border-terracotta/20" />
          <div className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-terracotta -translate-x-1/2 -translate-y-1/2" />
        </div>
      </section>

      {/* Journey narrative: makes the gallery feel like an invitation, not a shop. */}
      <section className="border-y border-canvas/10 bg-charcoal/70">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-xl mb-14">
            <span className="text-[10px] uppercase tracking-ultra text-ochre">A gentle journey</span>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl font-light leading-none">There is no right way in.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {galleryJourney.map((step) => (
              <div key={step.number} className="journey-step border-t border-canvas/15 pt-5">
                <span className="text-[10px] tracking-widest text-terracotta">{step.number}</span>
                <h3 className="font-serif text-3xl font-light mt-7">{step.title}</h3>
                <p className="mt-4 text-xs md:text-sm text-charcoal/55 leading-7 max-w-xs">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="collections" className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-ultra text-terracotta">The collection</span>
              <h2 className="mt-4 font-serif text-5xl md:text-7xl font-light leading-[0.92]">Choose a doorway.</h2>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 max-w-full">
              <button
                type="button"
                onClick={() => chooseCategory('all')}
                className={`shrink-0 px-4 py-2.5 rounded-full border text-[10px] uppercase tracking-widest transition-all ${activeCategory === 'all' ? 'bg-canvas text-charcoal border-canvas' : 'border-canvas/20 text-charcoal/55 hover:border-canvas/50 hover:text-canvas'}`}
              >
                Everything
              </button>
              {galleryCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => chooseCategory(category.id)}
                  className={`shrink-0 px-4 py-2.5 rounded-full border text-[10px] uppercase tracking-widest transition-all ${activeCategory === category.id ? 'bg-canvas text-charcoal border-canvas' : 'border-canvas/20 text-charcoal/55 hover:border-canvas/50 hover:text-canvas'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {activeCategory !== 'all' && (
            <div className="mb-10 max-w-2xl border-l border-terracotta/50 pl-5">
              <p className="text-[10px] uppercase tracking-widest text-terracotta mb-2">
                {galleryCategories.find((category) => category.id === activeCategory)?.eyebrow}
              </p>
              <p className="text-sm text-charcoal/55 leading-7">
                {galleryCategories.find((category) => category.id === activeCategory)?.intro}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 perspective-1500">
            {filtered.map((item, index) => {
              const featured = index === 0;
              const span = featured ? 'md:col-span-7' : 'md:col-span-5';
              const height = featured ? 'min-h-[520px] md:min-h-[700px]' : 'min-h-[430px] md:min-h-[520px]';
              return (
                <article key={item.id} className={`gallery-item ${span} ${height} relative group preserve-3d`}>
                  <button
                    type="button"
                    onClick={() => { soundscape.playChime(700); setSelected(item); }}
                    className="absolute inset-0 w-full h-full overflow-hidden rounded-[1.5rem] border border-canvas/10 bg-canvas-subtle text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  >
                    {item.media.type === 'video' ? (
                      <video
                        className="absolute inset-0 w-full h-full object-cover scale-[1.01] group-hover:scale-105 transition-transform duration-[1400ms] ease-out"
                        src={item.media.src}
                        poster={item.media.poster}
                        muted
                        loop
                        autoPlay
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <Image
                        src={item.media.src}
                        alt={item.title}
                        fill
                        sizes={featured ? '(max-width: 768px) 100vw, 58vw' : '(max-width: 768px) 100vw, 42vw'}
                        className="object-cover scale-[1.01] group-hover:scale-105 transition-transform duration-[1400ms] ease-out"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-x-0 top-0 p-5 md:p-7 flex justify-between items-start">
                      <span className="px-3 py-1.5 rounded-full bg-charcoal/55 backdrop-blur-md border border-canvas/15 text-[9px] uppercase tracking-widest text-charcoal/75">{item.label}</span>
                      <span className="w-10 h-10 rounded-full border border-canvas/20 bg-charcoal/30 backdrop-blur-md flex items-center justify-center text-charcoal/80 group-hover:bg-canvas group-hover:text-charcoal transition-all duration-500">
                        {item.media.type === 'video' ? <Play size={13} fill="currentColor" /> : <ArrowUpRight size={15} />}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                      <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-charcoal/55 mb-3">
                        <span>{item.mood}</span><span className="w-1 h-1 rounded-full bg-terracotta" /><Clock3 size={11} /><span>{item.duration}</span>
                      </div>
                      <h3 className="font-serif text-3xl md:text-5xl font-light leading-[0.95] max-w-xl">{item.title}</h3>
                      <p className="mt-4 max-w-xl text-xs md:text-sm text-charcoal/60 leading-6 line-clamp-2">{item.description}</p>
                      <div className="mt-6 flex items-center gap-2 text-[9px] uppercase tracking-widest text-charcoal/50 group-hover:text-terracotta transition-colors">
                        Open this moment <ArrowUpRight size={12} />
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-28 md:py-40 border-t border-canvas/10 bg-canvas-subtle">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] uppercase tracking-ultra text-terracotta">When you're ready</span>
          <h2 className="font-serif text-5xl md:text-8xl font-light leading-[0.88] mt-5">The room is here.<br /><em>Come experience it.</em></h2>
          <p className="mt-7 text-sm text-charcoal/55 leading-7 max-w-xl mx-auto">The gallery can give you a glimpse. The real journey happens in the room, with other people, in real time.</p>
          <Link href="/#events" className="inline-flex items-center gap-2 mt-9 px-6 py-3 rounded-full bg-canvas text-charcoal text-[10px] uppercase tracking-widest hover:bg-terracotta hover:text-charcoal transition-colors">
            See what's happening <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-[80] bg-charcoal/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10" role="dialog" aria-modal="true" aria-label={`${selected.title} detail`}>
          <button type="button" onClick={() => setSelected(null)} aria-label="Close" className="absolute top-5 right-5 md:top-8 md:right-8 z-10 w-11 h-11 rounded-full border border-canvas/20 bg-canvas/5 text-charcoal flex items-center justify-center hover:bg-canvas hover:text-charcoal transition-colors">
            <X size={18} />
          </button>
          <div className="w-full max-w-6xl max-h-[92vh] overflow-auto rounded-[1.5rem] border border-canvas/10 bg-canvas-subtle grid lg:grid-cols-[1.25fr_0.75fr]">
            <div className="relative min-h-[46vh] lg:min-h-[72vh] bg-charcoal">
              {selected.media.type === 'video' ? (
                <video className="absolute inset-0 w-full h-full object-cover" src={selected.media.src} poster={selected.media.poster} controls playsInline preload="metadata" />
              ) : (
                <Image src={selected.media.src} alt={selected.title} fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" />
              )}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 bg-gradient-to-t from-charcoal to-transparent pointer-events-none">
                <span className="text-[9px] uppercase tracking-widest text-charcoal/60">{selected.category}</span>
              </div>
            </div>
            <div className="p-7 md:p-10 lg:p-12 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-ultra text-terracotta">{selected.label}</span>
              <h2 className="font-serif text-4xl md:text-6xl font-light leading-none mt-4">{selected.title}</h2>
              <p className="mt-6 text-sm text-charcoal/60 leading-7">{selected.description}</p>
              <div className="mt-8 border-t border-canvas/10 pt-6">
                <p className="text-[9px] uppercase tracking-widest text-charcoal/40 mb-4">Within this session</p>
                <div className="space-y-3">
                  {selected.sessions.map((session, index) => (
                    <div key={session} className="flex items-center gap-3 text-xs text-charcoal/70">
                      <span className="text-terracotta font-serif text-lg">0{index + 1}</span>
                      <span>{session}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="mt-9 self-start inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-charcoal/50 hover:text-charcoal transition-colors">
                Return to collection <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
