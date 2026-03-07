import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tools } from "@/data/tools";
import { getToolBySlug } from "@/admin/store";
import DynamicToolRenderer from "@/components/DynamicToolRenderer";

const ToolPage = () => {
  const { tool: toolSlug } = useParams<{ category: string; tool: string }>();
  const navigate = useNavigate();

  // Check admin-created tools first
  if (toolSlug) {
    const adminTool = getToolBySlug(toolSlug);
    if (adminTool && adminTool.status === "published" && adminTool.enabled) {
      return <DynamicToolRenderer tool={adminTool} />;
    }
  }

  const tool = tools.find((t) => t.slug === toolSlug);

  if (!tool) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Tool not found</p>
            <Button onClick={() => navigate("/")}>Go Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleUpload = () => {
    toast.success(`File uploaded to "${tool.name}"!`, {
      description: "Processing will begin shortly...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-foreground mb-2">{tool.name}</h1>
        <p className="text-muted-foreground mb-10">{tool.description}</p>
        <div
          className="border-2 border-dashed border-border rounded-2xl p-12 hover:border-primary/50 transition-colors cursor-pointer mb-6"
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
      <Footer />
    </div>
  );
};

export default ToolPage;
