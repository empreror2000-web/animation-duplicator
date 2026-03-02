import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tools, categories } from "@/data/tools";

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
            {results.map((tool, i) => (
              <div
                key={tool.slug}
                onClick={() => navigate(tool.route)}
                className="group bg-card rounded-xl p-4 border border-border hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer animate-fade-up opacity-0 flex flex-col"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{tool.name}</h3>
                <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${getCategoryColor(tool.category)}`}>
                  {categories[tool.category].label}
                </span>
                <p className="text-sm text-muted-foreground mb-3 flex-1">{tool.description}</p>
                <div className="flex justify-end">
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
                    Open Tool <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
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
