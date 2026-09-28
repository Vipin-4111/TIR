'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState([]);
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;
    let rafId;

    const onMouseMove = (e) => {
      setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const render = () => {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(render);

    // Track hovered elements
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsHovered(true);
        setCursorText(target.getAttribute('data-cursor') || '');
      } else if (e.target.closest('button, a, input, textarea, select')) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    // Sound Ripple generation on click
    const handleClick = (e) => {
      const id = Date.now();
      setRipples(prev => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 850);
    };

    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Tiny precise center dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-charcoal pointer-events-none z-50 transition-opacity duration-300 hidden md:block"
        style={{ willChange: 'transform' }}
      />

      {/* Outer fluid follower ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 -ml-5 -mt-5 rounded-full flex items-center justify-center transition-all duration-300 ease-out hidden md:flex ${
          isHovered
            ? 'w-16 h-16 -ml-8 -mt-8 bg-charcoal/90 text-canvas text-[9px] tracking-widest font-medium uppercase backdrop-blur-sm scale-110 shadow-xl border border-sand/40'
            : 'w-10 h-10 border border-charcoal/30 bg-charcoal/[0.03]'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorText}
      </div>

      {/* Concentric sound water ripples on click */}
      {ripples.map(r => (
        <span
          key={r.id}
          className="fixed pointer-events-none z-40 rounded-full border border-terracotta/60 animate-ping"
          style={{
            left: r.x,
            top: r.y,
            width: '40px',
            height: '40px',
            marginLeft: '-20px',
            marginTop: '-20px',
            animationDuration: '0.8s',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          }}
        />
      ))}
    </>
  );
}
