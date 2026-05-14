import { createFileRoute } from "@tanstack/react-router";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Download,
} from "lucide-react";

import { ProtectedRoute } from "@/components/ProtectedRoute";

import {
  DashboardLayout,
  PageHeader,
} from "@/layouts/DashboardLayout";

import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { attendanceApi, registrationsApi } from "@/services/api";

import { useAuth } from "@/context/AuthContext";


export const Route =
  createFileRoute(
    "/organizer/registrations"
  )({
    component: () => (
      <ProtectedRoute
        roles={[
          "organizer",
          "admin",
        ]}
      >
        <DashboardLayout>
          <Registrations />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  });


interface RegistrationType {
  _id: string;

  attendanceStatus: boolean;

  user: {
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


function Registrations() {

  const [q, setQ] =
    useState("");

  const [rows, setRows] =
    useState<
      RegistrationType[]
    >([]);

  const [loading, setLoading] =
    useState(true);

  const { user } = useAuth();


  useEffect(() => {

    fetchRegistrations();

  }, []);


  const fetchRegistrations =
    async () => {

      try {

        // TEMP:
        // fetch all events registrations

        const res = await registrationsApi.all();

      setRows(res.data);
        setRows(res.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  const filtered =
    useMemo(() => {
      return rows.filter((r) =>

        r.user.name
          .toLowerCase()
          .includes(
            q.toLowerCase()
          ) ||

        r.user.email
          .toLowerCase()
          .includes(
            q.toLowerCase()
          )
      );

    }, [rows, q]);


  return (

    <div className="space-y-6">

      <PageHeader
        title="Registrations"

        description="Everyone signed up across your events."

        actions={
          <Button variant="outline">

            <Download className="h-4 w-4 mr-2" />

            Export CSV

          </Button>
        }
      />


      <Card className="p-4 shadow-card border-border/60">

        {/* SEARCH */}
        <div className="relative max-w-sm mb-4">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            value={q}

            onChange={(e) =>
              setQ(
                e.target.value
              )
            }

            placeholder="Search participants…"

            className="pl-9"
          />
        </div>


        {/* TABLE */}
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

                  Loading registrations...

                </TableCell>

              </TableRow>

            ) : filtered.length > 0 ? (

              filtered.map((r) => (

                <TableRow key={r._id}>

                  {/* USER */}
                  <TableCell>

                    <div className="flex items-center gap-3">

                      <Avatar className="h-8 w-8">

                        <AvatarFallback className="gradient-primary text-primary-foreground text-xs">

                          {r.user.name
                            .split(" ")
                            .map(
                              (s) => s[0]
                            )
                            .slice(0, 2)
                            .join("")}

                        </AvatarFallback>

                      </Avatar>


                      <div>

                        <div className="font-medium text-sm">

                          {r.user.name}

                        </div>

                        <div className="text-xs text-muted-foreground">

                          {r.user.email}

                        </div>

                      </div>
                    </div>
                  </TableCell>


                  {/* EVENT */}
                  <TableCell className="text-sm">

                    {r.event.title}

                  </TableCell>


                  {/* DATE */}
                  <TableCell className="text-sm text-muted-foreground">

                    {new Date(
                      r.event.date
                    ).toLocaleDateString()}

                  </TableCell>


                  {/* STATUS */}
                  <TableCell className="text-right">

                    <Badge
                      variant="outline"

                      className={
                        r.attendanceStatus

                          ? "bg-success/10 text-success border-success/20"

                          : "bg-warning/10 text-warning border-warning/20"
                      }
                    >

                      {r.attendanceStatus
                        ? "confirmed"
                        : "pending"}

                    </Badge>

                  </TableCell>

                </TableRow>
              ))

            ) : (

              <TableRow>

                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >

                  No registrations found.

                </TableCell>

              </TableRow>
            )}

          </TableBody>
        </Table>
      </Card>
    </div>
  );
}