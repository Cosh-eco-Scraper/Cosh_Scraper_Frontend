import {queryClient} from '@/config/queryClient';
import {useMutation} from '@tanstack/react-query';
import {UpdateResponse} from '@/domain/UpdateResponse';
import {CreateStore} from '@/domain/Store';
import StoreService from '@/service/StoreService';
import {queryKeys} from '@/hooks/queryKeys';
import {CreateResponse} from "@/domain/CreateResponse";

export default function useModifyStores() {
    const {
        data: storeResponse,
        mutateAsync: createStore,
        isSuccess: isSuccessCreateStore,
        isError: isErrorCreateStore,
        isPending: isPendingCreateStore,
    } = useMutation<CreateResponse, unknown, CreateStore>({
        mutationFn: (store: CreateStore) => StoreService.createStore(store),
        onSuccess: async () => {
            queryClient.invalidateQueries({queryKey: queryKeys.getAllStoresKey()});
        },
    });

    return {
        storeResponse,
        createStore,
        isSuccessCreateStore,
        isErrorCreateStore,
        isPendingCreateStore
    };
}
