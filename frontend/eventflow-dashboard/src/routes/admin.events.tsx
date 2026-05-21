import { createFileRoute } from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import { ProtectedRoute } from "@/components/ProtectedRoute";

import {
  DashboardLayout,
  PageHeader,
} from "@/layouts/DashboardLayout";

import { EventCard } from "@/components/EventCard";

import { eventsApi } from "@/services/api";

export const Route =
  createFileRoute(
    "/admin/events"
  )({
    component: () => (
      <ProtectedRoute
        roles={["admin"]}
      >
        <DashboardLayout>
          <AdminEvents />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  });

function AdminEvents() {

  const [events, setEvents] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents =
    async () => {

      try {

        const res =
          await eventsApi.list();

        console.log(
          "Events:",
          res.data
        );

        setEvents(
          res.data || []
        );

      } catch (error) {

        console.log(
          "Failed to fetch events",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="space-y-6">

      <PageHeader
        title="All events"
        description="Every event across the platform."
      />

      {loading ? (

        <div className="text-center py-10 text-muted-foreground">

          Loading events...

        </div>

      ) : events.length >
        0 ? (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {events.map((e) => (

            <EventCard
              key={e._id}
              event={{
                ...e,

                id: e._id,

                organizer:
                  e.organizer?.name ||
                  "Unknown Organizer",

                registered:
                  e.registered || 0,
              }}
            />

          ))}

        </div>

      ) : (

        <div className="text-center py-10 text-muted-foreground">

          No events found.

        </div>
      )}

    </div>
  );
}