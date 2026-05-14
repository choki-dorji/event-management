import { createFileRoute } from "@tanstack/react-router";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line,
} from "recharts";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout, PageHeader } from "@/layouts/DashboardLayout";
import { SectionCard, StatCard } from "@/components/StatCard";
import { TrendingUp, Activity, Users, Calendar } from "lucide-react";
import { attendanceTrend, eventCategoryStats } from "@/lib/mockData";

export const Route = createFileRoute("/admin/analytics")({
  component: () => (
    <ProtectedRoute roles={["admin"]}>
      <DashboardLayout><Analytics /></DashboardLayout>
    </ProtectedRoute>
  ),
});

function Analytics() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Deep dive into platform performance." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="DAU" value={"1,284"} icon={Activity} gradient />
        <StatCard label="WAU" value={"3,602"} icon={Users} />
        <StatCard label="Events this month" value={18} icon={Calendar} />
        <StatCard label="Growth" value={"+24%"} icon={TrendingUp} trend="vs last month" />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Attendance breakdown">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Legend />
                <Bar dataKey="present" stackId="a" fill="oklch(0.52 0.21 270)" radius={[0,0,0,0]} />
                <Bar dataKey="absent" stackId="a" fill="oklch(0.78 0.15 200)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Categories performance">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={eventCategoryStats}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="value" stroke="oklch(0.55 0.24 305)" strokeWidth={3} dot={{ r: 5, fill: "oklch(0.55 0.24 305)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
