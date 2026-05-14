import { createFileRoute } from "@tanstack/react-router";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Search } from "lucide-react";

import { PublicNavbar } from "@/components/PublicNavbar";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import { EventCard } from "@/components/EventCard";

import { eventsApi } from "@/services/api";


export const Route =
  createFileRoute("/events/")({
    component: EventsList,
  });


const CATEGORIES = [
  "All",
  "Technology",
  "Cultural",
  "Sports",
  "Business",
  "Career",
];


interface EventType {
  _id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  category?: string;
  capacity: number;
  image?: string;
}


function EventsList() {

  const [q, setQ] =
    useState("");

  const [cat, setCat] =
    useState("All");

  const [events, setEvents] =
    useState<EventType[]>([]);

  const [loading, setLoading] =
    useState(true);


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
  const filtered =
    useMemo(() => {

      return events.filter((e) =>

        (cat === "All" ||
          e.category === cat) &&

        (
          e.title
            .toLowerCase()
            .includes(
              q.toLowerCase()
            ) ||

          e.venue
            .toLowerCase()
            .includes(
              q.toLowerCase()
            )
        )
      );

    }, [events, q, cat]);


  return (

    <div className="min-h-screen">

      <PublicNavbar />


      {/* HERO */}
      <section className="border-b border-border/60 grid-bg">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

          <Badge
            variant="secondary"
            className="mb-3"
          >

            Discover

          </Badge>


          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">

            Browse upcoming events

          </h1>


          <p className="text-muted-foreground mt-2">

            Find something exciting happening this week.

          </p>


          {/* SEARCH + FILTER */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">

            <div className="relative flex-1 max-w-md">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                value={q}

                onChange={(e) =>
                  setQ(
                    e.target.value
                  )
                }

                placeholder="Search events or venues…"

                className="pl-9 h-11 bg-card"
              />
            </div>


            {/* CATEGORY */}
            <div className="flex gap-2 flex-wrap">

              {CATEGORIES.map((c) => (

                <button
                  key={c}

                  onClick={() =>
                    setCat(c)
                  }

                  className={`px-3 h-11 rounded-md text-sm font-medium border transition-all ${
                    cat === c

                      ? "gradient-primary text-primary-foreground border-transparent shadow-soft"

                      : "bg-card border-border hover:border-primary/40"
                  }`}
                >

                  {c}

                </button>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* EVENTS */}
      <section className="py-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {loading ? (

            <div className="text-center py-20 text-muted-foreground">

              Loading events...

            </div>

          ) : filtered.length === 0 ? (

            <div className="text-center py-20 text-muted-foreground">

              No events match your search.

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filtered.map((e) => (

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
          )}
        </div>
      </section>
    </div>
  );
}