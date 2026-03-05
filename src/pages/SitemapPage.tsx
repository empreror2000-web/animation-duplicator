import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, getToolsByCategory, type ToolCategory } from "@/data/tools";

const categoryKeys: ToolCategory[] = ["dev", "student", "business", "prompt", "pdf"];

const SitemapPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Sitemap</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryKeys.map((key) => {
            const cat = categories[key];
            const tools = getToolsByCategory(key);
            return (
              <div key={key}>
                <button onClick={() => navigate(cat.route)} className="font-semibold text-foreground hover:text-primary mb-2 block">
                  {cat.label}
                </button>
                <ul className="space-y-1">
                  {tools.map((t) => (
                    <li key={t.slug}>
                      <button onClick={() => navigate(t.route)} className="text-sm text-muted-foreground hover:text-primary">
                        {t.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SitemapPage;
