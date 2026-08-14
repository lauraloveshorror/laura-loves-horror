// Content lives here so new reviews, videos and recommendations can be added without editing the layout.
const content = {
  videos: [
    { title: 'The horror films that genuinely disturbed me', meta: 'Deep dive · 3 days ago', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1100&q=85', url: 'https://www.youtube.com/@lauraloveshorrors' },
    { title: '10 psychological horror films you need to see', meta: 'Recommendations · 1 week ago', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=85', url: 'https://www.youtube.com/@lauraloveshorrors' },
    { title: 'The most unsettling A24 films, ranked', meta: 'Ranking · 2 weeks ago', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=85', url: 'https://www.youtube.com/@lauraloveshorrors' }
  ],
  review: { title: 'The Last Stop in Yuma County', year: '2023', director: 'Francis Galluppi', genre: 'Neo-noir · Thriller', rating: '★★★★½', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1000&q=85', copy: 'A wickedly controlled pressure-cooker that turns one empty desert diner into a sweat-soaked nightmare. Funny, mean and genuinely unpredictable.', url: '#' },
  reviews: [
    { title: 'The Last Stop in Yuma County', year: '2023', genre: 'Psychological Thriller', rating: '★★★★½', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80' },
    { title: 'When Evil Lurks', year: '2023', genre: 'Supernatural', rating: '★★★★', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80' },
    { title: 'Talk to Me', year: '2023', genre: 'A24 / Independent', rating: '★★★★', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80' },
    { title: 'The Outwaters', year: '2022', genre: 'Found Footage', rating: '★★★½', image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=600&q=80' },
    { title: 'Titane', year: '2021', genre: 'Body Horror', rating: '★★★★½', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80' },
    { title: 'Cure', year: '1997', genre: 'International', rating: '★★★★★', image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=600&q=80' },
    { title: 'The House of the Devil', year: '2009', genre: 'Cult', rating: '★★★★', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80' },
    { title: 'The Night House', year: '2020', genre: 'Horror', rating: '★★★★', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=600&q=80' }
  ],
};

document.querySelector('#video-grid').innerHTML = content.videos.map((v, i) => i === 0 ? `
  <article class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/mJUkFrxHfoY?start=106" title="Latest Laura Loves Horror video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><div class="embed-caption"><p class="video-meta">Latest upload · Laura Loves Horror</p><a href="https://www.youtube.com/watch?v=mJUkFrxHfoY" target="_blank" rel="noreferrer">Watch on YouTube <span>↗</span></a></div></article>` : `
  <a class="video-card plain-video" href="${v.url}" target="_blank" rel="noreferrer">
    <span class="play">▶</span><div class="card-content"><p class="video-meta">${v.meta}</p><h3>${v.title}</h3></div>
  </a>`).join('');

const r = content.review;
document.querySelector('#feature-review').innerHTML = `<div class="review-art" style="--image:url('${r.image}')"></div><article class="review-content"><p class="review-meta">New review · ${r.year} · ${r.genre}</p><h3>${r.title}</h3><p class="review-meta">Directed by ${r.director}</p><p class="rating">${r.rating}<small>Laura's rating</small></p><p>${r.copy}</p><a href="${r.url}" class="button button-ghost">Read review <span>→</span></a></article>`;

const filters = ['All', 'Horror', 'Psychological Thriller', 'Supernatural', 'Found Footage', 'Body Horror', 'Cult', 'International', 'A24 / Independent'];
const filterRoot = document.querySelector('#review-filters');
filterRoot.innerHTML = filters.map((filter, i) => `<button class="filter ${i === 0 ? 'active' : ''}" data-filter="${filter}">${filter}</button>`).join('');
const reviewGrid = document.querySelector('#review-grid');
const renderReviews = () => {
  const selected = filterRoot.querySelector('.active').dataset.filter;
  const search = document.querySelector('#review-search').value.trim().toLowerCase();
  const shown = content.reviews.filter(review => (selected === 'All' || review.genre === selected) && `${review.title} ${review.year} ${review.genre}`.toLowerCase().includes(search));
  reviewGrid.innerHTML = shown.map(review => `<article class="archive-card" style="--image:url('${review.image}')"><p class="review-meta">${review.year} · ${review.genre}</p><h3>${review.title}</h3><p class="rating">${review.rating}</p></article>`).join('') || '<p class="empty">Nothing lurking here yet. Try another search.</p>';
};
filterRoot.addEventListener('click', event => { if (!event.target.matches('.filter')) return; filterRoot.querySelector('.active').classList.remove('active'); event.target.classList.add('active'); renderReviews(); });
document.querySelector('#review-search').addEventListener('input', renderReviews);
renderReviews();


// Add your actual Shopify destination here when it is ready. All Shop links update automatically.
const SHOP_URL = 'https://www.laura-studio.store/pages/laura-loves-horror';
document.querySelectorAll('[data-shop-link]').forEach(link => { link.href = SHOP_URL; link.target = '_blank'; link.rel = 'noreferrer'; });

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
