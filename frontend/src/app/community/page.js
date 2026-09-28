'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageIntro from '@/components/PageIntro';
import ScrollMedia from '@/components/ScrollMedia';
import { communityMoments } from '@/data/siteContent';

export default function CommunityPage() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.community-card').forEach((card, i) => gsap.fromTo(card, { opacity: 0, y: 60, rotateY: i % 2 ? -4 : 4 }, { opacity: 1, y: 0, rotateY: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 82%', once: true } }));
    }, ref);
    return () => ctx.revert();
  }, []);

  
  return (
  <main
    ref={ref}
    className="relative z-20 min-h-screen bg-canvas text-charcoal"
  >
    {/* Navbar */}
    <Navbar />

    {/* Page Introduction */}
    <PageIntro
      eyebrow="Community"
      title="The room becomes alive through people."
      kicker="Come as you are. Stay as long as you like."
      text="Community here is not a membership metric. It is the simple experience of being around other people while something shared is happening — a rhythm, a meal, a story, a making session."
    />

    {/* =====================================================
        COMMUNITY MOMENTS
    ====================================================== */}
    <section className="px-6 md:px-12 pb-32 md:pb-44">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {communityMoments.map((item, i) => (
          <article
            key={item.title}
            className="community-card theme-panel rounded-[1.4rem] overflow-hidden group border border-sand/50"
          >
            {/* Image */}
            <ScrollMedia
              src={item.image}
              alt={item.title}
              className="aspect-[4/3]"
            >
              {/* Image Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-canvas bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <span className="block text-[9px] uppercase tracking-ultra text-canvas/70">
                  0{i + 1}
                </span>

                <h2 className="font-serif text-4xl md:text-5xl font-light leading-none mt-3">
                  {item.title}
                </h2>
              </div>
            </ScrollMedia>

            {/* Description */}
            <div className="p-6 md:p-8 bg-canvas">
              <p className="supporting-text">
                {item.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* =====================================================
        CLOSING STATEMENT
    ====================================================== */}
    <section className="px-6 md:px-12 py-28 md:py-40 bg-canvas-subtle border-y border-sand/50">
      <div className="max-w-4xl mx-auto text-center">
        <span className="eyebrow">
          A softer kind of together
        </span>

        <h2 className="section-title mt-5">
          No audience. No performance. Just a room full of people making
          space for one another.
        </h2>
      </div>
    </section>

    {/* Footer */}
    <Footer />
  </main>
);
}
