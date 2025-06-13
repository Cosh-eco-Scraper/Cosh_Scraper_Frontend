import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/config/queryClient';
import { queryKeys } from '@/hooks/queryKeys';
import StoreBrandService from '@/service/StoreBrandService';

export default function useRemoveBrand(storeId: number) {
  const {
    mutateAsync: removeBrand,
    isSuccess: isSuccessRemoveBrand,
    isError: isErrorRemoveBrand,
    error: removeError,
  } = useMutation<
    { rowAffected: number }, // response shape
    unknown,
    number // brandId to remove
  >({
    mutationFn: (brandId: number) => StoreBrandService.removeBrand(storeId, brandId),
    onSuccess: async () => {
      console.log('Brand removed successfully');
      await queryClient.invalidateQueries({ queryKey: queryKeys.getStoreKey(storeId) });
    },
  });

  return {
    removeBrand,
    isSuccessRemoveBrand,
    isErrorRemoveBrand,
    removeError,
  };
}
