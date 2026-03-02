import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { tools } from "@/data/tools";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const filtered = query.trim()
    ? tools.filter((t) => t.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  return (
    <section className="relative overflow-hidden pt-16 pb-12 px-4">
      <div className="absolute top-16 left-[15%] w-4 h-4 rounded-full bg-cat-dev/40 animate-float" />
      <div className="absolute top-24 right-[20%] w-3 h-3 rounded-full bg-cat-prompt/40 animate-float-slow animation-delay-400" />
      <div className="absolute top-40 left-[10%] w-5 h-5 rotate-45 bg-cat-student/30 animate-float animation-delay-600" />
      <div className="absolute top-12 right-[10%] w-4 h-4 rotate-45 bg-cat-business/30 animate-float-slow animation-delay-200" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
          Free Online Tools for{" "}
          <span className="text-gradient">Work, Study & Productivity</span>
        </h1>

        <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
          Fast, secure and browser-based tools. No login required.
        </p>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
          <div className="flex items-center bg-background border-2 border-border rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
            <Search className="ml-4 w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools..."
              className="flex-1 px-4 py-3.5 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
            />
            <button type="submit" className="m-1.5 rounded-xl px-6 py-2 bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
              Search
            </button>
          </div>

          {filtered.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-xl p-2 z-50">
              {filtered.map((tool) => (
                <button
                  key={tool.slug}
                  type="button"
                  onClick={() => { navigate(tool.route); setQuery(""); }}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-accent transition-colors"
                >
                  <span className="text-sm font-medium text-foreground">{tool.name}</span>
                  <span className="block text-xs text-muted-foreground">{tool.description}</span>
                </button>
              ))}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
