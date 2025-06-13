import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/config/queryClient';
import { queryKeys } from '@/hooks/queryKeys';
import { StoreTypeService } from '@/service/StoreTypeService';
import { LinkType } from '@/domain/StoreType';

export default function useModifyStoreTypes() {
  const {
    mutateAsync: removeStoreType,
    isSuccess: isSuccessRemoveStoreType,
    isError: isErrorRemoveStoreType,
    isPending: isPendingRemoveStoreType,
  } = useMutation({
    mutationFn: (type: LinkType) => StoreTypeService.removeStoreType(type),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.getTypesKey() });
    },
  });

  const {
    mutateAsync: addStoreType,
    isSuccess: isSuccessAddStoreType,
    isError: isErrorAddStoreType,
    isPending: isPendingAddStoreType,
  } = useMutation({
    mutationFn: (type: LinkType) => StoreTypeService.addStoreType(type),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.getTypesKey() });
    },
  });

  return {
    removeStoreType,
    isSuccessRemoveStoreType,
    isErrorRemoveStoreType,
    isPendingRemoveStoreType,
    addStoreType,
    isSuccessAddStoreType,
    isErrorAddStoreType,
    isPendingAddStoreType,
  };
}
