import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  Search,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

import { ProtectedRoute } from "@/components/ProtectedRoute";

import {
  DashboardLayout,
  PageHeader,
} from "@/layouts/DashboardLayout";

import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { attendanceApi } from "@/services/api";

export const Route =
  createFileRoute(
    "/organizer/attendance"
  )({
    component: () => (
      <ProtectedRoute
        roles={["organizer", "admin"]}
      >
        <DashboardLayout>
          <AttendanceMgmt />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  });

interface AttendanceType {
  _id: string;

  attendanceStatus: boolean;

  createdAt: string;

  participant: {
    _id: string;
    name: string;
    email: string;
  };

  event: {
    _id: string;
    title: string;
    date: string;
  };
}

function StatusBadge({
  attended,
}: {
  attended: boolean;
}) {
  return (
    <Badge
      variant="outline"
      className={
        attended
          ? "bg-success/10 text-success border-success/20"
          : "bg-destructive/10 text-destructive border-destructive/20"
      }
    >
      {attended ? (
        <>
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Present
        </>
      ) : (
        <>
          <XCircle className="h-3 w-3 mr-1" />
          Absent
        </>
      )}
    </Badge>
  );
}

function AttendanceMgmt() {
  const [q, setQ] =
    useState("");

  const [attendance, setAttendance] =
    useState<AttendanceType[]>(
      []
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance =
    async () => {
      try {
        const res =
await attendanceApi.getOrganizerAttendance();
        console.log(
          "Attendance:",
          res.data
        );
        console.log(
          "Raw response:",
          res.data
        );

        setAttendance(
          res.data || []
        );
      } catch (error) {
        console.log(
          "Failed to fetch attendance",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  const filtered =
    attendance.filter((r) =>
      r.user?.name
        ?.toLowerCase()
        .includes(q.toLowerCase())
    );

  const stats =
    attendance.reduce(
      (a, r) => {
        const status =
          r.attendanceStatus;

        a[status] =
          (a[status] || 0) + 1;

        return a;
      },
      {} as Record<
        string,
        number
      >
    );

    console.log("Stats:", stats);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance Management"
        description="Track who showed up to your events."
      />

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">
            Present
          </div>

          <div className="text-2xl font-bold text-success">
            {stats.true || 0}
          </div>
        </Card>



        <Card className="p-4">
          <div className="text-xs text-muted-foreground">
            Absent
          </div>

          <div className="text-2xl font-bold text-destructive">
            {stats.false || 0}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">
            Total Registered
          </div>

          <div className="text-2xl font-bold text-warning">
            {stats.true + stats.false || 0}
          </div>
        </Card>
      </div>

      {/* TABLE */}
      <Card className="p-4 shadow-card border-border/60">
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              value={q}
              onChange={(e) =>
                setQ(e.target.value)
              }
              placeholder="Search participant..."
              className="pl-9"
            />
          </div>

          <Button variant="outline">
            Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Participant
              </TableHead>

              <TableHead>
                Event
              </TableHead>

              <TableHead>
                Date
              </TableHead>
                <TableHead>
                Venue
              </TableHead>

              <TableHead className="text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8"
                >
                  Loading attendance...
                </TableCell>
              </TableRow>
            ) : filtered.length >
              0 ? (
              filtered.map((r) => (
                <TableRow
                  key={r._id}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="gradient-primary text-primary-foreground text-xs">
                          {r.user?.name
                            ?.split(" ")
                            .map(
                              (
                                s
                              ) =>
                                s[0]
                            )
                            .slice(
                              0,
                              2
                            )
                            .join(
                              ""
                            ) || "NA"}
                        </AvatarFallback>
                      </Avatar>

                      <span className="font-medium text-sm">
                        {
                          r
                            .user
                            ?.name
                        }
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">
                    {
                      r.event
                        ?.title
                    }
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(
                      r.event?.date
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {
                      r.event?.venue
                    }
                  </TableCell>

                  <TableCell className="text-right">
                    <StatusBadge
                      attended={
                        r.attendanceStatus
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >
                  No attendance records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}