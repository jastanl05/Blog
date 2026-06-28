// ── NAV: scroll effect + mobile toggle ──
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── BLOG SEARCH ──
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    const term = this.value.toLowerCase().trim();
    document.querySelectorAll('.post-card').forEach(card => {
      const title = card.querySelector('.post-card__title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.post-card__excerpt')?.textContent.toLowerCase() || '';
      const match = !term || title.includes(term) || excerpt.includes(term);
      card.closest('.post-card-wrap').style.display = match ? '' : 'none';
    });
  });
}

// ── NEWSLETTER FORM ──
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
      this.innerHTML = '<p style="color:var(--gold-light);font-weight:700;font-size:18px;">✓ You\'re on the list! Check your inbox.</p>';
    }
  });
}
