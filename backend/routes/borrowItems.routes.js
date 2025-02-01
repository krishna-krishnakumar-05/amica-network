const express = require('express');
const router = express.Router();
const storage = require('../utils/storage');
const { v4: uuidv4 } = require('uuid');

// Create a new borrow request
router.post('/', async (req, res) => {
    try {
        const { userId } = req.user;
        const requestData = {
            id: uuidv4(),
            ...req.body,
            userId,
            status: 'open',
            createdAt: new Date().toISOString()
        };
        const newRequest = await storage.createBorrowRequest(requestData);
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all borrow requests
router.get('/', async (req, res) => {
    try {
        const requests = await storage.getAllBorrowRequests();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific borrow request
router.get('/:id', async (req, res) => {
    try {
        const request = await storage.getBorrowRequestById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a borrow request
router.put('/:id', async (req, res) => {
    try {
        const { userId } = req.user;
        const updatedRequest = await storage.updateBorrowRequest(req.params.id, userId, req.body);
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found or unauthorized' });
        }
        res.json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a borrow request
router.delete('/:id', async (req, res) => {
    try {
        const { userId } = req.user;
        const deleted = await storage.deleteBorrowRequest(req.params.id, userId);
        if (!deleted) {
            return res.status(404).json({ message: 'Request not found or unauthorized' });
        }
        res.json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
