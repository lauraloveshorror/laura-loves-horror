// Shared content and page interactions for Laura Loves Horror.
let content = {
  videos: [
    { id: 'mJUkFrxHfoY', start: 106, label: 'Latest upload · Laura Loves Horror' },
    { id: 'ZGZzD5VdA7Q', label: 'Laura Loves Horror · Watch now' },
    { id: 'NbIny7Vej34', start: 8, label: 'Laura Loves Horror · Watch now' }
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

const filterRoot = document.querySelector('#review-filters');
const reviewGrid = document.querySelector('#review-grid');
if (filterRoot && reviewGrid) {
  const filters = ['All', 'Horror', 'Psychological Thriller', 'Supernatural', 'Found Footage', 'Body Horror', 'Cult', 'International', 'A24 / Independent'];
  filterRoot.innerHTML = filters.map((filter, i) => `<button class="filter ${i === 0 ? 'active' : ''}" data-filter="${filter}">${filter}</button>`).join('');
  const renderReviews = () => { const selected = filterRoot.querySelector('.active').dataset.filter; const search = document.querySelector('#review-search').value.trim().toLowerCase(); const shown = content.reviews.filter(review => (selected === 'All' || review.genre === selected) && `${review.title} ${review.year} ${review.genre}`.toLowerCase().includes(search)); reviewGrid.innerHTML = shown.map(review => `<a class="archive-card" href="${review.url || `film-review.html?film=${review.slug}`}" style="--image:url('${review.image}')"><p class="review-meta">${review.year} · ${review.genre}</p><h3>${review.title}</h3><p class="rating">${review.rating}</p></a>`).join('') || '<p class="empty">Nothing lurking here yet. Try another search.</p>'; };
  filterRoot.addEventListener('click', event => { if (!event.target.matches('.filter')) return; filterRoot.querySelector('.active').classList.remove('active'); event.target.classList.add('active'); renderReviews(); });
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
document.querySelectorAll('.main-nav').forEach(nav => { const store = nav.querySelector('[data-shop-link]'); if (!store) return; store.textContent = 'Store'; const patreon = document.createElement('a'); patreon.href = 'https://www.patreon.com/cw/LauraLovesHorror'; patreon.target = '_blank'; patreon.rel = 'noreferrer'; patreon.textContent = 'Patreon'; nav.insertBefore(patreon, store); });
const toggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('.main-nav');
if (toggle && nav) { toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open'))); }
const contactForm = document.querySelector('form[name="contact"]');
if (contactForm) contactForm.addEventListener('submit', async event => { event.preventDefault(); const button = contactForm.querySelector('button[type="submit"]'); const original = button.innerHTML; button.disabled = true; button.textContent = 'Sending…'; try { const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(contactForm)).toString() }); if (!response.ok) throw new Error('Submission failed'); contactForm.innerHTML = '<p class="eyebrow">Message sent</p><h3 style="font:500 34px/1.1 var(--serif);margin:0">Thank you — Laura will be in touch.</h3>'; } catch { button.disabled = false; button.innerHTML = original; alert('Your message could not be sent. Please try again or email Laura directly.'); } });
