import { createFileRoute } from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import { ProtectedRoute } from "@/components/ProtectedRoute";

import {
  DashboardLayout,
  PageHeader,
} from "@/layouts/DashboardLayout";

import { Card } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { registrationsApi } from "@/services/api";


export const Route =
  createFileRoute(
    "/participant/attendance"
  )({
    component: () => (
      <ProtectedRoute
        roles={[
          "participant",
          "admin",
        ]}
      >
        <DashboardLayout>
          <AttendanceHistory />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  });


interface AttendanceType {
  _id: string;

  attendanceStatus: boolean;

  createdAt: string;

  event: {
    _id: string;
    title: string;
    date: string;
    venue: string;
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

      {attended
        ? "present"
        : "absent"}

    </Badge>
  );
}


function AttendanceHistory() {

  const [history, setHistory] =
    useState<
      AttendanceType[]
    >([]);

  const [loading, setLoading] =
    useState(true);


  // FETCH ATTENDANCE
  useEffect(() => {

    fetchHistory();

  }, []);


  const fetchHistory =
    async () => {

      try {

        const res =
          await registrationsApi.myEvents();

        setHistory(res.data);

      } catch (error) {

        console.log(
          "Failed to fetch attendance history",
          error
        );

      } finally {

        setLoading(false);
      }
    };


  return (

    <div className="space-y-6">

      <PageHeader
        title="Attendance history"

        description="A complete log of every event you've attended."
      />


      <Card className="shadow-card border-border/60 overflow-hidden">

        <Table>

          <TableHeader>

            <TableRow>

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

            ) : history.length > 0 ? (

              history.map((h) => (

                <TableRow key={h._id}>

                  {/* EVENT */}
                  <TableCell className="font-medium">

                    {h.event.title}

                  </TableCell>


                  {/* DATE */}
                  <TableCell className="text-muted-foreground">

                    {new Date(
                      h.event.date
                    ).toLocaleDateString()}

                  </TableCell>


                  {/* VENUE */}
                  <TableCell className="text-muted-foreground">

                    {h.event.venue}

                  </TableCell>


                  {/* STATUS */}
                  <TableCell className="text-right">

                    <StatusBadge
                      attended={
                        h.attendanceStatus
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