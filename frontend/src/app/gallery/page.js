'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryPage from '@/components/GalleryPage';

export default function GalleryRoute() {
  return (
    <div className="min-h-screen bg-canvas text-charcoal">
      <Navbar />
      <GalleryPage />
      <Footer />
    </div>
  );
}
