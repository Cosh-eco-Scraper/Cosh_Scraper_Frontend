import {useMutation} from '@tanstack/react-query';
import {queryClient} from '@/config/queryClient';
import {queryKeys} from '@/hooks/queryKeys';
import OpeningHoursService from '@/service/OpeningHoursService';
import {OpeningHour} from '@/domain/OpeningHour';

export default function useModifyOpeningHours() {
    const {
        mutateAsync: updateOpeningHours,
        isSuccess: isSuccessUpdateOpeningHours,
        isError: isErrorUpdateOpeningHours,
    } = useMutation<void, unknown, OpeningHour[]>({
        mutationFn: async (openingHours: OpeningHour[]) =>
            openingHours.forEach(openingHour =>
                OpeningHoursService.updateOpeningHour(openingHour.id, openingHour)
            ),
        onSuccess: async () => {
            console.log('Opening hours updated successfully');
            await queryClient.invalidateQueries({queryKey: queryKeys.getAllStoresKey()});
        },
    });

    return {
        updateOpeningHours,
        isSuccessUpdateOpeningHours,
        isErrorUpdateOpeningHours,
    };
}
