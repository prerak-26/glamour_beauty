// public/admin/scripts/api.js

const API_BASE = 'http://localhost:5000'; // Adjust if your backend is on a different path

// --- GENERIC CRUD FUNCTIONS ---

// Get all items from a table
export async function getAll(table) {
  const res = await fetch(`${API_BASE}/${table}`);
  return res.json();
}

// Add a new item to a table
export async function addItem(table, formData) {
  const res = await fetch(`${API_BASE}/${table}`, {
    method: 'POST',
    body: formData // Send FormData directly for file uploads
  });
  return res.json();
}

// Update an item in a table by id
export async function updateItem(table, id, formData) {
  const res = await fetch(`${API_BASE}/${table}/${id}`, {
    method: 'PUT',
    body: formData // Send FormData directly for file uploads
  });
  return res.json();
}

// Delete an item from a table by id
export async function deleteItem(table, id) {
  const res = await fetch(`${API_BASE}/${table}/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}

// --- AUTH ---

// Register new admin (first time setup)
export async function registerAdmin(email, password) {
  const res = await fetch(`${API_BASE}/api/admin/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

// Login admin
export async function loginAdmin(email, password) {
  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

// Change password
export async function changeAdminPassword(email, oldPassword, newPassword) {
  const res = await fetch(`${API_BASE}/admin/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, oldPassword, newPassword })
  });
  return res.json();
}

// --- DASHBOARD DATA ---

export async function fetchServices() {
  const res = await fetch(`${API_BASE}/services`);
  return res.json();
}

export async function fetchPromos() {
  const res = await fetch(`${API_BASE}/promos`);
  return res.json();
}

export async function fetchGallery() {
  const res = await fetch(`${API_BASE}/gallery`);
  return res.json();
}

export async function fetchReviews() {
  const res = await fetch(`${API_BASE}/reviews`);
  return res.json();
}

export async function fetchEnquiries() {
  const res = await fetch(`${API_BASE}/enquiries`);
  return res.json();
}

// Upload file to Supabase storage
export async function uploadFile(file, bucket = 'services') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('bucket', bucket);
  
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData
  });
  return res.json();
}

// Add more CRUD functions as needed for each section (create, update, delete) 