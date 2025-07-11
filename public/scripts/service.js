// public/scripts/service.js
import { initResponsiveNavbar } from './navbar.js';
initResponsiveNavbar();

// Get category ID from URL
function getCategoryId() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get('category'));
}

async function renderService() {
  const categoryId = getCategoryId();
  const title = document.getElementById('svc-title');
  const detailsList = document.getElementById('svc-details-list');

  try {
    const API_BASE = window.API_BASE || 'http://localhost:5000';
    // Fetch services from API
    const response = await fetch(`${API_BASE}/services`);
    const services = await response.json();
    
    // Filter services by category
    const categoryServices = services.filter(service => service.category_id === categoryId);

    if (categoryServices.length === 0) {
      title.textContent = 'Service Not Found';
      detailsList.innerHTML = '<p>Sorry, no services found for this category.</p>';
      return;
    }

    title.textContent = `Services`;
    detailsList.innerHTML = categoryServices.map((service, idx) => `
      <div class="svc-details-wrapper">
        <div class="svc-details-img-col">
          <img src="${service.image_url || 'assets/service-bridal.jpg'}" alt="${service.name}" class="svc-details-img" />
        </div>
        <div class="svc-details-info-col">
          <div class="svc-info-name">${service.name}</div>
          <div class="svc-info-desc">${service.description || 'Professional service'}</div>
          <div class="svc-info-price">₹${service.price}</div>
          <button class="svc-info-btn">Enquire More</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error fetching services:', error);
    title.textContent = 'Service Error';
    detailsList.innerHTML = '<p>Sorry, there was an error loading services.</p>';
  }
}

document.addEventListener('DOMContentLoaded', renderService); 