// make brands hook
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/hooks/queryKeys';
import BrandService from '@/service/BrandService';
import { Brand } from '@/domain/Brand';

export default function useBrands() {
  const {
    data: allBrands,
    isLoading: isLoadingAllBrands,
    error: allbrandsError,
    isError: isErrorAllBrands,
  } = useQuery({
    queryKey: queryKeys.getAllBrandsKey(),
    queryFn: () => BrandService.getAllBrands(),
  });

  return {
    allBrands: allBrands as Brand[],
    isLoadingAllBrands,
    allbrandsError,
    isErrorAllBrands,
  };
}
