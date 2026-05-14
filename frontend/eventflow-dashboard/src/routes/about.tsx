import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Target, Heart, Zap } from "lucide-react";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="secondary" className="mb-4"><Sparkles className="h-3.5 w-3.5 mr-1.5" /> Our story</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Built for the way modern teams gather</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Eventory was created to remove the friction between planning, promoting and actually
            running events. Whether you're a 30-person club or a 5,000-student campus — we make
            attendance effortless.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Our mission", body: "Make every event measurable, every check-in effortless." },
            { icon: Heart, title: "Our values", body: "Craft, simplicity, and respect for everyone's time." },
            { icon: Zap, title: "Built different", body: "Modern stack, beautiful UI, and zero learning curve." },
          ].map((b, i) => (
            <div key={i} className="glass rounded-2xl p-6">
              <div className="h-11 w-11 rounded-xl gradient-primary grid place-items-center text-primary-foreground mb-4">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{b.body}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Back to home</Link>
      </footer>
    </div>
  );
}
