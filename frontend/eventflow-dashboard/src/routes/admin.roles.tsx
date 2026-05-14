import { createFileRoute } from "@tanstack/react-router";
import { Shield, Calendar, GraduationCap, Check } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout, PageHeader } from "@/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/admin/roles")({
  component: () => (
    <ProtectedRoute roles={["admin"]}>
      <DashboardLayout><Roles /></DashboardLayout>
    </ProtectedRoute>
  ),
});

const ROLE_DEFS = [
  { id: "admin", label: "Admin", icon: Shield, color: "secondary",
    perms: ["Manage users", "Manage all events", "View analytics", "Role management", "System announcements"] },
  { id: "organizer", label: "Organizer", icon: Calendar, color: "primary",
    perms: ["Create events", "Edit & delete own events", "View registrations", "Mark attendance", "QR scanning", "Post announcements"] },
  { id: "participant", label: "Participant", icon: GraduationCap, color: "accent",
    perms: ["Browse events", "Register for events", "View QR ticket", "Attendance history", "Receive announcements"] },
];

function Roles() {
  return (
    <div className="space-y-6">
      <PageHeader title="Roles & permissions" description="A clear breakdown of what each role can do." />
      <div className="grid md:grid-cols-3 gap-6">
        {ROLE_DEFS.map(r => (
          <Card key={r.id} className="p-6 shadow-card border-border/60">
            <div className={`h-12 w-12 rounded-xl gradient-primary grid place-items-center text-primary-foreground mb-4 shadow-glow`}>
              <r.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">{r.label}</h3>
            <ul className="mt-4 space-y-2">
              {r.perms.map(p => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-success mt-0.5 shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
