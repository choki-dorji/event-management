import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AnnouncementsManager } from "./organizer.announcements";
import { mockAnnouncements } from "@/lib/mockData";

export const Route = createFileRoute("/admin/announcements")({
  component: () => (
    <ProtectedRoute roles={["admin"]}>
      <DashboardLayout>
        <AnnouncementsManager initial={mockAnnouncements} title="System announcements" description="Send platform-wide announcements." />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});
