import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getFeaturedTools, categories } from "@/data/tools";
import { getToolIcon } from "@/lib/iconMap";

const getCategoryColor = (cat: string) => {
  const map: Record<string, string> = {
    dev: "bg-cat-dev/10 text-cat-dev",
    student: "bg-cat-student/10 text-cat-student",
    business: "bg-cat-business/10 text-cat-business",
    prompt: "bg-cat-prompt/10 text-cat-prompt",
    pdf: "bg-cat-pdf/10 text-cat-pdf",
  };
  return map[cat] || "bg-muted text-muted-foreground";
};

const iconBgMap: Record<string, string> = {
  dev: "bg-cat-dev/10",
  student: "bg-cat-student/10",
  business: "bg-cat-business/10",
  prompt: "bg-cat-prompt/10",
  pdf: "bg-cat-pdf/10",
};

const iconColorMap: Record<string, string> = {
  dev: "text-cat-dev",
  student: "text-cat-student",
  business: "text-cat-business",
  prompt: "text-cat-prompt",
  pdf: "text-cat-pdf",
};

const FeaturedTools = () => {
  const navigate = useNavigate();
  const featured = getFeaturedTools();

  return (
    <section className="px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-foreground mb-2">Featured Tools</h2>
        <p className="text-center text-muted-foreground mb-10">Hand-picked tools to get you started</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((tool, i) => {
            const Icon = getToolIcon(tool.icon);
            return (
              <div
                key={tool.slug}
                onClick={() => navigate(tool.route)}
                className="group bg-card rounded-xl p-5 border border-border hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 cursor-pointer animate-fade-up opacity-0 flex flex-col"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${iconBgMap[tool.category] || "bg-muted"}`}>
                    <Icon className={`h-5 w-5 ${iconColorMap[tool.category] || "text-muted-foreground"}`} />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                </div>
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-2 w-fit ${getCategoryColor(tool.category)}`}>
                  {categories[tool.category].label}
                </span>
                <p className="text-sm text-muted-foreground mb-3 flex-1">{tool.description}</p>
                <div className="flex justify-end">
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
                    Open Tool <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
