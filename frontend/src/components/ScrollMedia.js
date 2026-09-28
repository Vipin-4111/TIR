'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollMedia({ src, alt, type = 'image', poster, className = '', children }) {
  const wrapper = useRef(null);
  const media = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(media.current, { scale: 1.14, yPercent: -4 }, {
        scale: 1, yPercent: 4, ease: 'none',
        scrollTrigger: { trigger: wrapper.current, start: 'top bottom', end: 'bottom top', scrub: 1.1 }
      });
      gsap.fromTo(wrapper.current, { borderRadius: 34 }, {
        borderRadius: 18, ease: 'none',
        scrollTrigger: { trigger: wrapper.current, start: 'top 85%', end: 'top 25%', scrub: 1 }
      });
    }, wrapper);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapper} className={`scroll-media relative overflow-hidden ${className}`}>
      <div ref={media} className="absolute inset-[-6%] will-change-transform">
        {type === 'video' ? (
          <video src={src} poster={poster} autoPlay muted loop playsInline className="h-full w-full object-cover" />
        ) : (
          <Image src={src} alt={alt || ''} fill sizes="100vw" className="object-cover" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      {children}
    </div>
  );
}
