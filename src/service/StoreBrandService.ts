import axiosInstance from '@/axiosInstance';
import {brandResult} from '@/domain/Brand';

const StoreBrandService = {
  addBrands: async (storeId: number, brands: string[]) => {
    try {
      const response = await axiosInstance.post(`storebrands/${storeId}/brands`, { brands });
      return response.data as brandResult;
    } catch (error) {
      console.error('Error adding brands to store:', error);
      throw error;
    }
  },

  removeBrand: async (storeId: number, brandId: number) => {
    const response = await axiosInstance.delete(`storebrands`, {data: {storeId, brandId}});
    return response.data; // Assuming the response contains the rowAffected count
  },
};

export default StoreBrandService;
