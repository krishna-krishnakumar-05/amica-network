const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '../data');
const LOST_ITEMS_FILE = path.join(DATA_DIR, 'lost-items.json');

// Initialize storage
const initializeLostItemsStorage = async () => {
    await fs.ensureDir(DATA_DIR);
    if (!await fs.pathExists(LOST_ITEMS_FILE)) {
        await fs.writeJson(LOST_ITEMS_FILE, []);
    }
};

// Create a new lost item
const createLostItem = async (itemData) => {
    const items = await fs.readJson(LOST_ITEMS_FILE);
    const newItem = {
        id: uuidv4(),
        ...itemData,
        status: 'lost',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    items.push(newItem);
    await fs.writeJson(LOST_ITEMS_FILE, items);
    return newItem;
};

// Get all lost items
const getAllLostItems = async () => {
    return await fs.readJson(LOST_ITEMS_FILE);
};

// Get lost item by ID
const getLostItemById = async (itemId) => {
    const items = await fs.readJson(LOST_ITEMS_FILE);
    return items.find(item => item.id === itemId);
};

// Update lost item
const updateLostItem = async (itemId, userId, updates) => {
    const items = await fs.readJson(LOST_ITEMS_FILE);
    const index = items.findIndex(item => item.id === itemId && item.userId === userId);
    if (index === -1) return null;

    items[index] = {
        ...items[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };
    await fs.writeJson(LOST_ITEMS_FILE, items);
    return items[index];
};

// Delete lost item
const deleteLostItem = async (itemId, userId) => {
    const items = await fs.readJson(LOST_ITEMS_FILE);
    const filteredItems = items.filter(item => !(item.id === itemId && item.userId === userId));
    if (filteredItems.length === items.length) return false;
    
    await fs.writeJson(LOST_ITEMS_FILE, filteredItems);
    return true;
};

module.exports = {
    initializeLostItemsStorage,
    createLostItem,
    getAllLostItems,
    getLostItemById,
    updateLostItem,
    deleteLostItem
};
