// ═══ ALTURA REAL DEL HERO EN PÍXELES (solo desktop — evita ambigüedad de 100vh) ═══
// En mobile/tablet el hero NO se fuerza a una altura: mide lo que su contenido necesita.
function setHeroHeight() {
  const hero = document.querySelector('.hero');
  const text = document.querySelector('.hero-text');
  if (!hero) return;
  if (window.innerWidth > 1024) {
    const h = window.innerHeight + 'px';
    hero.style.height = h;
    if (text) text.style.height = h;
  } else {
    hero.style.height = '';
    if (text) text.style.height = '';
  }
}
setHeroHeight();
window.addEventListener('resize', setHeroHeight);

// ═══ MENÚ MOBILE ═══
const burger = document.getElementById('burger');
const mnav = document.getElementById('mnav');
const moverlay = document.getElementById('moverlay');

function toggleMenu() {
  burger.classList.toggle('open');
  mnav.classList.toggle('open');
  moverlay.classList.toggle('open');
}

burger.addEventListener('click', toggleMenu);
moverlay.addEventListener('click', toggleMenu);
document.querySelectorAll('#mnav a').forEach(a => a.addEventListener('click', () => {
  if (mnav.classList.contains('open')) toggleMenu();
}));

// ═══ WHATSAPP FLOAT + VOLVER ARRIBA + HEADER ═══
const wapFloat = document.querySelector('.wap-float');
const topFloat = document.getElementById('topFloat');
const siteHeader = document.getElementById('siteHeader');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    wapFloat.classList.add('show');
    topFloat.classList.add('show');
  } else {
    wapFloat.classList.remove('show');
    topFloat.classList.remove('show');
  }

  if (window.scrollY > 60) siteHeader.classList.add('scrolled');
  else siteHeader.classList.remove('scrolled');
});

topFloat.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ═══ REVEAL ON SCROLL ═══
document.querySelectorAll('.stats-inner, .values-list').forEach(container => {
  Array.from(container.children).forEach((el, i) => {
    if (el.classList.contains('reveal')) el.style.transitionDelay = (i * 70) + 'ms';
  });
});

// ═══ FAQ ACCORDION ═══
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-a');
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item.open').forEach(open => {
    if (open !== item) {
      open.classList.remove('open');
      open.querySelector('.faq-a').style.maxHeight = null;
    }
  });

  if (isOpen) {
    item.classList.remove('open');
    answer.style.maxHeight = null;
  } else {
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));
