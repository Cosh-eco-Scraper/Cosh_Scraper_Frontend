import axiosInstance from '@/axiosInstance';
import { OpeningHour } from '@/domain/OpeningHour';
import { UpdateResponse } from '@/domain/UpdateResponse';
import { UpdateBrand } from '@/domain/Brand';

const LocationService = {
  updateLocation: async ({ id, brand }: { id: number; brand: UpdateBrand }) => {
    const response = await axiosInstance.put<OpeningHour, UpdateResponse>(`brands/${id}`, brand);
    return response;
  },
};

export default LocationService;
