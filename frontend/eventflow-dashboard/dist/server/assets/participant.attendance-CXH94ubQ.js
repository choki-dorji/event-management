import { X as jsxRuntimeExports, r as reactExports } from "./server-qdE1tQQu.js";
import { P as ProtectedRoute } from "./ProtectedRoute-DaPVQkRl.js";
import { D as DashboardLayout, G as registrationsApi, p as PageHeader, C as Card, r as Badge } from "./router-UDsI4_WY.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BFo4AkAv.js";
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
function StatusBadge({
  attended
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: attended ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20", children: attended ? "present" : "absent" });
}
function AttendanceHistory() {
  const [history, setHistory] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    try {
      const res = await registrationsApi.myEvents();
      setHistory(res.data);
    } catch (error) {
      console.log("Failed to fetch attendance history", error);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Attendance history", description: "A complete log of every event you've attended." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card border-border/60 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Venue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 4, className: "text-center py-8", children: "Loading attendance..." }) }) : history.length > 0 ? history.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: h.event.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: new Date(h.event.date).toLocaleDateString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: h.event.venue }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { attended: h.attendanceStatus }) })
      ] }, h._id)) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 4, className: "text-center py-8 text-muted-foreground", children: "No attendance records found." }) }) })
    ] }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["participant", "admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AttendanceHistory, {}) }) });
export {
  SplitComponent as component
};
