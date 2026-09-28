# The Immersion Room — experience update v2

## New routes

- `/` — immersive landing experience. The original pinned 3D Hero scroll remains.
- `/gallery` — dedicated on-demand Gallery with category filtering.
- `/events` — dedicated event calendar with six experience categories.
- `/practices` — Curated Practices: “Weekday rhythms at The Immersion Room”.
- `/enter-the-space` — interior, architecture, atmosphere and spatial story.
- `/community` — activities and gatherings that happen in the room.

## Navigation

The navbar is intentionally minimal: Enter the space, Practices, Community, Gallery, Events + sound/theme controls. Desktop nav items use a slow scale/zoom interaction; mobile uses a separate drawer so content never sits under the navigation capsule.

## Theme

The light and dark palettes use the tokens from the supplied v1.1 developer handoff:

Light: #F6F0E6, #FBF7EF, #231C16, #4E4137, #C58A44, #B25E3B.

Dark: #12100E, #1B1611, #231D17, #2B241C, #F3ECE0, #C9BBA8, #D9A15D, #C1693F.

The navbar includes a light/dark toggle and stores the preference locally.

## Motion

- Existing Hero pinned 3D depth portal is preserved.
- ScrollMedia adds zoom-in/zoom-out parallax to images and video.
- Page headings reveal on entry.
- Cards use gentle 3D rotate/reveal motion.
- Ambient Three.js canvas remains in the shell.
- Existing Lenis + GSAP ScrollTrigger remain active.
- Web Audio soundscape remains opt-in; navigation and selected interactions can add soft chimes.
- Reduced-motion users receive the CSS motion reduction.

## Media editing

Gallery content: `frontend/src/data/gallery.js`

Practices / community / space imagery: `frontend/src/data/siteContent.js`

Events: `frontend/src/data/events.js`

Local media: `frontend/public/gallery/` and `frontend/public/media/`

A working ambient MP4 is included at `frontend/public/media/immersion-ambient.mp4`. Replace it with your own production loop whenever ready.

## Important install command

From `frontend`:

    npm install
    npm run dev

Then visit `http://localhost:3000`.
