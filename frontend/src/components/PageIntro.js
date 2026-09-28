'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageIntro({ eyebrow, title, text, kicker }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-intro-item', { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <header ref={ref} className="page-intro relative z-20 px-6 md:px-12 pt-40 md:pt-48 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto">
        <div className="page-intro-item flex items-center gap-3 mb-6">
          <span className="w-10 h-px bg-accent-terracotta" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-20 items-end">
          <h1 className="page-intro-item display-title">{title}</h1>
          <div className="page-intro-item max-w-xl">
            {kicker && <p className="kicker mb-4">{kicker}</p>}
            <p className="supporting-text">{text}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
