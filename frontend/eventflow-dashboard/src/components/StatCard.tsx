import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export function StatCard({
  label, value, icon: Icon, trend, gradient,
}: {
  label: string; value: string | number; icon: LucideIcon;
  trend?: string; gradient?: boolean;
}) {
  return (
    <Card className="overflow-hidden border-border/60 shadow-card hover:shadow-glow transition-all hover:-translate-y-0.5">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
            {trend && <p className="mt-1 text-xs text-success font-medium">{trend}</p>}
          </div>
          <div className={`h-11 w-11 shrink-0 rounded-xl grid place-items-center ${
            gradient ? "gradient-primary text-primary-foreground shadow-glow" : "bg-primary/10 text-primary"
          }`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SectionCard({ title, description, action, children }: {
  title: string; description?: string; action?: ReactNode; children: ReactNode;
}) {
  return (
    <Card className="shadow-card border-border/60">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4 gap-4">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {action}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
