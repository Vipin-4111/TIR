'use client';

import Link from 'next/link';
import { ArrowUpRight, Instagram, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { soundscape } from '@/lib/soundscape';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); if (!email) return; setEmail(''); setSent(true); soundscape.playChime(680); };
  return (
    <footer className="bg-charcoal text-canvas pt-24 pb-10 border-t border-charcoal-muted">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-charcoal-muted">
          <div className="lg:col-span-5">
            <span className="font-serif text-3xl md:text-5xl font-light block">The Immersion Room</span>
            <p className="mt-5 text-sm text-canvas/60 leading-7 max-w-md">A multidisciplinary wellness sanctuary built around one intention: helping people feel grounded, present and less alone.</p>
            <p className="mt-6 text-xs text-canvas/50 flex items-start gap-2"><MapPin size={14} className="text-ochre mt-0.5 shrink-0" /> Golf Course Road, Gurgaon</p>
          </div>
          <div className="lg:col-span-3 grid grid-cols-2 gap-8 text-xs">
            <div><p className="eyebrow text-ochre mb-4">Explore</p><div className="space-y-3"><Link href="/enter-the-space" className="block text-canvas/60 hover:text-canvas transition-colors">Enter the space</Link><Link href="/practices" className="block text-canvas/60 hover:text-canvas transition-colors">Practices</Link><Link href="/community" className="block text-canvas/60 hover:text-canvas transition-colors">Community</Link></div></div>
            <div><p className="eyebrow text-ochre mb-4">Continue</p><div className="space-y-3"><Link href="/gallery" className="block text-canvas/60 hover:text-canvas transition-colors">Gallery</Link><Link href="/events" className="block text-canvas/60 hover:text-canvas transition-colors">Events</Link><Link href="/" className="block text-canvas/60 hover:text-canvas transition-colors">Home</Link></div></div>
          </div>
          <div className="lg:col-span-4">
            <p className="eyebrow text-ochre mb-4">A quiet note from the room</p>
            <p className="text-sm text-canvas/60 leading-7 mb-5">Occasional reflections, new practices and gatherings. No urgency.</p>
            {sent ? <div className="text-xs text-canvas/60 border border-canvas/15 rounded-full px-4 py-3">You're on the room's quiet list.</div> : <form onSubmit={submit} className="flex gap-2"><input value={email} onChange={e=>setEmail(e.target.value)} required type="email" placeholder="your@email.com" className="min-w-0 flex-1 rounded-full bg-charcoal-muted border border-charcoal-soft px-4 py-3 text-xs text-canvas placeholder-canvas/40 outline-none focus:border-terracotta" /><button className="rounded-full bg-canvas text-charcoal px-5 text-[9px] uppercase tracking-widest hover:bg-terracotta hover:text-canvas transition-colors">Join</button></form>}
            <a href="#" className="inline-flex items-center gap-2 mt-5 text-xs text-canvas/50 hover:text-terracotta transition-colors"><Instagram size={14} /> @theimmersionroom</a>
          </div>
        </div>
        <div className="pt-7 flex flex-col sm:flex-row justify-between gap-4 text-[10px] uppercase tracking-widest text-canvas/35"><span>© {new Date().getFullYear()} The Immersion Room</span><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="inline-flex items-center gap-1 hover:text-canvas transition-colors">Back to top <ArrowUpRight size={12}/></button></div>
      </div>
    </footer>
  );
}
