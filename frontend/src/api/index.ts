// src/api/index.ts
// API layer for backend endpoints

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, options);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Example: export async function getUser() { return fetcher<User>("/user"); }

export async function toggleFeatureFlag(flagName: string, enabled: boolean) {
  return fetcher(`/feature-flags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: flagName, enabled }),
  });
}

export async function rollbackDeploy(deployId: string) {
  return fetcher(`/deploy/rollback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deployId }),
  });
}

export async function getUser() {
  return fetcher("/auth/me");
}
