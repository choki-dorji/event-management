import { X as jsxRuntimeExports, r as reactExports } from "./server-qdE1tQQu.js";
import { P as ProtectedRoute } from "./ProtectedRoute-DaPVQkRl.js";
import { D as DashboardLayout, u as useAuth, G as registrationsApi, p as PageHeader, B as Button, C as Card, K as Search, I as Input, A as Avatar, q as AvatarFallback, r as Badge } from "./router-UDsI4_WY.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BFo4AkAv.js";
import { D as Download } from "./download-DJNG4myq.js";
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
function Registrations() {
  const [q, setQ] = reactExports.useState("");
  const [rows, setRows] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const {
    user
  } = useAuth();
  reactExports.useEffect(() => {
    fetchRegistrations();
  }, []);
  const fetchRegistrations = async () => {
    try {
      const res = await registrationsApi.all();
      setRows(res.data);
      setRows(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const filtered = reactExports.useMemo(() => {
    return rows.filter((r) => r.user.name.toLowerCase().includes(q.toLowerCase()) || r.user.email.toLowerCase().includes(q.toLowerCase()));
  }, [rows, q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Registrations", description: "Everyone signed up across your events.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 mr-2" }),
      "Export CSV"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 shadow-card border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search participants…", className: "pl-9" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Participant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Event" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 4, className: "text-center py-8", children: "Loading registrations..." }) }) : filtered.length > 0 ? filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "gradient-primary text-primary-foreground text-xs", children: r.user.name.split(" ").map((s) => s[0]).slice(0, 2).join("") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm", children: r.user.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: r.user.email })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: r.event.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: new Date(r.event.date).toLocaleDateString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: r.attendanceStatus ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20", children: r.attendanceStatus ? "confirmed" : "pending" }) })
        ] }, r._id)) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 4, className: "text-center py-8 text-muted-foreground", children: "No registrations found." }) }) })
      ] })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["organizer", "admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Registrations, {}) }) });
export {
  SplitComponent as component
};
