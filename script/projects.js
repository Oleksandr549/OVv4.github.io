/* ─────────────────────────────────────────────
   PROJECTS DATA
   ─────────────────────────────────────────────
   Fill in your real projects here.
   Any field can be omitted — the UI handles it gracefully.

   Fields:
   - id:          unique number
   - title:       project name
   - type:        "Landing" | "Business" | "E-commerce" | "Platform" | "Web App" | etc.
   - stack:       array of tech tags
   - year:        string e.g. "2024"
   - country:     optional, e.g. "🇺🇸 United States"
   - client:      optional, e.g. "Restaurant Business"
   - image:       optional, path relative to root e.g. "images/VRLounge.png"
   - brief:       optional, short task description (1-2 sentences)
   - deliverables: optional, array of strings — what you did
   - review:      optional, object { text, author }
   - liveUrl:     optional, URL to live site
──────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 1,
    title: "VR Lounge",
    type: "Landing",
    stack: ["HTML", "CSS", "JavaScript", "GSAP"],
    year: "2024",
    country: "🇺🇸 United States",
    client: "Entertainment · VR Club",
    image: "images/VRLounge.png",
    brief: "A VR entertainment venue needed a high-impact landing page to drive bookings and showcase their immersive experiences.",
    deliverables: [
      "Full-page build from Figma design",
      "Advanced GSAP scroll animations and entrance effects",
      "Responsive layout for mobile and tablet",
      "Custom booking CTA section with hover interactions"
    ],
    review: {
      text: "The page looks stunning. Exactly what we needed — modern, fast, and our customers love it. Delivered ahead of schedule.",
      author: "Client · USA"
    },
    liveUrl: "#"
  },
  {
    id: 2,
    title: "Nations on Fire",
    type: "Platform",
    stack: ["HTML", "CSS", "JavaScript", "PHP"],
    year: "2024",
    country: "🇬🇧 United Kingdom",
    client: "Gaming · Online Platform",
    image: "images/NationsOnFire.png",
    brief: "A competitive online gaming platform requiring user authentication, dynamic leaderboards, and real-time match data.",
    deliverables: [
      "Multi-page platform architecture",
      "PHP backend with user registration and login",
      "Dynamic leaderboard and match history sections",
      "Fully responsive across all devices"
    ],
    liveUrl: "#"
  },
  {
    id: 3,
    title: "Dream Apart",
    type: "Business",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2023",
    country: "🇵🇱 Poland",
    client: "Real Estate · Apartment Rentals",
    image: "images/DreamApart.png",
    brief: "A premium apartment rental service needed a clean, conversion-focused website to attract international tenants.",
    deliverables: [
      "Property showcase with image galleries",
      "Interactive contact and booking form",
      "Multi-language layout preparation",
      "SEO-optimized structure and meta setup"
    ],
    liveUrl: "#"
  },
  {
    id: 4,
    title: "QBL Platform",
    type: "Web App",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
    year: "2024",
    country: "🇨🇦 Canada",
    client: "Sports · League Management",
    image: "images/QBL.png",
    brief: "A basketball league needed a full management platform — teams, schedules, standings, and player profiles, all in one place.",
    deliverables: [
      "Admin dashboard for league management",
      "Dynamic standings and schedule system",
      "Player and team profile pages",
      "PHP + SQL backend with full CRUD"
    ],
    liveUrl: "#"
  },
  // ─── ADD YOUR REAL PROJECTS BELOW ───────────
  // Copy and paste a block like this for each project:
  // {
  //   id: 5,
  //   title: "Project Name",
  //   type: "Landing",
  //   stack: ["HTML", "CSS", "JS"],
  //   year: "2024",
  //   country: "🇩🇪 Germany",
  //   client: "Restaurant Business",
  //   image: "images/your-screenshot.png",
  //   brief: "Short task description.",
  //   deliverables: ["What you did 1", "What you did 2"],
  //   review: { text: "Client review text.", author: "Client · Country" },
  //   liveUrl: "https://yourproject.com"
  // },
];

/* ─────────────────────────────────────────────
   CONFIG
──────────────────────────────────────────────── */
const PER_PAGE = 9; // cards visible initially / loaded per click

/* ─────────────────────────────────────────────
   STATE
──────────────────────────────────────────────── */
let shown = 0;

/* ─────────────────────────────────────────────
   NAV SCROLL
──────────────────────────────────────────────── */
window.addEventListener('scroll', () =>
  document.getElementById('nav').classList.toggle('s', scrollY > 60)
);

(function () {
  const burger = document.getElementById('navBurger');
  const mobile = document.getElementById('navMobile');
  if (!burger || !mobile) return;
  const toggle = () => {
    burger.classList.toggle('open');
    mobile.classList.toggle('open');
    document.body.style.overflow = mobile.classList.contains('open') ? 'hidden' : '';
  };
  burger.addEventListener('click', toggle);
  mobile.querySelectorAll('.nm-link').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobile.classList.remove('open');
    document.body.style.overflow = '';
  }));
})();

/* ─────────────────────────────────────────────
   HERO INTRO ANIMATIONS
──────────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

// Count up animation for project count
function countUp(el, target, duration = 1200) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('projCount').textContent = PROJECTS.length;

  // Hero staggered entrance
  const tl = gsap.timeline({ delay: .3 });

  tl.to('#phTag', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, 0)
    .to('#phTitle .ph-inner', {
      y: '0%',
      opacity: 1,
      duration: 1,
      stagger: .15,
      ease: 'power4.out'
    }, .2)
    .to('#phSub', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, .55)
    .to('#phMeta', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, .75);

  // Count-up on meta number
  setTimeout(() => {
    countUp(document.getElementById('projCount'), PROJECTS.length, 900);
  }, 900);

  gsap.to('#phScroll', { opacity: 1, duration: .8, delay: 1.6 });

  // Initial load
  renderCards(PER_PAGE);
  updateLoadBtn();
});

/* ─────────────────────────────────────────────
   CARD RENDERING
──────────────────────────────────────────────── */
function renderCards(count) {
  const grid = document.getElementById('pgGrid');
  const end = Math.min(shown + count, PROJECTS.length);
  const newCards = [];

  for (let i = shown; i < end; i++) {
    const p = PROJECTS[i];
    const card = buildCard(p, i);
    grid.appendChild(card);
    newCards.push(card);
  }

  shown = end;

  // Staggered entrance via CSS transition
  newCards.forEach((card, idx) => {
    setTimeout(() => {
      card.style.transition = `opacity .55s cubic-bezier(.16,1,.3,1) ${idx * 60}ms, transform .55s cubic-bezier(.16,1,.3,1) ${idx * 60}ms`;
      card.classList.add('visible');
    }, 30);
  });

  updateLoadBtn();
}

function buildCard(p, idx) {
  const card = document.createElement('div');
  card.className = 'pg-card';
  card.setAttribute('data-id', p.id);

  // Media
  const mediaEl = p.image
    ? `<img class="pg-card-img" src="${p.image}" alt="${p.title}" loading="lazy">`
    : `<div class="pg-card-placeholder"><span class="pg-card-placeholder-ico">${p.title.charAt(0)}</span></div>`;

  // Stack tags (max 3 on card)
  const stackTags = (p.stack || []).slice(0, 3).map(t =>
    `<span class="pg-stack-tag">${t}</span>`
  ).join('');

  card.innerHTML = `
    ${mediaEl}
    <span class="pg-card-num">${String(idx + 1).padStart(2, '0')}</span>
    ${p.type ? `<span class="pg-card-type">${p.type}</span>` : ''}
    <div class="pg-card-hover">
      <div class="pg-card-title">${p.title}</div>
      ${p.stack?.length ? `<div class="pg-card-stack">${stackTags}</div>` : ''}
      <div class="pg-card-cta">
        View Project
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </div>
  `;

  card.addEventListener('click', () => openModal(p));
  return card;
}

function updateLoadBtn() {
  const wrap = document.getElementById('pgLoadWrap');
  const btn = document.getElementById('pgLoadBtn');
  const countEl = document.getElementById('pgLoadCount');

  if (shown >= PROJECTS.length) {
    wrap.classList.add('hidden');
    return;
  }

  const remaining = PROJECTS.length - shown;
  countEl.textContent = `+${Math.min(remaining, PER_PAGE)} more`;
}

document.getElementById('pgLoadBtn').addEventListener('click', () => {
  // Button click animation
  const btn = document.getElementById('pgLoadBtn');
  btn.style.transform = 'scale(.97)';
  setTimeout(() => btn.style.transform = '', 200);

  renderCards(PER_PAGE);
});

/* ─────────────────────────────────────────────
   MODAL
──────────────────────────────────────────────── */
const overlay = document.getElementById('pmOverlay');
const panel = document.getElementById('pmPanel');

function openModal(p) {
  // Media
  const mediaEl = document.getElementById('pmMedia');
  mediaEl.innerHTML = p.image
    ? `<img src="${p.image}" alt="${p.title}">`
    : `<div class="pm-media-placeholder"><span>${p.title.charAt(0)}</span></div>`;

  // Meta bar
  const metaBar = document.getElementById('pmMetaBar');
  let metaHtml = '';
  if (p.type) metaHtml += `<span class="pm-meta-tag type">${p.type}</span>`;
  if (p.country) metaHtml += `<span class="pm-meta-tag country">${p.country}</span>`;
  if (p.client) metaHtml += `<span class="pm-meta-tag stack">${p.client}</span>`;
  (p.stack || []).forEach(t => { metaHtml += `<span class="pm-meta-tag stack">${t}</span>`; });
  if (p.year) metaHtml += `<span class="pm-meta-tag year">${p.year}</span>`;
  metaBar.innerHTML = metaHtml;

  // Body
  const body = document.getElementById('pmBody');
  let bodyHtml = `<h2 class="pm-title">${p.title}</h2>`;

  if (p.brief) {
    bodyHtml += `
      <div class="pm-section-label">The Brief</div>
      <p class="pm-text">${p.brief}</p>
    `;
  }

  if (p.deliverables?.length) {
    bodyHtml += `
      <div class="pm-div"></div>
      <div class="pm-section-label">What I Did</div>
      <ul class="pm-deliverables">
        ${p.deliverables.map(d => `<li>${d}</li>`).join('')}
      </ul>
    `;
  }

  if (p.review) {
    bodyHtml += `
      <div class="pm-div"></div>
      <div class="pm-review">
        <div class="pm-review-text">"${p.review.text}"</div>
        <div class="pm-review-author">— ${p.review.author}</div>
      </div>
    `;
  }

  body.innerHTML = bodyHtml;

  // CTA
  const cta = document.getElementById('pmCta');
  cta.innerHTML = '';
  if (p.liveUrl && p.liveUrl !== '#') {
    cta.innerHTML += `
      <a href="${p.liveUrl}" target="_blank" class="pm-cta-primary">
        Visit Live Site
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    `;
  }
  cta.innerHTML += `
    <a href="index.html#contact" class="pm-cta-secondary">
      Discuss a Project →
    </a>
  `;

  // Open
  document.getElementById('pmInner').scrollTop = 0;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('pmClose').addEventListener('click', closeModal);

// Click outside panel
overlay.addEventListener('click', (e) => {
  if (!panel.contains(e.target)) closeModal();
});

// Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
});
