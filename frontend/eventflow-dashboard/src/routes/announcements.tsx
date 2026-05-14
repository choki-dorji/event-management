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

import { Card } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Megaphone } from "lucide-react";

import {
  announcementsApi,
} from "@/services/api";


export const Route =
  createFileRoute(
    "/announcements"
  )({
    component: () => (
      <ProtectedRoute>

        <DashboardLayout>

          <AnnouncementsPage />

        </DashboardLayout>

      </ProtectedRoute>
    ),
  });


interface AnnouncementType {
  _id: string;
  title: string;
  body: string;
  priority: string;
  author?: string;
  createdAt?: string;
}


function AnnouncementsPage() {

  const [items, setItems] =
    useState<
      AnnouncementType[]
    >([]);

  const [loading, setLoading] =
    useState(true);


  // FETCH ANNOUNCEMENTS
  useEffect(() => {

    fetchAnnouncements();

  }, []);


  const fetchAnnouncements =
    async () => {

      try {

        const res =
          await announcementsApi.list();

        setItems(
          res.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  return (

    <div className="space-y-6">

      <PageHeader
        title="Announcements"

        description="All updates from organizers and admins."
      />


      <div className="space-y-3">

        {loading ? (

          <Card className="p-6 text-center text-muted-foreground">

            Loading announcements...

          </Card>

        ) : items.length > 0 ? (

          items.map((a) => (

            <Card
              key={a._id}

              className="p-5 flex items-start gap-4 shadow-card border-border/60"
            >

              {/* ICON */}
              <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground shrink-0">

                <Megaphone className="h-5 w-5" />

              </div>


              {/* CONTENT */}
              <div className="flex-1">

                <div className="flex items-center gap-2 flex-wrap">

                  <h3 className="font-semibold">

                    {a.title}

                  </h3>


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


                <p className="text-sm text-muted-foreground mt-1">

                  {a.body}

                </p>


                <div className="text-xs text-muted-foreground mt-2">

                  {a.author ||
                    "Organizer"}

                  {" · "}

                  {a.createdAt

                    ? new Date(
                        a.createdAt
                      ).toLocaleDateString()

                    : "Today"}
                </div>
              </div>
            </Card>
          ))

        ) : (

          <Card className="p-6 text-center text-muted-foreground">

            No announcements available.

          </Card>
        )}
      </div>
    </div>
  );
}