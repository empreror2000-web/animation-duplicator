import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, FileText, Image, PenTool, Video, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const categoryData: Record<string, { title: string; color: string; icon: any; tools: { name: string; desc: string }[] }> = {
  pdf: {
    title: "PDF Tools",
    color: "bg-cat-pdf",
    icon: FileText,
    tools: [
      { name: "Edit PDF", desc: "Free PDF Editor" },
      { name: "Merge PDF", desc: "Merge 2+ PDF files into one" },
      { name: "Compress PDF", desc: "Reduce PDF file size" },
      { name: "PDF to Word", desc: "Convert PDF to Word Document" },
      { name: "PDF to JPG", desc: "Convert PDF pages to images" },
      { name: "JPG to PDF", desc: "Upload images, receive a PDF" },
      { name: "Word to PDF", desc: "Convert Word to PDF" },
      { name: "Split PDF", desc: "Split into multiple PDFs" },
      { name: "Unlock PDF", desc: "Remove password from PDF" },
      { name: "PDF to Excel", desc: "Convert PDF to XLSX" },
      { name: "PDF Translator", desc: "Translate PDF documents" },
      { name: "eSign PDF", desc: "Electronically sign PDFs" },
    ],
  },
  image: {
    title: "Image Tools",
    color: "bg-cat-image",
    icon: Image,
    tools: [
      { name: "Remove Background", desc: "Remove image background" },
      { name: "AI Image Generator", desc: "Generate images with AI" },
      { name: "Compress Image", desc: "Compress your image size" },
      { name: "Resize Image", desc: "Resize image dimensions" },
      { name: "Upscale Image", desc: "Increase image resolution" },
      { name: "Crop Image", desc: "Crop your image" },
      { name: "Remove Watermark", desc: "Remove watermark from photo" },
      { name: "Colorize Photo", desc: "Colorize black and white photos" },
      { name: "HEIC to JPG", desc: "Convert iPhone HEIC to JPG" },
      { name: "Image to Text", desc: "Extract text from images" },
    ],
  },
  write: {
    title: "AI Write Tools",
    color: "bg-cat-write",
    icon: PenTool,
    tools: [
      { name: "Paragraph Writer", desc: "Write paragraphs with AI" },
      { name: "Essay Writer", desc: "Create essays with AI" },
      { name: "Sentence Rewriter", desc: "Rewrite sentences" },
      { name: "Content Improver", desc: "Improve your content" },
      { name: "Grammar Fixer", desc: "Fix grammar issues" },
      { name: "Article Writer", desc: "Create articles from titles" },
      { name: "Blog Outline", desc: "Generate blog outlines" },
      { name: "Instagram Caption", desc: "Generate Instagram captions" },
    ],
  },
  video: {
    title: "Video Tools",
    color: "bg-cat-video",
    icon: Video,
    tools: [
      { name: "Compress Video", desc: "Reduce video file size" },
      { name: "Video to GIF", desc: "Convert MP4 to animated GIF" },
      { name: "Trim Video", desc: "Cut video start and end" },
      { name: "MP4 to MP3", desc: "Extract audio from video" },
      { name: "Audio to Text", desc: "Transcribe audio to text" },
      { name: "Resize Video", desc: "Resize video dimensions" },
      { name: "MOV to MP4", desc: "Convert MOV to MP4" },
      { name: "Mute Video", desc: "Remove audio from video" },
    ],
  },
  file: {
    title: "File Tools",
    color: "bg-cat-file",
    icon: FolderOpen,
    tools: [
      { name: "Excel to PDF", desc: "Convert Excel to PDF" },
      { name: "CSV to Excel", desc: "Convert CSV to Excel" },
      { name: "Split Excel", desc: "Split Excel files" },
      { name: "XML to Excel", desc: "Convert XML to Excel" },
      { name: "CSV to JSON", desc: "Convert CSV to JSON" },
      { name: "XML to JSON", desc: "Convert XML to JSON" },
      { name: "JSON to XML", desc: "Convert JSON to XML" },
      { name: "Split CSV", desc: "Split CSV files" },
    ],
  },
};

const ToolPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const data = category ? categoryData[category] : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Category not found</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const Icon = data.icon;

  const handleUpload = () => {
    toast.success(`File uploaded to "${selectedTool}"!`, {
      description: "Processing will begin shortly...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className={`${data.color} text-primary-foreground`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{data.title}</h1>
              <p className="text-sm opacity-80">{data.tools.length} tools available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!selectedTool ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.tools.map((tool, i) => (
              <button
                key={tool.name}
                onClick={() => setSelectedTool(tool.name)}
                className="text-left bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all group animate-fade-up opacity-0"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted-foreground">{tool.desc}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="max-w-lg mx-auto text-center animate-fade-up">
            <button onClick={() => setSelectedTool(null)} className="text-sm text-primary hover:underline mb-6 inline-block">
              ← Back to all {data.title}
            </button>
            <h2 className="text-2xl font-bold text-foreground mb-2">{selectedTool}</h2>
            <p className="text-muted-foreground mb-8">Upload your file to get started</p>

            <div className="border-2 border-dashed border-border rounded-2xl p-12 hover:border-primary/50 transition-colors cursor-pointer mb-6"
              onClick={handleUpload}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-medium mb-1">Click to upload or drag & drop</p>
              <p className="text-sm text-muted-foreground">Supports all common file formats</p>
            </div>

            <Button size="lg" className="rounded-xl px-8" onClick={handleUpload}>
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolPage;
