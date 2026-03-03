import { useNavigate } from "react-router-dom";
import { Code, GraduationCap, Briefcase, Sparkles, FileText, ArrowRight } from "lucide-react";
import { categories, getToolsByCategory, type ToolCategory } from "@/data/tools";

const iconMap: Record<string, any> = { Code, GraduationCap, Briefcase, Sparkles, FileText };
const categoryKeys: ToolCategory[] = ["dev", "student", "business", "prompt", "pdf"];

const bgMap: Record<ToolCategory, string> = {
  dev: "bg-cat-dev",
  student: "bg-cat-student",
  business: "bg-cat-business",
  prompt: "bg-cat-prompt",
  pdf: "bg-cat-pdf",
};

const CategoryCards = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-foreground mb-2">Browse by Category</h2>
        <p className="text-center text-muted-foreground mb-10">Pick a category and explore all available tools</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryKeys.map((key, i) => {
            const cat = categories[key];
            const Icon = iconMap[cat.icon] || FileText;
            const count = getToolsByCategory(key).length;
            return (
              <div
                key={key}
                onClick={() => navigate(cat.route)}
                className={`${bgMap[key]} rounded-2xl p-5 text-white cursor-pointer group hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-2xl animate-fade-up`}
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-medium bg-white/20 text-white rounded-full px-2.5 py-1">
                    {count} tools
                  </span>
                </div>

                <h3 className="font-bold text-base text-white mb-1">{cat.label}</h3>
                <p className="text-xs text-white/80 mb-4">{cat.description}</p>

                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
