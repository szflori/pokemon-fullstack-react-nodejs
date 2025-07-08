import { getMe } from "../api/auth";
import { useQuery } from "@tanstack/react-query";

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
