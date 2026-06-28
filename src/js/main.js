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

// ── MAG 7 LIVE STOCK TICKER ──
const MAG7 = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA'];

async function fetchStockData() {
  const symbols = MAG7.join(',');
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json?.quoteResponse?.result || [];
  } catch {
    try {
      const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const res2 = await fetch(proxy);
      const json2 = await res2.json();
      return json2?.quoteResponse?.result || [];
    } catch {
      return [];
    }
  }
}

function buildTickerHTML(quotes) {
  if (!quotes.length) return null;
  return quotes.map(q => {
    const price = q.regularMarketPrice?.toFixed(2) ?? '—';
    const pct   = q.regularMarketChangePercent?.toFixed(2) ?? '0';
    const up    = parseFloat(pct) >= 0;
    const arrow = up ? '▲' : '▼';
    const cls   = up ? 'ticker__stock--up' : 'ticker__stock--down';
    return `<span class="ticker__item ticker__stock ${cls}">` +
      `<span class="ticker__symbol">${q.symbol}</span>` +
      `<span class="ticker__price">$${price}</span>` +
      `<span class="ticker__change">${arrow} ${up ? '+' : ''}${pct}%</span>` +
      `</span>`;
  }).join('');
}

async function initStockTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  const quotes = await fetchStockData();
  const html   = buildTickerHTML(quotes);
  if (html) {
    track.innerHTML = html + html; // duplicate for seamless loop
  }
}

initStockTicker();
setInterval(initStockTicker, 60000); // refresh every minute
