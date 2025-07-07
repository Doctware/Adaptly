import { useEffect } from "react";
import { useUserStore } from "../context/userStore";

export function useAuth() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    // TODO: Fetch user from backend or check session
  }, [setUser]);

  return { user, setUser };
}
