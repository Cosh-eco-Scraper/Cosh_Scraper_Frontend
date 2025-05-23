import {queryClient} from "@/config/queryClient";

export default function useModifyStores() {
    const {mutate: createStore, isSuccess: isSuccessCreateStore, isError: isErrorCreateStore}
        = useMutation<UpdateResponse>({
        mutationFn: ({store}: { id: number, store: UpdateStore }) => StoreService.createStore(store),
        onSuccess: () => {
            console.log('Store created successfully')
            queryClient.invalidateQueries({queryKey: queryKeys.getAllStoresKey()})
        }
    })

    return {
        createStore,
        isSuccessCreateStore,
        isErrorCreateStore,
    }
}