/* =========================================================================
   TapReview – Globales JavaScript
   - Mobile-Navigation
   - Scroll-Reveal (Fade-In) via IntersectionObserver
   - Leichter Parallax-Effekt
   - Produkt-Rendering aus data/products.json
   - Mini-Warenkorb (localStorage) für die Checkout-Demo
   ========================================================================= */

/* ---------- 1. Mobile-Navigation ---------- */
function initNav() {
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');
  if (!nav || !toggle) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '✕' : '☰';
  });
  nav.querySelectorAll('.tr-nav__links a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.textContent = '☰';
    })
  );
}

/* ---------- 2. Scroll-Reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll('.tr-reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
}

/* ---------- 3. Sanfter Parallax ---------- */
function initParallax() {
  const layers = document.querySelectorAll('[data-parallax]');
  if (!layers.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      layers.forEach(l => {
        const speed = parseFloat(l.dataset.parallax) || 0.15;
        l.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
      ticking = false;
    });
  }, { passive: true });
}

/* ---------- 4. Währungsformat (CHF) ---------- */
const CHF = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' });

/* ---------- 5. Produktdaten laden ---------- */
async function loadProducts() {
  // 1) Eingebettete Daten (funktioniert auch per Doppelklick / file://)
  if (window.TR_PRODUCTS && Array.isArray(window.TR_PRODUCTS.products)) {
    return window.TR_PRODUCTS;
  }
  // 2) Fallback: JSON laden (wenn über einen Webserver ausgeliefert)
  try {
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error('products.json nicht gefunden');
    return await res.json();
  } catch (err) {
    console.warn('[TapReview] Produktdaten konnten nicht geladen werden:', err);
    return { products: [] };
  }
}

/* Produktkarte als HTML-String – schlicht, Bild vollständig (nicht beschnitten) */
function productCard(p) {
  const badge = p.badge ? `<span class="tr-badge" style="position:absolute;top:.85rem;left:.85rem;z-index:2">${p.badge}</span>` : '';
  const imgs = Array.isArray(p.images) && p.images.length > 1 ? p.images : [p.image];
  const arrow = imgs.length > 1
    ? `<button type="button" class="tr-img-next" aria-label="Zweite Ansicht zeigen" data-a="${imgs[0]}" data-b="${imgs[1]}"
         onclick="event.preventDefault();event.stopPropagation();var i=this.parentNode.querySelector('img');i.src=(i.getAttribute('src')===this.dataset.a?this.dataset.b:this.dataset.a);">&rsaquo;</button>`
    : '';
  return `
  <article class="tr-card tr-reveal" data-delay="1">
    <a href="/produkt?id=${p.id}" style="display:block;color:inherit">
      <div class="tr-stage">
        ${badge}
        <img src="${imgs[0]}" alt="${p.name}" loading="lazy"
             onerror="this.src='assets/placeholder.svg'">
        ${arrow}
      </div>
      <div style="padding:1.15rem 1.25rem 1.35rem">
        <h3 class="tr-h3" style="font-size:1.12rem;margin:0 0 .3rem">${p.name}</h3>
        <p style="color:var(--tr-text-2);font-size:.9rem;margin:0 0 1rem;min-height:2.5em">${p.tagline}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:.75rem">
          <strong style="font-size:1.2rem">ab ${CHF.format(p.price)}</strong>
          <span class="tr-btn tr-btn--primary" style="pointer-events:none;padding:.5rem 1.1rem;font-size:.95rem">Ansehen</span>
        </div>
      </div>
    </a>
  </article>`;
}

/* Produkte auf der Landingpage rendern */
async function renderProductGrid(targetSel, filterCategory) {
  const target = document.querySelector(targetSel);
  if (!target) return;
  const { products } = await loadProducts();
  const list = filterCategory ? products.filter(p => p.category === filterCategory) : products;
  target.innerHTML = list.map(productCard).join('');
  initReveal();           // neu eingefügte Karten beobachten
}

/* ---------- 6. Mini-Warenkorb (mit Mengen-Sets) ----------
   Jede Warenkorb-Zeile: { id, packQty, packPrice, count }
   packQty  = Stückzahl im Set (1, 2, 5, 10)
   packPrice = Set-Preis in CHF
   count    = wie oft dieses Set gewählt wurde                            */
const Cart = {
  key: 'tapreview_cart',
  get() {
    try {
      const raw = JSON.parse(localStorage.getItem(this.key)) || [];
      // nur gültige Set-Zeilen behalten (alte Formate ignorieren)
      return raw.filter(i => i && i.id && i.packQty && i.packPrice);
    } catch { return []; }
  },
  save(items) { localStorage.setItem(this.key, JSON.stringify(items)); this.updateBadge(); },
  lineKey(id, packQty) { return id + ':' + packQty; },
  add(id, packQty, packPrice, count = 1) {
    const items = this.get();
    const key = this.lineKey(id, packQty);
    const found = items.find(i => this.lineKey(i.id, i.packQty) === key);
    if (found) found.count += count; else items.push({ id, packQty, packPrice, count });
    this.save(items);
  },
  setCount(key, count) {
    const items = this.get();
    const it = items.find(i => this.lineKey(i.id, i.packQty) === key);
    if (it) it.count = Math.max(1, count);
    this.save(items);
  },
  remove(key) { this.save(this.get().filter(i => this.lineKey(i.id, i.packQty) !== key)); },
  pieces()   { return this.get().reduce((n, i) => n + i.packQty * i.count, 0); },
  subtotal() { return this.get().reduce((s, i) => s + i.packPrice * i.count, 0); },
  updateBadge() {
    const b = document.querySelector('[data-cart-count]');
    if (b) { const c = this.pieces(); b.textContent = c; b.style.display = c ? 'inline-block' : 'none'; }
  }
};

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initParallax();
  Cart.updateBadge();
  // Jahr im Footer
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
});

window.TapReview = { Cart, loadProducts, renderProductGrid, CHF, productCard };
