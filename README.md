# paulkeilhau.com

Personal site of Paul Keilhau — composer and sound designer, Berlin.

Static HTML, CSS and a little vanilla JavaScript. No build step, no dependencies,
no package manager. Edit the files and reload the browser.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole site — one page, sections for work, listening, about and contact |
| `styles.css` | All styling. Colours and spacing live in the `:root` block at the top |
| `script.js` | Footer year, sticky bar, fade-ins, and the click-to-load video players |
| `assets/` | Photographs and video thumbnails. The `.mov` masters sitting here are ignored by git |
| `video/` | Web-sized MP4s the site serves itself |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## Working on it locally

Open `index.html` in a browser. That's it.

For a local server (needed only if you add something that fetches files):

```
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Adding a project

Copy one `<article class="work">` block in `index.html` and change the number,
title, meta line, text and credits. For a project with a video:

1. Put the thumbnail in `assets/` (1280×720 works well).
2. Point `data-video` at the embed URL, ending in `?autoplay=1`.

A project without a video uses `class="work work--nomedia"` and simply leaves the
`work__media` block out.

## Videos

Nothing loads until a visitor clicks play — neither the YouTube and Vimeo
embeds nor the files in `video/`. That keeps the page fast and means no
third-party cookies are set on arrival.

Most trailers are embedded from YouTube or Vimeo. **Carn** is served from this
repo instead, as a `<video>` element with a poster frame.

To add another self-hosted video, re-encode the master first — camera exports
run to hundreds of megabytes and GitHub refuses any file over 100 MB:

```
avconvert --source master.mov --output web.mp4 --preset Preset1280x720
```

That preset errs towards quality. For anything longer than a minute you will
want a lower bitrate than it gives you.

## Publishing

The site is served by GitHub Pages from the `main` branch.

To move `paulkeilhau.com` here, add a file called `CNAME` containing just:

```
www.paulkeilhau.com
```

then point the DNS at GitHub Pages. Do that only once you are ready to leave
Squarespace — the domain can only point at one of them at a time.
