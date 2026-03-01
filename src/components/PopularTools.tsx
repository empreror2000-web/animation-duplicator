import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const tabs = ["All Tools", "PDF Tools", "Video Tools", "Image Tools", "Converter", "AI Write"];

type Tool = { name: string; category: string; description: string; path: string };

const allTools: Tool[] = [
  { name: "Content Improver", category: "AI Write", description: "Improve your content", path: "/tools/write" },
  { name: "Essay Writer", category: "AI Write", description: "Easily create an essay with AI", path: "/tools/write" },
  { name: "Paragraph Writer", category: "AI Write", description: "AI Paragraph Writer", path: "/tools/write" },
  { name: "AI Image Generator", category: "Image Tools", description: "Generate images with AI", path: "/tools/image" },
  { name: "Remove Background", category: "Image Tools", description: "Remove the background from an image", path: "/tools/image" },
  { name: "Merge PDF", category: "PDF Tools", description: "Merge 2+ PDF files into one", path: "/tools/pdf" },
  { name: "Edit PDF", category: "PDF Tools", description: "Free PDF Editor", path: "/tools/pdf" },
  { name: "PDF to JPG", category: "PDF Tools", description: "Convert PDF pages to images", path: "/tools/pdf" },
  { name: "JPG to PDF", category: "PDF Tools", description: "Upload images, receive a PDF", path: "/tools/pdf" },
  { name: "Compress PDF", category: "PDF Tools", description: "Reduce PDF file size", path: "/tools/pdf" },
  { name: "Upscale Image", category: "Image Tools", description: "Increase image resolution", path: "/tools/image" },
  { name: "Compress Video", category: "Video Tools", description: "Reduce video file size", path: "/tools/video" },
  { name: "Video to GIF", category: "Video Tools", description: "Convert MP4 to animated GIF", path: "/tools/video" },
  { name: "Trim Video", category: "Video Tools", description: "Cut video start and end", path: "/tools/video" },
  { name: "MP4 to MP3", category: "Video Tools", description: "Extract audio from video", path: "/tools/video" },
  { name: "Excel to PDF", category: "Converter", description: "Convert Excel to PDF", path: "/tools/file" },
  { name: "CSV to Excel", category: "Converter", description: "Convert CSV to Excel", path: "/tools/file" },
  { name: "Split Excel", category: "Converter", description: "Split Excel into multiple files", path: "/tools/file" },
  { name: "Sentence Rewriter", category: "AI Write", description: "Rewrite sentences with AI", path: "/tools/write" },
  { name: "Compress Image", category: "Image Tools", description: "Compress your image size", path: "/tools/image" },
  { name: "Word to PDF", category: "PDF Tools", description: "Convert Word to PDF", path: "/tools/pdf" },
  { name: "PDF to Word", category: "PDF Tools", description: "Convert PDF to Word", path: "/tools/pdf" },
  { name: "Instagram Download", category: "Video Tools", description: "Download from Instagram", path: "/tools/video" },
  { name: "QR Code Generator", category: "Converter", description: "Generate QR codes", path: "/tools/file" },
];

const getCategoryColor = (cat: string) => {
  switch (cat) {
    case "PDF Tools": return "bg-cat-pdf/10 text-cat-pdf";
    case "Image Tools": return "bg-cat-image/10 text-cat-image";
    case "Video Tools": return "bg-cat-video/10 text-cat-video";
    case "AI Write": return "bg-cat-write/10 text-cat-write";
    case "Converter": return "bg-cat-file/10 text-cat-file";
    default: return "bg-muted text-muted-foreground";
  }
};

const PopularTools = () => {
  const [activeTab, setActiveTab] = useState("All Tools");
  const navigate = useNavigate();

  const filtered = activeTab === "All Tools"
    ? allTools
    : allTools.filter((t) => t.category === activeTab);

  return (
    <section className="px-4 py-16 bg-tools-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-2">
          Our Most Popular Tools
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          We present the best of the best. All free, no catch
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((tool, i) => (
            <div
              key={tool.name}
              onClick={() => navigate(tool.path)}
              className="group bg-background rounded-xl p-4 border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-200 cursor-pointer animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
              </div>
              <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${getCategoryColor(tool.category)}`}>
                {tool.category}
              </span>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/tools/pdf")}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            All Tools
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularTools;
