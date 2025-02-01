const jwt = require('jsonwebtoken');
const storage = require('../utils/storage');

const auth = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Check if it's a Bearer token
    if (!authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid token format');
    }

    // Extract token
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      throw new Error('No token provided');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-amica-network-2024');
    if (!decoded || !decoded.userId) {
      throw new Error('Invalid token');
    }

    // Get user
    const user = await storage.getUserById(decoded.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Add user to request
    req.user = user;
    req.token = token;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

module.exports = auth;
