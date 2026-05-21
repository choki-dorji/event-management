import { X as jsxRuntimeExports, r as reactExports } from "./server-qdE1tQQu.js";
import { P as ProtectedRoute } from "./ProtectedRoute-DaPVQkRl.js";
import { D as DashboardLayout, z as announcementsApi, p as PageHeader, C as Card, M as Megaphone, r as Badge } from "./router-UDsI4_WY.js";
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
function AnnouncementsPage() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchAnnouncements();
  }, []);
  const fetchAnnouncements = async () => {
    try {
      const res = await announcementsApi.list();
      setItems(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Announcements", description: "All updates from organizers and admins." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 text-center text-muted-foreground", children: "Loading announcements..." }) : items.length > 0 ? items.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 flex items-start gap-4 shadow-card border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: a.priority === "high" ? "destructive" : a.priority === "medium" ? "default" : "secondary", className: "text-[10px]", children: a.priority })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: a.body }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-2", children: [
          a.author || "Organizer",
          " · ",
          a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "Today"
        ] })
      ] })
    ] }, a._id)) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 text-center text-muted-foreground", children: "No announcements available." }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnnouncementsPage, {}) }) });
export {
  SplitComponent as component
};
