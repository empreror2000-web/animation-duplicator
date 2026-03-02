import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, getToolsByCategory, type ToolCategory } from "@/data/tools";

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

      <section className={`bg-${cat.color} text-primary-foreground py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{cat.label}</h1>
          <p className="text-lg opacity-90">{cat.description} — {catTools.length} tools available</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {catTools.map((tool, i) => (
            <div
              key={tool.slug}
              onClick={() => navigate(tool.route)}
              className="group bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{tool.name}</h3>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
              </div>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
