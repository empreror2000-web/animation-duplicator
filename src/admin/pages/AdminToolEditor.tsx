import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTools, getCategories, addTool, updateTool } from "@/admin/store";
import type { AdminTool, AdminCategory } from "@/admin/types";
import { toast } from "sonner";
import GeneralTab from "@/admin/components/GeneralTab";
import UIBuilderTab from "@/admin/components/UIBuilderTab";
import LogicTab from "@/admin/components/LogicTab";
import SEOTab from "@/admin/components/SEOTab";

const emptyTool = (): AdminTool => ({
  id: crypto.randomUUID(),
  name: "",
  slug: "",
  categoryId: "",
  shortDescription: "",
  longDescription: "",
  icon: "Wrench",
  status: "draft",
  enabled: true,
  featured: false,
  sortOrder: 0,
  fields: [],
  logic: { toolType: "calculator", logicMode: "formula", formula: "" },
  seo: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const AdminToolEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [tool, setTool] = useState<AdminTool>(emptyTool());
  const [categories, setCategories] = useState<AdminCategory[]>([]);

  useEffect(() => {
    setCategories(getCategories());
    if (!isNew && id) {
      const found = getTools().find((t) => t.id === id);
      if (found) setTool(found);
      else { toast.error("Tool not found"); navigate("/admin/tools"); }
    }
  }, [id, isNew, navigate]);

  const handleSave = () => {
    if (!tool.name.trim()) { toast.error("Tool name is required"); return; }
    if (!tool.slug.trim()) { toast.error("Slug is required"); return; }
    if (!tool.categoryId) { toast.error("Category is required"); return; }

    const updated = { ...tool, updatedAt: new Date().toISOString() };
    if (isNew) {
      addTool(updated);
      toast.success(`"${tool.name}" created!`);
      navigate("/admin/tools");
    } else {
      updateTool(updated);
      toast.success(`"${tool.name}" saved!`);
    }
  };

  const updateField = <K extends keyof AdminTool>(key: K, value: AdminTool[K]) => {
    setTool((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/tools")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{isNew ? "New Tool" : "Edit Tool"}</h1>
            <p className="text-sm text-muted-foreground">{tool.name || "Untitled"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/tools")}>Cancel</Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" /> Save
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="w-full justify-start flex-wrap h-auto gap-1 bg-transparent p-0">
          {["general", "ui-builder", "logic", "seo", "publish"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm capitalize"
            >
              {tab.replace("-", " ")}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general">
          <GeneralTab tool={tool} categories={categories} updateField={updateField} />
        </TabsContent>
        <TabsContent value="ui-builder">
          <UIBuilderTab tool={tool} setTool={setTool} />
        </TabsContent>
        <TabsContent value="logic">
          <LogicTab tool={tool} setTool={setTool} />
        </TabsContent>
        <TabsContent value="seo">
          <SEOTab tool={tool} setTool={setTool} />
        </TabsContent>
        <TabsContent value="publish">
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Publish Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Status</label>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
                  value={tool.status}
                  onChange={(e) => updateField("status", e.target.value as "draft" | "published")}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input type="checkbox" checked={tool.enabled} onChange={(e) => updateField("enabled", e.target.checked)} className="w-4 h-4" />
                <label className="text-sm text-foreground">Enabled (visible on website)</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={tool.featured} onChange={(e) => updateField("featured", e.target.checked)} className="w-4 h-4" />
                <label className="text-sm text-foreground">Featured (show on homepage)</label>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Sort Order</label>
                <input
                  type="number"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
                  value={tool.sortOrder}
                  onChange={(e) => updateField("sortOrder", parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">
                {tool.status === "published" && tool.enabled
                  ? `✅ This tool will be live at /tools/${tool.categoryId}/${tool.slug}`
                  : "⚠️ This tool is not published or not enabled yet."}
              </p>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" /> Save & {tool.status === "published" ? "Publish" : "Save Draft"}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminToolEditor;
