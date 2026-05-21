import { X as jsxRuntimeExports, r as reactExports } from "./server-qdE1tQQu.js";
import { c as createLucideIcon, D as DashboardLayout, u as useAuth, E as eventsApi, t as toast, p as PageHeader, B as Button, J as Plus, C as Card, r as Badge, b as Calendar, O as Dialog, W as DialogContent, X as DialogHeader, Y as DialogTitle, e as Label, I as Input, _ as Textarea, a0 as DialogFooter } from "./router-UDsI4_WY.js";
import { P as ProtectedRoute } from "./ProtectedRoute-DaPVQkRl.js";
import { M as MapPin } from "./map-pin-CphTOovu.js";
import { T as Trash2 } from "./trash-2-CXZ4O33x.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "util";
import "stream";
import "path";
import "http";
import "https";
import "url";
import "fs";
import "crypto";
import "net";
import "tls";
import "assert";
import "./worker-entry-GVGC3vWU.js";
import "node:events";
import "os";
import "events";
import "http2";
import "zlib";
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
function OrgEvents() {
  const [events, setEvents] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const {
    user
  } = useAuth();
  reactExports.useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const res = await eventsApi.myEvents();
      setEvents(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };
  const startNew = () => {
    setEditing(null);
    setOpen(true);
  };
  const startEdit = (event) => {
    setEditing(event);
    setOpen(true);
  };
  const remove = async (id) => {
    try {
      await eventsApi.remove(id);
      setEvents((prev) => prev.filter((event) => event._id !== id));
      toast.success("Event deleted");
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };
  const save = async (data) => {
    try {
      if (editing) {
        const res = await eventsApi.update(editing._id, data);
        setEvents((prev) => prev.map((event) => event._id === editing._id ? res.data.updatedEvent : event));
        toast.success("Event updated");
      } else {
        const res = await eventsApi.create(data);
        setEvents((prev) => [res.data.event, ...prev]);
        toast.success("Event created");
      }
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save event");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "My events", description: "Create, edit and manage your events.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: startNew, className: "gradient-primary text-primary-foreground border-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
      "Create event"
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-10", children: "Loading events..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: events.map((event) => {
      user?.role === "admin" || event.organizer?._id === user?._id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden shadow-card border-border/60 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-36 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: event.image, alt: event.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-3 left-3 bg-background/90 text-foreground border-0", children: event.category || "Event" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold leading-tight line-clamp-1", children: event.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
              new Date(event.date).toLocaleDateString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
              event.venue
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "flex-1", onClick: () => startEdit(event), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Edit"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "text-destructive hover:bg-destructive/10", onClick: () => remove(event._id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] })
        ] })
      ] }, event._id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit event" : "Create event" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EventForm, { initial: editing, onSubmit: save })
    ] }) })
  ] });
}
function EventForm({
  initial,
  onSubmit
}) {
  const [data, setData] = reactExports.useState(initial || {});
  const [imageFile, setImageFile] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title || "");
    formData.append("description", data.description || "");
    formData.append("venue", data.venue || "");
    formData.append("date", data.date || "");
    formData.append("category", data.category || "");
    formData.append("capacity", String(data.capacity || 0));
    if (imageFile) {
      formData.append("image", imageFile);
    }
    onSubmit(formData);
  }, className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.title || "", onChange: (e) => setData({
        ...data,
        title: e.target.value
      }), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: data.description || "", onChange: (e) => setData({
        ...data,
        description: e.target.value
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: data.date ? data.date.split("T")[0] : "", onChange: (e) => setData({
        ...data,
        date: e.target.value
      }), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Venue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.venue || "", onChange: (e) => setData({
        ...data,
        venue: e.target.value
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: data.category || "", onChange: (e) => setData({
          ...data,
          category: e.target.value
        }), className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Technology", children: "Technology" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Cultural", children: "Cultural" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Sports", children: "Sports" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Business", children: "Business" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Career", children: "Career" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Capacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: data.capacity || "", onChange: (e) => setData({
          ...data,
          capacity: Number(e.target.value)
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Event Image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "file", accept: "image/*", onChange: (e) => {
        if (e.target.files?.[0]) {
          setImageFile(e.target.files[0]);
        }
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "gradient-primary text-primary-foreground border-0", children: "Save" }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["organizer", "admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrgEvents, {}) }) });
export {
  SplitComponent as component
};
