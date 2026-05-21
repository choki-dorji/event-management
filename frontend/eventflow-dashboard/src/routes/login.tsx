import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Sparkles, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "Min 6 characters").max(100),
});
type Values = z.infer<typeof schema>;

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({ redirect: (s.redirect as string) || "" }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" });
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Values) => {
    setSubmitting(true);
    try {
      const u = await login(values.email, values.password);
      toast.success(`Welcome back, ${u.name.split(" ")[0]}!`);
      const dest =
        search.redirect ||
        (u.role === "admin" ? "/admin" : u.role === "organizer" ? "/organizer" : "/participant");
      navigate({ to: dest });
    } catch (e: any) {
      toast.error(e.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = (role: "admin" | "organizer" | "participant") => {
    setValue("email", `${role}@demo.com`);
    setValue("password", "demo1234");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between p-12 gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
        <Link to="/" className="relative flex items-center gap-2 font-semibold text-lg">
          <span className="h-9 w-9 rounded-xl bg-white/20 grid place-items-center backdrop-blur">
            <Sparkles className="h-5 w-5" />
          </span>
          Eventory
        </Link>
        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight">"Eventory turned our chaotic check-in into a 5-second tap."</h2>
          <p className="mt-4 text-primary-foreground/80">Gaki, Team Lead</p>
        </div>
        <div className="relative text-sm text-primary-foreground/70">© {new Date().getFullYear()} Eventory</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <span className="h-9 w-9 rounded-xl gradient-primary grid place-items-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="gradient-text font-semibold text-lg">Eventory</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your Eventory account.</p>

          <Card className="mt-8 p-6 shadow-card border-border/60">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPw ? "text" : "password"} placeholder="••••••••" {...register("password")} />
                  <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0 shadow-soft" disabled={submitting}>
                {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <LogIn className="h-4 w-4 mr-2" />}
                Sign in
              </Button>
            </form>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
