const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const storage = require('./utils/storage');
const lostItems = require('./utils/lostItems');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  next();
});

app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:5173', 'http://localhost:8084', 'http://localhost:8086'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Initialize storage
Promise.all([
  storage.initializeStorage(),
  lostItems.initializeLostItemsStorage()
]).catch(console.error);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Amica Network API' });
});

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const lostItemsRoutes = require('./routes/lostItems.routes');
const foundItemsRoutes = require('./routes/foundItems.routes');
const borrowItemsRoutes = require('./routes/borrowItems.routes');
const lendItemsRoutes = require('./routes/lendItems.routes');
const activitiesRoutes = require('./routes/activities.routes');
const postRoutes = require('./routes/post.routes');

// Public routes
app.use('/api/auth', authRoutes);

// Use routes without authentication
app.use('/api/users', userRoutes);
app.use('/api/lost-items', lostItemsRoutes);
app.use('/api/found-items', foundItemsRoutes);
app.use('/api/borrow-items', borrowItemsRoutes);
app.use('/api/lend-items', lendItemsRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/posts', postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
