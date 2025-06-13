import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/hooks/queryKeys';
import { TypeService } from '@/service/TypeService';

export default function useTypes() {
  const {
    data: types,
    isSuccess: isSuccessTypes,
    isLoading: isLoadingTypes,
  } = useQuery({
    queryKey: queryKeys.getTypesKey(),
    queryFn: () => TypeService.getTypes(),
  });

  return {
    types,
    isSuccessTypes,
    isLoadingTypes,
  };
}
