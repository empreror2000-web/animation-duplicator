import { useNavigate } from "react-router-dom";
import { FileText, Image, PenTool, Video, FolderOpen } from "lucide-react";

const footerSections = [
  { title: "PDF Tools", icon: FileText, path: "/tools/pdf", links: ["Edit PDF", "Merge PDF", "Compress PDF", "PDF to Word", "PDF to JPG", "JPG to PDF"] },
  { title: "Image Tools", icon: Image, path: "/tools/image", links: ["Remove Background", "Compress Image", "Resize Image", "Upscale Image", "AI Image Generator"] },
  { title: "Video Tools", icon: Video, path: "/tools/video", links: ["Compress Video", "Video to GIF", "Trim Video", "MP4 to MP3", "Extract Audio"] },
  { title: "AI Write", icon: PenTool, path: "/tools/write", links: ["Paragraph Writer", "Essay Writer", "Sentence Rewriter", "Content Improver"] },
  { title: "File Tools", icon: FolderOpen, path: "/tools/file", links: ["Excel to PDF", "CSV to Excel", "Split Excel", "XML to JSON"] },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <button onClick={() => navigate(section.path)} className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity">
                <section.icon className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-sm text-foreground">{section.title}</h4>
              </button>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <button onClick={() => navigate(section.path)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-foreground">TinyWow</span>
          </button>
          <p className="text-sm text-muted-foreground">
            © 2024 TinyWow. All rights reserved. Free tools to make your life simple.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
