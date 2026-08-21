// Shared content and page interactions for Laura Loves Horror.
let content = {
    videos: [
      { id: 'NXjhMHKlqH4', label: 'New today · Laura Loves Horror' },
      { id: 'pHwi8YHLjvc', label: 'New yesterday · Laura Loves Horror' },
      { id: 'mJUkFrxHfoY', start: 106, label: 'Laura Loves Horror · Watch now' }
    ],
  review: { title: 'The Orphanage', year: '2007', director: 'J. A. Bayona', genre: 'Gothic horror · Drama', rating: '★★★★★', image: 'orphanage-still.jpg', copy: 'A beautifully haunting ghost story that is as heartbreaking as it is frightening. Laura loved it — an absolute five-star watch.', url: 'the-orphanage.html' },
  reviews: [
    { title: 'The Orphanage', year: '2007', genre: 'Gothic Horror', rating: '★★★★★', image: 'orphanage-still.jpg', url: 'the-orphanage.html' },
    { title: 'When Evil Lurks', year: '2023', genre: 'Supernatural', rating: '★★★★', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80', slug: 'when-evil-lurks' },
    { title: 'Talk to Me', year: '2023', genre: 'A24 / Independent', rating: '★★★★', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80', slug: 'talk-to-me' },
    { title: 'The Outwaters', year: '2022', genre: 'Found Footage', rating: '★★★½', image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=600&q=80', slug: 'the-outwaters' },
    { title: 'Titane', year: '2021', genre: 'Body Horror', rating: '★★★★½', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80', slug: 'titane' },
    { title: 'Cure', year: '1997', genre: 'International', rating: '★★★★★', image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=600&q=80', slug: 'cure' },
    { title: 'The House of the Devil', year: '2009', genre: 'Cult', rating: '★★★★', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', slug: 'the-house-of-the-devil' },
    { title: 'The Night House', year: '2020', genre: 'Horror', rating: '★★★★', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=600&q=80', slug: 'the-night-house' }
  ],
  crypt: [
    { id: '10-scariest-horror-movies', title: "The 10 Scariest Horror Movies I’ve Ever Seen", type: 'Essential list', categories: ['top-10s', 'horror', 'disturbing', 'found-footage'], url: 'the-10-scariest-horror-movies.html', image: 'assets/crypt-scariest-ring.webp', intro: 'After more than 1,000 horror movies, these are the ten that have truly stayed with me, the cursed tapes, night-vision nightmares and haunted places she still thinks about after the credits.' },
    { id: 'best-horror', title: "The 50 Best Horror Movies I've Ever Seen", type: 'Essential list', categories: ['top-50s', 'horror'], url: 'crypt-post.html?article=best-horror', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=85', intro: 'The essential horror films Laura returns to again and again — classics, modern masterpieces and personal obsessions that never lose their power.' },
    { id: 'horror-2026', title: 'The Best Horror Movies of 2026 — Ranked', type: 'New releases', categories: ['horror'], url: 'crypt-post.html?article=horror-2026', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=85', intro: 'The horror releases defining 2026 so far, ranked as Laura watches her way through the year.' },
    { id: 'genuinely-scary', title: '25 Genuinely Scary Horror Movies', type: 'Watchlist', categories: ['horror', 'disturbing', 'thrillers'], url: 'crypt-post.html?article=genuinely-scary', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7450?auto=format&fit=crop&w=1200&q=85', intro: 'A watchlist for when you want a film that actually gets under your skin.' },
    { id: 'disturbing-horror', title: "20 Disturbing Horror Movies You Won't Forget", type: 'Deep cuts', categories: ['horror', 'disturbing', 'thrillers'], url: 'crypt-post.html?article=disturbing-horror', image: 'https://images.unsplash.com/photo-1518568740560-333139a27e72?auto=format&fit=crop&w=1200&q=85', intro: 'Twenty horror films that linger in the mind long after the screen goes black.' }
  ]
};

try {
  const saved = await fetch('./content/site.json', { cache: 'no-store' }).then(response => response.ok ? response.json() : {});
  content = { ...content, ...saved };
  const editableFields = { 'about-bio': saved.about_bio, 'podcast-label': saved.podcast_label, 'podcast-kicker': saved.podcast_kicker, 'podcast-title-one': saved.podcast_title_one, 'podcast-title-two': saved.podcast_title_two, 'podcast-description': saved.podcast_description, 'podcast-status': saved.podcast_status, 'press-copy': saved.press_copy, 'contact-copy': saved.contact_copy };
  Object.entries(editableFields).forEach(([key, value]) => document.querySelectorAll(`[data-edit="${key}"]`).forEach(element => { if (value) element.textContent = value; }));
} catch { console.info('Using the built-in website content.'); }

const videoGrid = document.querySelector('#video-grid');
if (videoGrid) videoGrid.innerHTML = content.videos.map((v, i) => `<article class="video-embed ${i === 0 ? 'video-embed-featured' : ''}"><iframe src="https://www.youtube-nocookie.com/embed/${v.id}${v.start ? `?start=${v.start}` : ''}" title="Laura Loves Horror video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><div class="embed-caption"><p class="video-meta">${v.label}</p><a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noreferrer">Watch <span>↗</span></a></div></article>`).join('');

const featureReview = document.querySelector('#feature-review');
if (featureReview) { const r = content.review; featureReview.innerHTML = `<div class="review-art" style="--image:url('${r.image}')"></div><article class="review-content"><p class="review-meta">New review · ${r.year} · ${r.genre}</p><h3>${r.title}</h3><p class="review-meta">Directed by ${r.director}</p><p class="rating">${r.rating}<small>Laura's rating</small></p><p>${r.copy}</p><a href="${r.url}" class="button button-ghost">Read review <span>→</span></a></article>`; }

const cryptPreview = document.querySelector('#crypt-preview-grid');
if (cryptPreview) cryptPreview.innerHTML = content.crypt.slice(0, 3).map(article => `<a class="crypt-card" href="${article.url}" style="--image:url('${article.image}')"><span>${article.type}</span><h3>${article.title}</h3><b>Read more <i>→</i></b></a>`).join('');

const cryptArticles = document.querySelector('#crypt-articles');
const cryptCategoryNav = document.querySelector('#crypt-category-nav');
if (cryptArticles) {
  const renderCryptArticles = (category = 'all') => {
    const articles = category === 'all' ? content.crypt : content.crypt.filter(article => article.categories?.includes(category));
    cryptArticles.innerHTML = articles.length ? articles.map(article => `<a id="${article.id}" class="crypt-article" href="${article.url}"><div class="crypt-article-image" style="--image:url('${article.image}')"></div><div><p class="eyebrow">${article.type}</p><h2>${article.title}</h2><p>${article.intro}</p><span class="text-link">Read article <b>→</b></span></div></a>`).join('') : `<p class="crypt-empty">More stories are coming soon.</p>`;
  };
  renderCryptArticles();
  cryptCategoryNav?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-crypt-category]');
    if (!button) return;
    cryptCategoryNav.querySelectorAll('button').forEach(item => item.classList.toggle('active', item === button));
    renderCryptArticles(button.dataset.cryptCategory);
  });
}

const cryptArticlePage = document.querySelector('#crypt-article-page');
if (cryptArticlePage) {
  const article = content.crypt.find(item => item.id === (cryptArticlePage.dataset.article || new URLSearchParams(window.location.search).get('article')));
  if (article) {
    document.title = `${article.title} | The Crypt`;
    cryptArticlePage.innerHTML = `<a class="text-link" href="the-crypt.html">Back to The Crypt <span>←</span></a><p class="eyebrow">The Crypt · ${article.type}</p><h1>${article.title}</h1><div class="crypt-hero-image" style="--image:url('${article.image}')"></div><div class="crypt-reading"><p class="lede">${article.intro}</p><p>This guide is part of <em>The Crypt</em>, Laura Loves Horror’s growing journal of horror rankings, lists and updates. Check back for Laura’s expanding recommendations, deep cuts and watchlists.</p><a class="button button-primary" href="the-crypt.html">Explore The Crypt <span>→</span></a></div>`;
  }
}

const filterRoot = document.querySelector('#review-filters');
const ratingRoot = document.querySelector('#rating-filters');
const reviewGrid = document.querySelector('#review-grid');
if (filterRoot && reviewGrid) {
  const filters = ['All', 'Horror', 'Psychological Thriller', 'Supernatural', 'Found Footage', 'Body Horror', 'Cult', 'International', 'A24 / Independent'];
  filterRoot.innerHTML = filters.map((filter, i) => `<button class="filter ${i === 0 ? 'active' : ''}" data-filter="${filter}">${filter}</button>`).join('');
  if (ratingRoot) ratingRoot.innerHTML = ['All ratings', '★★★★★', '★★★★', '★★★', '★★', '★'].map((label, i) => `<button class="rating-filter ${i === 0 ? 'active' : ''}" data-rating="${i === 0 ? 'all' : 6 - i}">${label}</button>`).join('');
  const renderReviews = () => {
    const selected = filterRoot.querySelector('.active').dataset.filter;
    const selectedRating = ratingRoot?.querySelector('.active')?.dataset.rating || 'all';
    const search = document.querySelector('#review-search').value.trim().toLowerCase();
    const shown = content.reviews.filter(review => {
      const rating = (review.rating.match(/★/g) || []).length;
      return (selected === 'All' || review.genre === selected) && (selectedRating === 'all' || rating === Number(selectedRating)) && `${review.title} ${review.year} ${review.genre}`.toLowerCase().includes(search);
    });
    reviewGrid.innerHTML = shown.map(review => `<a class="archive-card" href="${review.url || `film-review.html?film=${review.slug}`}" style="--image:url('${review.image}')"><p class="review-meta">${review.year} · ${review.genre}</p><h3>${review.title}</h3><p class="rating">${review.rating}</p></a>`).join('') || '<p class="empty">Nothing lurking here yet. Try another search.</p>';
  };
  filterRoot.addEventListener('click', event => { if (!event.target.matches('.filter')) return; filterRoot.querySelector('.active').classList.remove('active'); event.target.classList.add('active'); renderReviews(); });
  ratingRoot?.addEventListener('click', event => { if (!event.target.matches('.rating-filter')) return; ratingRoot.querySelector('.active').classList.remove('active'); event.target.classList.add('active'); renderReviews(); });
  document.querySelector('#review-search').addEventListener('input', renderReviews); renderReviews();
}

const dynamicReview = document.querySelector('#dynamic-review');
if (dynamicReview) {
  const slug = new URLSearchParams(window.location.search).get('film');
  const review = content.reviews.find(item => item.slug === slug);
  if (review) {
    document.title = `${review.title} | Laura Loves Horror`;
    dynamicReview.innerHTML = `<a class="text-link" href="reviews.html">All reviews <span>←</span></a><p class="eyebrow">Film review · ${review.year} · ${review.genre}</p><h1>${review.title}</h1><div class="review-detail-meta"><span>Laura Loves Horror review</span><span class="rating">${review.rating}<small>Laura's rating</small></span></div><div class="review-detail-image" style="--image:url('${review.image}')"></div><div class="review-detail-copy"><p class="lede">Laura's review of ${review.title} is coming soon.</p><p>This review page is ready for your full thoughts, analysis and rating. You can add the published review text here whenever you are ready.</p><a class="button button-primary" href="reviews.html">More film reviews <span>→</span></a></div>`;
  } else {
    dynamicReview.innerHTML = `<p class="eyebrow">Review not found</p><h1>Nothing<br/><em>here yet.</em></h1><a class="button button-primary" href="reviews.html">Back to reviews <span>→</span></a>`;
  }
}

const footerSocials = document.querySelector('footer .socials');
if (footerSocials) footerSocials.innerHTML = `<a href="https://www.youtube.com/@lauraloveshorrors" target="_blank" rel="noreferrer">YouTube</a><a href="https://www.tiktok.com/@lauraloveshorror" target="_blank" rel="noreferrer">TikTok</a><a href="https://www.instagram.com/lauraloveshorrors/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/profile.php?id=100066728311100" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.patreon.com/cw/LauraLovesHorror" target="_blank" rel="noreferrer">Patreon</a><a data-shop-link href="#">Store</a>`;
const footerDescription = document.querySelector('footer p');
if (footerDescription) footerDescription.textContent = 'Independant horror film media based in Paris, France';
const SHOP_URL = content.shop_url || 'https://www.laura-studio.store/pages/laura-loves-horror';
document.querySelectorAll('[data-shop-link]').forEach(link => { link.href = SHOP_URL; link.target = '_blank'; link.rel = 'noreferrer'; });
document.querySelectorAll('.main-nav').forEach(nav => {
  const reviews = nav.querySelector('a[href="reviews.html"]');
  if (reviews) reviews.textContent = 'Film Reviews';
  const press = nav.querySelector('a[href="press.html"]');
  if (press && !nav.querySelector('a[href="the-crypt.html"]')) {
    const crypt = document.createElement('a');
    crypt.href = 'the-crypt.html';
    crypt.textContent = 'The Crypt';
    if (window.location.pathname.endsWith('/the-crypt.html')) crypt.classList.add('active');
    nav.insertBefore(crypt, press);
  }
  const store = nav.querySelector('[data-shop-link]');
  if (!store) return;
  store.textContent = 'Store';
  const patreon = document.createElement('a');
  patreon.href = 'https://www.patreon.com/cw/LauraLovesHorror';
  patreon.target = '_blank';
  patreon.rel = 'noreferrer';
  patreon.textContent = 'Patreon';
  nav.insertBefore(patreon, store);
});
const toggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('.main-nav');
if (toggle && nav) { toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open'))); }
const contactForm = document.querySelector('form[name="contact"]');
if (contactForm) contactForm.addEventListener('submit', async event => { event.preventDefault(); const button = contactForm.querySelector('button[type="submit"]'); const original = button.innerHTML; button.disabled = true; button.textContent = 'Sending…'; try { const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(contactForm)).toString() }); if (!response.ok) throw new Error('Submission failed'); contactForm.innerHTML = '<p class="eyebrow">Message sent</p><h3 style="font:500 34px/1.1 var(--serif);margin:0">Thank you — Laura will be in touch.</h3>'; } catch { button.disabled = false; button.innerHTML = original; alert('Your message could not be sent. Please try again or email Laura directly.'); } });
