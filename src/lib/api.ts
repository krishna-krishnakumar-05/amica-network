import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Detailed logging function for frontend
const logApiEvent = (type: string, details: Record<string, any>) => {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({
    timestamp,
    type,
    ...details
  }));
};

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    logApiEvent('API_REQUEST', {
      method: config.method,
      url: config.url,
      hasToken: !!token
    });
    return config;
  },
  (error) => {
    logApiEvent('API_REQUEST_ERROR', { 
      errorMessage: error.message 
    });
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    logApiEvent('API_RESPONSE', {
      status: response.status,
      url: response.config.url
    });
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      logApiEvent('API_UNAUTHORIZED', { 
        url: error.config.url,
        errorMessage: error.response?.data?.message || 'Unauthorized'
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    
    logApiEvent('API_ERROR', { 
      status: error.response?.status,
      errorMessage: error.response?.data?.message || error.message,
      url: error.config.url
    });
    
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: async (data: { name: string; email: string; password: string }) => {
    try {
      logApiEvent('REGISTER_ATTEMPT', { 
        email: data.email 
      });
      
      const response = await api.post('/auth/register', data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        logApiEvent('REGISTER_SUCCESS', { 
          userId: response.data.user.id 
        });
      }
      
      return response.data;
    } catch (error: any) {
      logApiEvent('REGISTER_ERROR', { 
        errorMessage: error.response?.data?.message || error.message 
      });
      throw error;
    }
  },
  
  login: async (data: { email: string; password: string }) => {
    try {
      logApiEvent('LOGIN_ATTEMPT', { 
        email: data.email 
      });
      
      const response = await api.post('/auth/login', data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        logApiEvent('LOGIN_SUCCESS', { 
          userId: response.data.user.id 
        });
      }
      
      return response.data;
    } catch (error: any) {
      logApiEvent('LOGIN_ERROR', { 
        errorMessage: error.response?.data?.message || error.message 
      });
      throw error;
    }
  },
  
  logout: async () => {
    try {
      logApiEvent('LOGOUT_ATTEMPT', {});
      
      const token = localStorage.getItem('token');
      if (token) {
        await api.post('/auth/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      logApiEvent('LOGOUT_SUCCESS', {});
    } catch (error: any) {
      logApiEvent('LOGOUT_ERROR', { 
        errorMessage: error.response?.data?.message || error.message 
      });
      throw error;
    }
  }
};

// User services
export const userService = {
  getProfile: async (userId: string) => {
    const response = await api.get(`/users/profile/${userId}`);
    return response.data;
  },

  updateProfile: async (userId: string, data: { name?: string; email?: string; bio?: string }) => {
    const response = await api.put(`/users/profile/${userId}`, data);
    return response.data;
  },
};

// Lost Items services
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

// Found Items services
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

// Borrow Items services
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

// Lend Items services
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

// Activities services
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

// Post services
export const postService = {
  getAllPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },

  getPost: async (postId: string) => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  },

  createPost: async (data: { content: string }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await api.post('/posts', {
      ...data,
      userId: user.id,
    });
    return response.data;
  },

  updatePost: async (postId: string, data: { content: string }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await api.put(`/posts/${postId}`, {
      ...data,
      userId: user.id,
    });
    return response.data;
  },

  deletePost: async (postId: string) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  },
};

export default api;
