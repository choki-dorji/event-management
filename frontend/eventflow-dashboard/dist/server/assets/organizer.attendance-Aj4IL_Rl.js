import { X as jsxRuntimeExports, r as reactExports } from "./server-qdE1tQQu.js";
import { P as ProtectedRoute } from "./ProtectedRoute-DaPVQkRl.js";
import { c as createLucideIcon, D as DashboardLayout, p as PageHeader, C as Card, K as Search, I as Input, B as Button, A as Avatar, q as AvatarFallback, r as Badge } from "./router-UDsI4_WY.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BFo4AkAv.js";
import { b as mockAttendance } from "./mockData-CMg32f5D.js";
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
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode);
function StatusBadge({
  s
}) {
  const map = {
    present: {
      c: "bg-success/10 text-success border-success/20",
      I: CircleCheck
    },
    late: {
      c: "bg-warning/10 text-warning border-warning/20",
      I: Clock
    },
    absent: {
      c: "bg-destructive/10 text-destructive border-destructive/20",
      I: CircleX
    }
  };
  const {
    c,
    I
  } = map[s];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: `capitalize ${c}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(I, { className: "h-3 w-3 mr-1" }),
    s
  ] });
}
function AttendanceMgmt() {
  const [q, setQ] = reactExports.useState("");
  const filtered = mockAttendance.filter((r) => r.participant.toLowerCase().includes(q.toLowerCase()));
  const stats = mockAttendance.reduce((a, r) => {
    a[r.status] = (a[r.status] || 0) + 1;
    return a;
  }, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Attendance management", description: "Track who showed up to your events." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Present" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-success", children: stats.present || 0 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Late" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-warning", children: stats.late || 0 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Absent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-destructive", children: stats.absent || 0 })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 shadow-card border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search participant…", className: "pl-9" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Export" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Participant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Event" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "gradient-primary text-primary-foreground text-xs", children: r.participant.split(" ").map((s) => s[0]).slice(0, 2).join("") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: r.participant })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: r.event }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: r.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { s: r.status }) })
        ] }, r.id)) })
      ] })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["organizer", "admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AttendanceMgmt, {}) }) });
export {
  SplitComponent as component
};
