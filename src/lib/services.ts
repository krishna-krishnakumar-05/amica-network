import api from './api';

// Lost Items Service
export const lostItemService = {
  getAllLostItems: async () => {
    const response = await api.get('/lost-items');
    return response.data;
  },

  getLostItem: async (id: string) => {
    const response = await api.get(`/lost-items/${id}`);
    return response.data;
  },

  createLostItem: async (data: {
    itemName: string;
    description: string;
    location: string;
    date: string;
    category?: string;
    contactInfo?: string;
  }) => {
    const response = await api.post('/lost-items', data);
    return response.data;
  },

  updateLostItem: async (id: string, data: any) => {
    const response = await api.put(`/lost-items/${id}`, data);
    return response.data;
  },

  deleteLostItem: async (id: string) => {
    const response = await api.delete(`/lost-items/${id}`);
    return response.data;
  },
};

// Found Items Service
export const foundItemService = {
  getAllFoundItems: async () => {
    const response = await api.get('/found-items');
    return response.data;
  },

  getFoundItem: async (id: string) => {
    const response = await api.get(`/found-items/${id}`);
    return response.data;
  },

  createFoundItem: async (data: {
    itemName: string;
    description: string;
    location: string;
    foundDate: string;
    contactInfo?: string;
  }) => {
    const response = await api.post('/found-items', data);
    return response.data;
  },

  updateFoundItem: async (id: string, data: any) => {
    const response = await api.put(`/found-items/${id}`, data);
    return response.data;
  },

  deleteFoundItem: async (id: string) => {
    const response = await api.delete(`/found-items/${id}`);
    return response.data;
  },
};

// Borrow Items Service
export const borrowItemService = {
  getAllBorrowRequests: async () => {
    const response = await api.get('/borrow-items');
    return response.data;
  },

  getBorrowRequest: async (id: string) => {
    const response = await api.get(`/borrow-items/${id}`);
    return response.data;
  },

  createBorrowRequest: async (data: {
    itemName: string;
    description: string;
    duration: string;
    purpose?: string;
    returnDate?: string;
  }) => {
    const response = await api.post('/borrow-items', data);
    return response.data;
  },

  updateBorrowRequest: async (id: string, data: any) => {
    const response = await api.put(`/borrow-items/${id}`, data);
    return response.data;
  },

  deleteBorrowRequest: async (id: string) => {
    const response = await api.delete(`/borrow-items/${id}`);
    return response.data;
  },
};

// Lend Items Service
export const lendItemService = {
  getAllLendItems: async () => {
    const response = await api.get('/lend-items');
    return response.data;
  },

  getLendItem: async (id: string) => {
    const response = await api.get(`/lend-items/${id}`);
    return response.data;
  },

  createLendItem: async (data: {
    itemName: string;
    description: string;
    condition?: string;
    availability?: string;
    terms?: string;
  }) => {
    const response = await api.post('/lend-items', data);
    return response.data;
  },

  updateLendItem: async (id: string, data: any) => {
    const response = await api.put(`/lend-items/${id}`, data);
    return response.data;
  },

  deleteLendItem: async (id: string) => {
    const response = await api.delete(`/lend-items/${id}`);
    return response.data;
  },
};

// Activities Service
export const activityService = {
  getAllActivities: async () => {
    const response = await api.get('/activities');
    return response.data;
  },

  getActivity: async (id: string) => {
    const response = await api.get(`/activities/${id}`);
    return response.data;
  },

  createActivity: async (data: {
    title: string;
    description: string;
    date: string;
    time?: string;
    location: string;
    maxParticipants?: number;
  }) => {
    const response = await api.post('/activities', data);
    return response.data;
  },

  updateActivity: async (id: string, data: any) => {
    const response = await api.put(`/activities/${id}`, data);
    return response.data;
  },

  deleteActivity: async (id: string) => {
    const response = await api.delete(`/activities/${id}`);
    return response.data;
  },

  joinActivity: async (id: string) => {
    const response = await api.post(`/activities/${id}/join`);
    return response.data;
  },

  leaveActivity: async (id: string) => {
    const response = await api.post(`/activities/${id}/leave`);
    return response.data;
  },
};
