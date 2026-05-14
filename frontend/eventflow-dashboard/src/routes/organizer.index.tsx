import { createFileRoute, Link } from "@tanstack/react-router";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Calendar,
  Users,
  Ticket,
  TrendingUp,
  Plus,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
  eventsApi,
  registrationsApi,
} from "@/services/api";


export const Route =
  createFileRoute(
    "/organizer/"
  )({
    component: () => (
      <ProtectedRoute
        roles={[
          "organizer",
          "admin",
        ]}
      >
        <DashboardLayout>
          <OrganizerHome />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  });


interface EventType {
  _id: string;
  title: string;
  image?: string;
  category?: string;
  capacity: number;
  date: string;
  venue: string;
}


interface RegistrationType {
  _id: string;

  attendanceStatus: boolean;

  event: {
    _id: string;
    title: string;
  };
}


function OrganizerHome() {

  const [events, setEvents] =
    useState<EventType[]>([]);

  const [registrations,
    setRegistrations] =
    useState<
      RegistrationType[]
    >([]);

  const [loading, setLoading] =
    useState(true);


  // FETCH DASHBOARD DATA
  useEffect(() => {

    fetchDashboard();

  }, []);


  const fetchDashboard =
    async () => {

      try {

        const [
          eventsRes,
          registrationsRes,
        ] = await Promise.all([

          eventsApi.myEvents(),

          registrationsApi.all(),
        ]);


        setEvents(
          eventsRes.data
        );

        setRegistrations(
          registrationsRes.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  // TOTAL REGISTRATIONS
  const totalRegistrations =
    registrations.length;


  // ATTENDANCE %
  const attendanceRate =
    registrations.length > 0

      ? Math.round(

          (
            registrations.filter(
              (r) =>
                r.attendanceStatus
            ).length /

            registrations.length
          ) * 100
        )

      : 0;


  // UNIQUE PARTICIPANTS
  const audienceCount =
    new Set(
      registrations.map(
        (r) => r._id
      )
    ).size;


  // CHART DATA
  const attendanceTrend =
    useMemo(() => {

      const grouped:
        Record<
          string,
          {
            month: string;
            present: number;
            absent: number;
          }
        > = {};

      registrations.forEach(
        (r) => {

          const month =
            new Date()
              .toLocaleString(
                "default",
                {
                  month:
                    "short",
                }
              );

          if (!grouped[month]) {

            grouped[month] = {
              month,
              present: 0,
              absent: 0,
            };
          }

          if (
            r.attendanceStatus
          ) {

            grouped[
              month
            ].present++;

          } else {

            grouped[
              month
            ].absent++;
          }
        }
      );

      return Object.values(
        grouped
      );

    }, [registrations]);


  return (

    <div className="space-y-6">

      <PageHeader
        badge="Organizer"

        title="Studio overview"

        description="Track performance across all your events."

        actions={

          <Button
            asChild
            className="gradient-primary text-primary-foreground border-0"
          >

            <Link to="/organizer/events">

              <Plus className="h-4 w-4 mr-2" />

              New event

            </Link>
          </Button>
        }
      />


      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          label="Active events"
          value={events.length}
          icon={Calendar}
          gradient
        />


        <StatCard
          label="Total registrations"
          value={totalRegistrations}
          icon={Ticket}
        />


        <StatCard
          label="Avg attendance"
          value={`${attendanceRate}%`}
          icon={TrendingUp}
        />


        <StatCard
          label="Audience"
          value={audienceCount}
          icon={Users}
        />

      </div>


      <div className="grid lg:grid-cols-3 gap-6">


        {/* CHART */}
        <div className="lg:col-span-2">

          <SectionCard
            title="Attendance trend"

            description="Present vs absent across months"
          >

            <div className="h-72">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={
                    attendanceTrend
                  }
                >

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

                  <Legend />

                  <Bar
                    dataKey="present"

                    fill="oklch(0.52 0.21 270)"

                    radius={[
                      6,
                      6,
                      0,
                      0,
                    ]}
                  />

                  <Bar
                    dataKey="absent"

                    fill="oklch(0.78 0.15 200)"

                    radius={[
                      6,
                      6,
                      0,
                      0,
                    ]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>


        {/* TOP EVENTS */}
        <SectionCard
          title="Top events"
        >

          <div className="space-y-3">

            {events
              .slice(0, 4)
              .map((e) => {

                const eventRegistrations =
                  registrations.filter(
                    (r) =>
                      r.event._id ===
                      e._id
                  );

                const registered =
                  eventRegistrations.length;

                const percentage =
                  e.capacity > 0

                    ? Math.round(
                        (
                          registered /
                          e.capacity
                        ) * 100
                      )

                    : 0;

                return (

                  <div
                    key={e._id}

                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors"
                  >

                    <img
                      src={
                        e.image
                          ? `http://localhost:5000${e.image}`
                          : "https://placehold.co/100x100"
                      }

                      alt=""

                      className="h-12 w-12 rounded-lg object-cover"
                    />


                    <div className="flex-1 min-w-0">

                      <div className="font-medium text-sm truncate">

                        {e.title}

                      </div>


                      <div className="text-xs text-muted-foreground">

                        {registered}/
                        {e.capacity}
                        {" "}registered

                      </div>
                    </div>


                    <Badge
                      variant="secondary"
                      className="text-xs"
                    >

                      {percentage}%

                    </Badge>
                  </div>
                );
              })}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}