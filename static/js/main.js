const header = document.querySelector('[data-header]');
const glow = document.querySelector('.cursor-glow');
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
  revealObserver.observe(item);
});

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 16);
}, { passive: true });

if (window.matchMedia('(pointer: fine)').matches && glow) {
  window.addEventListener('mousemove', (event) => {
    glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  }, { passive: true });
} else {
  document.body.classList.add('no-scroll-glow');
}

const cards = document.querySelectorAll('.feature-card, .audience-card, .direction-panel');

cards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});
