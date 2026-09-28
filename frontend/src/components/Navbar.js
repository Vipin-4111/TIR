'use client';

import { useEffect, useState } from 'react';
import { Volume2, VolumeX, Menu, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { soundscape } from '@/lib/soundscape';
import { siteNavigation } from '@/data/siteContent';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [audio, setAudio] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('immersion-theme');
    const initial = stored === 'dark';
    setDark(initial);
    document.documentElement.dataset.theme = initial ? 'dark' : 'light';
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    localStorage.setItem('immersion-theme', next ? 'dark' : 'light');
  };

  const toggleAudio = () => setAudio(soundscape.toggle());

  return (
    <header className="fixed top-4 md:top-6 left-0 right-0 z-[100] px-4 md:px-6 pointer-events-none">
      <div className="site-nav pointer-events-auto max-w-6xl mx-auto rounded-full px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="group min-w-0" onClick={() => setMobileOpen(false)}>
          <span className="brand-title">The Immersion Room</span>
          <span className="brand-subtitle">A room for being</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1.5">
          {siteNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => soundscape.playChime(520)} className={`nav-pill ${active ? 'is-active' : ''}`}>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <button onClick={toggleAudio} className="icon-pill" aria-label={audio ? 'Mute soundscape' : 'Play soundscape'}>
            {audio ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
          <button onClick={toggleTheme} className="icon-pill hidden sm:flex" aria-label="Toggle light and dark mode">
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="icon-pill xl:hidden" aria-label="Open navigation">
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <div className={`mobile-nav pointer-events-auto xl:hidden ${mobileOpen ? 'is-open' : ''}`}>
        {siteNavigation.map((item, index) => (
          <Link key={item.href} href={item.href} onClick={() => { setMobileOpen(false); soundscape.playChime(520); }} className="mobile-nav-link">
            <span>{item.label}</span><span>0{index + 1}</span>
          </Link>
        ))}
      </div>
    </header>
  );
}
