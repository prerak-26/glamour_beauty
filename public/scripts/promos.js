// public/scripts/promos.js

import { initResponsiveNavbar } from './navbar.js';
initResponsiveNavbar();

function getCategoryIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id') || '1', 10);
}

async function renderPromos() {
  const categoryId = getCategoryIdFromUrl();
  const grid = document.getElementById('promo-grid');
  
  try {
    const API_BASE = window.API_BASE || 'http://localhost:5000';
    // Fetch promos from API
    const response = await fetch(`${API_BASE}/promos`);
    const promos = await response.json();
    
    // Filter promos by category
    const filtered = promos.filter(p => p.promo_category === categoryId);
    
    if (filtered.length === 0) {
      grid.innerHTML = '<p style="color:#fff;text-align:center;">No promos found for this category.</p>';
      return;
    }
    
    grid.innerHTML = filtered.map(p => `
      <div class="promo-card">
        <img src="${p.image_url || 'assets/bg-1.jpg'}" alt="${p.name}" class="promo-card-img" />
        <div class="promo-card-desc">
          <h3>${p.name}</h3>
          <span class="promo-price">₹${p.price}</span>
          <div class="promo-dates">${p.start_date || 'TBD'} - ${p.end_date || 'TBD'}</div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error fetching promos:', error);
    grid.innerHTML = '<p style="color:#fff;text-align:center;">Error loading promos. Please try again later.</p>';
  }
}

document.addEventListener('DOMContentLoaded', renderPromos); 