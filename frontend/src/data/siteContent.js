import { Video } from "lucide-react";


export const siteNavigation = [
  { label: 'Enter the space', href: '/enter-the-space' },
  { label: 'Practices', href: '/practices' },
  { label: 'Community', href: '/community' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Events', href: '/events' },
];

export const practiceRhythms = [
  {
    day: 'Monday',
    rhythm: 'Arrive in the body',
    time: '7:30 AM',
    description: 'A slow start: breath, mobility and grounded movement before the week gathers pace.',
    category: 'Movement & Yoga',
    image: '/gallery/arriveinbody.jpg',
  },
  {
    day: 'Tuesday',
    rhythm: 'Make & notice',
    time: '6:30 PM',
    description: 'Hands-on creative practice that lets attention move from the head into material, texture and form.',
    category: 'Workshops & Training',
    image: '/gallery/notice.jpg',
  },
  {
    day: 'Wednesday',
    rhythm: 'Move with others',
    time: '7:00 PM',
    description: 'A shared movement session where rhythm, listening and space become a collective language.',
    category: 'Movement & Yoga',
    image: '/gallery/movewithother.jpg',
  },
  {
    day: 'Thursday',
    rhythm: 'Listen inward',
    time: '7:30 PM',
    description: 'Sound, breath and stillness woven into an evening practice for softer attention.',
    category: 'Music & Sound',
    image: '/gallery/listeninward.jpg',
  },
  {
    day: 'Friday',
    rhythm: 'Open the room',
    time: '6:00 PM',
    description: 'A looser gathering for conversation, improvisation and whatever wants to happen next.',
    category: 'Community & Connection',
    image: '/gallery/opentheroom.jpg',
  },
];

export const communityMoments = [
  { title: 'Drum circles', text: 'Find a pulse with other people. No stage, no audience - just rhythm and listening.', image: '/gallery/drum.jpg' },
  { title: 'Open mics', text: 'Small voices, unfinished ideas and intimate performances that make the room feel alive.', image: '/gallery/mic.jpg' },
  { title: 'Shared tables', text: 'Food becomes a reason to slow down, meet someone new and stay a little longer.', image: '/gallery/foodtable.jpg' },
  { title: 'Maker gatherings', text: 'Local makers, objects, conversations and a softer kind of weekend market.', image: '/gallery/maker.jpg' },
];

export const spaceScenes = [
  {
    number: '01',
    title: 'The threshold',
    text: 'The transition matters. The room begins before the first practice - in the moment outside noise starts to recede.',
    Video: 'gallery/enter.mp4',
  },
  {
    number: '02',
    title: 'The studio',
    text: 'Warm surfaces, generous floor space and a quiet palette create room for movement without visual noise.',
    Video: 'gallery/space.mp4',
  },
  {
    number: '03',
    title: 'The pause',
    text: 'There are places to sit, breathe, talk or simply do nothing. Stillness is part of the architecture.',
    Video: 'gallery/still.mp4',
  },
];
