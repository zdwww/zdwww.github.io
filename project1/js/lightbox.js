// Lightbox — the original creative component.
// Opens the clicked photo in a native <dialog>, with arrow-key + click navigation.
// Listens to 'gallery:filter' so prev/next only cycles through currently-visible tiles.

const FOCUSABLE = 'button, [href], [tabindex]:not([tabindex="-1"])';

export function initLightbox(galleryRoot) {
  const dialog = document.querySelector('.lightbox');
  const stage = dialog.querySelector('.lightbox-image');
  const figNum = dialog.querySelector('[data-role="fig-num"]');
  const catLabel = dialog.querySelector('[data-role="cat-label"]');
  const captionEl = dialog.querySelector('[data-role="caption"]');
  const prevBtn = dialog.querySelector('[data-role="prev"]');
  const nextBtn = dialog.querySelector('[data-role="next"]');
  const closeBtn = dialog.querySelector('[data-role="close"]');

  let currentIndex = 0;

  const visibleTiles = () =>
    Array.from(galleryRoot.querySelectorAll('.photo-tile')).filter(
      (tile) => !tile.classList.contains('is-hidden')
    );

  const render = (tiles) => {
    if (!tiles.length) {
      dialog.close();
      return;
    }
    if (currentIndex >= tiles.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = tiles.length - 1;
    const tile = tiles[currentIndex];
    const img = tile.querySelector('img');
    stage.innerHTML = '';
    const clone = new Image();
    clone.src = img.src;
    clone.alt = img.alt;
    stage.appendChild(clone);
    figNum.textContent = `Fig. ${String(currentIndex + 1).padStart(2, '0')}`;
    catLabel.textContent = tile.dataset.cat;
    captionEl.textContent = tile.dataset.caption || img.alt;
  };

  const open = (startIndex) => {
    currentIndex = startIndex;
    render(visibleTiles());
    if (!dialog.open) dialog.showModal();
  };

  const step = (delta) => {
    const tiles = visibleTiles();
    if (!tiles.length) return;
    currentIndex = (currentIndex + delta + tiles.length) % tiles.length;
    render(tiles);
  };

  galleryRoot.addEventListener('click', (event) => {
    const tile = event.target.closest('.photo-tile');
    if (!tile) return;
    event.preventDefault();
    const tiles = visibleTiles();
    const idx = tiles.indexOf(tile);
    if (idx >= 0) open(idx);
  });

  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  closeBtn.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    const rect = dialog.querySelector('.lightbox-frame').getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!inside) dialog.close();
  });

  document.addEventListener('keydown', (event) => {
    if (!dialog.open) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    }
  });

  galleryRoot.addEventListener('gallery:filter', () => {
    if (dialog.open) render(visibleTiles());
  });

  dialog.addEventListener('close', () => {
    stage.innerHTML = '';
  });

  galleryRoot.querySelectorAll(FOCUSABLE).forEach((el) => {
    el.setAttribute('data-focusable', '1');
  });
}
