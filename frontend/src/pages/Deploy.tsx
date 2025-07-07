import React from "react";
import { useDeploys } from "../hooks/useDeploys";
import { Navbar, Sidebar } from "../components/Layout";
import { rollbackDeploy } from "../api";

export default function Deploy() {
  const { deploys, loading } = useDeploys();
  const [rollingBack, setRollingBack] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleRollback = async (deploy: any) => {
    setRollingBack(deploy.id);
    setError(null);
    try {
      await rollbackDeploy(deploy.id);
      window.location.reload(); // For MVP: reload to refresh deploys
    } catch (e: any) {
      setError(e.message || "Failed to rollback");
    } finally {
      setRollingBack(null);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Deploys</h1>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {loading ? (
            <div className="text-gray-500">Loading deploys...</div>
          ) : deploys.length === 0 ? (
            <div className="text-gray-500">No deploys found.</div>
          ) : (
            <table className="min-w-full border text-left">
              <thead>
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Started</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deploys.map((deploy: any) => (
                  <tr key={deploy.id}>
                    <td className="border px-4 py-2">{deploy.id}</td>
                    <td className="border px-4 py-2">{deploy.status}</td>
                    <td className="border px-4 py-2">{deploy.startedAt}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleRollback(deploy)}
                        disabled={rollingBack === deploy.id}
                      >
                        {rollingBack === deploy.id ? "Rolling back..." : "Rollback"}
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
