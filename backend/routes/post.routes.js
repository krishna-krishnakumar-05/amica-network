const express = require('express');
const router = express.Router();
const storage = require('../utils/storage');

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { userId, content } = req.body;
    
    // Verify user exists
    const user = await storage.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const post = await storage.createPost({
      userId,
      content,
      likes: 0
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await storage.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await storage.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    const { userId, content } = req.body;
    const updatedPost = await storage.updatePost(req.params.id, userId, {
      content,
      updatedAt: new Date().toISOString()
    });

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const { userId } = req.body;
    const deleted = await storage.deletePost(req.params.id, userId);

    if (!deleted) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
