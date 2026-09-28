# The Immersion Room — Gallery Media Guide

The Gallery is now a dedicated page at `/gallery`.

## Change images and videos in one place

You only need to edit:

`frontend/src/data/gallery.js`

Do not edit `GalleryPage.js` just to replace media.

### Local images

1. Put the image inside `frontend/public/gallery/`.
2. In `src/data/gallery.js`, change the item's media block:

```js
media: {
  type: 'image',
  src: '/gallery/my-image.jpg',
  poster: '/gallery/my-image.jpg',
}
```

### Local videos

1. Put the `.mp4` inside `frontend/public/gallery/`.
2. Put a poster image in the same folder.
3. Change the media block:

```js
media: {
  type: 'video',
  src: '/gallery/my-video.mp4',
  poster: '/gallery/my-video-poster.jpg',
}
```

The card will use the video as its quiet preview and the detail view will provide video controls.

## Change text

The same `gallery.js` file controls:
- title
- description
- category
- duration
- mood
- session chapters
- image/video source

## Recommended video format

Use MP4/H.264 for broad browser compatibility. Keep Gallery previews reasonably compressed so the page remains smooth.

## Design intent

The Gallery is deliberately editorial and journey-led. It is not a product catalogue and does not use view counts, trending badges, discount language, or pressure-oriented calls to action.
