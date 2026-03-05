import { Cpu, ShieldCheck, Monitor, Zap, Info } from "lucide-react";

const sections = [
  {
    icon: Cpu,
    title: "Advanced Tool Capabilities",
    color: "border-l-primary",
    bullets: [
      "Developer tools: JSON formatter, Base64 encoder, UUID generator, regex tester, hash generator, and more.",
      "Student tools: GPA calculator, final grade calculator, percentage calculator, Pomodoro timer.",
      "Business tools: Invoice generator, profit margin calculator, VAT calculator, ROI calculator.",
      "Prompt & PDF tools: AI prompt builder, ChatGPT optimizer, image-to-PDF converter, PDF splitter & rotator.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Secure & Privacy-First Processing",
    color: "border-l-green-500",
    bullets: [
      "All tools run directly in your browser — your files and data never leave your device.",
      "No accounts, no sign-ups, no tracking. We don't store or upload anything.",
      "Built with modern web technologies for maximum security without server-side risks.",
    ],
    callout:
      "WinoxTools is designed with a privacy-first philosophy. Every calculation, conversion, and generation happens client-side, so your sensitive data stays yours.",
  },
  {
    icon: Monitor,
    title: "Cross-Platform Compatibility",
    color: "border-l-purple-500",
    bullets: [
      "Fully responsive design — works seamlessly on desktop, tablet, and mobile.",
      "Light and dark mode built in for comfortable use anytime.",
      "No downloads or installs required — just open your browser and start working.",
    ],
  },
  {
    icon: Zap,
    title: "Fast Workflow & Simplicity",
    color: "border-l-amber-500",
    bullets: [
      "Every tool opens instantly with a clean, distraction-free interface.",
      "One-click access from the homepage — search, browse categories, or jump straight to a tool.",
      "New tools are added regularly based on community feedback and emerging needs.",
    ],
  },
];

const SEOSection = () => {
  return (
    <section className="px-4 py-16 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
          Free Online Winox Tools – Your All-in-One Solution!
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          Welcome to WinoxTools — your ultimate destination for free, fast, and powerful online tools designed for developers, students, business professionals, and content creators.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`bg-card rounded-xl border border-border shadow-sm p-6 border-l-4 ${s.color} transition-shadow hover:shadow-md`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                </div>

                <ul className="space-y-2.5 mb-4">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                {s.callout && (
                  <div className="flex gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed">{s.callout}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-muted-foreground text-sm text-center mt-10 max-w-2xl mx-auto leading-relaxed">
          Unlike many online tool platforms, WinoxTools is completely free — no premium plans, no credit card requirements, no trial periods. We believe essential productivity tools should be accessible to everyone, everywhere. Start exploring today — no registration, no downloads, no hassle.
        </p>
      </div>
    </section>
  );
};

export default SEOSection;
