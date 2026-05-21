import { X as jsxRuntimeExports, r as reactExports } from "./server-qdE1tQQu.js";
import { D as DashboardLayout, E as eventsApi, G as registrationsApi, z as announcementsApi, p as PageHeader, B as Button, L as Link, T as Ticket, b as Calendar, H as Bell, r as Badge } from "./router-UDsI4_WY.js";
import { P as ProtectedRoute } from "./ProtectedRoute-DaPVQkRl.js";
import { S as StatCard, a as SectionCard } from "./StatCard-DdtE2-ET.js";
import { E as EventCard } from "./EventCard-BBvdwrJf.js";
import { C as CircleCheck } from "./circle-check-CL3UhCwR.js";
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
import "./map-pin-CphTOovu.js";
function ParticipantHome() {
  const [events, setEvents] = reactExports.useState([]);
  const [registrations, setRegistrations] = reactExports.useState([]);
  const [announcements, setAnnouncements] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchDashboard();
  }, []);
  const fetchDashboard = async () => {
    try {
      const [eventsRes, registrationsRes, announcementsRes] = await Promise.all([eventsApi.list(), registrationsApi.myEvents(), announcementsApi.list()]);
      setEvents(eventsRes.data);
      setRegistrations(registrationsRes.data);
      setAnnouncements(announcementsRes.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const registeredCount = registrations.length;
  const attendedCount = registrations.filter((r) => r.attendanceStatus).length;
  const upcomingCount = registrations.filter((r) => new Date(r.event.date) > /* @__PURE__ */ new Date()).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { badge: "Participant", title: "Welcome back 👋", description: "Here's what's happening across your events.", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gradient-primary text-primary-foreground border-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/participant/events", children: "Browse events" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Registered", value: registeredCount, icon: Ticket, gradient: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Attended", value: attendedCount, icon: CircleCheck }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Upcoming", value: upcomingCount, icon: Calendar }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Announcements", value: announcements.length, icon: Bell })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Announcements", action: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/announcements", className: "text-sm text-primary hover:underline", children: "View all" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: announcements.slice(0, 3).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/60 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-sm leading-tight", children: a.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: a.priority === "high" ? "destructive" : a.priority === "medium" ? "default" : "secondary", className: "text-[10px]", children: a.priority })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: a.body })
    ] }, a._id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Upcoming events" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/participant/events", children: "View all" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: events.slice(0, 3).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventCard, { event: {
        ...e,
        image: e.image ? `${e.image}` : void 0
      } }, e._id)) })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["participant", "admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ParticipantHome, {}) }) });
export {
  SplitComponent as component
};
