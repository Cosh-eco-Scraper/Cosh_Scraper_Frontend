// make brands hook
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/hooks/queryKeys';
import BrandService from '@/service/BrandService';
import { Brand } from '@/domain/Brand';

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
    brands: brands as Brand[],
    isLoadingBrands,
    isErrorBrands,
    brandsError,
  };
}