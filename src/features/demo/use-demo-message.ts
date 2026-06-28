import { useQuery } from "@tanstack/react-query";
import { fetchDemoMessage } from "./api";

export function useDemoMessage() {
  return useQuery({
    queryKey: ["demo", "message"],
    queryFn: fetchDemoMessage,
  });
}
