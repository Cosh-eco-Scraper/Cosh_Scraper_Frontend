import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/config/queryClient';
import { queryKeys } from '@/hooks/queryKeys';
import StoreService from '@/service/StoreService';
import { brandResult } from '@/domain/Brand';

export default function useModifyBrands(storeId: number) {
  const {
    mutateAsync: updateBrands,
    isSuccess: isSuccessUpdateBrands,
    isError: isErrorUpdateBrands,
  } = useMutation<brandResult, unknown, string[]>({
    mutationFn: (brands: string[]) => StoreService.addBrands(storeId, brands),
    onSuccess: async () => {
      console.log('Brands added successfully');
      await queryClient.invalidateQueries({ queryKey: queryKeys.getStoreKey(storeId) });
    },
  });

  return {
    updateBrands,
    isSuccessUpdateBrands,
    isErrorUpdateBrands,
  };
}
