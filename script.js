// Claude 101 — comportamiento compartido del sitio
document.addEventListener('DOMContentLoaded', () => {

  // --- Reveal on scroll (con soporte prefers-reduced-motion via CSS) ---
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // --- Wall "Load More" (testimonios de volumen, estilo Fundamentos) ---
  const loadMoreBtn = document.querySelector('[data-load-more]');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      document.querySelectorAll('.wall-card.hidden-item').forEach(el => el.classList.remove('hidden-item'));
      loadMoreBtn.style.display = 'none';
    });
  }

  // --- Calendar mock (solo visual — conectar a Calendly/Cal.com real) ---
  document.querySelectorAll('.cal-grid .day:not(.disabled)').forEach(day => {
    day.addEventListener('click', () => {
      document.querySelectorAll('.cal-grid .day.selected').forEach(d => d.classList.remove('selected'));
      day.classList.add('selected');
    });
  });
  document.querySelectorAll('.slot').forEach(slot => {
    slot.addEventListener('click', () => {
      document.querySelectorAll('.slot.selected').forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      const confirmNote = document.querySelector('[data-confirm-note]');
      if (confirmNote) {
        confirmNote.textContent = 'Demo: aquí se confirmaría tu cita para ' + slot.textContent.trim() + '. Conecta Calendly/Cal.com para que esto sea real.';
      }
    });
  });

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.mobile-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '64px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = '#0a0a0a';
      links.style.padding = '20px 24px';
      links.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
    });
  }
});
