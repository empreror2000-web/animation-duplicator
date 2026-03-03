import { Shield, Zap, UserX, Globe } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "100% Free Online",
    description: "All tools are completely free to use with no hidden charges, subscriptions, or premium tiers. Use as much as you want.",
  },
  {
    icon: UserX,
    title: "No Registration Needed",
    description: "Jump right in — no sign-up, no email verification, no accounts. Just open a tool and start using it instantly.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data stays in your browser. We don't upload, store, or share any files or information you use with our tools.",
  },
  {
    icon: Zap,
    title: "Fast & Easy",
    description: "Lightweight, browser-based tools that load instantly. No software to install, no waiting — just results.",
  },
];

const WhyChoose = () => {
  return (
    <section className="px-4 py-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-3">
          Why Choose Winox Tools?
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Built for speed, privacy, and simplicity — here's why thousands of users trust WinoxTools every day.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
