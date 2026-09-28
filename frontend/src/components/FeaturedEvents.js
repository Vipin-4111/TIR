'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredEvents } from '@/data/events';
import { Calendar, Clock, User, ArrowUpRight, Sparkles } from 'lucide-react';
import { soundscape } from '@/lib/soundscape';

export default function FeaturedEvents({ onOpenBooking }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('.event-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="events"
      ref={containerRef}
      className="relative py-28 md:py-36 bg-canvas overflow-hidden border-b border-sand/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-[1px] bg-terracotta" />
              <span className="text-xs uppercase tracking-ultra text-terracotta font-semibold">
                Upcoming Gatherings
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-tight">
              Masterclasses & Intensives
            </h2>
          </div>
          <p className="text-charcoal-soft text-sm md:text-base max-w-md font-light leading-relaxed">
            Curated weekend immersions led by visiting masters in movement research, black-box theatrical performance, and harmonic sound architecture.
          </p>
        </div>

        {/* 2x2 Editorial Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="event-card group relative bg-canvas-subtle rounded-2xl overflow-hidden border border-sand/60 hover:border-charcoal/40 transition-all duration-500 hover:shadow-2xl flex flex-col justify-between"
              style={{ perspective: '1000px' }}
            >
              {/* Event Image */}
              <div className="relative w-full h-64 sm:h-72 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                
                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-canvas/90 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-charcoal font-semibold border border-sand/50">
                    {event.category}
                  </span>
                </div>

                {/* Remaining Seats Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-charcoal/90 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-ochre font-medium border border-sand/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ochre animate-pulse" />
                    {event.seatsLeft} spaces remaining
                  </span>
                </div>

                {/* Date & Title on image */}
                <div className="absolute bottom-4 left-4 right-4 text-canvas">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-ultra text-sand-light mb-1">
                    <Calendar size={13} className="text-ochre" />
                    <span>{event.date}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-canvas font-medium leading-snug group-hover:text-sand-light transition-colors">
                    {event.title}
                  </h3>
                </div>
              </div>

              {/* Event Content Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <p className="text-xs sm:text-sm text-charcoal-soft font-light leading-relaxed">
                  {event.description}
                </p>

                {/* Meta details */}
                <div className="space-y-2 pt-4 border-t border-sand/50 text-xs text-charcoal">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-charcoal-soft">
                      <User size={14} className="text-terracotta" />
                      <span>Led by:</span>
                    </div>
                    <span className="font-medium text-charcoal text-right">{event.instructor}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-charcoal-soft">
                      <Clock size={14} className="text-terracotta" />
                      <span>Schedule:</span>
                    </div>
                    <span className="font-medium text-charcoal">{event.time}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs uppercase tracking-wider text-charcoal-soft">Tuition / Pass:</span>
                    <span className="font-serif text-xl text-charcoal font-semibold">{event.price}</span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => {
                    soundscape.playChime(640);
                    onOpenBooking(event.category.toLowerCase().includes('theatre') ? 'theatre' : 'workshops');
                  }}
                  data-cursor="REGISTER"
                  className="w-full py-3.5 bg-canvas border border-charcoal/80 text-charcoal group-hover:bg-charcoal group-hover:text-canvas text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded flex items-center justify-center gap-2"
                >
                  <span>Reserve Intensive Pass</span>
                  <ArrowUpRight size={14} />
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Calendar Consultation Notice */}
        <div className="mt-14 p-8 rounded-2xl bg-canvas-subtle border border-sand/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
              <Sparkles size={22} />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl text-charcoal font-medium">
                Looking for Private Ensemble Hire or Custom Artist Residency?
              </h4>
              <p className="text-xs text-charcoal-soft font-light">
                We host intimate private rehearsals, choreography laboratories, and brand film productions.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenBooking('workshops')}
            className="px-6 py-3 bg-charcoal text-canvas text-xs uppercase tracking-widest hover:bg-terracotta transition-colors rounded-sm whitespace-nowrap"
          >
            Inquire Residency
          </button>
        </div>

      </div>
    </section>
  );
}
