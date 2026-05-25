// Entry module. Each page wires up only the parts it needs.
import { photos, cats } from './manifest.js';
import { initLightbox } from './lightbox.js';
import { initFilter } from './filter.js';
import { initSprite } from './sprite.js';

const page = document.body.dataset.page;

if (page === 'gallery') {
  buildGallery();
}

if (page === 'companions') {
  buildCompanions();
}

function buildGallery() {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  gallery.innerHTML = '';
  photos.forEach((photo, index) => {
    const tile = document.createElement('a');
    tile.className = 'photo-tile';
    if (photo.span === 'tall') tile.classList.add('is-tall');
    if (photo.span === 'wide') tile.classList.add('is-wide');
    tile.href = photo.src;
    tile.dataset.cat = photo.cat;
    tile.dataset.caption = photo.caption;
    tile.style.setProperty('--tile-index', String(index));

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = `${cats[photo.cat].displayName} — ${photo.caption}`;
    img.loading = 'lazy';
    img.decoding = 'async';

    const tag = document.createElement('span');
    tag.className = 'fig-tag';
    tag.innerHTML = `
      <span class="cat-dot" aria-hidden="true"></span>
      <span>Fig. ${String(index + 1).padStart(2, '0')}</span>
      <span class="cat-name">${cats[photo.cat].displayName}</span>
    `;

    tile.appendChild(img);
    tile.appendChild(tag);
    gallery.appendChild(tile);
  });

  const filters = document.querySelector('.filters');
  if (filters) initFilter(gallery, filters);

  initLightbox(gallery);
}

function buildCompanions() {
  document.querySelectorAll('.companion').forEach(async (card) => {
    const cat = card.dataset.cat;
    const stage = card.querySelector('.sprite');
    const descEl = card.querySelector('[data-role="desc"]');
    const nameEl = card.querySelector('[data-role="name"]');

    try {
      const res = await fetch(`images/ai/${cat}.json`);
      if (res.ok) {
        const meta = await res.json();
        if (nameEl) nameEl.innerHTML = `An imagined <em>${meta.displayName}</em>`;
        if (descEl) descEl.textContent = meta.description;
      }
    } catch (err) {
      console.warn('Could not load pet manifest for', cat, err);
    }

    const sprite = initSprite(stage, { src: `images/ai/${cat}.webp`, state: 'idle' });

    const controls = card.querySelector('.companion-controls');
    if (!controls) return;
    controls.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if (action === 'pause') {
          if (sprite.isPaused()) {
            sprite.start();
            btn.textContent = 'Pause';
          } else {
            sprite.stop();
            btn.textContent = 'Play';
          }
        } else {
          sprite.setState(action);
          sprite.start();
          const pauseBtn = controls.querySelector('[data-action="pause"]');
          if (pauseBtn) pauseBtn.textContent = 'Pause';
        }
      });
    });
  });
}
