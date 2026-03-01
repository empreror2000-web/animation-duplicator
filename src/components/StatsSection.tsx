const stats = [
  { value: "1m", label: "Active\nUsers" },
  { value: "10m", label: "Files\nConverted" },
  { value: "200+", label: "Online\nTools" },
  { value: "500k", label: "PDFs\nCreated" },
];

const StatsSection = () => {
  return (
    <section className="px-4 py-8">
      <div className="max-w-5xl mx-auto bg-stats-bg rounded-2xl p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              className="text-center md:text-left flex flex-col md:flex-row items-center gap-3 animate-count-up opacity-0"
              style={{ animationDelay: `${i * 150}ms`, animationFillMode: "forwards" }}
            >
              <span className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</span>
              <span className="text-sm text-muted-foreground whitespace-pre-line leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
