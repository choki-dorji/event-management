import { X as jsxRuntimeExports } from "./server-qdE1tQQu.js";
import { u as useAuth, a2 as useRouterState, L as Link, S as Sparkles, B as Button, b as Calendar } from "./router-UDsI4_WY.js";
import { L as LogIn } from "./log-in-D5Dopfht.js";
function PublicNavbar() {
  const { user } = useAuth();
  const { location } = useRouterState();
  const links = [
    { to: "/", label: "Home" },
    { to: "/events", label: "Events" },
    { to: "/about", label: "About" }
  ];
  const dashHref = user?.role === "admin" ? "/admin" : user?.role === "organizer" ? "/organizer" : "/participant";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 glass-strong", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 font-semibold text-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-xl gradient-primary grid place-items-center shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Eventory" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-1", children: links.map((l) => {
      const active = location.pathname === l.to;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: l.to,
          className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
          children: l.label
        },
        l.to
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gradient-primary text-primary-foreground border-0 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: dashHref, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 mr-2" }),
      "Dashboard"
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", asChild: true, className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4 mr-2" }),
        "Sign in"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gradient-primary text-primary-foreground border-0 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: "Get started" }) })
    ] }) })
  ] }) });
}
export {
  PublicNavbar as P
};
