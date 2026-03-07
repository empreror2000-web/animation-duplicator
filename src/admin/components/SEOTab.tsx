import { Input } from "@/components/ui/input";
import type { AdminTool } from "@/admin/types";

interface Props {
  tool: AdminTool;
  setTool: React.Dispatch<React.SetStateAction<AdminTool>>;
}

const SEOTab = ({ tool, setTool }: Props) => {
  const seo = tool.seo;
  const updateSEO = (updates: Partial<typeof seo>) => {
    setTool((prev) => ({ ...prev, seo: { ...prev.seo, ...updates } }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="font-semibold text-foreground">SEO Settings</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">SEO Title</label>
          <Input value={seo.seoTitle || ""} onChange={(e) => updateSEO({ seoTitle: e.target.value })} placeholder={tool.name || "Page title"} />
          <p className="text-xs text-muted-foreground mt-1">{(seo.seoTitle || "").length}/60 characters</p>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">SEO Description</label>
          <textarea
            className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground resize-y"
            value={seo.seoDescription || ""}
            onChange={(e) => updateSEO({ seoDescription: e.target.value })}
            placeholder={tool.shortDescription || "Meta description"}
          />
          <p className="text-xs text-muted-foreground mt-1">{(seo.seoDescription || "").length}/160 characters</p>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Keywords</label>
          <Input value={seo.keywords || ""} onChange={(e) => updateSEO({ keywords: e.target.value })} placeholder="keyword1, keyword2, keyword3" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Canonical URL</label>
          <Input value={seo.canonicalUrl || ""} onChange={(e) => updateSEO({ canonicalUrl: e.target.value })} placeholder="https://winoxtools.com/tools/..." />
        </div>
      </div>
    </div>
  );
};

export default SEOTab;
