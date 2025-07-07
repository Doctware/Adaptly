import React from "react";
import { useFeatureFlags } from "../hooks/useFeatureFlags";
import { Navbar, Sidebar } from "../components/Layout";
import { toggleFeatureFlag } from "../api";

export default function FeatureFlags() {
  const { flags, loading } = useFeatureFlags();
  const [updating, setUpdating] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleToggle = async (flag: any) => {
    setUpdating(flag.name);
    setError(null);
    try {
      await toggleFeatureFlag(flag.name, !flag.enabled);
      window.location.reload(); // For MVP: reload to refresh flags
    } catch (e: any) {
      setError(e.message || "Failed to update flag");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Feature Flags</h1>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {loading ? (
            <div className="text-gray-500">Loading feature flags...</div>
          ) : flags.length === 0 ? (
            <div className="text-gray-500">No feature flags found.</div>
          ) : (
            <table className="min-w-full border text-left">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Flag</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {flags.map((flag: any) => (
                  <tr key={flag.name}>
                    <td className="border px-4 py-2">{flag.name}</td>
                    <td className="border px-4 py-2">{flag.enabled ? "ON" : "OFF"}</td>
                    <td className="border px-4 py-2">
                      <button
                        className={`px-2 py-1 rounded ${flag.enabled ? "bg-red-500" : "bg-green-500"} text-white`}
                        onClick={() => handleToggle(flag)}
                        disabled={updating === flag.name}
                      >
                        {updating === flag.name
                          ? "Updating..."
                          : flag.enabled
                          ? "Disable"
                          : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
