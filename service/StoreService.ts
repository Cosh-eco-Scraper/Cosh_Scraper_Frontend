const axios = require('axios');

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

  getStore: async (id: string) => {
    try {
      const response = await axios.get(`${backend}/api/stores/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching store:', error);
      throw error;
    }
  },

  getStoreBrands: async (id: string) => {
    try {
      const response = await axios.get(`${backend}/api/stores/${id}/brands`);
      return response.data;
    } catch (error) {
      console.error('Error fetching store by brand:', error);
      throw error;
    }
  },

  getStoreOpeningsHours: async (id: string) => {
    try {
      const response = await axios.get(`${backend}/api/stores/${id}/openingshours`);
      return response.data;
    } catch (error) {
      console.error('Error fetching store by opening hours:', error);
      throw error;
    }
  },
};

export default StoreService;
