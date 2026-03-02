import { useNavigate } from "react-router-dom";
import { categories, getToolsByCategory, type ToolCategory } from "@/data/tools";

const categoryKeys: ToolCategory[] = ["dev", "student", "business", "prompt", "pdf"];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {categoryKeys.map((key) => {
            const cat = categories[key];
            const catTools = getToolsByCategory(key);
            return (
              <div key={key}>
                <button onClick={() => navigate(cat.route)} className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity">
                  <h4 className="font-semibold text-sm text-foreground">{cat.label}</h4>
                </button>
                <ul className="space-y-2">
                  {catTools.map((tool) => (
                    <li key={tool.slug}>
                      <button onClick={() => navigate(tool.route)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {tool.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">W</span>
            </div>
            <span className="font-bold text-foreground">WinoxTools</span>
          </button>
          <p className="text-sm text-muted-foreground">
            © 2025 WinoxTools. All rights reserved. Free tools for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
