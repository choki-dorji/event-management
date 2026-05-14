import { createFileRoute } from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  Megaphone,
} from "lucide-react";

import { toast } from "sonner";

import { ProtectedRoute } from "@/components/ProtectedRoute";

import {
  DashboardLayout,
  PageHeader,
} from "@/layouts/DashboardLayout";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  announcementsApi,
} from "@/services/api";


export const Route =
  createFileRoute(
    "/organizer/announcements"
  )({
    component: () => (
      <ProtectedRoute
        roles={[
          "organizer",
          "admin",
        ]}
      >
        <DashboardLayout>
          <OrgAnnouncements />
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


function OrgAnnouncements() {

  return (
    <AnnouncementsManager
      title="Announcements"

      description="Broadcast updates to your event audience."
    />
  );
}


export function AnnouncementsManager({
  title,
  description,
}: {
  title: string;
  description: string;
}) {

  const [items, setItems] =
    useState<
      AnnouncementType[]
    >([]);

  const [loading, setLoading] =
    useState(true);

  const [open, setOpen] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      message: "",
      priority: "medium",
    });


  // FETCH ANNOUNCEMENTS
  useEffect(() => {

    fetchAnnouncements();

  }, []);


  const fetchAnnouncements =
    async () => {

      try {

        const res =
          await announcementsApi.list();

          console.log(res.data);

        setItems(
          res.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  // CREATE ANNOUNCEMENT
  const submit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (
        !form.title.trim()
      ) return;

      try {
        
        const res =
        await announcementsApi.create(
          form
        );
        console.log("res", res.data);
          

        setItems((prev) => [

          res.data.announcement,
          ...prev,
        ]);

        toast.success(
          "Announcement published"
        );

        setOpen(false);

        setForm({
          title: "",
          message: "",
          priority:
            "medium",
        });

      } catch (error: any) {
        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
          "Failed to publish announcement"
        );
      }
    };


  return (

    <div className="space-y-6">

      <PageHeader
        title={title}

        description={
          description
        }

        actions={

          <Dialog
            open={open}

            onOpenChange={
              setOpen
            }
          >

            <DialogTrigger asChild>

              <Button className="gradient-primary text-primary-foreground border-0">

                <Plus className="h-4 w-4 mr-2" />

                New announcement

              </Button>
            </DialogTrigger>


            <DialogContent>

              <DialogHeader>

                <DialogTitle>

                  Create announcement

                </DialogTitle>

              </DialogHeader>


              <form
                onSubmit={submit}
                className="space-y-3"
              >

                {/* TITLE */}
                <div className="space-y-1.5">

                  <Label>
                    Title
                  </Label>

                  <Input
                    value={
                      form.title
                    }

                    onChange={(e) =>
                      setForm({
                        ...form,
                        title:
                          e.target
                            .value,
                      })
                    }

                    required
                  />
                </div>


                {/* BODY */}
                <div className="space-y-1.5">

                  <Label>
                    Message
                  </Label>

                  <Textarea
                    rows={4}

                    value={
                      form.message
                    }

                    onChange={(e) =>
                      setForm({
                        ...form,
                        message:
                          e.target
                            .value,
                      })
                    }
                  />
                </div>


                {/* PRIORITY */}
                <div className="space-y-1.5">

                  <Label>
                    Priority
                  </Label>

                  <div className="flex gap-2">

                    {([
                      "low",
                      "medium",
                      "high",
                    ] as const).map(
                      (p) => (

                        <button
                          key={p}

                          type="button"

                          onClick={() =>
                            setForm({
                              ...form,
                              priority:
                                p,
                            })
                          }

                          className={`px-3 py-1.5 rounded-md text-sm capitalize border transition ${
                            form.priority ===
                            p

                              ? "gradient-primary text-primary-foreground border-transparent"

                              : "bg-card border-border"
                          }`}
                        >

                          {p}

                        </button>
                      )
                    )}
                  </div>
                </div>


                <DialogFooter>

                  <Button
                    type="submit"

                    className="gradient-primary text-primary-foreground border-0"
                  >

                    Publish

                  </Button>

                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />


      {/* ANNOUNCEMENTS */}
      <div className="grid md:grid-cols-2 gap-4">

        {loading ? (

          <div className="text-muted-foreground">

            Loading announcements...

          </div>

        ) : items.length > 0 ? (

          items.map((a) => (

            <Card
              key={a._id}

              className="p-5 shadow-card border-border/60 hover:shadow-glow transition-all"
            >

              <div className="flex items-start gap-3">

                <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground shrink-0">

                  <Megaphone className="h-5 w-5" />

                </div>


                <div className="flex-1 min-w-0">

                  <div className="flex items-center gap-2 flex-wrap">

                    <h3 className="font-semibold leading-tight">

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


                  <p className="text-sm text-muted-foreground mt-1.5">

                    {a.body}

                  </p>


                  <div className="text-xs text-muted-foreground mt-3">

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
              </div>
            </Card>
          ))

        ) : (

          <div className="text-muted-foreground">

            No announcements yet.

          </div>
        )}
      </div>
    </div>
  );
}