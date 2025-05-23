import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Store } from '@/domain/Store';
import StoreService from '@/service/StoreService';

interface UpdateStoreData {
  id: number;
  name?: string;
  description?: string;
  street?: string;
  number?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  location_id?: number;
}

async function updateStore({ id, ...data }: UpdateStoreData): Promise<Store> {
  const response = await StoreService.updateStore(
    id,
    data.name ?? '',
    data.location_id ?? 0,
    data.description ?? ''
  );

  return response.data;
}

export function useUpdateStoreMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStore,
    onSuccess: updatedStore => {
      // Invalidate and refetch store queries
      queryClient.invalidateQueries({ queryKey: ['store', updatedStore.id] });
      queryClient.invalidateQueries({ queryKey: ['stores'] });

      // Optionally update the cache directly (optimistic update)
      queryClient.setQueryData(['store', updatedStore.id], updatedStore);
    },
    onError: error => {
      console.error('Failed to update store:', error);
    },
  });
}
