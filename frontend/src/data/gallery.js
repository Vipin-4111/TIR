/**
 * GALLERY CONTENT — edit this file to update the Gallery.
 *
 * You do not need to edit the Gallery page/component when changing media.
 *
 * For images:
 *   media: { type: 'image', src: '/gallery/my-photo.jpg', poster: '/gallery/my-photo.jpg' }
 *
 * For videos:
 *   media: { type: 'video', src: '/gallery/my-video.mp4', poster: '/gallery/my-video-poster.jpg' }
 *
 * Put your local media files inside: /public/gallery/
 * Then only change the src/poster paths below.
 */

export const galleryCategories = [
  {
    id: 'movement-yoga',
    name: 'Movement & Yoga',
    eyebrow: 'Move · breathe · arrive',
    intro: 'Practices that bring attention back to the body — slowly, without performance.',
  },
  {
    id: 'workshops-training',
    name: 'Workshops & Training',
    eyebrow: 'Explore · make · listen',
    intro: 'Recorded fragments from workshops where curiosity, craft and presence meet.',
  },
];

export const galleryCollections = [
  {
    id: 'morning-grounding',
    categoryId: 'movement-yoga',
    category: 'Movement & Yoga',
    label: 'Guided practice',
    title: 'Morning Grounding',
    description: 'A quiet movement sequence built around breath, slow transitions, and arriving in the body before the day begins.',
    duration: '28 min',
    mood: 'Grounded',
    media: {
      type: 'video',
      src: '/media/immersion-ambient.mp4',
      poster: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1800&q=88',
      poster: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1800&q=88',
    },
    sessions: ['Arrival & breath', 'Grounding flow', 'Restorative close'],
  },
  {
    id: 'release-floorwork',
    categoryId: 'movement-yoga',
    category: 'Movement & Yoga',
    label: 'Recorded session',
    title: 'Release & Gravity',
    description: 'A recorded movement study exploring weight, floorwork, momentum, and spacious physical listening.',
    duration: '42 min',
    mood: 'Open',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1800&q=88',
      poster: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1800&q=88',
    },
    sessions: ['Weight & yielding', 'Floor pathways', 'Momentum study'],
  },
  {
    id: 'breath-architecture',
    categoryId: 'movement-yoga',
    category: 'Movement & Yoga',
    label: 'Guided audio',
    title: 'Breath Architecture',
    description: 'A gentle breath-led practice designed to create a slower rhythm through attention, sound, and stillness.',
    duration: '19 min',
    mood: 'Still',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1800&q=88',
      poster: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1800&q=88',
    },
    sessions: ['Settling in', 'Pranic breath', 'Quiet integration'],
  },
  {
    id: 'somatic-reset',
    categoryId: 'movement-yoga',
    category: 'Movement & Yoga',
    label: 'Guided practice',
    title: 'Somatic Reset',
    description: 'A slower sequence for unwinding accumulated tension through floor-based movement and long pauses.',
    duration: '31 min',
    mood: 'Soft',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1800&q=88',
      poster: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1800&q=88',
    },
    sessions: ['Body scan', 'Low-to-floor sequence', 'Rest'],
  },
  {
    id: 'embodied-voice',
    categoryId: 'workshops-training',
    category: 'Workshops & Training',
    label: 'Workshop recording',
    title: 'Embodied Voice Lab',
    description: 'Selected material from the physical theatre practice room: voice, breath, spatial awareness, and ensemble presence.',
    duration: '36 min',
    mood: 'Curious',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=1800&q=88',
      poster: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=1800&q=88',
    },
    sessions: ['Body before voice', 'Resonance & projection', 'Ensemble listening'],
  },
  {
    id: 'creative-presence',
    categoryId: 'workshops-training',
    category: 'Workshops & Training',
    label: 'Recorded workshop',
    title: 'Creative Presence',
    description: 'A compact workshop excerpt on observation, instinct, and translating inner attention into physical choice.',
    duration: '24 min',
    mood: 'Open',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1800&q=88',
      poster: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1800&q=88',
    },
    sessions: ['Observation', 'Impulse', 'Making a choice'],
  },
];

export const galleryJourney = [
  { number: '01', title: 'Arrive', text: 'Leave the outside world at the door. Start with one breath, one image, one quiet invitation.' },
  { number: '02', title: 'Move', text: 'Let the body lead. Explore practices that make space for attention rather than performance.' },
  { number: '03', title: 'Explore', text: 'Stay curious. Step into selected workshop recordings, creative studies and shared ways of learning.' },
  { number: '04', title: 'Return', text: 'The room does not ask you to finish. Come back whenever you need a little more space.' },
];
