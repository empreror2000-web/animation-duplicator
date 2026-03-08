import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, getToolsByCategory, type ToolCategory } from "@/data/tools";
import { getToolIcon } from "@/lib/iconMap";
import { getCategories } from "@/admin/store";
const bgMap: Record<ToolCategory, string> = {
  dev: "bg-cat-dev",
  student: "bg-cat-student",
  business: "bg-cat-business",
  prompt: "bg-cat-prompt",
  pdf: "bg-cat-pdf",
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

interface CategoryPageProps {
  category: ToolCategory;
}

const CategoryPage = ({ category }: CategoryPageProps) => {
  const navigate = useNavigate();
  const cat = categories[category];
  const catTools = getToolsByCategory(category);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className={`${bgMap[category]} text-primary-foreground py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{cat.label}</h1>
          <p className="text-lg opacity-90">{cat.description} — {catTools.length} tools available</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {catTools.map((tool, i) => {
            const Icon = getToolIcon(tool.icon);
            return (
              <div
                key={tool.slug}
                onClick={() => navigate(tool.route)}
                className="group bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer animate-fade-up opacity-0 flex flex-col"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${iconBgMap[category] || "bg-muted"}`}>
                    <Icon className={`h-5 w-5 ${iconColorMap[category] || "text-muted-foreground"}`} />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{tool.name}</h3>
                </div>
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
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
