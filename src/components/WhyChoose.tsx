import { Shield, Zap, Layers, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast & Easy",
    description: "Run tools instantly in your browser with a clean workflow.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Privacy-first tools designed to protect your data.",
  },
  {
    icon: Layers,
    title: "All-in-One",
    description: "Dev, Student, Business, Prompt, PDF tools in one place.",
  },
  {
    icon: Globe,
    title: "100% Free Online",
    description: "No registration, no installs, use anywhere.",
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
