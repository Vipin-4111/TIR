'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageIntro from '@/components/PageIntro';
import ScrollMedia from '@/components/ScrollMedia';
import { practiceRhythms } from '@/data/siteContent';

export default function PracticesPage() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.practice-row').forEach((row) => gsap.fromTo(row, { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 82%', once: true } }));
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={ref} className="relative z-20 min-h-screen bg-canvas text-charcoal">
      <Navbar />
      <PageIntro eyebrow="Curated Practices" title="Weekday rhythms at The Immersion Room." kicker="A week is not a checklist." text="These rhythms are invitations to notice how the room can meet you differently each day. Come to move, make, listen, share or simply reset the pace." />
      <section className="px-6 md:px-12 pb-32 md:pb-44">
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-28">
          {practiceRhythms.map((item, index) => (
            <article key={item.day} className={`practice-row grid lg:grid-cols-12 gap-10 lg:gap-20 items-center ${index % 2 ? 'lg:[&>.practice-media]:order-2' : ''}`}>
              <div className="lg:col-span-5">
                <div className="flex items-center justify-between mb-5"><span className="section-number">0{index + 1}</span><span className="eyebrow">{item.day}</span></div>
                <h2 className="section-title">{item.rhythm}</h2>
                <p className="supporting-text mt-6">{item.description}</p>
                <div className="mt-7 flex flex-wrap gap-2"><span className="px-3 py-2 rounded-full border border-sand text-[9px] uppercase tracking-widest text-charcoal-soft">{item.time}</span><span className="px-3 py-2 rounded-full border border-sand text-[9px] uppercase tracking-widest text-charcoal-soft">{item.category}</span></div>
              </div>
              <ScrollMedia src={item.image} alt={item.rhythm} className="practice-media lg:col-span-7 aspect-[4/3]" />
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
