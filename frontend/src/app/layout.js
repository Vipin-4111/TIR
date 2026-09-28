import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import AmbientCanvas from '@/components/AmbientCanvas';

export const metadata = {
  title: 'The Immersion Room — A room for being',
  description: 'A multidisciplinary wellness sanctuary for movement, sound, food, creativity and community.',
  keywords: ['The Immersion Room', 'wellness sanctuary', 'movement', 'sound', 'community', 'creative practice'],
  authors: [{ name: 'The Immersion Room' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F6F0E6',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-canvas text-charcoal antialiased selection:bg-terracotta selection:text-canvas">
        <SmoothScroll>
          <CustomCursor />
          <AmbientCanvas />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
