import { registerAdmin, loginAdmin, getAll, addItem, updateItem, deleteItem } from './api.js';

// Table header configuration for each section
const tableOptions = {
  services: ['Name', 'Description', 'Price', 'Image', 'Category', 'Update', 'Delete'],
  promos: ['Name', 'Price', 'Image', 'Start Date', 'End Date', 'Promo Category', 'Update', 'Delete'],
  gallery: ['Image', 'Caption', 'Update', 'Delete'],
  reviews: ['Name', 'Rating', 'Comment', 'Date', 'Update', 'Delete'],
  enquiries: ['Name', 'Email', 'Message', 'Date', 'Update', 'Delete']
};

// Category configurations for different sections
const categoryConfigs = {
  services: {
    fieldName: 'category_id',
    options: [
      { value: '1', label: 'Salon' },
      { value: '2', label: 'Beauty' },
      { value: '3', label: 'Bridal' }
    ]
  },
  promos: {
    fieldName: 'promo_category',
    options: [
      { value: '1', label: 'Combos' },
      { value: '2', label: 'Festival Promos' },
      { value: '3', label: 'Special' }
    ]
  }
};

// Field configs for forms (for add/update)
const fieldConfigs = {
  services: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'image_file', label: 'Image', type: 'file', accept: 'image/*' },
    { name: 'category_id', label: 'Category', type: 'select', options: categoryConfigs.services.options }
  ],
  promos: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'image_file', label: 'Image', type: 'file', accept: 'image/*' },
    { name: 'start_date', label: 'Start Date', type: 'date' },
    { name: 'end_date', label: 'End Date', type: 'date' },
    { name: 'promo_category', label: 'Promo Category', type: 'select', options: categoryConfigs.promos.options }
  ],
  gallery: [
    { name: 'image_file', label: 'Image', type: 'file', accept: 'image/*' },
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

// Utility function to get category label
function getCategoryLabel(section, categoryValue) {
  const config = categoryConfigs[section];
  if (!config) return '';
  
  const option = config.options.find(opt => opt.value == categoryValue);
  return option ? option.label : '';
}

// Utility function to convert form value to number for category fields
function convertCategoryValue(section, fieldName, value) {
  const config = categoryConfigs[section];
  if (config && fieldName === config.fieldName) {
    return Number(value);
  }
  return value;
}

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
      <td>${getCategoryLabel('services', row.category_id)}</td>
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
      <td>${getCategoryLabel('promos', row.promo_category)}</td>
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
  return data.map(row => {
    // Format date to yyyy-mm-dd only
    let formattedDate = row.date || '';
    if (formattedDate && formattedDate.includes('T')) {
      formattedDate = formattedDate.split('T')[0];
    }
    return `
      <tr>
        <td>${row.name || ''}</td>
        <td>${row.email || ''}</td>
        <td>${row.message || ''}</td>
        <td>${formattedDate}</td>
        <td><button class="update-btn" data-id="${row.id}">Update</button></td>
        <td><button class="delete-btn" data-id="${row.id}">Delete</button></td>
      </tr>
    `;
  }).join('');
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
          }
          if (field.type === 'file') {
            return `<div class="form-group">
              <label for="${field.name}">${field.label}</label>
              <input type="file" id="${field.name}" name="${field.name}" accept="${field.accept}" ${mode === 'add' ? 'required' : ''}>
              ${rowData.image_url ? `<p>Current image: <img src="${rowData.image_url}" alt="Current" style="max-width:100px;max-height:60px;"></p>` : ''}
            </div>`;
          } else {
            let value = rowData[field.name] || '';
            // Convert datetime strings to date format for date inputs
            if (field.type === 'date' && value && value.includes('T')) {
              value = value.split('T')[0];
            }
            return `<div class="form-group">
              <label for="${field.name}">${field.label}</label>
              <input type="${field.type}" id="${field.name}" name="${field.name}" value="${value}" ${field.type === 'number' ? 'step="any"' : ''} required>
            </div>`;
          }
        }).join('')}
        <button type="submit">${mode === 'add' ? 'Add' : 'Update'}</button>
        <div id="crud-error" class="error-message"></div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.classList.add('modal-open');
  document.getElementById('close-crud-modal').onclick = () => { modal.remove(); document.body.classList.remove('modal-open'); };
  modal.onclick = e => { if (e.target === modal) { modal.remove(); document.body.classList.remove('modal-open'); } };
  document.getElementById('crud-form').onsubmit = async function(e) {
    e.preventDefault();
    const formData = new FormData();
    fieldConfigs[section].forEach(field => {
      if (field.type === 'file') {
        const fileInput = this[field.name];
        if (fileInput.files && fileInput.files.length > 0) {
          formData.append('image', fileInput.files[0]);
        }
      } else {
        let value = this[field.name].value;
        value = convertCategoryValue(section, field.name, value);
        formData.append(field.name, value);
      }
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

  // Sidebar toggle logic for mobile/tablet
  const sidebar = document.querySelector('.admin-sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarClose = document.getElementById('sidebar-close');
  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (sidebarClose) sidebarClose.style.display = 'block';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (sidebarClose) sidebarClose.style.display = 'none';
  }
  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', openSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
  }
  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }
  // Close sidebar when a nav item is clicked (on mobile/tablet)
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth <= 900) closeSidebar();
    });
  });

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
    let rowRenderer;
    
    // Get data and determine row renderer
    switch (section) {
      case 'services':
        data = await getAll('services');
        rowRenderer = renderServiceRows;
        break;
      case 'promos':
        data = await getAll('promos');
        rowRenderer = renderPromoRows;
        break;
      case 'gallery':
        data = await getAll('gallery');
        rowRenderer = renderGalleryRows;
        break;
      case 'reviews':
        data = await getAll('reviews');
        rowRenderer = renderReviewRows;
        break;
      case 'enquiries':
        data = await getAll('enquiries');
        rowRenderer = renderEnquiryRows;
        break;
      default:
        data = [];
        rowRenderer = () => `<tr><td colspan="${tableOptions[section].length}" style="text-align:center; color:#888;">No data available</td></tr>`;
    }
    
    // Render the table with data
    sectionContent.innerHTML = `
      <table class="admin-table">
        <thead>
          ${renderTableHeader(section)}
        </thead>
        <tbody>
          ${rowRenderer(data)}
        </tbody>
      </table>
    `;
    
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