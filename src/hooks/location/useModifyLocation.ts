import { useMutation } from '@tanstack/react-query';
import { UpdateResponse } from '@/domain/UpdateResponse';
import { queryClient } from '@/config/queryClient';
import { queryKeys } from '@/hooks/queryKeys';
import LocationService from '@/service/LocationService';
import { CreateLocation } from '@/domain/Location';

export default function useModifyLocation(id: number) {
  const {
    mutate: updateLocation,
    isSuccess: isSuccessUpdateLocation,
    isError: isErrorUpdateLocation,
  } = useMutation<UpdateResponse, unknown, CreateLocation>({
    mutationFn: (location: CreateLocation) => LocationService.updateLocation(id, location),
    onSuccess: async () => {
      console.log('Store updated successfully');
      await queryClient.invalidateQueries({ queryKey: queryKeys.getStoreKey(id) });
    },
  });

  return {
    updateLocation,
    isSuccessUpdateLocation,
    isErrorUpdateLocation,
  };
}
