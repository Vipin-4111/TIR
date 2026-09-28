'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageIntro from '@/components/PageIntro';
import { eventCategories, featuredEvents } from '@/data/events';

export default function EventsPage() {
  const ref = useRef(null);
  const [category, setCategory] = useState('All');
  const filtered = useMemo(() => category === 'All' ? featuredEvents : featuredEvents.filter(e => e.category === category), [category]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.event-page-card').forEach((card, i) => gsap.fromTo(card, { opacity: 0, y: 60, rotateX: 5 }, { opacity: 1, y: 0, rotateX: 0, duration: .9, delay: i * .04, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 86%', once: true } }));
    }, ref);
    return () => ctx.revert();
  }, [category]);

  return (
    <main ref={ref} className="relative z-20 min-h-screen bg-canvas text-charcoal">
      <Navbar />
      <PageIntro eyebrow="The calendar" title="Events that become experiences." kicker="One room. Many ways to gather." text="The calendar changes with the room. Movement practices, workshops, sound, food, makers and community circles — each one is an invitation to spend time here, not a product to rush toward." />

      <section className="px-6 md:px-12 pb-28 md:pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-4 border-b border-sand/60">
            {eventCategories.map((item) => (
              <button key={item} onClick={() => setCategory(item)} className={`shrink-0 px-4 py-2.5 rounded-full border text-[9px] uppercase tracking-widest transition-all duration-500 ${category === item ? 'bg-charcoal text-canvas border-charcoal' : 'border-sand text-charcoal-soft hover:scale-[1.04] hover:border-terracotta hover:text-terracotta'}`}>
                {item}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-10 perspective-1500">
            {filtered.map((event) => (
              <article key={event.id} className="event-page-card theme-panel rounded-[1.4rem] overflow-hidden group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={event.image} alt={event.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-canvas/85 backdrop-blur-md text-[9px] uppercase tracking-widest text-charcoal">{event.category}</span>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] uppercase tracking-widest text-charcoal-soft mb-5">
                    <span className="inline-flex items-center gap-1.5"><CalendarDays size={12} className="text-terracotta" />{event.date}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock3 size={12} className="text-terracotta" />{event.time}</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl leading-none font-light text-charcoal">{event.title}</h2>
                  <p className="mt-4 text-sm text-charcoal-soft leading-7">{event.description}</p>
                  <div className="mt-7 pt-5 border-t border-sand/60 flex items-center justify-between gap-5">
                    <div><p className="text-[9px] uppercase tracking-widest text-charcoal-soft">With</p><p className="text-xs mt-1 text-charcoal">{event.host}</p></div>
                    <div className="text-right"><p className="text-[9px] uppercase tracking-widest text-charcoal-soft">Contribution</p><p className="font-serif text-xl text-charcoal mt-1">{event.price}</p></div>
                  </div>
                  <button className="mt-7 w-full rounded-full border border-charcoal/50 py-3 text-[9px] uppercase tracking-widest text-charcoal hover:bg-charcoal hover:text-canvas transition-all duration-500 flex items-center justify-center gap-2">
                    Read the invitation <ArrowUpRight size={13} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-24 max-w-3xl mx-auto text-center">
            <span className="eyebrow">The calendar is only one doorway</span>
            <h2 className="section-title mt-5">You can also enter through a practice, a room, or a community evening.</h2>
            <Link href="/practices" className="inline-flex items-center gap-2 mt-8 text-[9px] uppercase tracking-widest text-terracotta">Explore weekday rhythms <ArrowUpRight size={13} /></Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
