import { useQuery } from "@/lib/react-query";
import { queryKey } from "@/shared/constants/query-keys";
import { getWorkspaceSummary } from "./service";

export const useGetWorkspaceSummaryQuery = () =>
  useQuery({
    queryKey: [queryKey.workspace.summary],
    queryFn: getWorkspaceSummary,
  });
