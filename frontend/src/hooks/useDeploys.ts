import { useEffect, useState } from "react";
import { fetcher } from "../api";

export function useDeploys() {
  const [deploys, setDeploys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher<any[]>("/deploys").then(setDeploys).finally(() => setLoading(false));
  }, []);

  return { deploys, loading };
}
