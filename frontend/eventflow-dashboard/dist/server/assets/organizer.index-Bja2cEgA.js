import { X as jsxRuntimeExports, r as reactExports } from "./server-qdE1tQQu.js";
import { D as DashboardLayout, E as eventsApi, G as registrationsApi, p as PageHeader, B as Button, L as Link, J as Plus, b as Calendar, T as Ticket, U as Users, r as Badge } from "./router-UDsI4_WY.js";
import { P as ProtectedRoute } from "./ProtectedRoute-DaPVQkRl.js";
import { S as StatCard, a as SectionCard } from "./StatCard-DdtE2-ET.js";
import { T as TrendingUp, R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, a as Tooltip, L as Legend } from "./CartesianChart-BYScwybi.js";
import { B as BarChart, a as Bar } from "./BarChart-DbO5Fpwv.js";
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
function OrganizerHome() {
  const [events, setEvents] = reactExports.useState([]);
  const [registrations, setRegistrations] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchDashboard();
  }, []);
  const fetchDashboard = async () => {
    try {
      const [eventsRes, registrationsRes] = await Promise.all([eventsApi.myEvents(), registrationsApi.all()]);
      setEvents(eventsRes.data);
      setRegistrations(registrationsRes.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const totalRegistrations = registrations.length;
  const attendanceRate = registrations.length > 0 ? Math.round(registrations.filter((r) => r.attendanceStatus).length / registrations.length * 100) : 0;
  const audienceCount = new Set(registrations.map((r) => r._id)).size;
  const attendanceTrend = reactExports.useMemo(() => {
    const grouped = {};
    registrations.forEach((r) => {
      const month = (/* @__PURE__ */ new Date()).toLocaleString("default", {
        month: "short"
      });
      if (!grouped[month]) {
        grouped[month] = {
          month,
          present: 0,
          absent: 0
        };
      }
      if (r.attendanceStatus) {
        grouped[month].present++;
      } else {
        grouped[month].absent++;
      }
    });
    return Object.values(grouped);
  }, [registrations]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { badge: "Organizer", title: "Studio overview", description: "Track performance across all your events.", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gradient-primary text-primary-foreground border-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/organizer/events", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
      "New event"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Active events", value: events.length, icon: Calendar, gradient: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total registrations", value: totalRegistrations, icon: Ticket }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Avg attendance", value: `${attendanceRate}%`, icon: TrendingUp }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Audience", value: audienceCount, icon: Users })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Attendance trend", description: "Present vs absent across months", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: attendanceTrend, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.3 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", stroke: "currentColor", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "currentColor", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "var(--color-card)",
          border: "1px solid var(--color-border)",
          borderRadius: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "present", fill: "oklch(0.52 0.21 270)", radius: [6, 6, 0, 0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "absent", fill: "oklch(0.78 0.15 200)", radius: [6, 6, 0, 0] })
      ] }) }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Top events", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: events.slice(0, 4).map((e) => {
        const eventRegistrations = registrations.filter((r) => r.event._id === e._id);
        const registered = eventRegistrations.length;
        const percentage = e.capacity > 0 ? Math.round(registered / e.capacity * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: e.image, alt: "", className: "h-12 w-12 rounded-lg object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm truncate", children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              registered,
              "/",
              e.capacity,
              " ",
              "registered"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
            percentage,
            "%"
          ] })
        ] }, e._id);
      }) }) })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["organizer", "admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrganizerHome, {}) }) });
export {
  SplitComponent as component
};
