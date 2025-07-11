// hash-admin-password.js
// Usage: node hash-admin-password.js user@example.com mypassword

const bcrypt = require('bcrypt');

const [,, email, password] = process.argv;

if (!email || !password) {
  console.error('Usage: node hash-admin-password.js user@example.com mypassword');
  process.exit(1);
}

const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    process.exit(1);
  }
  console.log('--- Admin User for Supabase ---');
  console.log('Email:   ', email);
  console.log('Password:', password);
  console.log('Hash:    ', hash);
  console.log('\nInsert the email and hash into your Supabase admins table.');
}); 