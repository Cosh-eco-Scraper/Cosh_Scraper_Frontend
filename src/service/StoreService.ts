import { Store } from '@/domain/Store';
import { Brand } from '@/domain/Brand';
import { OpeningHour } from '@/domain/OpeningHour';
import axios from 'axios';

const backend = process.env.NEXT_PUBLIC_API_URL; //api.example.com'; // Replace with your actual API URL

const StoreService = {
  getAllStores: async () => {
    try {
      const response = await axios.get(`${backend}/api/stores/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stores:', error);
      throw error;
    }
  },

  getStore: async (id: number) => {
    try {
      const response = await axios.get(`${backend}/api/stores/${id}`);
      return response.data as Store;
    } catch (error) {
      console.error('Error fetching store:', error);
      throw error;
    }
  },

  getStoreBrands: async (id: number) => {
    try {
      const response = await axios.get(`${backend}/api/stores/${id}/brands`);
      return response.data as Brand[];
    } catch (error) {
      console.error('Error fetching store by brand:', error);
      throw error;
    }
  },

  getStoreOpeningsHours: async (id: number) => {
    try {
      const response = await axios.get(`${backend}/api/stores/${id}/openingshours`);
      return response.data as OpeningHour[];
    } catch (error) {
      console.error('Error fetching store by opening hours:', error);
      throw error;
    }
  },

  updateStore: async (id: number, name: string, location_id: number, description: string) => {
    try {
      const response = await axios.put(`${backend}/api/stores/${id}`, {
        name,
        location_id,
        description,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating store:', error);
      throw error;
    }
  },
};

export default StoreService;
