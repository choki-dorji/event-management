import { r as reactExports, X as jsxRuntimeExports } from "./server-qdE1tQQu.js";
import { c as createLucideIcon, u as useAuth, a as useNavigate, w as useSearch, L as Link, S as Sparkles, C as Card, e as Label, I as Input, B as Button, o as object, s as string, t as toast } from "./router-UDsI4_WY.js";
import { u as useForm, a, L as LoaderCircle } from "./zod-DxivnlKE.js";
import { L as LogIn } from "./log-in-D5Dopfht.js";
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
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode);
const schema = object({
  email: string().trim().email("Invalid email").max(255),
  password: string().min(6, "Min 6 characters").max(100)
});
function LoginPage() {
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({
    from: "/login"
  });
  const [showPw, setShowPw] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    setValue
  } = useForm({
    resolver: a(schema)
  });
  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const u = await login(values.email, values.password);
      toast.success(`Welcome back, ${u.name.split(" ")[0]}!`);
      const dest = search.redirect || (u.role === "admin" ? "/admin" : u.role === "organizer" ? "/organizer" : "/participant");
      navigate({
        to: dest
      });
    } catch (e) {
      toast.error(e.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen grid lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden lg:flex flex-col justify-between p-12 gradient-hero text-primary-foreground overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "relative flex items-center gap-2 font-semibold text-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-xl bg-white/20 grid place-items-center backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }) }),
        "Eventory"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-bold leading-tight", children: '"Eventory turned our chaotic check-in into a 5-second tap."' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-primary-foreground/80", children: "— Olivia, Cultural Committee Lead" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-sm text-primary-foreground/70", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Eventory"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-6 sm:p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden flex items-center gap-2 mb-8 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-xl gradient-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text font-semibold text-lg", children: "Eventory" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Welcome back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Sign in to your Eventory account." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-8 p-6 shadow-card border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", placeholder: "you@example.com", ...register("email") }),
          errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.email.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: showPw ? "text" : "password", placeholder: "••••••••", ...register("password") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPw((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground", children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
          ] }),
          errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.password.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full gradient-primary text-primary-foreground border-0 shadow-soft", disabled: submitting, children: [
          submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4 mr-2" }),
          "Sign in"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-6", children: [
        "Don't have an account? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "text-primary font-medium hover:underline", children: "Sign up" })
      ] })
    ] }) })
  ] });
}
export {
  LoginPage as component
};
