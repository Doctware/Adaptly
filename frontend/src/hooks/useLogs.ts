import { useEffect, useState } from "react";
import { fetcher } from "../api";

export function useLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher<any[]>("/logs").then(setLogs).finally(() => setLoading(false));
  }, []);

  return { logs, loading };
}
