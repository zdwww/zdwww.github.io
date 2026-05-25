// Filter — toggle visibility of photo tiles by cat.
// Dispatches 'gallery:filter' on the gallery root so the lightbox can stay in sync.

export function initFilter(galleryRoot, chipRoot) {
  const chips = Array.from(chipRoot.querySelectorAll('.filter-chip'));

  const apply = (target) => {
    chips.forEach((chip) => {
      const isActive = chip === target;
      chip.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    const value = target.dataset.cat || 'all';
    const tiles = galleryRoot.querySelectorAll('.photo-tile');
    tiles.forEach((tile) => {
      const match = value === 'all' || tile.dataset.cat === value;
      tile.classList.toggle('is-hidden', !match);
    });
    galleryRoot.dispatchEvent(new CustomEvent('gallery:filter', { detail: { value } }));
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => apply(chip));
  });

  const initial =
    chips.find((c) => c.getAttribute('aria-pressed') === 'true') || chips[0];
  if (initial) apply(initial);
}
