// public/scripts/service.js
import { serviceData } from "./data.js";
import { initResponsiveNavbar } from './navbar.js';
initResponsiveNavbar();
// Get category ID from URL
function getCategoryId() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get('category'));
}

function renderService() {
  const categoryId = getCategoryId();
  const title = document.getElementById('svc-title');
  const detailsList = document.getElementById('svc-details-list');

  const category = serviceData.find(cat => cat.id === categoryId);

  if (!category) {
    title.textContent = 'Service Not Found';
    detailsList.innerHTML = '<p>Sorry, the requested service does not exist.</p>';
    return;
  }

  title.textContent = `Services`;
  detailsList.innerHTML = category.services.map((service, idx) => `
    <div class="svc-details-wrapper">
      <div class="svc-details-img-col">
        <img src="assets/service-bridal.jpg" alt="Service Category ${categoryId}" class="svc-details-img" />
      </div>
      <div class="svc-details-info-col">
        <div class="svc-info-name">${service.name}</div>
        <div class="svc-info-desc">${service.description}</div>
        <div class="svc-info-price">$${service.price}</div>
        <button class="svc-info-btn">Enquire More</button>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderService); 