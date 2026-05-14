import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { MockEvent } from "@/lib/mockData";

export function EventCard({ event, to }: { event: MockEvent; to?: string }) {
  const pct = Math.round((event.registered / event.capacity) * 100);
  const href = to || `/events/${event.id}`;
  return (
    <Link to={href as any} params={{ eventId: event.id } as any} className="group block">
      <Card className="overflow-hidden border-border/60 shadow-card hover:shadow-glow transition-all hover:-translate-y-1 h-full">
        <div className="relative h-44 overflow-hidden">
          <img
            src={event.image || "https://placehold.co/300x300"}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-sm border-0">
            {event.category}
          </Badge>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">{event.title}</h3>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{event.date}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{event.venue.split(",")[0]}</span>
            <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{event.registered}/{event.capacity}</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full gradient-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
