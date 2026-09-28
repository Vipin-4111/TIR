'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageIntro from '@/components/PageIntro';
import ImmersiveSection from '@/components/ImmersiveSection';
import ScrollMedia from '@/components/ScrollMedia';
import { spaceScenes } from '@/data/siteContent';

export default function EnterTheSpacePage() {
  return (
    <main className="relative z-20 min-h-screen bg-canvas text-charcoal">
      <Navbar />
      <PageIntro eyebrow="Enter the space" title="The interior is part of the practice." kicker="Light. Texture. Acoustics. Space." text="The Immersion Room is designed to feel different before anything begins. Warm materials, generous breathing room and a quieter visual language create a threshold between the city and the room." />
      <section className="px-4 md:px-8">
        <ScrollMedia src="/gallery/enter.jpg" alt="Warm interior atmosphere" className="max-w-[1500px] mx-auto aspect-[16/9] md:aspect-[2/1]" />
      </section>


      {spaceScenes.map((scene, i) => (
        <ImmersiveSection
          key={scene.number}
          number={scene.number}
          eyebrow={scene.title}
          title={
            scene.title === 'The threshold'
              ? 'Leave the city at the door.'
              : scene.title === 'The studio'
                ? 'A room with enough space to breathe.'
                : 'Stillness has a place here.'
          }
          text={scene.text}
          image={scene.image}
          video={scene.Video}
          align={i % 2 ? 'right' : 'left'}
        />
      ))}


      <section className="px-6 md:px-12 py-32 md:py-48">
        <div className="max-w-5xl mx-auto text-center">
          <span className="eyebrow">The feeling</span>
          <h2 className="display-title mx-auto mt-6">Warm enough to stay. Quiet enough to hear yourself.</h2>
        </div>
      </section>
      <Footer />
    </main>
  );
}
