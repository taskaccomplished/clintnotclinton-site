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

const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
};

if (document.body.dataset.analyticsPage === 'novel-landing') {
  trackEvent('novel_landing_page_view');
}

const chapterNumber = document.body.dataset.chapterNumber;
if (chapterNumber) {
  trackEvent('chapter_view', {
    chapter_number: chapterNumber,
    chapter_title: document.querySelector('.reader-hero h1')?.textContent.trim()
  });
}

document.querySelectorAll('[data-analytics-event]').forEach((element) => {
  element.addEventListener('click', () => {
    const { analyticsEvent, chapter, signupLocation } = element.dataset;
    trackEvent(analyticsEvent, {
      chapter_number: chapter || chapterNumber || undefined,
      location: signupLocation || undefined
    });
  });
});

document.querySelectorAll('[data-chapter-share]').forEach((button) => {
  button.addEventListener('click', async () => {
    const shareUrl = window.location.href;
    const title = document.title.split(' | ')[0];
    const shareText = `Read ${title}, a chapter of The Trial.`;
    const status = document.querySelector('[data-chapter-share-status]');

    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
        if (status) status.textContent = 'Thanks for sharing.';
      } catch (error) {
        if (error.name !== 'AbortError' && status) status.textContent = 'Sharing is unavailable here. You can copy the page address from your browser.';
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      if (status) status.textContent = 'Chapter link copied. Send it to someone who might enjoy it.';
    } catch {
      if (status) status.textContent = 'Copy the chapter address from your browser to share it.';
    }
  });
});

const chapterEnd = document.querySelector('.chapter-end');
if (chapterEnd && chapterNumber === '2' && !document.querySelector('.chapter-countdown')) {
  const countdown = document.createElement('section');
  countdown.className = 'chapter-countdown';
  countdown.setAttribute('aria-label', 'Countdown to Chapter Three release');
  countdown.innerHTML = '<span>Next chapter · Popo</span><strong data-release-countdown="2026-11-01T08:00:00-07:00">Loading countdown…</strong><small>November 1 · 8 AM MST</small>';
  chapterEnd.before(countdown);
}

document.querySelectorAll('[data-release-countdown]').forEach((countdown) => {
  const releaseTime = new Date(countdown.dataset.releaseCountdown).getTime();
  let countdownInterval;

  const updateCountdown = () => {
    const remaining = releaseTime - Date.now();

    if (remaining <= 0) {
      countdown.textContent = 'Chapter Three is here';
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
