const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.firstChild.textContent = open ? 'Close ' : 'Menu ';
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.firstChild.textContent = 'Menu ';
  }));
}

const chapterEnd = document.querySelector('.chapter-end');
if (chapterEnd && !document.querySelector('.chapter-countdown')) {
  const countdown = document.createElement('section');
  countdown.className = 'chapter-countdown';
  countdown.setAttribute('aria-label', 'Countdown to Chapter Two release');
  countdown.innerHTML = '<span>Next chapter · Noriko</span><strong data-release-countdown="2026-10-04T08:00:00-06:00">Loading countdown…</strong><small>October 4 · 8 AM MDT</small>';
  chapterEnd.before(countdown);
}

document.querySelectorAll('[data-release-countdown]').forEach((countdown) => {
  const releaseTime = new Date(countdown.dataset.releaseCountdown).getTime();
  let countdownInterval;

  const updateCountdown = () => {
    const remaining = releaseTime - Date.now();

    if (remaining <= 0) {
      countdown.textContent = 'Chapter Two is here';
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(remaining / 86_400_000);
    const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
    const minutes = Math.floor((remaining % 3_600_000) / 60_000);
    const seconds = Math.floor((remaining % 60_000) / 1_000);

    countdown.textContent = `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  };

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1_000);
});
