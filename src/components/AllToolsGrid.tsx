import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { tools, categories, type ToolCategory } from "@/data/tools";

const tabs: { label: string; value: string }[] = [
  { label: "All Tools", value: "all" },
  { label: "Dev", value: "dev" },
  { label: "Student", value: "student" },
  { label: "Business", value: "business" },
  { label: "Prompt", value: "prompt" },
  { label: "PDF", value: "pdf" },
];

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

const AllToolsGrid = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const filtered = activeTab === "all"
    ? tools
    : tools.filter((t) => t.category === activeTab);

  return (
    <section className="px-4 py-16 bg-tools-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-2">All Tools</h2>
        <p className="text-center text-muted-foreground mb-10">Everything you need, completely free</p>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((tool, i) => (
            <div
              key={tool.slug}
              onClick={() => navigate(tool.route)}
              className="group bg-background rounded-xl p-4 border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-200 cursor-pointer animate-fade-up opacity-0 flex flex-col"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
              </div>
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
      </div>
    </section>
  );
};

export default AllToolsGrid;
