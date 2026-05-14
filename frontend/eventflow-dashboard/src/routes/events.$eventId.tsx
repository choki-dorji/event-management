import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Ticket,
  CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";

import { PublicNavbar } from "@/components/PublicNavbar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import {
  eventsApi,
  registrationsApi,
} from "@/services/api";

import { useAuth } from "@/context/AuthContext";


export const Route =
  createFileRoute(
    "/events/$eventId"
  )({
    component: EventDetails,
  });


interface EventType {
  _id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  category?: string;
  capacity: number;
  image?: string;

  organizer?: {
    name: string;
  };
}


function EventDetails() {

  const { eventId } =
    Route.useParams();

  const [event, setEvent] =
    useState<EventType | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);
  const [registered, setRegistered] =
  useState(false);

  const { user } = useAuth();

  const navigate =
    useNavigate();


  // FETCH EVENT
  useEffect(() => {

    fetchEvent();
    const checkRegistration =
  async () => {

    try {

      const res =
        await registrationsApi.myEvents();

      const alreadyRegistered =
        res.data.some(
          (r: any) =>
            r.event._id === eventId
        );

      setRegistered(
        alreadyRegistered
      );

    } catch (error) {

      console.log(error);
    }
};

if (user) {

  checkRegistration();
}

  }, [eventId]);


  const fetchEvent =
    async () => {

      try {

        const res =
          await eventsApi.get(
            eventId
          );

        setEvent(res.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  // REGISTER EVENT
  const handleRegister =
    async () => {

      if (!user) {

        navigate({
          to: "/login",

          search: {
            redirect:
              `/events/${eventId}`,
          } as any,
        });

        return;
      }

      try {

        await registrationsApi.register({
          eventId,
        });

        toast.success(
          "Successfully registered!"
        );

        setRegistered(true);

      } catch (error: any) {

        toast.error(
          error.response?.data
            ?.message ||
          "Registration failed"
        );
      }
    };


  // LOADING
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading event...
      </div>
    );
  }


  // NOT FOUND
  if (!event) {

    return (
      <div className="min-h-screen">

        <PublicNavbar />

        <div className="max-w-4xl mx-auto p-12 text-center">

          <h1 className="text-2xl font-bold">
            Event not found
          </h1>

          <Button
            asChild
            className="mt-4"
          >
            <Link to="/events">
              Back to events
            </Link>
          </Button>
        </div>
      </div>
    );
  }


  return (

    <div className="min-h-screen">

      <PublicNavbar />


      {/* HERO IMAGE */}
      <div className="relative h-[44vh] min-h-[320px] overflow-hidden">

        <img
          src={
             event.image
                        ? `http://localhost:5000${event.image}`
                        : "https://placehold.co/600x400"
          }

          alt={event.title}

          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      </div>


      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-32 relative pb-16">

        <Button
          asChild
          variant="outline"
          size="sm"
          className="mb-4 backdrop-blur bg-card/80"
        >

          <Link to="/events">

            <ArrowLeft className="h-4 w-4 mr-2" />

            All events

          </Link>
        </Button>


        <div className="grid lg:grid-cols-3 gap-6">


          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            <div className="glass-strong rounded-2xl p-6 sm:p-8">

              <Badge variant="secondary">

                {event.category ||
                  "Event"}

              </Badge>


              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">

                {event.title}

              </h1>


              <p className="text-muted-foreground mt-3 text-sm">

                Hosted by{" "}

                {event.organizer
                  ?.name ||
                  "Organizer"}

              </p>


              <p className="mt-6 text-base leading-relaxed">

                {event.description}

              </p>


              {/* INFO */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4">

                <div className="rounded-xl border border-border/60 p-4">

                  <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">

                    <Calendar className="h-3.5 w-3.5" />

                    Date

                  </div>

                  <div className="font-medium mt-1">

                    {new Date(
                      event.date
                    ).toLocaleDateString()}

                  </div>
                </div>


                <div className="rounded-xl border border-border/60 p-4">

                  <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">

                    <MapPin className="h-3.5 w-3.5" />

                    Venue

                  </div>

                  <div className="font-medium mt-1">

                    {event.venue}

                  </div>
                </div>
              </div>
            </div>


            {/* WHAT TO EXPECT */}
            <Card className="p-6 shadow-card">

              <h3 className="font-semibold text-lg mb-3">

                What to expect

              </h3>


              <ul className="space-y-2 text-sm text-muted-foreground">

                {[
                  "Networking opportunities",
                  "Interactive sessions",
                  "QR-based fast check-in",
                  "Certificates & participation",
                ].map((item) => (

                  <li
                    key={item}
                    className="flex items-start gap-2"
                  >

                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />

                    {item}

                  </li>
                ))}
              </ul>
            </Card>
          </div>


          {/* RIGHT */}
          <div className="space-y-6">

            <Card className="p-6 shadow-glow border-border/60 sticky top-20">

              <div className="text-sm text-muted-foreground">

                Registration

              </div>


              <div className="flex items-baseline gap-2 mt-1">

                <span className="text-3xl font-bold">

                  {event.capacity}

                </span>

                <span className="text-muted-foreground">

                  seats available

                </span>
              </div>


              <Button
                  onClick={handleRegister}

                  disabled={registered}

                  className={`w-full mt-5 border-0 shadow-soft ${
                    registered

                      ? "bg-success text-white hover:bg-success"

                      : "gradient-primary text-primary-foreground"
                  }`}
                >

                  {registered ? (

                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />

                      Already Registered
                    </>

                  ) : (

                    <>
                      <Ticket className="h-4 w-4 mr-2" />

                      Register now
                    </>
                  )}

                </Button>


              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">

                <div>

                  <Users className="h-4 w-4 mx-auto mb-1 text-primary" />

                  Open

                </div>


                <div>

                  <Calendar className="h-4 w-4 mx-auto mb-1 text-secondary" />

                  Free

                </div>


                <div>

                  <CheckCircle2 className="h-4 w-4 mx-auto mb-1 text-accent" />

                  QR Ticket

                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}