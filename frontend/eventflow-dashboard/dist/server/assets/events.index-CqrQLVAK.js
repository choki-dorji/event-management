import { r as reactExports, X as jsxRuntimeExports } from "./server-qdE1tQQu.js";
import { P as PublicNavbar } from "./PublicNavbar-ChKmzecj.js";
import { E as eventsApi, r as Badge, K as Search, I as Input } from "./router-UDsI4_WY.js";
import { E as EventCard } from "./EventCard-BBvdwrJf.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./log-in-D5Dopfht.js";
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
const CATEGORIES = ["All", "Technology", "Cultural", "Sports", "Business", "Career"];
function EventsList() {
  const [q, setQ] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("All");
  const [events, setEvents] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
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
    return events.filter((e) => (cat === "All" || e.category === cat) && (e.title.toLowerCase().includes(q.toLowerCase()) || e.venue.toLowerCase().includes(q.toLowerCase())));
  }, [events, q, cat]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border/60 grid-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "mb-3", children: "Discover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl font-bold tracking-tight", children: "Browse upcoming events" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Find something exciting happening this week." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search events or venues…", className: "pl-9 h-11 bg-card" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCat(c), className: `px-3 h-11 rounded-md text-sm font-medium border transition-all ${cat === c ? "gradient-primary text-primary-foreground border-transparent shadow-soft" : "bg-card border-border hover:border-primary/40"}`, children: c }, c)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-muted-foreground", children: "Loading events..." }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-muted-foreground", children: "No events match your search." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: filtered.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventCard, { event: {
      ...e,
      image: e.image ? `${e.image}` : void 0
    } }, e._id)) }) }) })
  ] });
}
export {
  EventsList as component
};
