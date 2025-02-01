const express = require('express');
const router = express.Router();
const lostItems = require('../utils/lostItems');

// Create a new lost item
router.post('/', async (req, res) => {
    try {
        const { userId } = req.user;
        const itemData = {
            ...req.body,
            userId
        };
        const newItem = await lostItems.createLostItem(itemData);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all lost items
router.get('/', async (req, res) => {
    try {
        const items = await lostItems.getAllLostItems();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific lost item
router.get('/:id', async (req, res) => {
    try {
        const item = await lostItems.getLostItemById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a lost item
router.put('/:id', async (req, res) => {
    try {
        const { userId } = req.user;
        const updatedItem = await lostItems.updateLostItem(req.params.id, userId, req.body);
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found or unauthorized' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a lost item
router.delete('/:id', async (req, res) => {
    try {
        const { userId } = req.user;
        const deleted = await lostItems.deleteLostItem(req.params.id, userId);
        if (!deleted) {
            return res.status(404).json({ message: 'Item not found or unauthorized' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
