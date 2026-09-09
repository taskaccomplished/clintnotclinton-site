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

const chapterCountdown = document.querySelector('#chapter-countdown');

if (chapterCountdown) {
  const releaseTime = new Date(chapterCountdown.dataset.release).getTime();
  let countdownInterval;

  const updateCountdown = () => {
    const remaining = releaseTime - Date.now();

    if (remaining <= 0) {
      chapterCountdown.textContent = 'Chapter Two is here';
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(remaining / 86_400_000);
    const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
    const minutes = Math.floor((remaining % 3_600_000) / 60_000);
    const seconds = Math.floor((remaining % 60_000) / 1_000);

    chapterCountdown.textContent = `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  };

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1_000);
}
