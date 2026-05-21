import { createFileRoute, Link } from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowRight,
  CalendarCheck2,
  QrCode,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Users,
  Megaphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { PublicNavbar } from "@/components/PublicNavbar";

import { EventCard } from "@/components/EventCard";

import { eventsApi } from "@/services/api";


export const Route =
  createFileRoute("/")({
    component: Landing,
  });


interface EventType {
  _id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  category?: string;
  image?: string;
  capacity?: number;
}


function Landing() {

  const [featured,
    setFeatured] =
    useState<EventType[]>([]);

  const [loading,
    setLoading] =
    useState(true);


  // FETCH EVENTS
  useEffect(() => {

    fetchEvents();

  }, []);


  const fetchEvents =
    async () => {

      try {

        const res =
          await eventsApi.list();

        setFeatured(
          res.data.slice(0, 3)
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  return (

    <div className="min-h-screen bg-background">

      <PublicNavbar />


      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="absolute inset-0 grid-bg opacity-80 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">

          <div className="max-w-3xl">

            <Badge
              variant="secondary"
              className="mb-5 px-3 py-1"
            >

              <Sparkles className="h-3.5 w-3.5 mr-1.5" />

              New: QR-based instant check-in

            </Badge>


            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">

              Run unforgettable events with{" "}

              <span className="gradient-text">

                zero friction

              </span>

              .

            </h1>


            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">

              Eventory is a modern event management & attendance platform for universities and teams.

              Plan, promote, register and check in — all in one beautifully crafted dashboard.

            </p>


            <div className="mt-8 flex flex-wrap gap-3">

              <Button
                asChild
                size="lg"
                className="gradient-primary text-primary-foreground border-0 shadow-glow"
              >

                <Link to="/register">

                  Start free

                  <ArrowRight className="h-4 w-4 ml-2" />

                </Link>
              </Button>


              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-card/60 backdrop-blur"
              >

                <Link to="/events">

                  Browse events

                </Link>
              </Button>
            </div>


            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">

              <span className="inline-flex items-center gap-2">

                <ShieldCheck className="h-4 w-4 text-success" />

                Role-based access

              </span>


              <span className="inline-flex items-center gap-2">

                <QrCode className="h-4 w-4 text-secondary" />

                QR check-in

              </span>


              <span className="inline-flex items-center gap-2">

                <BarChart3 className="h-4 w-4 text-accent" />

                Real-time analytics

              </span>
            </div>
          </div>
        </div>
      </section>


      {/* FEATURES */}
      <section
        id="about"
        className="py-20 border-t border-border/60"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center max-w-2xl mx-auto mb-12">

            <Badge
              variant="outline"
              className="mb-3"
            >

              Why Eventory

            </Badge>


            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">

              Everything you need, nothing you don't

            </h2>


            <p className="mt-4 text-muted-foreground">

              Three roles. One platform. Built for the way modern teams organize and attend events.

            </p>
          </div>


          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                icon:
                  CalendarCheck2,

                title:
                  "Event lifecycle",

                body:
                  "Create, publish, edit and manage events with capacity, venue, and rich details.",
              },

              {
                icon: Users,

                title:
                  "Registrations",

                body:
                  "Participants register in one tap and receive a QR ticket instantly.",
              },

              {
                icon: QrCode,

                title:
                  "QR Attendance",

                body:
                  "Organizers scan QR codes for instant, contactless check-in at the door.",
              },

              {
                icon:
                  BarChart3,

                title:
                  "Analytics",

                body:
                  "Beautiful charts for attendance trends, top events, and engagement.",
              },

              {
                icon:
                  Megaphone,

                title:
                  "Announcements",

                body:
                  "Push platform-wide or event-specific updates to your audience.",
              },

              {
                icon:
                  ShieldCheck,

                title:
                  "Roles & access",

                body:
                  "Admin, organizer and participant roles with protected routes and JWT auth.",
              },
            ].map((f, i) => (

              <div
                key={i}

                className="glass rounded-2xl p-6 hover:shadow-glow transition-all hover:-translate-y-1"
              >

                <div className="h-11 w-11 rounded-xl gradient-primary grid place-items-center text-primary-foreground shadow-soft mb-4">

                  <f.icon className="h-5 w-5" />

                </div>


                <h3 className="font-semibold text-lg mb-1">

                  {f.title}

                </h3>


                <p className="text-sm text-muted-foreground">

                  {f.body}

                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FEATURED EVENTS */}
      <section className="py-20 border-t border-border/60">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">

            <div>

              <Badge
                variant="outline"
                className="mb-3"
              >

                Featured events

              </Badge>


              <h2 className="text-3xl font-bold tracking-tight">

                Don't miss what's next

              </h2>
            </div>


            <Button
              asChild
              variant="outline"
            >

              <Link to="/events">

                View all

                <ArrowRight className="h-4 w-4 ml-2" />

              </Link>
            </Button>
          </div>


          {loading ? (

            <div className="text-center py-12 text-muted-foreground">

              Loading events...

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {featured.map((e) => (

                <EventCard
                  key={e._id}

                  event={{
                    ...e,
                    image: e.image,
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