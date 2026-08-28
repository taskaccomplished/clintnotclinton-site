const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.firstChild.textContent = open ? 'Close ' : 'Menu ';
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.firstChild.textContent = 'Menu ';
}));
document.querySelector('#subscribe-form').addEventListener('submit', event => {
  event.preventDefault();
  const toast = document.querySelector('.toast');
  toast.classList.add('show'); event.currentTarget.reset();
  setTimeout(() => toast.classList.remove('show'), 4200);
});
