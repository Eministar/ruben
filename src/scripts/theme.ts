const root = document.documentElement;
const system = window.matchMedia('(prefers-color-scheme: dark)');
const controls = document.querySelector<HTMLElement>('.theme-options');
const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-choice]');
function updateSelection() {
  buttons.forEach((button) =>
    button.setAttribute(
      'aria-pressed',
      String(button.dataset.themeChoice === (root.dataset.theme ?? 'system')),
    ),
  );
}

function updateBrowserColor() {
  const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && system.matches);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', dark ? '#151c1a' : '#eeeee8');
}

if (controls) {
  updateSelection();
  controls.hidden = false;
  buttons.forEach((button) =>
    button.addEventListener('click', () => {
      const choice = button.dataset.themeChoice!;
      if (choice === 'system') delete root.dataset.theme;
      else root.dataset.theme = choice;
      try {
        if (choice === 'system') localStorage.removeItem('ruben-theme');
        else localStorage.setItem('ruben-theme', choice);
      } catch {
        /* The selection still works for the current page. */
      }
      updateBrowserColor();
      updateSelection();
    }),
  );
}
system.addEventListener('change', updateBrowserColor);
window.addEventListener('storage', (event) => {
  if (event.key !== 'ruben-theme' && event.key !== null) return;
  if (event.newValue === 'light' || event.newValue === 'dark') root.dataset.theme = event.newValue;
  else delete root.dataset.theme;
  updateSelection();
  updateBrowserColor();
});
updateBrowserColor();
