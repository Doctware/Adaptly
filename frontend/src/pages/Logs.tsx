import React from "react";
import { useLogs } from "../hooks/useLogs";
import { Navbar, Sidebar } from "../components/Layout";

export default function Logs() {
  const { logs, loading } = useLogs();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Logs</h1>
          {loading ? (
            <div className="text-gray-500">Loading logs...</div>
          ) : logs.length === 0 ? (
            <div className="text-gray-500">No logs found.</div>
          ) : (
            <table className="min-w-full border text-left">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Timestamp</th>
                  <th className="border px-4 py-2">Message</th>
                  <th className="border px-4 py-2">Level</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log: any, idx: number) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">{log.timestamp}</td>
                    <td className="border px-4 py-2">{log.message}</td>
                    <td className="border px-4 py-2">{log.level}</td>
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
