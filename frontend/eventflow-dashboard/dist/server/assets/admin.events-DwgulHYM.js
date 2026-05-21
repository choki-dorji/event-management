import { X as jsxRuntimeExports } from "./server-qdE1tQQu.js";
import { P as ProtectedRoute } from "./ProtectedRoute-DaPVQkRl.js";
import { D as DashboardLayout, p as PageHeader } from "./router-UDsI4_WY.js";
import { E as EventCard } from "./EventCard-BBvdwrJf.js";
import { m as mockEvents } from "./mockData-CMg32f5D.js";
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
import "./map-pin-CphTOovu.js";
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { roles: ["admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "All events", description: "Every event across the platform." }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: mockEvents.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventCard, { event: e }, e.id)) })
] }) }) });
export {
  SplitComponent as component
};
