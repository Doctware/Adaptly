import React from "react";
import { useFeatureFlags } from "../hooks/useFeatureFlags";
import { useDeploys } from "../hooks/useDeploys";
import { useLogs } from "../hooks/useLogs";
import { Navbar, Sidebar } from "../components/Layout";
import { DeploysBarChart } from "../components/DeploysBarChart";

export default function Dashboard() {
  const { flags, loading: loadingFlags } = useFeatureFlags();
  const { deploys, loading: loadingDeploys } = useDeploys();
  const { logs, loading: loadingLogs } = useLogs();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded shadow p-4">
              <div className="text-gray-500 text-sm">Feature Flags</div>
              <div className="text-3xl font-bold">
                {loadingFlags ? "..." : flags.length}
              </div>
            </div>
            <div className="bg-white rounded shadow p-4">
              <div className="text-gray-500 text-sm">Deploys</div>
              <div className="text-3xl font-bold">
                {loadingDeploys ? "..." : deploys.length}
              </div>
            </div>
            <div className="bg-white rounded shadow p-4">
              <div className="text-gray-500 text-sm">Logs</div>
              <div className="text-3xl font-bold">
                {loadingLogs ? "..." : logs.length}
              </div>
            </div>
          </div>
          <div className="bg-white rounded shadow p-4 mb-8">
            <div className="text-lg font-semibold mb-2">Deploys by Status</div>
            {loadingDeploys ? (
              <div className="text-gray-500">Loading chart...</div>
            ) : (
              <DeploysBarChart deploys={deploys} />
            )}
          </div>
          <div className="bg-white rounded shadow p-4">
            <div className="text-lg font-semibold mb-2">Recent Deploys</div>
            <ul>
              {loadingDeploys ? (
                <li>Loading...</li>
              ) : (
                deploys.slice(0, 5).map((deploy: any) => (
                  <li key={deploy.id} className="mb-1">
                    <span className="font-mono text-xs">{deploy.id}</span> -{" "}
                    {deploy.status} - {deploy.startedAt}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
