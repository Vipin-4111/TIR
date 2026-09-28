# Immersion Room media

Put future images and videos in this folder (or in `public/gallery/` for Gallery-only media).

The page content currently uses curated Unsplash image URLs so the project has visual content immediately. To move to your own production media, replace the URL in:

- `src/data/gallery.js` — Gallery media
- `src/data/siteContent.js` — Practices, Community and Enter the Space media
- `src/data/events.js` — Event imagery

For video, use:

```js
{ type: 'video', src: '/media/your-loop.mp4', poster: '/media/your-poster.jpg' }
```

Local `/public` files are referenced without `/public`, e.g. `/media/your-loop.mp4`.
