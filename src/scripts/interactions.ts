const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const explorer = document.querySelector<HTMLElement>('.system-explorer');
if (explorer) {
  const controls = explorer.querySelector<HTMLElement>('.explorer-controls');
  const buttons = explorer.querySelectorAll<HTMLButtonElement>('[data-field]');
  const descriptions = explorer.querySelectorAll<HTMLElement>('[data-description]');
  if (controls) controls.hidden = false;
  buttons.forEach((button) =>
    button.addEventListener('click', (event) => {
      explorer.toggleAttribute('data-instant', event.detail === 0);
      explorer.dataset.active = button.dataset.field;
      buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      descriptions.forEach((item) => {
        item.hidden = item.dataset.description !== button.dataset.field;
      });
    }),
  );
}
document.querySelectorAll<HTMLDetailsElement>('.case-study').forEach((details) => {
  const summary = details.querySelector('summary');
  const content = details.querySelector<HTMLElement>('.case-study-content');
  let pointerTriggered = false;
  let animation: Animation | undefined;
  summary?.addEventListener('click', (event) => {
    pointerTriggered = event.detail !== 0;
  });
  details.addEventListener('toggle', () => {
    animation?.cancel();
    if (details.open && content && pointerTriggered && !reducedMotion.matches) {
      animation = content.animate(
        [
          { opacity: 0, transform: 'translateY(-6px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 200, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      );
    }
  });
  reducedMotion.addEventListener('change', () => animation?.cancel());
});
const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-section]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          navLinks.forEach((link) => {
            if (link.dataset.section === entry.target.id)
              link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
      });
    },
    { rootMargin: '-10% 0px -60% 0px', threshold: 0 },
  );
  document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
}
