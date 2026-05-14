import { createFileRoute } from "@tanstack/react-router";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Search } from "lucide-react";

import { ProtectedRoute } from "@/components/ProtectedRoute";

import {
  DashboardLayout,
  PageHeader,
} from "@/layouts/DashboardLayout";

import { Input } from "@/components/ui/input";

import { EventCard } from "@/components/EventCard";

import { eventsApi } from "@/services/api";


const CATS = [
  "All",
  "Technology",
  "Cultural",
  "Sports",
  "Business",
  "Career",
];


export const Route =
  createFileRoute(
    "/participant/events"
  )({
    component: () => (
      <ProtectedRoute
        roles={[
          "participant",
          "admin",
        ]}
      >
        <DashboardLayout>
          <ParticipantEvents />
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
  capacity: number;
  image?: string;
  category?: string;
}


function ParticipantEvents() {

  const [events, setEvents] =
    useState<EventType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [q, setQ] = useState("");

  const [cat, setCat] =
    useState("All");


  // FETCH EVENTS
  useEffect(() => {

    fetchEvents();

  }, []);


  const fetchEvents = async () => {

    try {

      const res =
        await eventsApi.list();

      setEvents(res.data);

    } catch (error) {

      console.log(
        "Failed to fetch events",
        error
      );

    } finally {

      setLoading(false);
    }
  };


  // FILTER EVENTS
  const filtered = useMemo(() => {

    return events.filter((e) => {

      const matchesCategory =
        cat === "All" ||
        e.category === cat;

      const matchesSearch =
        e.title
          .toLowerCase()
          .includes(
            q.toLowerCase()
          );

      return (
        matchesCategory &&
        matchesSearch
      );
    });

  }, [events, q, cat]);


  return (
    <div className="space-y-6">

      <PageHeader
        title="Browse events"
        description="Find and register for events that interest you."
      />

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-3">

        <div className="relative flex-1 max-w-md">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />

          <Input
            value={q}
            onChange={(e) =>
              setQ(e.target.value)
            }
            placeholder="Search events…"
            className="pl-9"
          />
        </div>


        <div className="flex gap-2 flex-wrap">

          {CATS.map((c) => (

            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 h-10 rounded-md text-sm font-medium border transition-all ${
                cat === c
                  ? "gradient-primary text-primary-foreground border-transparent"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}

        </div>
      </div>


      {/* LOADING */}
      {loading ? (

        <div className="text-center py-10">
          Loading events...
        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filtered.length > 0 ? (

            filtered.map((e) => (

              <EventCard
                key={e._id}
                event={e}
                to={`/events/${e._id}`}
              />
            ))

          ) : (

            <div className="col-span-full text-center text-muted-foreground py-10">
              No events found.
            </div>

          )}

        </div>
      )}
    </div>
  );
}