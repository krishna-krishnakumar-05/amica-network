const express = require('express');
const router = express.Router();
const storage = require('../utils/storage');
const { v4: uuidv4 } = require('uuid');

// Completely open registration route
router.post('/register', async (req, res) => {
  try {
    // Generate a unique user ID
    const userId = uuidv4();

    // Create user with minimal information
    const newUser = {
      id: userId,
      ...req.body,
      createdAt: new Date().toISOString()
    };

    // Store the user
    await storage.createUser(newUser);

    // Return the created user
    res.status(201).json({
      user: newUser,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message 
    });
  }
});

// Open login route that doesn't validate anything
router.post('/login', async (req, res) => {
  try {
    // Simply return the user data if it exists
    const user = await storage.findUserByEmail(req.body.email);
    
    if (user) {
      res.json({
        user: user,
        message: 'Login successful'
      });
    } else {
      // If user doesn't exist, create a new one
      const newUser = {
        id: uuidv4(),
        ...req.body,
        createdAt: new Date().toISOString()
      };
      
      await storage.createUser(newUser);
      
      res.status(201).json({
        user: newUser,
        message: 'User created on login'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
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
