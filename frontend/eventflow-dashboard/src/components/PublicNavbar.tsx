import { Link, useRouterState } from "@tanstack/react-router";
import { Calendar, Sparkles, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export function PublicNavbar() {
  const { user } = useAuth();
  const { location } = useRouterState();

  const links = [
    { to: "/", label: "Home" },
    { to: "/events", label: "Events" },
    { to: "/about", label: "About" },
  ];

  const dashHref =
    user?.role === "admin" ? "/admin" : user?.role === "organizer" ? "/organizer" : "/participant";

  return (
    <header className="sticky top-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <span className="h-9 w-9 rounded-xl gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="gradient-text">Eventory</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <Button asChild className="gradient-primary text-primary-foreground border-0 shadow-soft">
              <Link to={dashHref}><Calendar className="h-4 w-4 mr-2" />Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link to="/login"><LogIn className="h-4 w-4 mr-2" />Sign in</Link>
              </Button>
              <Button asChild className="gradient-primary text-primary-foreground border-0 shadow-soft">
                <Link to="/register">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
