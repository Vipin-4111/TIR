'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, User, Mail, Phone } from 'lucide-react';
import { soundscape } from '@/lib/soundscape';

export default function BookingModal({ isOpen, onClose, initialExperience = 'dance' }) {
  const [formData, setFormData] = useState({
    experience: initialExperience,
    tier: 'Single Session (?1,500)',
    date: '2026-10-25',
    timeSlot: '07:30 AM ? Morning Flow',
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (initialExperience) {
      setFormData(prev => ({ ...prev, experience: initialExperience }));
    }
  }, [initialExperience]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      soundscape.playChime(660);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomRef = 'TIR-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setIsSubmitted(true);
    soundscape.playChime(880);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-charcoal/60 backdrop-blur-md transition-opacity duration-300">
      <div 
        className="relative w-full max-w-xl h-full bg-canvas text-charcoal shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-sand/40 transform transition-transform duration-500 ease-out"
        style={{ scrollbarWidth: 'thin' }}
      >
        {/* Header */}
        <div className="p-8 border-b border-sand/30 flex items-center justify-between sticky top-0 bg-canvas/90 backdrop-blur-md z-10">
          <div>
            <span className="text-[11px] uppercase tracking-ultra text-terracotta font-semibold">Reservation</span>
            <h2 className="text-2xl md:text-3xl font-serif text-charcoal">Book a Studio Session</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-sand/60 flex items-center justify-center hover:bg-charcoal hover:text-canvas transition-colors duration-300"
            aria-label="Close booking drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex-1">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-moss/10 text-moss mx-auto flex items-center justify-center">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-terracotta font-medium">Confirmed</span>
                <h3 className="text-3xl font-serif text-charcoal">Your Space is Held</h3>
                <p className="text-charcoal-soft text-sm max-w-md mx-auto leading-relaxed">
                  We look forward to welcoming you to The Immersion Room. A confirmation email and pre-session preparation guide have been sent to your inbox.
                </p>
              </div>

              <div className="bg-canvas-subtle p-6 rounded-lg text-left max-w-md mx-auto border border-sand/40 space-y-3">
                <div className="flex justify-between items-center text-xs text-charcoal-soft">
                  <span>Booking Reference:</span>
                  <span className="font-mono font-bold text-charcoal">{bookingRef}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-charcoal-soft">
                  <span>Selected Experience:</span>
                  <span className="capitalize font-medium text-charcoal">{formData.experience}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-charcoal-soft">
                  <span>Schedule:</span>
                  <span className="font-medium text-charcoal">{formData.date} ? {formData.timeSlot.split('?')[0]}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-charcoal-soft">
                  <span>Location:</span>
                  <span className="font-medium text-charcoal">Golf Course Rd, Gurgaon</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-block px-8 py-3.5 bg-charcoal text-canvas text-xs uppercase tracking-widest hover:bg-terracotta transition-colors duration-300 rounded-sm font-medium"
              >
                Return to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Discipline picker */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-charcoal-soft font-semibold block">
                  Select Discipline
                </label>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {[
                    { id: 'dance', label: 'Dance & Motion' },
                    { id: 'theatre', label: 'Physical Theatre' },
                    { id: 'yoga', label: 'Mindful Yoga' },
                    { id: 'art', label: 'Tactile Art' },
                    { id: 'workshops', label: 'Immersion Lab' },
                    { id: 'open-studio', label: 'Open Studio' }
                  ].map(exp => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, experience: exp.id })}
                      className={`px-3.5 py-2.5 text-xs text-left border rounded transition-all duration-200 ${
                        formData.experience === exp.id
                          ? 'border-charcoal bg-charcoal text-canvas font-medium shadow-sm'
                          : 'border-sand/60 bg-canvas-subtle hover:border-charcoal/40 text-charcoal-soft'
                      }`}
                    >
                      {exp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tier & pass */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-charcoal-soft font-semibold block">
                  Pass Format
                </label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                  className="w-full px-4 py-3 bg-canvas-subtle border border-sand/60 rounded text-sm text-charcoal focus:border-charcoal focus:outline-none"
                >
                  <option value="Single Session (?1,500)">Single Studio Session ? ?1,500</option>
                  <option value="Weekend Intensive Pass (?5,500)">Weekend Intensive Pass ? ?5,500</option>
                  <option value="10-Session Immersive Journey (?12,000)">10-Session Immersive Journey ? ?12,000</option>
                  <option value="Full Studio Unlimited Monthly (?22,000)">Full Studio Unlimited Monthly ? ?22,000</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-charcoal-soft font-semibold flex items-center gap-1.5">
                    <Calendar size={13} className="text-terracotta" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-canvas-subtle border border-sand/60 rounded text-sm text-charcoal focus:border-charcoal focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-charcoal-soft font-semibold flex items-center gap-1.5">
                    <Clock size={13} className="text-terracotta" />
                    Time Window
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-canvas-subtle border border-sand/60 rounded text-sm text-charcoal focus:border-charcoal focus:outline-none"
                  >
                    <option value="07:30 AM ? Morning Flow">07:30 AM ? Morning Awakening</option>
                    <option value="11:00 AM ? Noon Masterclass">11:00 AM ? Midday Lab</option>
                    <option value="03:30 PM ? Afternoon Craft">03:30 PM ? Afternoon Exploration</option>
                    <option value="06:30 PM ? Evening Sanctuary">06:30 PM ? Dusk Immersion</option>
                  </select>
                </div>
              </div>

              {/* Guest details */}
              <div className="space-y-4 pt-2 border-t border-sand/40">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-charcoal-soft font-semibold block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-3 text-sand-dark" />
                    <input
                      type="text"
                      required
                      placeholder="Aria Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-canvas-subtle border border-sand/60 rounded text-sm text-charcoal focus:border-charcoal focus:outline-none placeholder-sand-dark"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-charcoal-soft font-semibold block">
                      Email
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-3 text-sand-dark" />
                      <input
                        type="email"
                        required
                        placeholder="aria@movement.art"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-canvas-subtle border border-sand/60 rounded text-sm text-charcoal focus:border-charcoal focus:outline-none placeholder-sand-dark"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-charcoal-soft font-semibold block">
                      Phone (WhatsApp)
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-3 text-sand-dark" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98110 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-canvas-subtle border border-sand/60 rounded text-sm text-charcoal focus:border-charcoal focus:outline-none placeholder-sand-dark"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  data-cursor="CONFIRM"
                  className="w-full py-4 bg-charcoal text-canvas text-xs uppercase tracking-ultra font-semibold hover:bg-terracotta transition-colors duration-300 rounded flex items-center justify-center gap-2 group"
                >
                  <Sparkles size={14} className="text-ochre group-hover:scale-125 transition-transform duration-300" />
                  Confirm Studio Reservation
                </button>
                <p className="text-[11px] text-charcoal-soft text-center mt-3">
                  Complimentary herbal tea, mats & private locker access included with all bookings.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
