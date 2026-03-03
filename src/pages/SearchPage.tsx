import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tools, categories } from "@/data/tools";
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

const SearchPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const query = params.get("q") || "";

  const results = query.trim()
    ? tools.filter((t) =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Search results for "{query}"
        </h1>
        <p className="text-muted-foreground mb-8">{results.length} tools found</p>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.map((tool, i) => {
              const Icon = getToolIcon(tool.icon);
              return (
                <div
                  key={tool.slug}
                  onClick={() => navigate(tool.route)}
                  className="group bg-card rounded-xl p-4 border border-border hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer animate-fade-up opacity-0 flex flex-col"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${iconBgMap[tool.category] || "bg-muted"}`}>
                      <Icon className={`h-5 w-5 ${iconColorMap[tool.category] || "text-muted-foreground"}`} />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{tool.name}</h3>
                  </div>
                  <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 w-fit ${getCategoryColor(tool.category)}`}>
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
        ) : (
          <p className="text-muted-foreground">No tools matched your search. Try a different query.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
