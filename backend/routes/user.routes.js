const express = require('express');
const router = express.Router();
const storage = require('../utils/storage');

// Middleware to verify user exists
const verifyUser = async (req, res, next) => {
  try {
    const user = await storage.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
router.get('/profile/:id', verifyUser, async (req, res) => {
  try {
    // Remove sensitive information
    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile/:id', verifyUser, async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    const updatedUser = await storage.updateUser(req.params.id, {
      name,
      email,
      bio,
      updatedAt: new Date().toISOString()
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove sensitive information
    const { password, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
