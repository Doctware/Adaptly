import { useEffect } from "react";
import { useUserStore } from "../context/userStore";
import { getUser } from "../api";

export function useSession() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, [setUser]);

  return { user };
}
