import { registerAdmin, loginAdmin, getAll, addItem, updateItem, deleteItem } from './api.js';

// Table header configuration for each section
const tableOptions = {
  services: ['Name', 'Description', 'Price', 'Image', 'Category', 'Update', 'Delete'],
  promos: ['Name', 'Price', 'Image', 'Start Date', 'End Date', 'Promo Category', 'Update', 'Delete'],
  gallery: ['Image', 'Caption', 'Update', 'Delete'],
  reviews: ['Name', 'Rating', 'Comment', 'Date', 'Update', 'Delete'],
  enquiries: ['Name', 'Email', 'Message', 'Date', 'Update', 'Delete']
};

// Field configs for forms (for add/update)
const fieldConfigs = {
  services: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'image_url', label: 'Image URL', type: 'text' },
    { name: 'category_id', label: 'Category', type: 'select', options: [
      { value: '1', label: 'Salon' },
      { value: '2', label: 'Beauty' },
      { value: '3', label: 'Bridal' }
    ] }
  ],
  promos: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'image_url', label: 'Image URL', type: 'text' },
    { name: 'start_date', label: 'Start Date', type: 'date' },
    { name: 'end_date', label: 'End Date', type: 'date' },
    { name: 'promo_category', label: 'Promo Category', type: 'number' }
  ],
  gallery: [
    { name: 'image_url', label: 'Image URL', type: 'text' },
    { name: 'caption', label: 'Caption', type: 'text' }
  ],
  reviews: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'rating', label: 'Rating', type: 'number' },
    { name: 'comment', label: 'Comment', type: 'text' },
    { name: 'date', label: 'Date', type: 'date' }
  ],
  enquiries: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'message', label: 'Message', type: 'text' },
    { name: 'date', label: 'Date', type: 'date' }
  ]
};

function renderTableHeader(section) {
  const headers = tableOptions[section] || [];
  return `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
}

function renderServiceRows(data = []) {
  if (!data.length) {
    return `<tr><td colspan="${tableOptions.services.length}" style="text-align:center; color:#888;">No data available</td></tr>`;
  }
  return data.map(row => `
    <tr>
      <td>${row.name || ''}</td>
      <td>${row.description || ''}</td>
      <td>${row.price || ''}</td>
      <td>${row.image_url ? `<img src="${row.image_url}" alt="Service Image" style="max-width:60px;max-height:40px;">` : ''}</td>
      <td>
        ${row.category_id === 1 ? 'Salon' :
         row.category_id === 2 ? 'Beauty' :
         row.category_id === 3 ? 'Bridal' : ''}
      </td>
      <td><button class="update-btn" data-id="${row.id}">Update</button></td>
      <td><button class="delete-btn" data-id="${row.id}">Delete</button></td>
    </tr>
  `).join('');
}
function renderPromoRows(data = []) {
  if (!data.length) {
    return `<tr><td colspan="${tableOptions.promos.length}" style="text-align:center; color:#888;">No data available</td></tr>`;
  }
  return data.map(row => `
    <tr>
      <td>${row.name || ''}</td>
      <td>${row.price || ''}</td>
      <td>${row.image_url ? `<img src="${row.image_url}" alt="Promo Image" style="max-width:60px;max-height:40px;">` : ''}</td>
      <td>${row.start_date || ''}</td>
      <td>${row.end_date || ''}</td>
      <td>${row.promo_category || ''}</td>
      <td><button class="update-btn" data-id="${row.id}">Update</button></td>
      <td><button class="delete-btn" data-id="${row.id}">Delete</button></td>
    </tr>
  `).join('');
}
function renderGalleryRows(data = []) {
  if (!data.length) {
    return `<tr><td colspan="${tableOptions.gallery.length}" style="text-align:center; color:#888;">No data available</td></tr>`;
  }
  return data.map(row => `
    <tr>
      <td>${row.image_url ? `<img src="${row.image_url}" alt="Gallery Image" style="max-width:60px;max-height:40px;">` : ''}</td>
      <td>${row.caption || ''}</td>
      <td><button class="update-btn" data-id="${row.id}">Update</button></td>
      <td><button class="delete-btn" data-id="${row.id}">Delete</button></td>
    </tr>
  `).join('');
}
function renderReviewRows(data = []) {
  if (!data.length) {
    return `<tr><td colspan="${tableOptions.reviews.length}" style="text-align:center; color:#888;">No data available</td></tr>`;
  }
  return data.map(row => `
    <tr>
      <td>${row.name || ''}</td>
      <td>${row.rating || ''}</td>
      <td>${row.comment || ''}</td>
      <td>${row.date || ''}</td>
      <td><button class="update-btn" data-id="${row.id}">Update</button></td>
      <td><button class="delete-btn" data-id="${row.id}">Delete</button></td>
    </tr>
  `).join('');
}
function renderEnquiryRows(data = []) {
  if (!data.length) {
    return `<tr><td colspan="${tableOptions.enquiries.length}" style="text-align:center; color:#888;">No data available</td></tr>`;
  }
  return data.map(row => `
    <tr>
      <td>${row.name || ''}</td>
      <td>${row.email || ''}</td>
      <td>${row.message || ''}</td>
      <td>${row.date || ''}</td>
      <td><button class="update-btn" data-id="${row.id}">Update</button></td>
      <td><button class="delete-btn" data-id="${row.id}">Delete</button></td>
    </tr>
  `).join('');
}

// --- Modal for Add/Update ---
function createModal(section, mode, rowData = {}, onSubmit) {
  // Remove existing modal if present
  const existing = document.getElementById('crud-modal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'crud-modal';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal" id="close-crud-modal">&times;</span>
      <form id="crud-form" class="admin-login-form">
        <h2>${mode === 'add' ? 'Add New' : 'Update'} ${section.charAt(0).toUpperCase() + section.slice(1)}</h2>
        ${fieldConfigs[section].map(field => {
          if (field.type === 'select') {
            return `<div class="form-group">
              <label for="${field.name}">${field.label}</label>
              <select id="${field.name}" name="${field.name}" required>
                ${field.options.map(opt => `<option value="${opt.value}" ${rowData[field.name] == opt.value ? 'selected' : ''}>${opt.label}</option>`).join('')}
              </select>
            </div>`;
          } else {
            return `<div class="form-group">
              <label for="${field.name}">${field.label}</label>
              <input type="${field.type}" id="${field.name}" name="${field.name}" value="${rowData[field.name] || ''}" ${field.type === 'number' ? 'step="any"' : ''} required>
            </div>`;
          }
        }).join('')}
        <button type="submit">${mode === 'add' ? 'Add' : 'Update'}</button>
        <div id="crud-error" class="error-message"></div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById('close-crud-modal').onclick = () => modal.remove();
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.getElementById('crud-form').onsubmit = async function(e) {
    e.preventDefault();
    const formData = {};
    fieldConfigs[section].forEach(field => {
      let value = this[field.name].value;
      if (section === 'services' && field.name === 'category_id') {
        value = Number(value);
      }
      formData[field.name] = value;
    });
    try {
      await onSubmit(formData);
      modal.remove();
    } catch (err) {
      document.getElementById('crud-error').textContent = err.message || 'Operation failed.';
    }
  };
}

// --- Login Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('admin-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      document.getElementById('login-error').textContent = '';
      const email = loginForm.email.value;
      const password = loginForm.password.value;
      try {
        const result = await loginAdmin(email, password);
        if (result.success) {
          window.location.href = 'dashboard.html';
        } else {
          document.getElementById('login-error').textContent = result.error || 'Invalid credentials.';
        }
      } catch (err) {
        document.getElementById('login-error').textContent = 'Login failed. Please try again.';
      }
    });
  }

  // --- Registration Modal Logic ---
  const showRegister = document.getElementById('show-register');
  const registerModal = document.getElementById('register-modal');
  const closeRegister = document.getElementById('close-register');
  const registerForm = document.getElementById('register-form');
  const registerError = document.getElementById('register-error');
  const registerSuccess = document.getElementById('register-success');

  if (showRegister && registerModal && closeRegister) {
    showRegister.addEventListener('click', function(e) {
      e.preventDefault();
      registerModal.style.display = 'flex';
      registerError.textContent = '';
      registerSuccess.textContent = '';
      registerForm.reset();
    });
    closeRegister.addEventListener('click', function() {
      registerModal.style.display = 'none';
    });
    window.addEventListener('click', function(e) {
      if (e.target === registerModal) {
        registerModal.style.display = 'none';
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      registerError.textContent = '';
      registerSuccess.textContent = '';
      const email = document.getElementById('register-email').value.trim();
      const password = document.getElementById('register-password').value;
      const confirm = document.getElementById('register-confirm').value;
      if (password !== confirm) {
        registerError.textContent = 'Passwords do not match.';
        return;
      }
      try {
        const result = await registerAdmin(email, password);
        if (result.error) {
          registerError.textContent = result.error;
        } else {
          registerSuccess.textContent = 'Registration successful! You can now log in.';
          setTimeout(() => {
            registerModal.style.display = 'none';
          }, 1500);
        }
      } catch (err) {
        registerError.textContent = 'Registration failed. Please try again.';
      }
    });
  }

  // --- Dashboard Navigation Logic ---
  const navItems = document.querySelectorAll('.admin-nav li');
  const sectionTitle = document.getElementById('section-title');
  const addNewBtn = document.getElementById('add-new-btn');
  const sectionContent = document.getElementById('section-content');
  let currentSection = 'services';

  async function renderSectionTable(section) {
    sectionContent.innerHTML = `
      <table class="admin-table">
        <thead>
          ${renderTableHeader(section)}
        </thead>
        <tbody>
          <tr><td colspan="${tableOptions[section].length}" style="text-align:center; color:#888;">Loading...</td></tr>
        </tbody>
      </table>
    `;
    let data = [];
    if (section === 'services') {
      data = await getAll('services');
      sectionContent.innerHTML = `
        <table class="admin-table">
          <thead>
            ${renderTableHeader('services')}
          </thead>
          <tbody>
            ${renderServiceRows(data)}
          </tbody>
        </table>
      `;
    } else if (section === 'promos') {
      data = await getAll('promos');
      sectionContent.innerHTML = `
        <table class="admin-table">
          <thead>
            ${renderTableHeader('promos')}
          </thead>
          <tbody>
            ${renderPromoRows(data)}
          </tbody>
        </table>
      `;
    } else if (section === 'gallery') {
      data = await getAll('gallery');
      sectionContent.innerHTML = `
        <table class="admin-table">
          <thead>
            ${renderTableHeader('gallery')}
          </thead>
          <tbody>
            ${renderGalleryRows(data)}
          </tbody>
        </table>
      `;
    } else if (section === 'reviews') {
      data = await getAll('reviews');
      sectionContent.innerHTML = `
        <table class="admin-table">
          <thead>
            ${renderTableHeader('reviews')}
          </thead>
          <tbody>
            ${renderReviewRows(data)}
          </tbody>
        </table>
      `;
    } else if (section === 'enquiries') {
      data = await getAll('enquiries');
      sectionContent.innerHTML = `
        <table class="admin-table">
          <thead>
            ${renderTableHeader('enquiries')}
          </thead>
          <tbody>
            ${renderEnquiryRows(data)}
          </tbody>
        </table>
      `;
    }
    // Add event listeners for update/delete buttons
    sectionContent.querySelectorAll('.update-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const row = data.find(r => r.id == id);
        createModal(section, 'update', row, async (formData) => {
          await updateItem(section, id, formData);
          await renderSectionTable(section);
        });
      };
    });
    sectionContent.querySelectorAll('.delete-btn').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this item?')) {
          await deleteItem(section, id);
          await renderSectionTable(section);
        }
      };
    });
  }

  // Initial render for default section (services)
  if (sectionContent && sectionTitle) {
    renderSectionTable('services');
  }

  if (navItems.length) {
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        document.querySelector('.admin-nav li.active').classList.remove('active');
        this.classList.add('active');
        const section = this.getAttribute('data-section');
        sectionTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);
        currentSection = section;
        renderSectionTable(section);
      });
    });
  }

  // Add New button logic
  if (addNewBtn) {
    addNewBtn.addEventListener('click', function() {
      createModal(currentSection, 'add', {}, async (formData) => {
        await addItem(currentSection, formData);
        await renderSectionTable(currentSection);
      });
    });
  }

  // --- Logout Logic ---
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      window.location.href = 'login.html';
    });
  }
}); 