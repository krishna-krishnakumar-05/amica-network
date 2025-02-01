const express = require('express');
const router = express.Router();
const storage = require('../utils/storage');
const { v4: uuidv4 } = require('uuid');

// Create a new found item
router.post('/', async (req, res) => {
    try {
        const { userId } = req.user;
        const itemData = {
            id: uuidv4(),
            ...req.body,
            userId,
            status: 'unclaimed',
            createdAt: new Date().toISOString()
        };
        const newItem = await storage.createFoundItem(itemData);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all found items
router.get('/', async (req, res) => {
    try {
        const items = await storage.getAllFoundItems();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific found item
router.get('/:id', async (req, res) => {
    try {
        const item = await storage.getFoundItemById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a found item
router.put('/:id', async (req, res) => {
    try {
        const { userId } = req.user;
        const updatedItem = await storage.updateFoundItem(req.params.id, userId, req.body);
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found or unauthorized' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a found item
router.delete('/:id', async (req, res) => {
    try {
        const { userId } = req.user;
        const deleted = await storage.deleteFoundItem(req.params.id, userId);
        if (!deleted) {
            return res.status(404).json({ message: 'Item not found or unauthorized' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
