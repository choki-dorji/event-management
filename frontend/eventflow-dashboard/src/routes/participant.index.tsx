import { createFileRoute, Link } from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import {
  Calendar,
  Ticket,
  CheckCircle2,
  Bell,
} from "lucide-react";

import { ProtectedRoute } from "@/components/ProtectedRoute";

import {
  DashboardLayout,
  PageHeader,
} from "@/layouts/DashboardLayout";

import {
  StatCard,
  SectionCard,
} from "@/components/StatCard";

import { EventCard } from "@/components/EventCard";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
  eventsApi,
  registrationsApi,
  announcementsApi,
} from "@/services/api";


export const Route =
  createFileRoute(
    "/participant/"
  )({
    component: () => (
      <ProtectedRoute
        roles={[
          "participant",
          "admin",
        ]}
      >
        <DashboardLayout>
          <ParticipantHome />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  });


interface EventType {
  _id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  category?: string;
  image?: string;
}


interface RegistrationType {
  _id: string;

  attendanceStatus: boolean;

  event: EventType;
}


interface AnnouncementType {
  _id: string;
  title: string;
  body: string;
  priority: string;
}


function ParticipantHome() {

  const [events, setEvents] =
    useState<EventType[]>([]);

  const [registrations,
    setRegistrations] =
    useState<
      RegistrationType[]
    >([]);

  const [announcements,
    setAnnouncements] =
    useState<
      AnnouncementType[]
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
          announcementsRes,
        ] = await Promise.all([

          eventsApi.list(),

          registrationsApi.myEvents(),

          announcementsApi.list(),
        ]);


        setEvents(
          eventsRes.data
        );

        setRegistrations(
          registrationsRes.data
        );

        setAnnouncements(
          announcementsRes.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  // STATS
  const registeredCount =
    registrations.length;

  const attendedCount =
    registrations.filter(
      (r) =>
        r.attendanceStatus
    ).length;

  const upcomingCount =
    registrations.filter(
      (r) =>
        new Date(
          r.event.date
        ) > new Date()
    ).length;


  return (

    <div className="space-y-6">

      <PageHeader
        badge="Participant"

        title="Welcome back 👋"

        description="Here's what's happening across your events."

        actions={
          <Button
            asChild
            className="gradient-primary text-primary-foreground border-0"
          >

            <Link to="/participant/events">

              Browse events

            </Link>
          </Button>
        }
      />


      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          label="Registered"
          value={registeredCount}
          icon={Ticket}
          gradient
        />


        <StatCard
          label="Attended"
          value={attendedCount}
          icon={CheckCircle2}
        />


        <StatCard
          label="Upcoming"
          value={upcomingCount}
          icon={Calendar}
        />


        <StatCard
          label="Announcements"
          value={announcements.length}
          icon={Bell}
        />

      </div>


      {/* ANNOUNCEMENTS */}
      <SectionCard
        title="Announcements"

        action={

          <Link
            to="/announcements"

            className="text-sm text-primary hover:underline"
          >

            View all

          </Link>
        }
      >

        <div className="space-y-3">

          {announcements
            .slice(0, 3)
            .map((a) => (

              <div
                key={a._id}

                className="rounded-lg border border-border/60 p-3"
              >

                <div className="flex items-center justify-between gap-2">

                  <h4 className="font-medium text-sm leading-tight">

                    {a.title}

                  </h4>


                  <Badge
                    variant={
                      a.priority ===
                      "high"

                        ? "destructive"

                        : a.priority ===
                          "medium"

                        ? "default"

                        : "secondary"
                    }

                    className="text-[10px]"
                  >

                    {a.priority}

                  </Badge>
                </div>


                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">

                  {a.body}

                </p>
              </div>
            ))}
        </div>
      </SectionCard>


      {/* UPCOMING EVENTS */}
      <div>

        <div className="flex items-end justify-between mb-4">

          <h2 className="text-xl font-bold">

            Upcoming events

          </h2>


          <Button
            asChild
            variant="outline"
            size="sm"
          >

            <Link to="/participant/events">

              View all

            </Link>
          </Button>
        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {events
            .slice(0, 3)
            .map((e) => (

              <EventCard
                key={e._id}

                event={{
                  ...e,

                  image:
                    e.image
                      ? `${e.image}`
                      : undefined,
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}