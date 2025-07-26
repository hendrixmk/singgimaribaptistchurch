
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

const PORT = 3000;

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Set up SQLite database
const db = new sqlite3.Database('./church.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database.');
});

// Create users table and default admin user if not exists
db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password_hash TEXT,
    role TEXT
  )
`);


  const defaultUsername = 'admin';
  const defaultPassword = 'admin123';
  const defaultRole = 'admin';

  db.get('SELECT * FROM users WHERE username = ?', [defaultUsername], async (err, row) => {
    if (!row) {
      const hash = await bcrypt.hash(defaultPassword, 10);
      db.run('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)', 
        [defaultUsername, hash, defaultRole]);
    }
  });
});

// Routes
// ✅ Middleware to protect admin-only routes
function requireAdmin(req, res, next) {
  console.log('🔒 Checking session:', req.session);

  if (!req.session.userId || req.session.role !== 'admin') {
    console.log('🚫 Blocked! Not logged in or not admin.');
    return res.redirect('/admin/login');
  }

  console.log('✅ Access granted to admin:', req.session.username);
  next();
}


// Admin login page
app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-login.html'));
});

// Handle login form
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err || !user) {
      return res.send('Invalid username or password');
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.send('Invalid username or password');
    }

    if (user.role !== 'admin') {
      return res.status(403).send('Access denied. Not an admin.');
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.role = user.role;

    res.redirect('/admin/dashboard');
  });
});

// Protected admin dashboard
app.get('/admin/dashboard', requireAdmin, (req, res) => {
  res.sendFile(path.resolve(__dirname, 'admin-dash.html'));
});

// Logout route
app.get('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
