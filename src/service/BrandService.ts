import axiosInstance from '@/axiosInstance';
import {OpeningHour} from '@/domain/OpeningHour';
import {UpdateResponse} from '@/domain/UpdateResponse';
import {Brand, UpdateBrand} from '@/domain/Brand';

const BrandService = {
  updateBrand: async ({ id, brand }: { id: number; brand: UpdateBrand }) => {
    const response = await axiosInstance.put<OpeningHour, UpdateResponse>(`brands/${id}`, brand);
    return response;
  },

  getAllBrands: async () => {
    try {
      const response = await axiosInstance.get<Brand[]>(`brands/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  },
};

export default BrandService;
