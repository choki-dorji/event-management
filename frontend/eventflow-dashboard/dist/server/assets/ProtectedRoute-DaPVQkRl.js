import { r as reactExports, X as jsxRuntimeExports } from "./server-qdE1tQQu.js";
import { u as useAuth, a as useNavigate, a2 as useRouterState } from "./router-UDsI4_WY.js";
function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { location } = useRouterState();
  reactExports.useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/login", search: { redirect: location.pathname } });
    } else if (roles && !roles.includes(user.role)) {
      navigate({ to: "/" });
    }
  }, [user, loading, roles, navigate, location.pathname]);
  if (loading || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" }) });
  }
  if (roles && !roles.includes(user.role)) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
export {
  ProtectedRoute as P
};
