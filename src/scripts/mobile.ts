const mobile = window.matchMedia('(max-width: 600px)');
export {};
const header = document.querySelector<HTMLElement>('.site-header');
const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('#main-navigation');

function closeMenu(returnFocus = false) {
  header?.removeAttribute('data-menu-open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Menü öffnen');
  if (returnFocus) toggle?.focus();
}
function adaptLayout() {
  document.querySelectorAll<HTMLDetailsElement>('[data-mobile-disclosure]').forEach((details) => {
    details.open = !mobile.matches;
    const summary = details.querySelector('summary');
    if (summary) summary.tabIndex = mobile.matches ? 0 : -1;
  });
  closeMenu();
}
if (header && toggle && navigation) {
  header.dataset.menuReady = '';
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    header.toggleAttribute('data-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  });
  navigation.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a') && mobile.matches) closeMenu(true);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.hasAttribute('data-menu-open')) closeMenu(true);
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target as Node)) closeMenu();
  });
}
adaptLayout();
mobile.addEventListener('change', adaptLayout);
