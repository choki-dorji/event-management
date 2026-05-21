import { r as reactExports, X as jsxRuntimeExports } from "./server-qdE1tQQu.js";
import { z as announcementsApi, p as PageHeader, O as Dialog, V as DialogTrigger, B as Button, J as Plus, W as DialogContent, X as DialogHeader, Y as DialogTitle, e as Label, I as Input, _ as Textarea, a0 as DialogFooter, C as Card, M as Megaphone, r as Badge, D as DashboardLayout, t as toast } from "./router-UDsI4_WY.js";
import { P as ProtectedRoute } from "./ProtectedRoute-DaPVQkRl.js";
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
function OrgAnnouncements() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnnouncementsManager, { title: "Announcements", description: "Broadcast updates to your event audience." });
}
function AnnouncementsManager({
  title,
  description
}) {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: "",
    message: "",
    priority: "medium"
  });
  reactExports.useEffect(() => {
    fetchAnnouncements();
  }, []);
  const fetchAnnouncements = async () => {
    try {
      const res = await announcementsApi.list();
      console.log(res.data);
      setItems(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    try {
      const res = await announcementsApi.create(form);
      console.log("res", res.data);
      setItems((prev) => [res.data.announcement, ...prev]);
      toast.success("Announcement published");
      setOpen(false);
      setForm({
        title: "",
        message: "",
        priority: "medium"
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to publish announcement");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title, description, actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gradient-primary text-primary-foreground border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "New announcement"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create announcement" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => setForm({
              ...form,
              title: e.target.value
            }), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, value: form.message, onChange: (e) => setForm({
              ...form,
              message: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Priority" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["low", "medium", "high"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setForm({
              ...form,
              priority: p
            }), className: `px-3 py-1.5 rounded-md text-sm capitalize border transition ${form.priority === p ? "gradient-primary text-primary-foreground border-transparent" : "bg-card border-border"}`, children: p }, p)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "gradient-primary text-primary-foreground border-0", children: "Publish" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading announcements..." }) : items.length > 0 ? items.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-5 shadow-card border-border/60 hover:shadow-glow transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold leading-tight", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: a.priority === "high" ? "destructive" : a.priority === "medium" ? "default" : "secondary", className: "text-[10px]", children: a.priority })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: a.body }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-3", children: [
          a.author || "Organizer",
          " · ",
          a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "Today"
        ] })
      ] })
    ] }) }, a._id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "No announcements yet." }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["organizer", "admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrgAnnouncements, {}) }) });
export {
  AnnouncementsManager,
  SplitComponent as component
};
