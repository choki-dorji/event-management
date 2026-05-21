import { X as jsxRuntimeExports } from "./server-qdE1tQQu.js";
import { P as ProtectedRoute } from "./ProtectedRoute-DaPVQkRl.js";
import { D as DashboardLayout, p as PageHeader, d as Shield, b as Calendar, C as Card, a7 as Check } from "./router-UDsI4_WY.js";
import { G as GraduationCap } from "./graduation-cap-ZIceMCf9.js";
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
const ROLE_DEFS = [{
  id: "admin",
  label: "Admin",
  icon: Shield,
  color: "secondary",
  perms: ["Manage users", "Manage all events", "View analytics", "Role management", "System announcements"]
}, {
  id: "organizer",
  label: "Organizer",
  icon: Calendar,
  color: "primary",
  perms: ["Create events", "Edit & delete own events", "View registrations", "Mark attendance", "QR scanning", "Post announcements"]
}, {
  id: "participant",
  label: "Participant",
  icon: GraduationCap,
  color: "accent",
  perms: ["Browse events", "Register for events", "View QR ticket", "Attendance history", "Receive announcements"]
}];
function Roles() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Roles & permissions", description: "A clear breakdown of what each role can do." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: ROLE_DEFS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 shadow-card border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-12 w-12 rounded-xl gradient-primary grid place-items-center text-primary-foreground mb-4 shadow-glow`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(r.icon, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: r.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2", children: r.perms.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-success mt-0.5 shrink-0" }),
        " ",
        p
      ] }, p)) })
    ] }, r.id)) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Roles, {}) }) });
export {
  SplitComponent as component
};
