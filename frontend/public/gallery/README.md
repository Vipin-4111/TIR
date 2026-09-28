# Gallery media folder

Put your Gallery images and videos in this folder.

Then edit only:

`frontend/src/data/gallery.js`

Each item has a `media` object:

```js
media: {
  type: 'image',
  src: '/gallery/my-photo.jpg',
  poster: '/gallery/my-photo.jpg',
}
```

For a video:

```js
media: {
  type: 'video',
  src: '/gallery/my-session.mp4',
  poster: '/gallery/my-session-poster.jpg',
}
```

No Gallery component changes are needed when replacing media.
