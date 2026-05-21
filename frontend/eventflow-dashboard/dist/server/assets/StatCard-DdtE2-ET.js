import { X as jsxRuntimeExports } from "./server-qdE1tQQu.js";
import { C as Card, ab as CardContent } from "./router-UDsI4_WY.js";
function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  gradient
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden border-border/60 shadow-card hover:shadow-glow transition-all hover:-translate-y-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-3xl font-bold tracking-tight", children: value }),
      trend && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-success font-medium", children: trend })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-11 w-11 shrink-0 rounded-xl grid place-items-center ${gradient ? "gradient-primary text-primary-foreground shadow-glow" : "bg-primary/10 text-primary"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) })
  ] }) }) });
}
function SectionCard({ title, description, action, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: description })
      ] }),
      action
    ] }),
    children
  ] }) });
}
export {
  StatCard as S,
  SectionCard as a
};
