import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Heart, ChevronDown, Code, GraduationCap, Briefcase, Sparkles, FileText, Moon, Sun, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, getToolsByCategory, type ToolCategory } from "@/data/tools";
import IconButton from "@/components/IconButton";
import ShareModal from "@/components/ShareModal";
import { useTheme } from "@/hooks/use-theme";

const iconMap: Record<string, any> = { Code, GraduationCap, Briefcase, Sparkles, FileText };
const categoryKeys: ToolCategory[] = ["dev", "student", "business", "prompt", "pdf"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDesktopDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMouseEnter = (key: string) => {
    clearTimeout(timeoutRef.current);
    setDesktopDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDesktopDropdown(null), 200);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => navigate("/")} className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">W</span>
              </div>
              <span className="font-bold text-lg text-foreground">WinoxTools</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1" ref={dropdownRef}>
              {categoryKeys.map((key) => {
                const cat = categories[key];
                const Icon = iconMap[cat.icon] || FileText;
                const catTools = getToolsByCategory(key).slice(0, 8);
                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => navigate(cat.route)}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {cat.label}
                      <ChevronDown className={`w-3 h-3 transition-transform ${desktopDropdown === key ? "rotate-180" : ""}`} />
                    </button>

                    {desktopDropdown === key && (
                      <div
                        className="absolute top-full left-0 mt-1 w-72 bg-popover border border-border rounded-xl shadow-xl p-2 animate-fade-up z-50"
                        onMouseEnter={() => handleMouseEnter(key)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {catTools.map((tool) => (
                          <button
                            key={tool.slug}
                            onClick={() => { navigate(tool.route); setDesktopDropdown(null); }}
                            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-accent transition-colors group"
                          >
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{tool.name}</span>
                            <span className="block text-xs text-muted-foreground">{tool.description}</span>
                          </button>
                        ))}
                        <div className="border-t border-border mt-1 pt-1">
                          <button
                            onClick={() => { navigate(cat.route); setDesktopDropdown(null); }}
                            className="w-full text-left px-3 py-2 text-sm font-semibold text-primary hover:bg-accent rounded-lg transition-colors"
                          >
                            View All {cat.label} →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <IconButton ariaLabel="Toggle theme" onClick={toggleTheme}>
                {theme === "dark" ? <Sun /> : <Moon />}
              </IconButton>
              <IconButton ariaLabel="Share" onClick={() => setShareOpen(true)}>
                <Share2 />
              </IconButton>
              <Button size="sm" className="hidden sm:inline-flex" onClick={() => navigate("/donation")}>
                <Heart className="w-4 h-4 mr-1.5" />
                Donation
              </Button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-accent text-foreground"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-up">
            <div className="px-4 py-3 space-y-1">
              {categoryKeys.map((key) => {
                const cat = categories[key];
                const Icon = iconMap[cat.icon] || FileText;
                const isOpen = mobileDropdown === key;
                const catTools = getToolsByCategory(key).slice(0, 8);
                return (
                  <div key={key}>
                    <button
                      onClick={() => setMobileDropdown(isOpen ? null : key)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {cat.label}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="ml-6 mt-1 mb-2 space-y-0.5 border-l-2 border-border pl-3">
                        {catTools.map((tool) => (
                          <button
                            key={tool.slug}
                            onClick={() => { navigate(tool.route); setMobileOpen(false); }}
                            className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                          >
                            {tool.name}
                          </button>
                        ))}
                        <button
                          onClick={() => { navigate(cat.route); setMobileOpen(false); }}
                          className="w-full text-left px-3 py-2 text-sm font-semibold text-primary hover:bg-accent rounded-lg transition-colors"
                        >
                          View All →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
              <button
                onClick={() => { navigate("/donation"); setMobileOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-primary hover:bg-accent rounded-lg transition-colors"
              >
                <Heart className="w-4 h-4" />
                Donation
              </button>
            </div>
          </div>
        )}
      </nav>

      <ShareModal open={shareOpen} onOpenChange={setShareOpen} />
    </>
  );
};

export default Navbar;
