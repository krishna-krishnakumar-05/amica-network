const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const LOST_ITEMS_FILE = path.join(DATA_DIR, 'lost-items.json');
const FOUND_ITEMS_FILE = path.join(DATA_DIR, 'found-items.json');
const BORROW_ITEMS_FILE = path.join(DATA_DIR, 'borrow-items.json');
const LEND_ITEMS_FILE = path.join(DATA_DIR, 'lend-items.json');
const ACTIVITIES_FILE = path.join(DATA_DIR, 'activities.json');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');

// Initialize data files if they don't exist
const initializeStorage = async () => {
    await fs.ensureDir(DATA_DIR);
    
    const files = [
        USERS_FILE,
        LOST_ITEMS_FILE,
        FOUND_ITEMS_FILE,
        BORROW_ITEMS_FILE,
        LEND_ITEMS_FILE,
        ACTIVITIES_FILE,
        POSTS_FILE
    ];

    for (const file of files) {
        if (!await fs.pathExists(file)) {
            await fs.writeJson(file, []);
        }
    }
};

// User operations
const findUserByEmail = async (email) => {
    const users = await fs.readJson(USERS_FILE);
    return users.find(user => user.email === email);
};

const createUser = async (userData) => {
    const users = await fs.readJson(USERS_FILE);
    const newUser = {
        id: uuidv4(),
        email: userData.email,
        password: userData.password,
        name: userData.name,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    await fs.writeJson(USERS_FILE, users, { spaces: 2 });
    return newUser;
};

const getUserById = async (userId) => {
    const users = await fs.readJson(USERS_FILE);
    return users.find(user => user.id === userId);
};

const updateUser = async (userId, updates) => {
    const users = await fs.readJson(USERS_FILE);
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...updates };
    await fs.writeJson(USERS_FILE, users);
    return users[index];
};

// Lost Items operations
const createLostItem = async (itemData) => {
    const items = await fs.readJson(LOST_ITEMS_FILE);
    const newItem = {
        id: uuidv4(),
        ...itemData,
        createdAt: new Date().toISOString()
    };
    items.push(newItem);
    await fs.writeJson(LOST_ITEMS_FILE, items);
    return newItem;
};

const getAllLostItems = async () => {
    return await fs.readJson(LOST_ITEMS_FILE);
};

const getLostItemById = async (itemId) => {
    const items = await fs.readJson(LOST_ITEMS_FILE);
    return items.find(item => item.id === itemId);
};

const updateLostItem = async (itemId, userId, updates) => {
    const items = await fs.readJson(LOST_ITEMS_FILE);
    const index = items.findIndex(item => item.id === itemId && item.userId === userId);
    if (index === -1) return null;
    
    items[index] = { ...items[index], ...updates };
    await fs.writeJson(LOST_ITEMS_FILE, items);
    return items[index];
};

const deleteLostItem = async (itemId, userId) => {
    const items = await fs.readJson(LOST_ITEMS_FILE);
    const filteredItems = items.filter(item => !(item.id === itemId && item.userId === userId));
    if (filteredItems.length === items.length) return false;
    
    await fs.writeJson(LOST_ITEMS_FILE, filteredItems);
    return true;
};

// Found Items operations
const createFoundItem = async (itemData) => {
    const items = await fs.readJson(FOUND_ITEMS_FILE);
    const newItem = {
        id: uuidv4(),
        ...itemData,
        createdAt: new Date().toISOString()
    };
    items.push(newItem);
    await fs.writeJson(FOUND_ITEMS_FILE, items);
    return newItem;
};

const getAllFoundItems = async () => {
    return await fs.readJson(FOUND_ITEMS_FILE);
};

const getFoundItemById = async (itemId) => {
    const items = await fs.readJson(FOUND_ITEMS_FILE);
    return items.find(item => item.id === itemId);
};

const updateFoundItem = async (itemId, userId, updates) => {
    const items = await fs.readJson(FOUND_ITEMS_FILE);
    const index = items.findIndex(item => item.id === itemId && item.userId === userId);
    if (index === -1) return null;
    
    items[index] = { ...items[index], ...updates };
    await fs.writeJson(FOUND_ITEMS_FILE, items);
    return items[index];
};

const deleteFoundItem = async (itemId, userId) => {
    const items = await fs.readJson(FOUND_ITEMS_FILE);
    const filteredItems = items.filter(item => !(item.id === itemId && item.userId === userId));
    if (filteredItems.length === items.length) return false;
    
    await fs.writeJson(FOUND_ITEMS_FILE, filteredItems);
    return true;
};

// Borrow Items operations
const createBorrowRequest = async (requestData) => {
    const requests = await fs.readJson(BORROW_ITEMS_FILE);
    const newRequest = {
        id: uuidv4(),
        ...requestData,
        createdAt: new Date().toISOString()
    };
    requests.push(newRequest);
    await fs.writeJson(BORROW_ITEMS_FILE, requests);
    return newRequest;
};

const getAllBorrowRequests = async () => {
    return await fs.readJson(BORROW_ITEMS_FILE);
};

const getBorrowRequestById = async (requestId) => {
    const requests = await fs.readJson(BORROW_ITEMS_FILE);
    return requests.find(request => request.id === requestId);
};

const updateBorrowRequest = async (requestId, userId, updates) => {
    const requests = await fs.readJson(BORROW_ITEMS_FILE);
    const index = requests.findIndex(request => request.id === requestId && request.userId === userId);
    if (index === -1) return null;
    
    requests[index] = { ...requests[index], ...updates };
    await fs.writeJson(BORROW_ITEMS_FILE, requests);
    return requests[index];
};

const deleteBorrowRequest = async (requestId, userId) => {
    const requests = await fs.readJson(BORROW_ITEMS_FILE);
    const filteredRequests = requests.filter(request => !(request.id === requestId && request.userId === userId));
    if (filteredRequests.length === requests.length) return false;
    
    await fs.writeJson(BORROW_ITEMS_FILE, filteredRequests);
    return true;
};

// Lend Items operations
const createLendItem = async (itemData) => {
    const items = await fs.readJson(LEND_ITEMS_FILE);
    const newItem = {
        id: uuidv4(),
        ...itemData,
        createdAt: new Date().toISOString()
    };
    items.push(newItem);
    await fs.writeJson(LEND_ITEMS_FILE, items);
    return newItem;
};

const getAllLendItems = async () => {
    return await fs.readJson(LEND_ITEMS_FILE);
};

const getLendItemById = async (itemId) => {
    const items = await fs.readJson(LEND_ITEMS_FILE);
    return items.find(item => item.id === itemId);
};

const updateLendItem = async (itemId, userId, updates) => {
    const items = await fs.readJson(LEND_ITEMS_FILE);
    const index = items.findIndex(item => item.id === itemId && item.userId === userId);
    if (index === -1) return null;
    
    items[index] = { ...items[index], ...updates };
    await fs.writeJson(LEND_ITEMS_FILE, items);
    return items[index];
};

const deleteLendItem = async (itemId, userId) => {
    const items = await fs.readJson(LEND_ITEMS_FILE);
    const filteredItems = items.filter(item => !(item.id === itemId && item.userId === userId));
    if (filteredItems.length === items.length) return false;
    
    await fs.writeJson(LEND_ITEMS_FILE, filteredItems);
    return true;
};

// Activities operations
const createActivity = async (activityData) => {
    const activities = await fs.readJson(ACTIVITIES_FILE);
    const newActivity = {
        id: uuidv4(),
        ...activityData,
        createdAt: new Date().toISOString()
    };
    activities.push(newActivity);
    await fs.writeJson(ACTIVITIES_FILE, activities);
    return newActivity;
};

const getAllActivities = async () => {
    return await fs.readJson(ACTIVITIES_FILE);
};

const getActivityById = async (activityId) => {
    const activities = await fs.readJson(ACTIVITIES_FILE);
    return activities.find(activity => activity.id === activityId);
};

const updateActivity = async (activityId, userId, updates) => {
    const activities = await fs.readJson(ACTIVITIES_FILE);
    const index = activities.findIndex(activity => activity.id === activityId && activity.userId === userId);
    if (index === -1) return null;
    
    activities[index] = { ...activities[index], ...updates };
    await fs.writeJson(ACTIVITIES_FILE, activities);
    return activities[index];
};

const deleteActivity = async (activityId, userId) => {
    const activities = await fs.readJson(ACTIVITIES_FILE);
    const filteredActivities = activities.filter(activity => !(activity.id === activityId && activity.userId === userId));
    if (filteredActivities.length === activities.length) return false;
    
    await fs.writeJson(ACTIVITIES_FILE, filteredActivities);
    return true;
};

const joinActivity = async (activityId, userId) => {
    const activities = await fs.readJson(ACTIVITIES_FILE);
    const index = activities.findIndex(activity => activity.id === activityId);
    if (index === -1) return null;
    
    if (!activities[index].participants.includes(userId)) {
        activities[index].participants.push(userId);
        await fs.writeJson(ACTIVITIES_FILE, activities);
    }
    return activities[index];
};

const leaveActivity = async (activityId, userId) => {
    const activities = await fs.readJson(ACTIVITIES_FILE);
    const index = activities.findIndex(activity => activity.id === activityId);
    if (index === -1) return null;
    
    const participantIndex = activities[index].participants.indexOf(userId);
    if (participantIndex !== -1) {
        activities[index].participants.splice(participantIndex, 1);
        await fs.writeJson(ACTIVITIES_FILE, activities);
    }
    return activities[index];
};

// Post operations
const createPost = async (postData) => {
    const posts = await fs.readJson(POSTS_FILE);
    const newPost = {
        id: uuidv4(),
        ...postData,
        createdAt: new Date().toISOString()
    };
    posts.push(newPost);
    await fs.writeJson(POSTS_FILE, posts);
    return newPost;
};

const getAllPosts = async () => {
    return await fs.readJson(POSTS_FILE);
};

const getPostById = async (postId) => {
    const posts = await fs.readJson(POSTS_FILE);
    return posts.find(post => post.id === postId);
};

const updatePost = async (postId, userId, updates) => {
    const posts = await fs.readJson(POSTS_FILE);
    const index = posts.findIndex(post => post.id === postId && post.userId === userId);
    if (index === -1) return null;
    
    posts[index] = { ...posts[index], ...updates };
    await fs.writeJson(POSTS_FILE, posts);
    return posts[index];
};

const deletePost = async (postId, userId) => {
    const posts = await fs.readJson(POSTS_FILE);
    const filteredPosts = posts.filter(post => !(post.id === postId && post.userId === userId));
    if (filteredPosts.length === posts.length) return false;
    
    await fs.writeJson(POSTS_FILE, filteredPosts);
    return true;
};

module.exports = {
    initializeStorage,
    findUserByEmail,
    createUser,
    getUserById,
    updateUser,
    createLostItem,
    getAllLostItems,
    getLostItemById,
    updateLostItem,
    deleteLostItem,
    createFoundItem,
    getAllFoundItems,
    getFoundItemById,
    updateFoundItem,
    deleteFoundItem,
    createBorrowRequest,
    getAllBorrowRequests,
    getBorrowRequestById,
    updateBorrowRequest,
    deleteBorrowRequest,
    createLendItem,
    getAllLendItems,
    getLendItemById,
    updateLendItem,
    deleteLendItem,
    createActivity,
    getAllActivities,
    getActivityById,
    updateActivity,
    deleteActivity,
    joinActivity,
    leaveActivity,
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
