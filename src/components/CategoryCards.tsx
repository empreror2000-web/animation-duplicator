import { useNavigate } from "react-router-dom";
import { FileText, Image, Video, PenTool, FolderOpen, ArrowRight } from "lucide-react";

const categories = [
  {
    title: "PDF Tools",
    subtitle: "Solve Your PDF Problems",
    count: "45+ tools",
    featured: "PDF Creator",
    icon: FileText,
    colorClass: "bg-cat-pdf",
    path: "/tools/pdf",
  },
  {
    title: "Image Tools",
    subtitle: "Solve Your Image Problems",
    count: "30+ tools",
    featured: "Remove BG",
    icon: Image,
    colorClass: "bg-cat-image",
    path: "/tools/image",
  },
  {
    title: "Video Tools",
    subtitle: "Solve Your Video Problems",
    count: "10+ tools",
    featured: "Mute Video",
    icon: Video,
    colorClass: "bg-cat-video",
    path: "/tools/video",
  },
  {
    title: "AI Write",
    subtitle: "Solve Your Text Problems",
    count: "10+ tools",
    featured: "Paragraph Writer",
    icon: PenTool,
    colorClass: "bg-cat-write",
    path: "/tools/write",
  },
  {
    title: "File Tools",
    subtitle: "Solve Your File Problems",
    count: "15+ tools",
    featured: "Split Excel",
    icon: FolderOpen,
    colorClass: "bg-cat-file",
    path: "/tools/file",
  },
];

const CategoryCards = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              onClick={() => navigate(cat.path)}
              className={`${cat.colorClass} rounded-2xl p-5 text-primary-foreground cursor-pointer group hover:scale-[1.03] transition-transform duration-200 animate-fade-up opacity-0 relative overflow-hidden`}
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                  <cat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium bg-primary-foreground/20 rounded-full px-2.5 py-1">
                  {cat.count}
                </span>
              </div>

              <h3 className="font-bold text-base mb-1">{cat.title}</h3>
              <p className="text-xs opacity-80 mb-4">{cat.subtitle}</p>

              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="bg-background/90 rounded-lg px-3 py-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Featured Tool :</span>
                <span className="text-xs font-semibold text-foreground">{cat.featured}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
