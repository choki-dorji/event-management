import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout, PageHeader } from "@/layouts/DashboardLayout";
import { EventCard } from "@/components/EventCard";
import { mockEvents } from "@/lib/mockData";

export const Route = createFileRoute("/admin/events")({
  component: () => (
    <ProtectedRoute roles={["admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <PageHeader title="All events" description="Every event across the platform." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  ),
});
