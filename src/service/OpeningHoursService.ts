import { CreateOpeningHour, OpeningHour } from '@/domain/OpeningHour';
import { UpdateResponse } from '@/domain/UpdateResponse';
import axiosInstance from '@/axiosInstance';

const OpeningHoursService = {
  updateOpeningHour: async (id: number, openingsHour: CreateOpeningHour) => {
    console.log("put opening hour",openingsHour);

    const response = await axiosInstance.put<OpeningHour, UpdateResponse>(
      `openingHours/${id}`,
      openingsHour
    );
    return response;
  },
};

export default OpeningHoursService;
