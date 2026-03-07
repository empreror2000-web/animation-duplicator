import { Input } from "@/components/ui/input";
import type { AdminTool, AdminCategory } from "@/admin/types";
import { ICON_OPTIONS } from "@/admin/types";

interface Props {
  tool: AdminTool;
  categories: AdminCategory[];
  updateField: <K extends keyof AdminTool>(key: K, value: AdminTool[K]) => void;
}

const GeneralTab = ({ tool, categories, updateField }: Props) => {
  const autoSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="font-semibold text-foreground">General Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Tool Name *</label>
          <Input
            value={tool.name}
            onChange={(e) => {
              updateField("name", e.target.value);
              if (!tool.slug || tool.slug === autoSlug(tool.name)) {
                updateField("slug", autoSlug(e.target.value));
              }
            }}
            placeholder="e.g. JSON Formatter"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Slug *</label>
          <Input value={tool.slug} onChange={(e) => updateField("slug", e.target.value)} placeholder="json-formatter" />
          <p className="text-xs text-muted-foreground mt-1">URL path: /tools/{tool.categoryId || "category"}/{tool.slug || "slug"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Category *</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
            value={tool.categoryId}
            onChange={(e) => updateField("categoryId", e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Icon</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
            value={tool.icon}
            onChange={(e) => updateField("icon", e.target.value)}
          >
            {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-foreground">Short Description *</label>
          <Input value={tool.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} placeholder="Brief one-line description" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-foreground">Long Description</label>
          <textarea
            className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground resize-y"
            value={tool.longDescription || ""}
            onChange={(e) => updateField("longDescription", e.target.value)}
            placeholder="Detailed description (shown on tool page)"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
