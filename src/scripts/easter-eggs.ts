console.info(
  '%c rs. %c Verbindung hergestellt.\nDu schaust unter die Oberfläche. Das gefällt mir.\nEin kleiner Hinweis: Im Impressum wartet ein Paket auf Port 22.',
  'background:#244aca;color:#fff;font-weight:bold;padding:4px 8px;border-radius:3px',
  'color:#849beb;font-weight:bold',
);

const trigger = document.querySelector<HTMLButtonElement>('.packet-trigger');
const dialog = document.querySelector<HTMLDialogElement>('#packet-dialog');
if (trigger && dialog) {
  trigger.hidden = false;
  trigger.addEventListener('click', () => dialog.showModal());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  });
}
