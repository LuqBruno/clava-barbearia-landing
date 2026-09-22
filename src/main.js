document.documentElement.classList.add('js');

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  menu.setAttribute('aria-expanded', 'false');
  if (returnFocus) menu.focus();
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menu.setAttribute('aria-expanded', String(open));
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
matchMedia('(min-width: 681px)').addEventListener('change', () => closeMenu());

const bookingLink = document.querySelector('#booking-link');
document.querySelector('.service-picker').addEventListener('change', (event) => {
  if (!event.target.matches('input[name="interesse"]')) return;
  const message = `Olá! Gostaria de consultar um horário para ${event.target.value} na Clava.`;
  bookingLink.href = `https://wa.me/5548988583805?text=${encodeURIComponent(message)}`;
});

const dialog = document.querySelector('#photo-dialog');
document.querySelectorAll('[data-photo]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    dialog.querySelector('img').src = link.href;
    dialog.querySelector('img').alt = link.querySelector('img').alt;
    dialog.querySelector('figcaption').textContent = link.dataset.caption;
    dialog.showModal();
  });
});
dialog.querySelector('button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

document.querySelector('.preview-bar a').addEventListener('click', () => {
  document.querySelector('#sobre-previa').open = true;
});
