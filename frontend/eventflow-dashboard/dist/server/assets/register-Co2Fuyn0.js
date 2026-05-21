import { r as reactExports, X as jsxRuntimeExports } from "./server-qdE1tQQu.js";
import { c as createLucideIcon, u as useAuth, a as useNavigate, L as Link, S as Sparkles, C as Card, b as Calendar, d as Shield, e as Label, I as Input, B as Button, t as toast, o as object, s as string } from "./router-UDsI4_WY.js";
import { u as useForm, a, L as LoaderCircle } from "./zod-DxivnlKE.js";
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
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
const schema = object({
  name: string().trim().min(2, "Min 2 characters").max(100),
  email: string().trim().email().max(255),
  password: string().min(6, "Min 6 characters").max(100)
});
const ROLES = [{
  id: "participant",
  label: "Participant",
  desc: "Discover and attend events",
  icon: GraduationCap
}, {
  id: "organizer",
  label: "Organizer",
  desc: "Create and manage events",
  icon: Calendar
}, {
  id: "admin",
  label: "Admin",
  desc: "Oversee the platform",
  icon: Shield
}];
function RegisterPage() {
  const {
    register: registerUser
  } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = reactExports.useState("participant");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: a(schema)
  });
  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const u = await registerUser({
        ...values,
        role
      });
      toast.success(`Welcome, ${u.name.split(" ")[0]}!`);
      navigate({
        to: u.role === "admin" ? "/admin" : u.role === "organizer" ? "/organizer" : "/participant"
      });
    } catch (e) {
      toast.error(e.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center p-6 grid-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 font-semibold text-lg justify-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-xl gradient-primary grid place-items-center shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Eventory" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 sm:p-8 shadow-card border-border/60 glass-strong", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-bold tracking-tight", children: "Create your account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Pick your role and get started in seconds." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6", children: ROLES.map((r) => {
        const active = role === r.id;
        const Icon = r.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setRole(r.id), className: `text-left rounded-xl p-4 border-2 transition-all ${active ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/40"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-9 w-9 rounded-lg grid place-items-center mb-2 ${active ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: r.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: r.desc })
        ] }, r.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", placeholder: "Jane Doe", ...register("name") }),
          errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.name.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", placeholder: "you@example.com", ...register("email") }),
            errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.email.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", placeholder: "••••••••", ...register("password") }),
            errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.password.message })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full gradient-primary text-primary-foreground border-0 shadow-soft", disabled: submitting, children: [
          submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4 mr-2" }),
          "Create account"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-6", children: [
        "Already have an account? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-primary font-medium hover:underline", children: "Sign in" })
      ] })
    ] })
  ] }) });
}
export {
  RegisterPage as component
};
