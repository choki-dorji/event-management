import { createFileRoute } from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  MoreHorizontal,
  Trash2,
  Shield,
} from "lucide-react";

import { toast } from "sonner";

import { ProtectedRoute } from "@/components/ProtectedRoute";

import {
  DashboardLayout,
  PageHeader,
} from "@/layouts/DashboardLayout";

import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authApi } from "@/services/api";

export const Route =
  createFileRoute(
    "/admin/users"
  )({
    component: () => (
      <ProtectedRoute
        roles={["admin"]}
      >
        <DashboardLayout>
          <UsersPage />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  });

const ROLE_COLORS: any = {
  admin:
    "bg-secondary/15 text-secondary border-secondary/30",

  organizer:
    "bg-primary/15 text-primary border-primary/30",

  participant:
    "bg-accent/20 text-accent-foreground border-accent/30",
};

interface UserType {
  _id: string;

  name: string;

  email: string;

  role: string;

  createdAt: string;
}

function UsersPage() {

  const [users, setUsers] =
    useState<UserType[]>([]);

  const [q, setQ] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers =
    async () => {

      try {
        const res =
          await authApi.getAllUsers();

        console.log(
          "Users:",
          res.data
        );

        setUsers(
          res.data || []
        );

      } catch (error) {

        console.log(
          "Failed to fetch users",
          error
        );

        toast.error(
          "Failed to load users"
        );

      } finally {

        setLoading(false);
      }
    };

  const filtered =
    users.filter(
      (u) =>
        u.name
          .toLowerCase()
          .includes(
            q.toLowerCase()
          ) ||
        u.email
          .toLowerCase()
          .includes(
            q.toLowerCase()
          )
    );

  const changeRole =
    async (
      id: string,
      role: string
    ) => {

      try {

        await authApi.updateUserRole(
          id,
          role
        );

        setUsers((us) =>
          us.map((u) =>
            u._id === id
              ? {
                  ...u,
                  role,
                }
              : u
          )
        );

        toast.success(
          "Role updated"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to update role"
        );
      }
    };

  const remove =
    async (id: string) => {

      try {

        await authApi.deleteUser(id);

        setUsers((us) =>
          us.filter(
            (u) => u._id !== id
          )
        );

        toast.success(
          "User removed"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to remove user"
        );
      }
    };

  return (
    <div className="space-y-6">

      <PageHeader
        title="User management"
        description="Manage platform users and their roles."
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
            placeholder="Search users..."
            className="pl-9"
          />

        </div>

        {/* TABLE */}
        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>
                User
              </TableHead>

              <TableHead>
                Role
              </TableHead>

              <TableHead>
                Joined
              </TableHead>

              <TableHead className="text-right">
                Actions
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

                  Loading users...

                </TableCell>

              </TableRow>

            ) : filtered.length >
              0 ? (

              filtered.map((u) => (

                <TableRow
                  key={u._id}
                >

                  {/* USER */}
                  <TableCell>

                    <div className="flex items-center gap-3">

                      <Avatar className="h-9 w-9">

                        <AvatarFallback className="gradient-primary text-primary-foreground text-xs">

                          {u.name
                            .split(" ")
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
                            )}

                        </AvatarFallback>

                      </Avatar>

                      <div>

                        <div className="font-medium text-sm">

                          {u.name}

                        </div>

                        <div className="text-xs text-muted-foreground">

                          {u.email}

                        </div>

                      </div>

                    </div>

                  </TableCell>

                  {/* ROLE */}
                  <TableCell>

                    <Badge
                      variant="outline"
                      className={`capitalize ${ROLE_COLORS[u.role]}`}
                    >

                      {u.role}

                    </Badge>

                  </TableCell>

                  {/* JOINED */}
                  <TableCell className="text-sm text-muted-foreground">

                    {new Date(
                      u.createdAt
                    ).toLocaleDateString()}

                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell className="text-right">

                    <DropdownMenu>

                      <DropdownMenuTrigger asChild>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >

                          <MoreHorizontal className="h-4 w-4" />

                        </Button>

                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">

                        <DropdownMenuItem
                          onClick={() =>
                            changeRole(
                              u._id,
                              "admin"
                            )
                          }
                        >

                          <Shield className="h-4 w-4 mr-2" />

                          Make admin

                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() =>
                            changeRole(
                              u._id,
                              "organizer"
                            )
                          }
                        >

                          <Shield className="h-4 w-4 mr-2" />

                          Make organizer

                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() =>
                            changeRole(
                              u._id,
                              "participant"
                            )
                          }
                        >

                          <Shield className="h-4 w-4 mr-2" />

                          Make participant

                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() =>
                            remove(
                              u._id
                            )
                          }
                        >

                          <Trash2 className="h-4 w-4 mr-2" />

                          Remove

                        </DropdownMenuItem>

                      </DropdownMenuContent>

                    </DropdownMenu>

                  </TableCell>

                </TableRow>
              ))

            ) : (

              <TableRow>

                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >

                  No users found.

                </TableCell>

              </TableRow>
            )}

          </TableBody>

        </Table>

      </Card>

    </div>
  );
}