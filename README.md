# Chyo Photography — Portfolio Site

A clean, single-page photography portfolio with a filterable gallery and a
working contact form. No build tools required — it's plain HTML/CSS/JS.

## Preview it locally

Just double-click `index.html`, or in this folder run:

```bash
npx serve .
```

## 1. Add your photos

Real photos are already loaded for every category (2 events, 2 headshots,
2 portraits, 2 graduations, 2 landscape, 4 product) — resized to a 1800px
max edge and compressed for fast loading. The only placeholder left is the
photographer portrait in the About section.

Folders are set up per category:

```
images/events/
images/headshots/
images/portraits/
images/graduations/
images/landscape/
images/product/
```

To add more, drop photos into the matching folder, then open `js/script.js`
and edit the `GALLERY_ITEMS` list near the top. Each entry looks like this:

```js
{ category: 'portraits', title: 'Golden Hour Session', src: 'images/portraits/1.jpg' }
```

- Set `src` to the file's path to show the real photo.
- Leave `src: ''` to keep showing a placeholder tile (useful until you have
  an image for that slot).
- Add or remove entries freely — the gallery and lightbox rebuild
  automatically from this list.
- `category` must be one of: `events`, `headshots`, `portraits`,
  `graduations`, `landscape`, `product` (these match the filter buttons).

Photos roughly 1200px on the long edge, compressed as JPG/WebP, will keep
the site fast.

## 2. Contact form (already connected)

The site is static (no server), so the form uses **Formspree** — a free
service that forwards form submissions straight to your inbox. This is
already wired up to `https://formspree.io/f/meajgrry`, forwarding to
**mostlychyo@gmail.com**.

Formspree confirms the very first submission with a one-time link emailed
to you — click that once and every submission after lands silently in your
inbox. Free Formspree covers 50 submissions/month, which is plenty for a
portfolio site's inquiries.

If you ever need to reconnect it to a different Formspree account: sign up
at https://formspree.io, create a form, and swap the `action` URL on the
`<form>` in `index.html` for the new one.

**Alternative:** if you end up hosting on Netlify, you can swap to Netlify
Forms instead (add `data-netlify="true"` to the `<form>` and remove the
`action` attribute) — no external account needed.

## 3. Customize

- **Colors / fonts:** all in `css/style.css` under the `:root` variables at
  the top (`--accent` is the green highlight color; the site is light-themed
  by default and switches to a dark green theme for visitors with a
  dark-mode OS preference).
- **About text:** edit the `#about` section in `index.html`.
- **Site title / favicon:** `<title>` and `<link rel="icon">` in the
  `<head>` of `index.html`.

## 4. Deploy it

Easiest free options, in order of simplicity:

- **Netlify** — drag the whole `photography-portfolio` folder onto
  https://app.netlify.com/drop. Done in seconds, gives you a live URL.
- **Vercel** — `npx vercel` from inside this folder.
- **GitHub Pages** — push this folder to a GitHub repo and enable Pages in
  repo settings.

Once deployed, you can point a custom domain at it from any of these
providers.
