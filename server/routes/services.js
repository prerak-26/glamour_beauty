const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for server-side
);

// POST /api/services - add new service
router.post('/', async (req, res) => {
  const { name, price } = req.body;
  const { data, error } = await supabase
    .from('services')
    .insert([{ name, price }]);
  if (error) return res.status(500).json({ message: 'DB Error', error });
  res.json({ message: 'Service added successfully', data });
});

// GET /api/services - get all services
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('services')
    .select('*');
  if (error) return res.status(500).json({ message: 'DB Error', error });
  res.json(data);
});

module.exports = router;
