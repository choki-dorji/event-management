import { createFileRoute } from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import { QRCodeSVG } from "qrcode.react";

import {
  Calendar,
  MapPin,
  QrCode,
  Download,
} from "lucide-react";

import { ProtectedRoute } from "@/components/ProtectedRoute";

import {
  DashboardLayout,
  PageHeader,
} from "@/layouts/DashboardLayout";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  registrationsApi,
} from "@/services/api";


export const Route =
  createFileRoute(
    "/participant/my-events"
  )({
    component: () => (
      <ProtectedRoute
        roles={[
          "participant",
          "admin",
        ]}
      >
        <DashboardLayout>
          <MyEvents />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  });


interface RegistrationType {
  _id: string;

  qrCode: string;

  attendanceStatus: boolean;

  event: {
    _id: string;
    title: string;
    description: string;
    venue: string;
    date: string;
    image?: string;
    category?: string;
  };
}


function MyEvents() {

  const [myEvents, setMyEvents] =
    useState<RegistrationType[]>([]);

  const [loading, setLoading] =
    useState(true);


  // FETCH REGISTERED EVENTS
  useEffect(() => {

    fetchMyEvents();

  }, []);


  const fetchMyEvents = async () => {

    try {

      const res =
        await registrationsApi.myEvents();

      setMyEvents(res.data);

    } catch (error) {

      console.log(
        "Failed to fetch registered events",
        error
      );

    } finally {

      setLoading(false);
    }
  };


  return (
    <div className="space-y-6">

      <PageHeader
        title="My events"
        description="Your registered events and QR tickets."
      />

      {loading ? (

        <div className="text-center py-10">
          Loading your events...
        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {myEvents.length > 0 ? (

            myEvents.map((registration) => (

              <TicketCard
                key={registration._id}
                registration={registration}
              />
            ))

          ) : (

            <div className="col-span-full text-center text-muted-foreground py-10">
              No registered events found.
            </div>

          )}

        </div>
      )}
    </div>
  );
}


function TicketCard({
  registration,
}: {
  registration: RegistrationType;
}) {

  const event = registration.event;

  return (

    <Card className="overflow-hidden shadow-card border-border/60 flex flex-col sm:flex-row">

      {/* IMAGE */}
      <div className="sm:w-32 h-32 sm:h-auto shrink-0">

        <img
          src={
            event.image
          }
          alt={event.title}
          className="w-full h-full object-cover"
        />

      </div>


      {/* CONTENT */}
      <div className="p-4 flex-1 flex flex-col">

        <Badge
          variant="secondary"
          className="self-start"
        >
          {event.category || "Event"}
        </Badge>


        <h3 className="font-semibold mt-2 leading-tight">
          {event.title}
        </h3>


        <div className="text-xs text-muted-foreground mt-2 space-y-1">

          <div className="flex items-center gap-1.5">

            <Calendar className="h-3.5 w-3.5" />

            {new Date(
              event.date
            ).toLocaleDateString()}
          </div>


          <div className="flex items-center gap-1.5">

            <MapPin className="h-3.5 w-3.5" />

            {event.venue}
          </div>

        </div>


        {/* ACTIONS */}
        <div className="mt-3 flex gap-2">

          <Dialog>

            <DialogTrigger asChild>

              <Button
                size="sm"
                className="gradient-primary text-primary-foreground border-0"
              >
                <QrCode className="h-4 w-4 mr-1.5" />

                QR Ticket
              </Button>

            </DialogTrigger>


            <DialogContent className="max-w-sm">

              <DialogHeader>

                <DialogTitle>
                  Your check-in ticket
                </DialogTitle>

              </DialogHeader>


              <div className="flex flex-col items-center gap-3 py-2">

                {/* QR */}
                <div className="bg-white p-4 rounded-xl shadow-soft">

               <QRCodeSVG
                  value={JSON.stringify({
                    registrationId:
                      registration._id,

                    name:
                      registration.user?.name ||
                      "Participant",
                  })}

                  size={200}
                />

                </div>


                {/* EVENT INFO */}
                <div className="text-center">

                  <div className="font-semibold">
                    {event.title}
                  </div>

                  <div className="text-xs text-muted-foreground">

                    {new Date(
                      event.date
                    ).toLocaleDateString()}

                    {" · "}

                    {event.venue}
                  </div>

                </div>


                {/* DOWNLOAD */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />

                  Download ticket
                </Button>

              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
}