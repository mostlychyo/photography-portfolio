/* ===================================================================
   Chyo Photography — site script
   =================================================================== */

/* -------------------------------------------------------------
   GALLERY DATA
   To add a real photo: put the file in the matching /images
   subfolder and set "src" to its path, e.g. "images/headshots/1.jpg".
   Leave "src" empty ("") to keep showing a placeholder tile.
   category values must match the filter buttons' data-filter:
   events | headshots | portraits | graduations | landscape | product
   ------------------------------------------------------------- */
const GALLERY_ITEMS = [
  { category: 'graduations', title: 'Bachelor of Science',    src: 'images/graduations/IMG_9684.jpg' },
  { category: 'graduations', title: 'Social Science',         src: 'images/graduations/IMG_9645-2.jpg' },
  { category: 'graduations', title: 'Last Study Session',     src: 'images/graduations/IMG_9656.jpg' },
  { category: 'graduations', title: 'Walk to Convocation',    src: 'images/graduations/IMG_0121.jpg' },
  { category: 'graduations', title: 'Bouquet on the Bench',   src: 'images/graduations/IMG_0682.jpg' },
  { category: 'graduations', title: 'Kindergarten Cap',       src: 'images/graduations/IMG_8099.jpg' },
  { category: 'headshots',   title: 'Headshot',               src: 'images/headshots/DSC08547.jpg', pos: '50% 27%' },
  { category: 'headshots',   title: 'Headshot',               src: 'images/headshots/DSC03114-3.jpg' },
  { category: 'portraits',   title: 'At the Plate',           src: 'images/portraits/DSC03156.jpg' },
  { category: 'portraits',   title: 'Between Innings',        src: 'images/portraits/DSC03152.jpg' },
  { category: 'portraits',   title: 'Golden Hour',            src: 'images/portraits/IMG_1521.jpg' },
  { category: 'events',      title: 'Club Collaboration',     src: 'images/events/DSC09184.jpg' },
  { category: 'events',      title: 'Hang Time',              src: 'images/events/IMG_2261.jpg' },
  { category: 'events',      title: 'Carnival Hoops',          src: 'images/events/IMG_2269.jpg' },
  { category: 'events',      title: 'Summer BBQ',             src: 'images/events/DSC00130-2.jpg' },
  { category: 'events',      title: 'Man Behind the Grill',    src: 'images/events/DSC09977.jpg' },
  { category: 'landscape',   title: 'Harbourfront at Sunset',  src: 'images/landscape/DSC08844-6.jpg' },
  { category: 'landscape',   title: 'Boardwalk Skyline',       src: 'images/landscape/DSC08803-4.jpg' },
  { category: 'product',     title: 'Milk n Matcha',          src: 'images/product/DSC09534-3.jpg' },
  { category: 'product',     title: 'Dim Sum Spread',         src: 'images/product/DSC09433-2.jpg' },
  { category: 'product',     title: 'Sweet Endings',          src: 'images/product/DSC04328.jpg' },
  { category: 'product',     title: 'Fresh Cut',              src: 'images/product/DSC04261-2.jpg' },
];

const CATEGORY_LABELS = {
  events: 'Event', headshots: 'Headshot', portraits: 'Portrait',
  graduations: 'Graduation', landscape: 'Landscape', product: 'Product'
};

/* -------------------------------------------------------------
   Build gallery
   ------------------------------------------------------------- */
const galleryEl = document.getElementById('gallery');

function buildGallery(){
  galleryEl.innerHTML = GALLERY_ITEMS.map((item, i) => `
    <div class="gallery-item show" data-category="${item.category}" data-index="${i}">
      ${
        item.src
          ? `<img src="${item.src}" alt="${item.title}" loading="lazy" style="object-position:${item.pos || '50% 50%'}">`
          : `<div class="placeholder-tile" data-placeholder="${CATEGORY_LABELS[item.category]} Photo"></div>`
      }
      <div class="item-caption">
        <span class="cat">${CATEGORY_LABELS[item.category]}</span>
        <span class="title">${item.title}</span>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('click', () => openLightbox(Number(el.dataset.index)));
  });
}
buildGallery();

/* -------------------------------------------------------------
   Filters
   ------------------------------------------------------------- */
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hide', !match);
      if (match) requestAnimationFrame(() => item.classList.add('show'));
    });
  });
});

/* -------------------------------------------------------------
   Lightbox
   ------------------------------------------------------------- */
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
let currentIndex = 0;

function visibleIndices(){
  const active = document.querySelector('.filter-btn.active').dataset.filter;
  return GALLERY_ITEMS
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => active === 'all' || item.category === active)
    .map(({ i }) => i);
}

function openLightbox(index){
  currentIndex = index;
  renderLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
function renderLightbox(){
  const item = GALLERY_ITEMS[currentIndex];
  lightboxContent.innerHTML = item.src
    ? `<img src="${item.src}" alt="${item.title}">`
    : `<div class="placeholder-tile" data-placeholder="${CATEGORY_LABELS[item.category]} Photo — ${item.title}"></div>`;
}
function stepLightbox(dir){
  const indices = visibleIndices();
  const pos = indices.indexOf(currentIndex);
  const nextPos = (pos + dir + indices.length) % indices.length;
  currentIndex = indices[nextPos];
  renderLightbox();
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => stepLightbox(-1));
document.getElementById('lightboxNext').addEventListener('click', () => stepLightbox(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') stepLightbox(1);
  if (e.key === 'ArrowLeft') stepLightbox(-1);
});

/* -------------------------------------------------------------
   Header scroll state
   ------------------------------------------------------------- */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* -------------------------------------------------------------
   Mobile nav
   ------------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
}));

/* -------------------------------------------------------------
   Scroll reveal
   ------------------------------------------------------------- */
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* -------------------------------------------------------------
   Contact form submission (Formspree)
   Replace YOUR_FORM_ID in index.html's form action with your real
   Formspree form ID — see README.md for setup steps.
   ------------------------------------------------------------- */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = contactForm.querySelector('.btn-submit');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const actionUrl = contactForm.getAttribute('action');
  if (!actionUrl || actionUrl.includes('YOUR_FORM_ID')) {
    formStatus.textContent = 'Contact form isn’t connected yet — see README.md to finish setup (Formspree ID needed). You can email mostlychyo@gmail.com directly in the meantime.';
    formStatus.className = 'form-status err';
    return;
  }

  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  try {
    const res = await fetch(actionUrl, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      formStatus.textContent = 'Thanks — your message has been sent. I’ll be in touch soon!';
      formStatus.className = 'form-status ok';
      contactForm.reset();
    } else {
      throw new Error('Request failed');
    }
  } catch (err) {
    formStatus.textContent = 'Something went wrong sending your message. Please try again, or email mostlychyo@gmail.com directly.';
    formStatus.className = 'form-status err';
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

/* -------------------------------------------------------------
   Misc
   ------------------------------------------------------------- */
document.getElementById('year').textContent = new Date().getFullYear();
window.addEventListener('load', () => {
  document.getElementById('loader').classList.add('hidden');
});
// Fallback in case load event already fired
setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1200);
