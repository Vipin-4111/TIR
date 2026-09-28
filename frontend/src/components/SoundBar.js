'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Wind, Bell, Sliders, ChevronUp, ChevronDown } from 'lucide-react';
import { soundscape } from '@/lib/soundscape';

export default function SoundBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState('theta'); // 'theta' | 'breath' | 'chimes'
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePlay = () => {
    const active = soundscape.toggle();
    setIsPlaying(active);
  };

  const selectMode = (newMode) => {
    setMode(newMode);
    soundscape.setMode(newMode);
    soundscape.playTingsha(2400);
    if (!isPlaying) {
      soundscape.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundscape.setVolume(val);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      <div className="flex flex-col items-start gap-2">
        
        {/* Expanded Sound Palette Drawer */}
        {isExpanded && (
          <div className="bg-charcoal/90 backdrop-blur-xl border border-sand/30 text-canvas rounded-2xl p-4 shadow-2xl space-y-3.5 w-72 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="flex items-center justify-between border-b border-sand/20 pb-2">
              <span className="text-[10px] uppercase tracking-ultra text-ochre font-semibold flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>Meditative Soundscapes</span>
              </span>
              <span className="text-[9px] text-canvas/50">432Hz Somatics</span>
            </div>

            {/* Mode Selectors */}
            <div className="space-y-1.5">
              {[
                { id: 'theta', label: '432Hz Binaural Theta', desc: '4Hz brainwave relaxation', icon: Sparkles },
                { id: 'breath', label: 'Pranayama Breath', desc: 'Oceanic 4s/4s respiratory rhythm', icon: Wind },
                { id: 'chimes', label: 'Temple Wind Chimes', desc: 'Generative Koshi crystal bells', icon: Bell }
              ].map(item => {
                const Icon = item.icon;
                const isCurrent = mode === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => selectMode(item.id)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-start gap-2.5 ${
                      isCurrent
                        ? 'bg-terracotta text-canvas font-medium shadow-sm'
                        : 'hover:bg-canvas/10 text-canvas/80'
                    }`}
                  >
                    <Icon size={14} className="mt-0.5 shrink-0 text-ochre" />
                    <div>
                      <span className="block font-medium">{item.label}</span>
                      <span className="text-[10px] opacity-75 font-light">{item.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Volume Slider */}
            <div className="pt-2 border-t border-sand/20 flex items-center gap-2 text-xs">
              <Sliders size={12} className="text-canvas/60 shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-canvas/20 rounded-lg appearance-none cursor-pointer accent-terracotta"
              />
              <span className="text-[10px] text-canvas/60 w-7 text-right">{Math.round(volume * 100)}%</span>
            </div>
          </div>
        )}

        {/* Main Floating Capsule Button */}
        <div className="flex items-center gap-1.5 bg-canvas/90 backdrop-blur-xl border border-sand/60 shadow-xl rounded-full p-1.5 pl-3 pr-2 text-charcoal transition-transform duration-300 hover:scale-105">
          {/* Audio Toggle */}
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium pr-1 group"
          >
            {isPlaying ? (
              <>
                <div className="flex items-end gap-0.5 h-3.5 w-4">
                  <span className="w-0.5 bg-terracotta rounded-full animate-[bounce_0.8s_ease-in-out_infinite] h-full" />
                  <span className="w-0.5 bg-terracotta rounded-full animate-[bounce_1.1s_ease-in-out_infinite] h-3/4" />
                  <span className="w-0.5 bg-terracotta rounded-full animate-[bounce_0.6s_ease-in-out_infinite] h-full" />
                  <span className="w-0.5 bg-terracotta rounded-full animate-[bounce_0.9s_ease-in-out_infinite] h-2/3" />
                </div>
                <span className="text-[10px] text-terracotta font-semibold">
                  {mode === 'theta' ? '432Hz Theta' : mode === 'breath' ? 'Pranayama' : 'Temple Chimes'}
                </span>
              </>
            ) : (
              <>
                <VolumeX size={14} className="text-charcoal-soft group-hover:text-terracotta transition-colors" />
                <span className="text-[10px] text-charcoal-soft group-hover:text-charcoal transition-colors">
                  Spatial Sound
                </span>
              </>
            )}
          </button>

          {/* Expand Mode Selector Chevron */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-full hover:bg-sand/30 text-charcoal-soft transition-colors"
            aria-label="Toggle sound settings"
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>

      </div>
    </div>
  );
}
