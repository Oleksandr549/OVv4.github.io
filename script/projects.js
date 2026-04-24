/* ─────────────────────────────────────────────
   DATA is in script/projects-data.js
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

  card.addEventListener('click', () => navigateToProject(p.id));
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
   CARD CLICK — page transition → project-detail
──────────────────────────────────────────────── */
function navigateToProject(id) {
  const pt = document.getElementById('pageTransition');
  pt.classList.add('slide-up');
  setTimeout(() => {
    window.location.href = `project-detail.html?id=${id}`;
  }, 480);
}

