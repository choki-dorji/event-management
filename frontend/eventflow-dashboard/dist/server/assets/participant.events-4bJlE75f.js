import { X as jsxRuntimeExports, r as reactExports } from "./server-qdE1tQQu.js";
import { P as ProtectedRoute } from "./ProtectedRoute-DaPVQkRl.js";
import { D as DashboardLayout, E as eventsApi, p as PageHeader, K as Search, I as Input } from "./router-UDsI4_WY.js";
import { E as EventCard } from "./EventCard-BBvdwrJf.js";
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
const CATS = ["All", "Technology", "Cultural", "Sports", "Business", "Career"];
function ParticipantEvents() {
  const [events, setEvents] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [q, setQ] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("All");
  reactExports.useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const res = await eventsApi.list();
      setEvents(res.data);
    } catch (error) {
      console.log("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };
  const filtered = reactExports.useMemo(() => {
    return events.filter((e) => {
      const matchesCategory = cat === "All" || e.category === cat;
      const matchesSearch = e.title.toLowerCase().includes(q.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [events, q, cat]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Browse events", description: "Find and register for events that interest you." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search events…", className: "pl-9" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: CATS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCat(c), className: `px-3 h-10 rounded-md text-sm font-medium border transition-all ${cat === c ? "gradient-primary text-primary-foreground border-transparent" : "bg-card border-border hover:border-primary/40"}`, children: c }, c)) })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-10", children: "Loading events..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: filtered.length > 0 ? filtered.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventCard, { event: e, to: `/events/${e._id}` }, e._id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center text-muted-foreground py-10", children: "No events found." }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["participant", "admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ParticipantEvents, {}) }) });
export {
  SplitComponent as component
};
