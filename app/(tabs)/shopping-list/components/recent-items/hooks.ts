import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useUserService } from "@/src/user";
import { fetchRecentItems } from "./query";

export const useRecentItems = () => {
  const user = useUserService();

  const q = useQuery({
    queryKey: ["recent-items", user?.userId].filter(Boolean) as string[],
    queryFn: fetchRecentItems,
    placeholderData: keepPreviousData,
    enabled: !!user?.userId,
  });

  return {
    recentItems: q.data || [],
    isLoading: q.isLoading,
  };
};
