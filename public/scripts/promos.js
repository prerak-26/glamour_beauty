// public/scripts/promos.js

const promos = [
  {
    id: 1,
    promo: {
      name: 'eyebrow & hair cutting',
      price: 100,
      image: 'assets/bg-1.jpg',
      startDate: '12 June 2025',
      endDate: '12 June 2025',
    }
  },
  {
    id: 1,
    promo: {
      name: 'hair cutting & color',
      price: 50,
      image: 'assets/bg-2.jpg',
      startDate: '12 June 2025',
      endDate: '12 June 2025',
    }
  },
  {
    id: 2,
    promo: {
      name: 'Navratri Special',
      price: 100,
      image: 'assets/bg-3.jpg',
      startDate: '12 June 2025',
      endDate: '12 June 2025',
    }
  },
  {
    id: 2,
    promo: {
      name: 'Diwali Glow',
      price: 120,
      image: 'assets/bg-4.jpg',
      startDate: '15 Oct 2025',
      endDate: '24 Oct 2025',
    }
  },
  {
    id: 3,
    promo: {
      name: 'Special Hair Spa',
      price: 80,
      image: 'assets/bg-5.jpg',
      startDate: '1 Dec 2025',
      endDate: '31 Dec 2025',
    }
  },
  {
    id: 3,
    promo: {
      name: 'Bridal Combo',
      price: 200,
      image: 'assets/bg-6.jpg',
      startDate: '1 Jan 2026',
      endDate: '31 Jan 2026',
    }
  }
];

function getCategoryIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id') || '1', 10);
}

function renderPromos() {
  const categoryId = getCategoryIdFromUrl();
  const grid = document.getElementById('promo-grid');
  const filtered = promos.filter(p => p.id === categoryId);
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:#fff;text-align:center;">No promos found for this category.</p>';
    return;
  }
  grid.innerHTML = filtered.map(p => `
    <div class="promo-card">
      <img src="${p.promo.image}" alt="${p.promo.name}" class="promo-card-img" />
      <div class="promo-card-desc">
        <h3>${p.promo.name}</h3>
        <span class="promo-price">$${p.promo.price}</span>
        <div class="promo-dates">${p.promo.startDate} - ${p.promo.endDate}</div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderPromos); 