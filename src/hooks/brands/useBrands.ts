// make brands hook
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/hooks/queryKeys';
import BrandService from '@/service/BrandService';

export default function useBrands() {
  const {
    data: brands,
    isLoading: isLoadingBrands,
    error: brandsError,
    isError: isErrorBrands,
  } = useQuery({
    queryKey: queryKeys.getAllBrandsKey(),
    queryFn: () => BrandService.getAllBrands(),
  });

  return {
    brands,
    isLoadingBrands,
    brandsError,
    isErrorBrands,
  };
}
