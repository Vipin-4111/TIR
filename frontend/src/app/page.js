'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LandingJourney from '@/components/LandingJourney';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative z-20 min-h-screen bg-canvas text-charcoal overflow-x-hidden">
      <Navbar />
      <Hero />
      <LandingJourney />
      <Footer />
    </main>
  );
}
