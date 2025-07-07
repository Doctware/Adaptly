import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function DeploysBarChart({ deploys }: { deploys: any[] }) {
  // Group deploys by status for a simple bar chart
  const data = React.useMemo(() => {
    const statusCount: Record<string, number> = {};
    deploys.forEach((d) => {
      statusCount[d.status] = (statusCount[d.status] || 0) + 1;
    });
    return Object.entries(statusCount).map(([status, count]) => ({ status, count }));
  }, [deploys]);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  );
}
