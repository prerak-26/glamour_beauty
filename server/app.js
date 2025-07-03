// Import dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const multer = require('multer');
const path = require('path');

// Load environment variables
dotenv.config();
console.log('[Checkpoint] Environment variables loaded');

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
console.log('[Checkpoint] Supabase client initialized');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
console.log('[Checkpoint] Express app initialized');

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Health check route
app.get('/', (req, res) => {
  console.log('[Checkpoint] Health check route accessed');
  res.send('Server is running and connected to Supabase!');
});

// GET /services - fetch all services
app.get('/services', async (req, res) => {
  console.log('[Checkpoint] /services route accessed');
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*');
    if (error) {
      console.error('[Error] Supabase fetch failed:', error.message);
      return res.status(500).json({ error: 'Failed to fetch services' });
    }
    console.log(`[Checkpoint] Fetched ${data.length} services from Supabase`);
    res.json(data);
  } catch (err) {
    console.error('[Error] Unexpected error in /services:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /services - create a new service
app.post('/services', async (req, res) => {
  console.log('[Checkpoint] POST /services route accessed');
  const { name, description, price, image_url } = req.body;

  // Basic validation
  if (!name || !price) {
    console.error('[Error] Missing required fields: name or price');
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .insert([{ name, description, price, image_url }])
      .select(); // .select() returns the inserted data

    if (error) {
      console.error('[Error] Supabase insert failed:', error.message);
      return res.status(500).json({ error: 'Failed to create service' });
    }

    console.log('[Checkpoint] Created new service:', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('[Error] Unexpected error in POST /services:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /services/:id - update a service by ID
app.put('/services/:id', async (req, res) => {
  console.log('[Checkpoint] PUT /services/:id route accessed');
  const { id } = req.params;
  const { name, description, price, image_url } = req.body;

  // Basic validation
  if (!name && !description && !price && !image_url) {
    console.error('[Error] No fields provided for update');
    return res.status(400).json({ error: 'At least one field is required to update' });
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .update({ name, description, price, image_url })
      .eq('id', id)
      .select();
    if (error) {
      console.error('[Error] Supabase update failed:', error.message);
      return res.status(500).json({ error: 'Failed to update service' });
    }
    if (!data || data.length === 0) {
      console.warn('[Warning] No service found with id:', id);
      return res.status(404).json({ error: 'Service not found' });
    }
    console.log('[Checkpoint] Updated service:', data[0]);
    res.json(data[0]);
  } catch (err) {
    console.error('[Error] Unexpected error in PUT /services/:id:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /services/:id - delete a service by ID
app.delete('/services/:id', async (req, res) => {
  console.log('[Checkpoint] DELETE /services/:id route accessed');
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)
      .select();
    if (error) {
      console.error('[Error] Supabase delete failed:', error.message);
      return res.status(500).json({ error: 'Failed to delete service' });
    }
    if (!data || data.length === 0) {
      console.warn('[Warning] No service found to delete with id:', id);
      return res.status(404).json({ error: 'Service not found' });
    }
    console.log('[Checkpoint] Deleted service:', data[0]);
    res.json({ message: 'Service deleted', service: data[0] });
  } catch (err) {
    console.error('[Error] Unexpected error in DELETE /services/:id:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /promos - fetch all promos
app.get('/promos', async (req, res) => {
  console.log('[Checkpoint] /promos route accessed');
  try {
    const { data, error } = await supabase
      .from('promos')
      .select('*');
    if (error) {
      console.error('[Error] Supabase fetch failed:', error.message);
      return res.status(500).json({ error: 'Failed to fetch promos' });
    }
    console.log(`[Checkpoint] Fetched ${data.length} promos from Supabase`);
    res.json(data);
  } catch (err) {
    console.error('[Error] Unexpected error in /promos:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /promos - create a new promo
app.post('/promos', async (req, res) => {
  console.log('[Checkpoint] POST /promos route accessed');
  const { name, price, image_url, start_date, end_date } = req.body;
  if (!name || !price) {
    console.error('[Error] Missing required fields: name or price');
    return res.status(400).json({ error: 'Name and price are required' });
  }
  try {
    const { data, error } = await supabase
      .from('promos')
      .insert([{ name, price, image_url, start_date, end_date }])
      .select();
    if (error) {
      console.error('[Error] Supabase insert failed:', error.message);
      return res.status(500).json({ error: 'Failed to create promo' });
    }
    console.log('[Checkpoint] Created new promo:', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('[Error] Unexpected error in POST /promos:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /promos/:id - update a promo by ID
app.put('/promos/:id', async (req, res) => {
  console.log('[Checkpoint] PUT /promos/:id route accessed');
  const { id } = req.params;
  const { name, price, image_url, start_date, end_date } = req.body;
  if (!name && !price && !image_url && !start_date && !end_date) {
    console.error('[Error] No fields provided for update');
    return res.status(400).json({ error: 'At least one field is required to update' });
  }
  try {
    const { data, error } = await supabase
      .from('promos')
      .update({ name, price, image_url, start_date, end_date })
      .eq('id', id)
      .select();
    if (error) {
      console.error('[Error] Supabase update failed:', error.message);
      return res.status(500).json({ error: 'Failed to update promo' });
    }
    if (!data || data.length === 0) {
      console.warn('[Warning] No promo found with id:', id);
      return res.status(404).json({ error: 'Promo not found' });
    }
    console.log('[Checkpoint] Updated promo:', data[0]);
    res.json(data[0]);
  } catch (err) {
    console.error('[Error] Unexpected error in PUT /promos/:id:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /promos/:id - delete a promo by ID
app.delete('/promos/:id', async (req, res) => {
  console.log('[Checkpoint] DELETE /promos/:id route accessed');
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('promos')
      .delete()
      .eq('id', id)
      .select();
    if (error) {
      console.error('[Error] Supabase delete failed:', error.message);
      return res.status(500).json({ error: 'Failed to delete promo' });
    }
    if (!data || data.length === 0) {
      console.warn('[Warning] No promo found to delete with id:', id);
      return res.status(404).json({ error: 'Promo not found' });
    }
    console.log('[Checkpoint] Deleted promo:', data[0]);
    res.json({ message: 'Promo deleted', promo: data[0] });
  } catch (err) {
    console.error('[Error] Unexpected error in DELETE /promos/:id:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /gallery - fetch all gallery images
app.get('/gallery', async (req, res) => {
  console.log('[Checkpoint] /gallery route accessed');
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*');
    if (error) {
      console.error('[Error] Supabase fetch failed:', error.message);
      return res.status(500).json({ error: 'Failed to fetch gallery' });
    }
    console.log(`[Checkpoint] Fetched ${data.length} gallery images from Supabase`);
    res.json(data);
  } catch (err) {
    console.error('[Error] Unexpected error in /gallery:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /gallery - add a new gallery image
app.post('/gallery', async (req, res) => {
  console.log('[Checkpoint] POST /gallery route accessed');
  const { image_url, caption } = req.body;
  if (!image_url) {
    console.error('[Error] Missing required field: image_url');
    return res.status(400).json({ error: 'Image URL is required' });
  }
  try {
    const { data, error } = await supabase
      .from('gallery')
      .insert([{ image_url, caption }])
      .select();
    if (error) {
      console.error('[Error] Supabase insert failed:', error.message);
      return res.status(500).json({ error: 'Failed to add gallery image' });
    }
    console.log('[Checkpoint] Added new gallery image:', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('[Error] Unexpected error in POST /gallery:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /gallery/:id - update a gallery image by ID
app.put('/gallery/:id', async (req, res) => {
  console.log('[Checkpoint] PUT /gallery/:id route accessed');
  const { id } = req.params;
  const { image_url, caption } = req.body;
  if (!image_url && !caption) {
    console.error('[Error] No fields provided for update');
    return res.status(400).json({ error: 'At least one field is required to update' });
  }
  try {
    const { data, error } = await supabase
      .from('gallery')
      .update({ image_url, caption })
      .eq('id', id)
      .select();
    if (error) {
      console.error('[Error] Supabase update failed:', error.message);
      return res.status(500).json({ error: 'Failed to update gallery image' });
    }
    if (!data || data.length === 0) {
      console.warn('[Warning] No gallery image found with id:', id);
      return res.status(404).json({ error: 'Gallery image not found' });
    }
    console.log('[Checkpoint] Updated gallery image:', data[0]);
    res.json(data[0]);
  } catch (err) {
    console.error('[Error] Unexpected error in PUT /gallery/:id:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /gallery/:id - delete a gallery image by ID
app.delete('/gallery/:id', async (req, res) => {
  console.log('[Checkpoint] DELETE /gallery/:id route accessed');
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id)
      .select();
    if (error) {
      console.error('[Error] Supabase delete failed:', error.message);
      return res.status(500).json({ error: 'Failed to delete gallery image' });
    }
    if (!data || data.length === 0) {
      console.warn('[Warning] No gallery image found to delete with id:', id);
      return res.status(404).json({ error: 'Gallery image not found' });
    }
    console.log('[Checkpoint] Deleted gallery image:', data[0]);
    res.json({ message: 'Gallery image deleted', image: data[0] });
  } catch (err) {
    console.error('[Error] Unexpected error in DELETE /gallery/:id:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /gallery/upload - upload an image file and save to Supabase Storage
app.post('/gallery/upload', upload.single('image'), async (req, res) => {
  console.log('[Checkpoint] /gallery/upload route accessed');
  const { caption } = req.body;
  const file = req.file;
  if (!file) {
    console.error('[Error] No file uploaded');
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    // Generate a unique filename
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}_${file.originalname}`;
    // Upload to Supabase Storage (bucket: image)
    const { data: storageData, error: storageError } = await supabase.storage
      .from('image')
      .upload(filename, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });
    if (storageError) {
      console.error('[Error] Supabase Storage upload failed:', storageError.message);
      return res.status(500).json({ error: 'Failed to upload image to storage' });
    }
    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('image').getPublicUrl(filename);
    const image_url = publicUrlData.publicUrl;
    // Save to gallery table
    const { data, error } = await supabase
      .from('gallery')
      .insert([{ image_url, caption }])
      .select();
    if (error) {
      console.error('[Error] Supabase DB insert failed:', error.message);
      return res.status(500).json({ error: 'Failed to save image info to gallery' });
    }
    console.log('[Checkpoint] Uploaded and saved gallery image:', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('[Error] Unexpected error in /gallery/upload:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /reviews - fetch all reviews
app.get('/reviews', async (req, res) => {
  console.log('[Checkpoint] /reviews route accessed');
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*');
    if (error) {
      console.error('[Error] Supabase fetch failed:', error.message);
      return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
    console.log(`[Checkpoint] Fetched ${data.length} reviews from Supabase`);
    res.json(data);
  } catch (err) {
    console.error('[Error] Unexpected error in /reviews:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /reviews - create a new review
app.post('/reviews', async (req, res) => {
  console.log('[Checkpoint] POST /reviews route accessed');
  const { name, rating, comment, date } = req.body;
  if (!name || !rating) {
    console.error('[Error] Missing required fields: name or rating');
    return res.status(400).json({ error: 'Name and rating are required' });
  }
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ name, rating, comment, date }])
      .select();
    if (error) {
      console.error('[Error] Supabase insert failed:', error.message);
      return res.status(500).json({ error: 'Failed to create review' });
    }
    console.log('[Checkpoint] Created new review:', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('[Error] Unexpected error in POST /reviews:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /reviews/:id - update a review by ID
app.put('/reviews/:id', async (req, res) => {
  console.log('[Checkpoint] PUT /reviews/:id route accessed');
  const { id } = req.params;
  const { name, rating, comment, date } = req.body;
  if (!name && !rating && !comment && !date) {
    console.error('[Error] No fields provided for update');
    return res.status(400).json({ error: 'At least one field is required to update' });
  }
  try {
    const { data, error } = await supabase
      .from('reviews')
      .update({ name, rating, comment, date })
      .eq('id', id)
      .select();
    if (error) {
      console.error('[Error] Supabase update failed:', error.message);
      return res.status(500).json({ error: 'Failed to update review' });
    }
    if (!data || data.length === 0) {
      console.warn('[Warning] No review found with id:', id);
      return res.status(404).json({ error: 'Review not found' });
    }
    console.log('[Checkpoint] Updated review:', data[0]);
    res.json(data[0]);
  } catch (err) {
    console.error('[Error] Unexpected error in PUT /reviews/:id:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /reviews/:id - delete a review by ID
app.delete('/reviews/:id', async (req, res) => {
  console.log('[Checkpoint] DELETE /reviews/:id route accessed');
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id)
      .select();
    if (error) {
      console.error('[Error] Supabase delete failed:', error.message);
      return res.status(500).json({ error: 'Failed to delete review' });
    }
    if (!data || data.length === 0) {
      console.warn('[Warning] No review found to delete with id:', id);
      return res.status(404).json({ error: 'Review not found' });
    }
    console.log('[Checkpoint] Deleted review:', data[0]);
    res.json({ message: 'Review deleted', review: data[0] });
  } catch (err) {
    console.error('[Error] Unexpected error in DELETE /reviews/:id:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /enquiries - fetch all enquiries
app.get('/enquiries', async (req, res) => {
  console.log('[Checkpoint] /enquiries route accessed');
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*');
    if (error) {
      console.error('[Error] Supabase fetch failed:', error.message);
      return res.status(500).json({ error: 'Failed to fetch enquiries' });
    }
    console.log(`[Checkpoint] Fetched ${data.length} enquiries from Supabase`);
    res.json(data);
  } catch (err) {
    console.error('[Error] Unexpected error in /enquiries:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /enquiries - create a new enquiry
app.post('/enquiries', async (req, res) => {
  console.log('[Checkpoint] POST /enquiries route accessed');
  const { name, email, message, date } = req.body;
  if (!name || !message) {
    console.error('[Error] Missing required fields: name or message');
    return res.status(400).json({ error: 'Name and message are required' });
  }
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .insert([{ name, email, message, date }])
      .select();
    if (error) {
      console.error('[Error] Supabase insert failed:', error.message);
      return res.status(500).json({ error: 'Failed to create enquiry' });
    }
    console.log('[Checkpoint] Created new enquiry:', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('[Error] Unexpected error in POST /enquiries:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /enquiries/:id - update an enquiry by ID
app.put('/enquiries/:id', async (req, res) => {
  console.log('[Checkpoint] PUT /enquiries/:id route accessed');
  const { id } = req.params;
  const { name, email, message, date } = req.body;
  if (!name && !email && !message && !date) {
    console.error('[Error] No fields provided for update');
    return res.status(400).json({ error: 'At least one field is required to update' });
  }
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .update({ name, email, message, date })
      .eq('id', id)
      .select();
    if (error) {
      console.error('[Error] Supabase update failed:', error.message);
      return res.status(500).json({ error: 'Failed to update enquiry' });
    }
    if (!data || data.length === 0) {
      console.warn('[Warning] No enquiry found with id:', id);
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    console.log('[Checkpoint] Updated enquiry:', data[0]);
    res.json(data[0]);
  } catch (err) {
    console.error('[Error] Unexpected error in PUT /enquiries/:id:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /enquiries/:id - delete an enquiry by ID
app.delete('/enquiries/:id', async (req, res) => {
  console.log('[Checkpoint] DELETE /enquiries/:id route accessed');
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id)
      .select();
    if (error) {
      console.error('[Error] Supabase delete failed:', error.message);
      return res.status(500).json({ error: 'Failed to delete enquiry' });
    }
    if (!data || data.length === 0) {
      console.warn('[Warning] No enquiry found to delete with id:', id);
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    console.log('[Checkpoint] Deleted enquiry:', data[0]);
    res.json({ message: 'Enquiry deleted', enquiry: data[0] });
  } catch (err) {
    console.error('[Error] Unexpected error in DELETE /enquiries/:id:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Checkpoint] Server started on port ${PORT}`);
}); 