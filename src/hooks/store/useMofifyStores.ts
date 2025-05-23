import {queryClient} from '@/config/queryClient';
import {useMutation} from "@tanstack/react-query";
import {UpdateResponse} from "@/domain/UpdateResponse";
import {CreateStore, UpdateStore} from "@/domain/Store";
import StoreService from "@/service/StoreService";
import {queryKeys} from "@/hooks/queryKeys";

export default function useModifyStores() {
    const {
        mutate: createStore,
        isSuccess: isSuccessCreateStore,
        isError: isErrorCreateStore,
    } = useMutation<UpdateResponse, unknown, CreateStore>({
        mutationFn: (store: CreateStore) => StoreService.createStore(store),
        onSuccess: async () => {
            console.log('Store created successfully');
            await queryClient.invalidateQueries({queryKey: queryKeys.getAllStoresKey()});
        },
    });

    return {
        createStore,
        isSuccessCreateStore,
        isErrorCreateStore,
    };
}
