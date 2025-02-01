const express = require('express');
const router = express.Router();
const storage = require('../utils/storage');
const { v4: uuidv4 } = require('uuid');

// Create a new activity
router.post('/', async (req, res) => {
    try {
        const { userId } = req.user;
        const activityData = {
            id: uuidv4(),
            ...req.body,
            userId,
            participants: [userId],
            status: 'active',
            createdAt: new Date().toISOString()
        };
        const newActivity = await storage.createActivity(activityData);
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await storage.getAllActivities();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific activity
router.get('/:id', async (req, res) => {
    try {
        const activity = await storage.getActivityById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an activity
router.put('/:id', async (req, res) => {
    try {
        const { userId } = req.user;
        const updatedActivity = await storage.updateActivity(req.params.id, userId, req.body);
        if (!updatedActivity) {
            return res.status(404).json({ message: 'Activity not found or unauthorized' });
        }
        res.json(updatedActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an activity
router.delete('/:id', async (req, res) => {
    try {
        const { userId } = req.user;
        const deleted = await storage.deleteActivity(req.params.id, userId);
        if (!deleted) {
            return res.status(404).json({ message: 'Activity not found or unauthorized' });
        }
        res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Join an activity
router.post('/:id/join', async (req, res) => {
    try {
        const { userId } = req.user;
        const activity = await storage.joinActivity(req.params.id, userId);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found or already joined' });
        }
        res.json(activity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Leave an activity
router.post('/:id/leave', async (req, res) => {
    try {
        const { userId } = req.user;
        const activity = await storage.leaveActivity(req.params.id, userId);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found or not a participant' });
        }
        res.json(activity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
