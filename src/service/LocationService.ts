import { OpeningHour } from '@/domain/OpeningHour';
import axiosInstance from '@/axiosInstance';
import { UpdateResponse } from '@/domain/UpdateResponse';
import { CreateLocation } from '@/domain/Location';

const LocationService = {
  updateLocation: async ({ id, location }: { id: number; location: CreateLocation }) => {
    const response = await axiosInstance.put<OpeningHour, UpdateResponse>(
      `locations/${id}`,
      location
    );
    return response;
  },
};

export default LocationService;
