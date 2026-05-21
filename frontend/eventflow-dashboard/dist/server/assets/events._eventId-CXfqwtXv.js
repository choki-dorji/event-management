import { r as reactExports, X as jsxRuntimeExports } from "./server-qdE1tQQu.js";
import { c as createLucideIcon, a1 as Route, u as useAuth, a as useNavigate, E as eventsApi, B as Button, L as Link, r as Badge, b as Calendar, C as Card, T as Ticket, U as Users, G as registrationsApi, t as toast } from "./router-UDsI4_WY.js";
import { P as PublicNavbar } from "./PublicNavbar-ChKmzecj.js";
import { M as MapPin } from "./map-pin-CphTOovu.js";
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
import "./log-in-D5Dopfht.js";
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function EventDetails() {
  const {
    eventId
  } = Route.useParams();
  const [event, setEvent] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [registered, setRegistered] = reactExports.useState(false);
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    fetchEvent();
    const checkRegistration = async () => {
      try {
        const res = await registrationsApi.myEvents();
        const alreadyRegistered = res.data.some((r) => r.event._id === eventId);
        setRegistered(alreadyRegistered);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      checkRegistration();
    }
  }, [eventId]);
  const fetchEvent = async () => {
    try {
      const res = await eventsApi.get(eventId);
      setEvent(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async () => {
    if (!user) {
      navigate({
        to: "/login",
        search: {
          redirect: `/events/${eventId}`
        }
      });
      return;
    }
    try {
      await registrationsApi.register({
        eventId
      });
      toast.success("Successfully registered!");
      setRegistered(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: "Loading event..." });
  }
  if (!event) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Event not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events", children: "Back to events" }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[44vh] min-h-[320px] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: event.image, alt: event.title, className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 -mt-32 relative pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "mb-4 backdrop-blur bg-card/80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/events", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
        "All events"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-2xl p-6 sm:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: event.category || "Event" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl font-bold tracking-tight mt-3", children: event.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-3 text-sm", children: [
              "Hosted by",
              " ",
              event.organizer?.name || "Organizer"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-base leading-relaxed", children: event.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                  "Date"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mt-1", children: new Date(event.date).toLocaleDateString() })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                  "Venue"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mt-1", children: event.venue })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-3", children: "What to expect" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: ["Networking opportunities", "Interactive sessions", "QR-based fast check-in", "Certificates & participation"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5" }),
              item
            ] }, item)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 shadow-glow border-border/60 sticky top-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Registration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold", children: event.capacity }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "seats available" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleRegister, disabled: registered, className: `w-full mt-5 border-0 shadow-soft ${registered ? "bg-success text-white hover:bg-success" : "gradient-primary text-primary-foreground"}`, children: registered ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 mr-2" }),
            "Already Registered"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "h-4 w-4 mr-2" }),
            "Register now"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-3 gap-3 text-center text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 mx-auto mb-1 text-primary" }),
              "Open"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 mx-auto mb-1 text-secondary" }),
              "Free"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 mx-auto mb-1 text-accent" }),
              "QR Ticket"
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  EventDetails as component
};
