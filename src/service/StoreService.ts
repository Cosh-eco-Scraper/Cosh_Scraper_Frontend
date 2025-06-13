import { CreateStore, Store, UpdateStore } from '@/domain/Store';
import { Brand, brandResult } from '@/domain/Brand';
import { OpeningHour } from '@/domain/OpeningHour';
import axiosInstance from '@/axiosInstance';
import { UpdateResponse } from '@/domain/UpdateResponse';
import { CreateResponse } from '@/domain/CreateResponse';
import { StoreType } from '@/domain/StoreType';

const StoreService = {
  getAllStores: async () => {
    try {
      const response = await axiosInstance.get(`stores/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stores:', error);
      throw error;
    }
  },

  getStore: async (id: number) => {
    try {
      const response = await axiosInstance.get(`stores/${id}`);
      return response.data as Store;
    } catch (error) {
      console.error('Error fetching store:', error);
      throw error;
    }
  },

  getStoreBrands: async (id: number) => {
    try {
      const response = await axiosInstance.get(`stores/${id}/brands`);
      return response.data as Brand[];
    } catch (error) {
      console.error('Error fetching store by brand:', error);
      throw error;
    }
  },

  getStoreOpeningsHours: async (id: number) => {
    try {
      const response = await axiosInstance.get(`stores/${id}/openingshours`);
      return response.data as OpeningHour[];
    } catch (error) {
      console.error('Error fetching store by opening hours:', error);
      throw error;
    }
  },
  updateStore: async (id: number, store: UpdateStore) => {
    try {
      const response = await axiosInstance.put<UpdateStore, UpdateResponse>(`stores/${id}`, store);
      return response;
    } catch (error) {
      console.error('Error fetching store by opening hours:', error);
      throw error;
    }
  },
  createStore: async (store: CreateStore) => {
    try {
      const response = await axiosInstance.post(`stores`, store);
      return response.data as CreateResponse;
    } catch (error) {
      console.error('Error fetching store by opening hours:', error);
      throw error;
    }
  },
  getStoreTypes: async (id: number) => {
    try {
      const response = await axiosInstance.get(`stores/${id}/types`);
      return response.data as StoreType[];
    } catch (error) {
      console.error('Error fetching store types:', error);
      throw error;
    }
  },
};

export default StoreService;
