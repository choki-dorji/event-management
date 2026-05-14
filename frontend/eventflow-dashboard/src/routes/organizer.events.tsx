import { createFileRoute } from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  MapPin,
} from "lucide-react";

import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
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
} from "@/components/ui/dialog";

import { eventsApi } from "@/services/api";


export const Route =
  createFileRoute(
    "/organizer/events"
  )({
    component: () => (
      <ProtectedRoute
        roles={[
          "organizer",
          "admin",
        ]}
      >
        <DashboardLayout>
          <OrgEvents />
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
  capacity: number;
  image?: string;

  organizer?: {
    _id: string;
    name?: string;
  };
}


function OrgEvents() {

  const [events, setEvents] =
    useState<EventType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [open, setOpen] =
    useState(false);

  const [editing, setEditing] =
    useState<EventType | null>(null);
    const { user } = useAuth();


  // FETCH EVENTS
  useEffect(() => {

    fetchEvents();

  }, []);


  const fetchEvents = async () => {

    try {

      const res =
        await eventsApi.myEvents();

      setEvents(res.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch events"
      );

    } finally {

      setLoading(false);
    }
  };


  // CREATE NEW
  const startNew = () => {

    setEditing(null);

    setOpen(true);
  };


  // EDIT
  const startEdit = (
    event: EventType
  ) => {

    setEditing(event);

    setOpen(true);
  };


  // DELETE
  const remove = async (
    id: string
  ) => {

    try {

      await eventsApi.remove(id);

      setEvents((prev) =>
        prev.filter(
          (event) =>
            event._id !== id
        )
      );

      toast.success(
        "Event deleted"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Delete failed"
      );
    }
  };


  // SAVE EVENT
  const save = async (
  data: FormData
) => {

    try {

      // UPDATE
      if (editing) {

        const res =
          await eventsApi.update(
            editing._id,
            data
          );

        setEvents((prev) =>
          prev.map((event) =>
            event._id === editing._id
              ? res.data.updatedEvent
              : event
          )
        );

        toast.success(
          "Event updated"
        );

      } else {

        // CREATE
        const res =
          await eventsApi.create(data);

        setEvents((prev) => [
          res.data.event,
          ...prev,
        ]);

        toast.success(
          "Event created"
        );
      }

      setOpen(false);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to save event"
      );
    }
  };


  return (

    <div className="space-y-6">

      <PageHeader
        title="My events"
        description="Create, edit and manage your events."

        actions={
          <Button
            onClick={startNew}
            className="gradient-primary text-primary-foreground border-0"
          >
            <Plus className="h-4 w-4 mr-2" />

            Create event
          </Button>
        }
      />


      {loading ? (

        <div className="text-center py-10">
          Loading events...
        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {events.map((event) => {
            const isOwner =
              user?.role === "admin" ||
              event.organizer?._id === user?._id;
            return(
            
            <Card
              key={event._id}
              className="overflow-hidden shadow-card border-border/60 group"
            >

              {/* IMAGE */}
              <div className="relative h-36 overflow-hidden">

                <img
                  src={
                      event.image
                    }
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />

                <Badge className="absolute top-3 left-3 bg-background/90 text-foreground border-0">

                  {event.category ||
                    "Event"}

                </Badge>
              </div>


              {/* CONTENT */}
              <div className="p-4 space-y-2">

                <h3 className="font-semibold leading-tight line-clamp-1">

                  {event.title}

                </h3>


                <div className="text-xs text-muted-foreground flex flex-wrap gap-3">

                  <span className="inline-flex items-center gap-1">

                    <Calendar className="h-3.5 w-3.5" />

                    {new Date(
                      event.date
                    ).toLocaleDateString()}

                  </span>


                  <span className="inline-flex items-center gap-1">

                    <MapPin className="h-3.5 w-3.5" />

                    {event.venue}

                  </span>
                </div>


                {/* ACTIONS */}
                <div className="flex gap-2 pt-2">

                 <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"

                      onClick={() =>
                        startEdit(event)
                      }
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1.5" />

                      Edit
                    </Button>


                 <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:bg-destructive/10"

                    onClick={() =>
                      remove(event._id)
                    }
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          )}
          )}
        </div>
      )}


      {/* DIALOG */}
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >

        <DialogContent className="max-w-lg">

          <DialogHeader>

            <DialogTitle>

              {editing
                ? "Edit event"
                : "Create event"}

            </DialogTitle>

          </DialogHeader>


          <EventForm
            initial={editing}
            onSubmit={save}
          />

        </DialogContent>
      </Dialog>
    </div>
  );
}


function EventForm({
  initial,
  onSubmit,
}: {
  initial: EventType | null;

  onSubmit: (
  data: FormData
) => void;
}) {

  const [data, setData] =
    useState<
      Partial<EventType>
    >(initial || {});
    const [imageFile, setImageFile] =
  useState<File | null>(null);


  return (

   <form
  onSubmit={(e) => {

    e.preventDefault();

    const formData =
      new FormData();

    formData.append(
      "title",
      data.title || ""
    );

    formData.append(
      "description",
      data.description || ""
    );

    formData.append(
      "venue",
      data.venue || ""
    );

    formData.append(
      "date",
      data.date || ""
    );

    formData.append(
      "category",
      data.category || ""
    );

    formData.append(
      "capacity",
      String(data.capacity || 0)
    );

    if (imageFile) {

      formData.append(
        "image",
        imageFile
      );
    }

    onSubmit(formData as any);
  }}
      className="space-y-3"
    >

      <div className="space-y-1.5">

        <Label>
          Title
        </Label>

        <Input
          value={data.title || ""}

          onChange={(e) =>
            setData({
              ...data,
              title:
                e.target.value,
            })
          }

          required
        />
      </div>
      <div className="space-y-1.5">
        <Label>
          Description
        </Label>

        <Textarea
          rows={3}

          value={
            data.description || ""
          }

          onChange={(e) =>
            setData({
              ...data,
              description:
                e.target.value,
            })
          }
        />
      </div>


      <div className="space-y-1.5">

        <Label>
          Date
        </Label>

        <Input
          type="date"

          value={
            data.date
              ? data.date
                  .split("T")[0]
              : ""
          }

          onChange={(e) =>
            setData({
              ...data,
              date:
                e.target.value,
            })
          }

          required
        />
      </div>


      <div className="space-y-1.5">

        <Label>
          Venue
        </Label>

        <Input
          value={
            data.venue || ""
          }

          onChange={(e) =>
            setData({
              ...data,
              venue:
                e.target.value,
            })
          }
        />
      </div>


      <div className="grid grid-cols-2 gap-3">

        <div className="space-y-1.5">

  <Label>
    Category
  </Label>

  <select
    value={
      data.category || ""
    }

    onChange={(e) =>
      setData({
        ...data,
        category:
          e.target.value,
      })
    }

    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
  >

    <option value="">
      Select category
    </option>

    <option value="Technology">
      Technology
    </option>

    <option value="Cultural">
      Cultural
    </option>

    <option value="Sports">
      Sports
    </option>

    <option value="Business">
      Business
    </option>

    <option value="Career">
      Career
    </option>

  </select>
</div>


        <div className="space-y-1.5">

          <Label>
            Capacity
          </Label>

          <Input
            type="number"

            value={
              data.capacity || ""
            }

            onChange={(e) =>
              setData({
                ...data,
                capacity:
                  Number(
                    e.target.value
                  ),
              })
            }
          />
        </div>
      </div>
      <div className="space-y-1.5">

  <Label>
    Event Image
  </Label>

  <Input
    type="file"
    accept="image/*"

    onChange={(e) => {

      if (e.target.files?.[0]) {

        setImageFile(
          e.target.files[0]
        );
      }
    }}
  />

</div>


      <DialogFooter className="pt-2">

        <Button
          type="submit"
          className="gradient-primary text-primary-foreground border-0"
        >
          Save
        </Button>

      </DialogFooter>
    </form>
  );
}