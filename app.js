const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user'); // ✅ ADD THIS LINE

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // ✅ Also add this if you're handling JSON

// Serve static assets like CSS/JS from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mount Admin Routes
app.use('/admin', adminRoutes);

// ✅ Mount User Routes
app.use('/user', userRoutes); // <-- This is the missing line

// Serve User HTML Page
app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/user.html'));
});

// Root Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
