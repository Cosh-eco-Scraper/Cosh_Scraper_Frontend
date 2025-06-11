import StatementService from "@/service/StatementService";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

export default function useStatements() {
    const {
        data: statements,
        isLoading: isLoadingStatements,
        error: statementsError,
        isError: isErrorStatements,
    } = useQuery({
        queryKey: queryKeys.getStatementsKey(),
        queryFn: () => StatementService.getAllStatements(),
    });

    return {
        statements,
        isLoadingStatements,
        statementsError,
        isErrorStatements,
    };
} 