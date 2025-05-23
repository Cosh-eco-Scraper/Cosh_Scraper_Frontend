import { CreateOpeningHour, OpeningHour } from '@/domain/OpeningHour';
import { UpdateResponse } from '@/domain/UpdateResponse';
import axiosInstance from '@/axiosInstance';

const OpeningHoursService = {
  updateOpeningHour: async ({
    id,
    openingsHour,
  }: {
    id: number;
    openingsHour: CreateOpeningHour;
  }) => {
    const response = await axiosInstance.put<OpeningHour, UpdateResponse>(
      `openingHours/${id}`,
      openingsHour
    );
    return response;
  },
};

export default OpeningHoursService;
