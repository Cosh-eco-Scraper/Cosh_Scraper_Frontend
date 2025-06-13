import axiosInstance from '@/axiosInstance';
import { brandResult } from '@/domain/Brand';
import useRemoveBrand from '@/hooks/brands/useDeleteBrands';

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
    try {
      const response = await axiosInstance.delete(`storebrands/${storeId}/brands/${brandId}`);
      return response.data; // Assuming the response contains the rowAffected count
    } catch (error) {
      console.error('Error removing brand from store:', error);
      throw error;
    }
  },
};

export default StoreBrandService;
