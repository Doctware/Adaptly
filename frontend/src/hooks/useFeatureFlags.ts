import { useEffect, useState } from "react";
import { fetcher } from "../api";

export function useFeatureFlags() {
  const [flags, setFlags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher<any[]>("/feature-flags").then(setFlags).finally(() => setLoading(false));
  }, []);

  return { flags, loading };
}
