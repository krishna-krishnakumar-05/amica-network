const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const storage = require('../utils/storage');

// Detailed logging function
const logAuthEvent = (type, details) => {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({
    timestamp,
    type,
    ...details
  }));
};

// Validation helper
const validateRegistrationInput = (name, email, password) => {
  const errors = [];
  
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push('Invalid email address');
  }
  
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  return errors;
};

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    const validationErrors = validateRegistrationInput(name, email, password);
    if (validationErrors.length > 0) {
      logAuthEvent('REGISTER_VALIDATION_ERROR', { 
        errors: validationErrors,
        requestBody: { 
          name: name ? 'PRESENT' : 'MISSING', 
          email: email ? 'PRESENT' : 'MISSING' 
        }
      });
      return res.status(400).json({ 
        message: 'Registration validation failed', 
        errors: validationErrors 
      });
    }

    // Check if user already exists
    const existingUser = await storage.findUserByEmail(email);
    if (existingUser) {
      logAuthEvent('REGISTER_USER_EXISTS', { email });
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await storage.createUser({
      email,
      password: hashedPassword,
      name
    });

    logAuthEvent('REGISTER_SUCCESS', { 
      userId: user.id, 
      email: user.email 
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-amica-network-2024',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    logAuthEvent('REGISTER_ERROR', { 
      errorMessage: error.message,
      errorStack: error.stack 
    });
    res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message 
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      logAuthEvent('LOGIN_VALIDATION_ERROR', { 
        errors: ['Email and password are required'],
        requestBody: { 
          email: email ? 'PRESENT' : 'MISSING',
          password: password ? 'PRESENT' : 'MISSING'
        }
      });
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    // Find user by email
    const user = await storage.findUserByEmail(email);
    if (!user) {
      logAuthEvent('LOGIN_USER_NOT_FOUND', { email });
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      logAuthEvent('LOGIN_INVALID_PASSWORD', { email });
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    logAuthEvent('LOGIN_SUCCESS', { 
      userId: user.id, 
      email: user.email 
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-amica-network-2024',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    logAuthEvent('LOGIN_ERROR', { 
      errorMessage: error.message,
      errorStack: error.stack 
    });
    res.status(500).json({ 
      message: 'Login failed', 
      error: error.message 
    });
  }
});

// Logout route (stateless, mainly for frontend)
router.post('/logout', (req, res) => {
  try {
    logAuthEvent('LOGOUT_ATTEMPT', { 
      token: req.headers.authorization ? 'PRESENT' : 'MISSING' 
    });

    // In a stateless JWT system, logout is primarily handled client-side
    res.json({ message: 'Logout successful' });
  } catch (error) {
    logAuthEvent('LOGOUT_ERROR', { 
      errorMessage: error.message,
      errorStack: error.stack 
    });
    res.status(500).json({ 
      message: 'Logout failed', 
      error: error.message 
    });
  }
});

module.exports = router;
