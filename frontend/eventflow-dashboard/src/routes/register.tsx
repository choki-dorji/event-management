import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Sparkles, UserPlus, GraduationCap, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth, Role } from "@/context/AuthContext";

const schema = z.object({
  name: z.string().trim().min(2, "Min 2 characters").max(100),
  email: z.string().trim().email().max(255),
  password: z.string().min(6, "Min 6 characters").max(100),
});
type Values = z.infer<typeof schema>;

export const Route = createFileRoute("/register")({ component: RegisterPage });

const ROLES: { id: Role; label: string; desc: string; icon: any }[] = [
  { id: "participant", label: "Participant", desc: "Discover and attend events", icon: GraduationCap },
  { id: "organizer", label: "Organizer", desc: "Create and manage events", icon: Calendar },
  { id: "admin", label: "Admin", desc: "Oversee the platform", icon: Shield },
];

function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("participant");
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Values) => {
    setSubmitting(true);
    try {
      const u = await registerUser({ ...values, role });
      toast.success(`Welcome, ${u.name.split(" ")[0]}!`);
      navigate({ to: u.role === "admin" ? "/admin" : u.role === "organizer" ? "/organizer" : "/participant" });
    } catch (e: any) {
      toast.error(e.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 grid-bg">
      <div className="w-full max-w-2xl">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg justify-center mb-8">
          <span className="h-9 w-9 rounded-xl gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="gradient-text">Eventory</span>
        </Link>

        <Card className="p-6 sm:p-8 shadow-card border-border/60 glass-strong">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="text-muted-foreground mt-1">Pick your role and get started in seconds.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {ROLES.map((r) => {
              const active = role === r.id;
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`text-left rounded-xl p-4 border-2 transition-all ${
                    active
                      ? "border-primary bg-primary/5 shadow-soft"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className={`h-9 w-9 rounded-lg grid place-items-center mb-2 ${
                    active ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="font-semibold text-sm">{r.label}</div>
                  <div className="text-xs text-muted-foreground">{r.desc}</div>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Jane Doe" {...register("name")} />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
                {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0 shadow-soft" disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <UserPlus className="h-4 w-4 mr-2" />}
              Create account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
