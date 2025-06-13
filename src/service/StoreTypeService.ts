import { LinkType } from '@/domain/StoreType';
import axiosInstance from '@/axiosInstance';

export const StoreTypeService = {
  addStoreType: async (storeType: LinkType) => {
    await axiosInstance.post('storeTypes', storeType);
  },
  removeStoreType: async (storeType: LinkType) => {
    await axiosInstance.delete('storeTypes', { data: storeType });
  },
};
