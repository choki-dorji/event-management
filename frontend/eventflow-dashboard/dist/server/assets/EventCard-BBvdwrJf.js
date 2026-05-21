import { X as jsxRuntimeExports } from "./server-qdE1tQQu.js";
import { L as Link, C as Card, r as Badge, b as Calendar, U as Users } from "./router-UDsI4_WY.js";
import { M as MapPin } from "./map-pin-CphTOovu.js";
function EventCard({ event, to }) {
  const pct = Math.round(event.registered / event.capacity * 100);
  const href = to || `/events/${event.id}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, params: { eventId: event.id }, className: "group block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border-border/60 shadow-card hover:shadow-glow transition-all hover:-translate-y-1 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: event.image || "https://placehold.co/300x300",
          alt: event.title,
          className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-sm border-0", children: event.category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-3 right-3 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg leading-tight line-clamp-2", children: event.title }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: event.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
          event.date
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
          event.venue.split(",")[0]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
          event.registered,
          "/",
          event.capacity
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full gradient-primary transition-all", style: { width: `${pct}%` } }) })
    ] })
  ] }) });
}
export {
  EventCard as E
};
