import { ReactNode, useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Calendar, Users, Megaphone, QrCode, BarChart3,
  Settings, LogOut, Menu, X, Bell, Search, Sparkles, UserCog, Ticket, ClipboardList, Shield,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface NavItem { to: string; label: string; icon: any; }

const NAV: Record<string, NavItem[]> = {
  participant: [
    { to: "/participant", label: "Overview", icon: LayoutDashboard },
    { to: "/participant/events", label: "Browse Events", icon: Calendar },
    { to: "/participant/my-events", label: "My Events", icon: Ticket },
    { to: "/participant/attendance", label: "Attendance", icon: ClipboardList },
    { to: "/announcements", label: "Announcements", icon: Megaphone },
    { to: "/profile", label: "Profile", icon: UserCog },
  ],
  organizer: [
    { to: "/organizer", label: "Overview", icon: LayoutDashboard },
    { to: "/organizer/events", label: "My Events", icon: Calendar },
    { to: "/organizer/registrations", label: "Registrations", icon: Users },
    { to: "/organizer/attendance", label: "Attendance", icon: ClipboardList },
    { to: "/organizer/scanner", label: "QR Scanner", icon: QrCode },
    { to: "/organizer/announcements", label: "Announcements", icon: Megaphone },
    { to: "/profile", label: "Profile", icon: UserCog },
  ],
  admin: [
    { to: "/admin", label: "Overview", icon: LayoutDashboard },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/events", label: "Events", icon: Calendar },
    { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/admin/roles", label: "Roles", icon: Shield },
    { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
    { to: "/profile", label: "Profile", icon: UserCog },
  ],
};

const ROLE_LABEL: Record<string, string> = {
  admin: "Admin Panel",
  organizer: "Organizer Studio",
  participant: "Participant Hub",
};

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const { location } = useRouterState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!user) return null;
  const items = NAV[user.role] || [];
  const initials = user.name.split(" ").map((s) => s[0]).slice(0, 2).join("");

  const Sidebar = () => (
    <aside className="flex flex-col h-full w-64 bg-sidebar border-r border-sidebar-border">
      <div className="h-16 flex items-center gap-2 px-6 border-b border-sidebar-border">
        <span className="h-9 w-9 rounded-xl gradient-primary grid place-items-center shadow-glow">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </span>
        <div>
          <div className="font-semibold leading-tight gradient-text">Eventory</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{ROLE_LABEL[user.role]}</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const active = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => { logout(); navigate({ to: "/" }); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed inset-y-0 z-30">
        <Sidebar />
      </div>
      {/* Mobile sidebar */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative z-50">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <header className="h-16 sticky top-0 z-20 glass-strong flex items-center gap-3 px-4 sm:px-6">
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-md hover:bg-muted">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events, users…" className="pl-9 bg-muted/50 border-transparent focus-visible:bg-card" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full hover:bg-muted transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium leading-tight">{user.name}</div>
                    <div className="text-[10px] text-muted-foreground capitalize">{user.role}</div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/profile"><UserCog className="h-4 w-4 mr-2" />Profile</Link></DropdownMenuItem>
                <DropdownMenuItem><Settings className="h-4 w-4 mr-2" />Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={() => { logout(); navigate({ to: "/" }); }}>
                  <LogOut className="h-4 w-4 mr-2" />Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title, description, actions, badge,
}: { title: string; description?: string; actions?: ReactNode; badge?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
      <div>
        {badge && <Badge variant="secondary" className="mb-2">{badge}</Badge>}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
