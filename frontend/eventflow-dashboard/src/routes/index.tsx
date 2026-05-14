import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck2, QrCode, BarChart3, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PublicNavbar } from "@/components/PublicNavbar";
import { EventCard } from "@/components/EventCard";
import { mockEvents } from "@/lib/mockData";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const featured = mockEvents.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-80 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-5 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" /> New: QR-based instant check-in
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Run unforgettable events with <span className="gradient-text">zero friction</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Eventory is a modern event management & attendance platform for universities and teams.
              Plan, promote, register and check in — all in one beautifully crafted dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground border-0 shadow-glow">
                <Link to="/register">Start free <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-card/60 backdrop-blur">
                <Link to="/events">Browse events</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success" /> Role-based access</span>
              <span className="inline-flex items-center gap-2"><QrCode className="h-4 w-4 text-secondary" /> QR check-in</span>
              <span className="inline-flex items-center gap-2"><BarChart3 className="h-4 w-4 text-accent" /> Real-time analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* About / Features */}
      <section id="about" className="py-20 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-3">Why Eventory</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Everything you need, nothing you don't</h2>
            <p className="mt-4 text-muted-foreground">
              Three roles. One platform. Built for the way modern teams organize and attend events.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: CalendarCheck2, title: "Event lifecycle", body: "Create, publish, edit and manage events with capacity, venue, and rich details." },
              { icon: Users, title: "Registrations", body: "Participants register in one tap and receive a QR ticket instantly." },
              { icon: QrCode, title: "QR Attendance", body: "Organizers scan QR codes for instant, contactless check-in at the door." },
              { icon: BarChart3, title: "Analytics", body: "Beautiful charts for attendance trends, top events, and engagement." },
              { icon: Megaphone, title: "Announcements", body: "Push platform-wide or event-specific updates to your audience." },
              { icon: ShieldCheck, title: "Roles & access", body: "Admin, organizer and participant roles with protected routes and JWT auth." },
            ].map((f, i) => (
              <div key={i} className="glass rounded-2xl p-6 hover:shadow-glow transition-all hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl gradient-primary grid place-items-center text-primary-foreground shadow-soft mb-4">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured events */}
      <section className="py-20 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <Badge variant="outline" className="mb-3">Featured events</Badge>
              <h2 className="text-3xl font-bold tracking-tight">Don't miss what's next</h2>
            </div>
            <Button asChild variant="outline"><Link to="/events">View all <ArrowRight className="h-4 w-4 ml-2" /></Link></Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl gradient-hero p-10 sm:p-16 text-center shadow-glow">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground tracking-tight">
                Ready to host your next event?
              </h2>
              <p className="mt-3 text-primary-foreground/85 max-w-xl mx-auto">
                Join Eventory today and turn registrations into real attendance with zero hassle.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Button asChild size="lg" variant="secondary" className="bg-card text-foreground hover:bg-card/90">
                  <Link to="/register">Create free account</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/login">Sign in</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-lg gradient-primary grid place-items-center">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </span>
            <span className="font-medium gradient-text">Eventory</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-5">
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/events" className="hover:text-foreground">Events</Link>
            <Link to="/login" className="hover:text-foreground">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Megaphone } from "lucide-react";
