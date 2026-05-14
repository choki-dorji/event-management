import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MoreHorizontal, Trash2, Shield } from "lucide-react";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout, PageHeader } from "@/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { mockUsers } from "@/lib/mockData";

export const Route = createFileRoute("/admin/users")({
  component: () => (
    <ProtectedRoute roles={["admin"]}>
      <DashboardLayout><UsersPage /></DashboardLayout>
    </ProtectedRoute>
  ),
});

const ROLE_COLORS: any = {
  admin: "bg-secondary/15 text-secondary border-secondary/30",
  organizer: "bg-primary/15 text-primary border-primary/30",
  participant: "bg-accent/20 text-accent-foreground border-accent/30",
};

function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [q, setQ] = useState("");
  const filtered = users.filter(u => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()));

  const changeRole = (id: string, role: string) => {
    setUsers(us => us.map(u => u.id === id ? { ...u, role } : u));
    toast.success("Role updated");
  };
  const remove = (id: string) => {
    setUsers(us => us.filter(u => u.id !== id));
    toast.success("User removed");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="User management" description="Manage platform users and their roles." />
      <Card className="p-4 shadow-card border-border/60">
        <div className="relative max-w-sm mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users…" className="pl-9" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(u => (
              <TableRow key={u.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9"><AvatarFallback className="gradient-primary text-primary-foreground text-xs">{u.name.split(" ").map(s => s[0]).slice(0,2).join("")}</AvatarFallback></Avatar>
                    <div>
                      <div className="font-medium text-sm">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell><Badge variant="outline" className={`capitalize ${ROLE_COLORS[u.role]}`}>{u.role}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{u.joined}</TableCell>
                <TableCell><Badge variant={u.status === "active" ? "secondary" : "outline"} className="capitalize">{u.status}</Badge></TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => changeRole(u.id, "admin")}><Shield className="h-4 w-4 mr-2" />Make admin</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changeRole(u.id, "organizer")}><Shield className="h-4 w-4 mr-2" />Make organizer</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changeRole(u.id, "participant")}><Shield className="h-4 w-4 mr-2" />Make participant</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => remove(u.id)}><Trash2 className="h-4 w-4 mr-2" />Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
