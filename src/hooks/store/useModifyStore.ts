import {useMutation} from "@tanstack/react-query";
import {UpdateStore} from "@/domain/Store";
import StoreService from "@/service/StoreService";
import {UpdateResponse} from "@/domain/UpdateResponse";
import {queryClient} from "@/config/queryClient";
import {queryKeys} from "@/hooks/queryKeys";

export default function useModifyStore(id: number) {
    const {mutate: updateStore, isSuccess: isSuccessUpdateStore, isError: isErrorUpdateStore}
        = useMutation<UpdateResponse>({
        mutationFn: ({id, store}: { id: number, store: UpdateStore }) => StoreService.updateStore(id, store),
        onSuccess: () => {
            console.log('Store updated successfully')
            queryClient.invalidateQueries({queryKey: queryKeys.getStoreKey(id)})
        }
    })
}
