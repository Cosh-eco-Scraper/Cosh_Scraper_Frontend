import StoreService from '@/service/StoreService';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/hooks/queryKeys';

export default function useStore(id: number) {
  const {
    data: store,
    isLoading: isLoadingStore,
    error: storeError,
    isError: isErrorStore,
  } = useQuery({
    queryKey: queryKeys.getStoreKey(id),
    queryFn: () => StoreService.getStore(id), // Replace '1' with the actual store ID you want to fetch
    enabled: !!id,
  });

  const {
    data: brands,
    isLoading: isLoadingBrands,
    error: brandsError,
    isError: isErrorBrands,
  } = useQuery({
    queryKey: queryKeys.getStoreBrandsKey(id),
    queryFn: () => StoreService.getStoreBrands(id), // Replace '1' with the actual store ID you want to fetch
    enabled: !!id,
  });

  const {
    data: openingHours,
    isLoading: isLoadingOpeningHours,
    error: openingHoursError,
    isError: isOpeningHoursError,
  } = useQuery({
    queryKey: queryKeys.getStoreHoursKey(id),
    queryFn: () => StoreService.getStoreOpeningsHours(id), // Replace '1' with the actual store ID you want to fetch
    enabled: !!id,
  });

  return {
    store,
    isLoadingStore,
    storeError,
    isErrorStore,
    brands,
    isLoadingBrands,
    isErrorBrands,
    brandsError,
    openingHours,
    isLoadingOpeningHours,
    isOpeningHoursError,
    openingHoursError,
  };
}
