import { X as jsxRuntimeExports, r as reactExports } from "./server-qdE1tQQu.js";
import { c as createLucideIcon, D as DashboardLayout, p as PageHeader, C as Card, K as Search, I as Input, A as Avatar, q as AvatarFallback, r as Badge, a3 as DropdownMenu, a4 as DropdownMenuTrigger, B as Button, a5 as DropdownMenuContent, a6 as DropdownMenuItem, d as Shield, t as toast } from "./router-UDsI4_WY.js";
import { P as ProtectedRoute } from "./ProtectedRoute-DaPVQkRl.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BFo4AkAv.js";
import { c as mockUsers } from "./mockData-CMg32f5D.js";
import { T as Trash2 } from "./trash-2-CXZ4O33x.js";
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
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
const Ellipsis = createLucideIcon("ellipsis", __iconNode);
const ROLE_COLORS = {
  admin: "bg-secondary/15 text-secondary border-secondary/30",
  organizer: "bg-primary/15 text-primary border-primary/30",
  participant: "bg-accent/20 text-accent-foreground border-accent/30"
};
function UsersPage() {
  const [users, setUsers] = reactExports.useState(mockUsers);
  const [q, setQ] = reactExports.useState("");
  const filtered = users.filter((u) => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()));
  const changeRole = (id, role) => {
    setUsers((us) => us.map((u) => u.id === id ? {
      ...u,
      role
    } : u));
    toast.success("Role updated");
  };
  const remove = (id) => {
    setUsers((us) => us.filter((u) => u.id !== id));
    toast.success("User removed");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "User management", description: "Manage platform users and their roles." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 shadow-card border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search users…", className: "pl-9" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Joined" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-9 w-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "gradient-primary text-primary-foreground text-xs", children: u.name.split(" ").map((s) => s[0]).slice(0, 2).join("") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm", children: u.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: u.email })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `capitalize ${ROLE_COLORS[u.role]}`, children: u.role }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: u.joined }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: u.status === "active" ? "secondary" : "outline", className: "capitalize", children: u.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => changeRole(u.id, "admin"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 mr-2" }),
                "Make admin"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => changeRole(u.id, "organizer"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 mr-2" }),
                "Make organizer"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => changeRole(u.id, "participant"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 mr-2" }),
                "Make participant"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-destructive", onClick: () => remove(u.id), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
                "Remove"
              ] })
            ] })
          ] }) })
        ] }, u.id)) })
      ] })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsersPage, {}) }) });
export {
  SplitComponent as component
};
