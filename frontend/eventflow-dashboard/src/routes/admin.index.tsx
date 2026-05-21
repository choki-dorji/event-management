import { createFileRoute } from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import {
  Users,
  Calendar,
  Ticket,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { ProtectedRoute } from "@/components/ProtectedRoute";

import {
  DashboardLayout,
  PageHeader,
} from "@/layouts/DashboardLayout";

import {
  StatCard,
  SectionCard,
} from "@/components/StatCard";

import { Badge } from "@/components/ui/badge";

import adminApi, { dashboardApi } from "@/services/api";

export const Route =
  createFileRoute("/admin/")({
    component: () => (
      <ProtectedRoute
        roles={["admin"]}
      >
        <DashboardLayout>
          <AdminHome />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  });

const COLORS = [
  "oklch(0.52 0.21 270)",
  "oklch(0.55 0.24 305)",
  "oklch(0.78 0.15 200)",
  "oklch(0.7 0.18 155)",
  "oklch(0.78 0.16 75)",
];

function AdminHome() {

  const [stats, setStats] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {

      try {

        const res =
          await dashboardApi.stats();

        console.log(
          "Dashboard:",
          res.data
        );

        setStats(res.data);

      } catch (error) {

        console.log(
          "Failed to fetch dashboard",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="p-6">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <PageHeader
        badge="Admin"
        title="Platform overview"
        description="Live snapshot of users, events and engagement."
      />

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          label="Total users"
          value={
            stats?.totalUsers || 0
          }
          icon={Users}
          gradient
        />

        <StatCard
          label="Total events"
          value={
            stats?.totalEvents || 0
          }
          icon={Calendar}
        />

        <StatCard
          label="Registrations"
          value={
            stats?.totalRegistrations ||
            0
          }
          icon={Ticket}
        />

        <StatCard
          label="Attendance rate"
          value={`${stats?.attendanceRate || 0}%`}
          icon={TrendingUp}
        />

      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* AREA CHART */}
        <div className="lg:col-span-2">

          <SectionCard
            title="Attendance analytics"
            description="Monthly trend across all events"
          >

            <div className="h-72">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <AreaChart
                  data={
                    stats?.attendanceTrend ||
                    []
                  }
                >

                  <defs>

                    <linearGradient
                      id="ap"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="5%"
                        stopColor="oklch(0.52 0.21 270)"
                        stopOpacity={0.5}
                      />

                      <stop
                        offset="95%"
                        stopColor="oklch(0.52 0.21 270)"
                        stopOpacity={0}
                      />

                    </linearGradient>

                    <linearGradient
                      id="aa"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="5%"
                        stopColor="oklch(0.55 0.24 305)"
                        stopOpacity={0.5}
                      />

                      <stop
                        offset="95%"
                        stopColor="oklch(0.55 0.24 305)"
                        stopOpacity={0}
                      />

                    </linearGradient>

                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    opacity={0.3}
                  />

                  <XAxis
                    dataKey="month"
                    stroke="currentColor"
                    fontSize={12}
                  />

                  <YAxis
                    stroke="currentColor"
                    fontSize={12}
                  />

                  <Tooltip
                    contentStyle={{
                      background:
                        "var(--color-card)",
                      border:
                        "1px solid var(--color-border)",
                      borderRadius: 12,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="present"
                    stroke="oklch(0.52 0.21 270)"
                    fill="url(#ap)"
                    strokeWidth={2}
                  />

                  <Area
                    type="monotone"
                    dataKey="absent"
                    stroke="oklch(0.55 0.24 305)"
                    fill="url(#aa)"
                    strokeWidth={2}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </SectionCard>

        </div>

        {/* PIE CHART */}
        <SectionCard
          title="Categories"
          description="Event distribution"
        >

          <div className="h-72">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={
                    stats?.categoryStats ||
                    []
                  }
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                >

                  {stats?.categoryStats?.map(
                    (
                      _: any,
                      i: number
                    ) => (

                      <Cell
                        key={i}
                        fill={
                          COLORS[
                            i %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip
                  contentStyle={{
                    background:
                      "var(--color-card)",
                    border:
                      "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />

                <Legend iconType="circle" />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </SectionCard>

      </div>

      {/* TOP EVENTS */}
      <SectionCard
        title="Top events"
        description="By registrations"
      >

        <div className="space-y-3">

          {stats?.topEvents?.map(
            (e: any) => (

              <div
                key={e._id}
                className="flex items-center gap-4 rounded-lg p-2 hover:bg-muted/50"
              >

                <img
                  src={e.image}
                  alt=""
                  className="h-12 w-16 rounded-lg object-cover"
                />

                <div className="flex-1 min-w-0">

                  <div className="font-medium text-sm truncate">

                    {e.title}

                  </div>

                  <div className="text-xs text-muted-foreground">

                    {new Date(
                      e.date
                    ).toLocaleDateString()}

                  </div>

                </div>

                <div className="text-right">

                  <div className="font-semibold">

                    {e.registered}

                  </div>

                  <Badge
                    variant="secondary"
                    className="text-[10px]"
                  >

                    {Math.round(
                      (e.registered /
                        e.capacity) *
                        100
                    )}
                    % full

                  </Badge>

                </div>

              </div>
            )
          )}

        </div>

      </SectionCard>

    </div>
  );
}