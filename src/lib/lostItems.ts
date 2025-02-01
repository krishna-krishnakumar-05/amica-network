import api from './api';

export interface LostItem {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  category: string;
  image?: string;
  userId: string;
  status: 'lost' | 'found';
  createdAt: string;
  updatedAt: string;
}

export interface CreateLostItemData {
  title: string;
  description: string;
  location: string;
  date: string;
  category: string;
  image?: string;
}

export const lostItemsService = {
  createLostItem: async (data: CreateLostItemData): Promise<LostItem> => {
    const response = await api.post('/lost-items', data);
    return response.data;
  },

  getAllLostItems: async (): Promise<LostItem[]> => {
    const response = await api.get('/lost-items');
    return response.data;
  },

  getLostItem: async (id: string): Promise<LostItem> => {
    const response = await api.get(`/lost-items/${id}`);
    return response.data;
  },

  updateLostItem: async (id: string, data: Partial<CreateLostItemData>): Promise<LostItem> => {
    const response = await api.put(`/lost-items/${id}`, data);
    return response.data;
  },

  deleteLostItem: async (id: string): Promise<void> => {
    await api.delete(`/lost-items/${id}`);
  },
};
