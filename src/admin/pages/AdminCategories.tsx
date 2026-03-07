import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories, addCategory, updateCategory, deleteCategory, saveCategories } from "@/admin/store";
import type { AdminCategory } from "@/admin/types";
import { ICON_OPTIONS } from "@/admin/types";
import { toast } from "sonner";

const emptyCategory = (): AdminCategory => ({
  id: crypto.randomUUID(),
  name: "",
  slug: "",
  description: "",
  icon: "FolderOpen",
  color: "cat-dev",
  sortOrder: 0,
});

const colorOptions = [
  { value: "cat-dev", label: "Purple" },
  { value: "cat-student", label: "Green" },
  { value: "cat-business", label: "Orange" },
  { value: "cat-prompt", label: "Violet" },
  { value: "cat-pdf", label: "Red" },
];

const AdminCategories = () => {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [isNew, setIsNew] = useState(false);

  const reload = () => setCategories(getCategories());
  useEffect(reload, []);

  const handleSave = () => {
    if (!editing) return;
    if (!editing.name.trim()) { toast.error("Name is required"); return; }
    const slug = editing.slug || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const cat = { ...editing, slug };
    if (isNew) {
      addCategory(cat);
      toast.success(`"${cat.name}" created`);
    } else {
      updateCategory(cat);
      toast.success(`"${cat.name}" updated`);
    }
    setEditing(null);
    setIsNew(false);
    reload();
  };

  const handleDelete = (cat: AdminCategory) => {
    if (!confirm(`Delete "${cat.name}"?`)) return;
    deleteCategory(cat.id);
    reload();
    toast.success(`"${cat.name}" deleted`);
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const arr = [...categories];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    arr.forEach((c, i) => (c.sortOrder = i));
    saveCategories(arr);
    reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground">{categories.length} categories</p>
        </div>
        <Button
          onClick={() => { setEditing(emptyCategory()); setIsNew(true); }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </div>

      {editing && (
        <Card className="border-primary/50">
          <CardHeader><CardTitle className="text-base">{isNew ? "New Category" : "Edit Category"}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="Category name" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Slug</label>
                <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto-generated" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Input value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Short description" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Icon</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })}>
                  {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Color</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={editing.color} onChange={(e) => setEditing({ ...editing, color: e.target.value })}>
                  {colorOptions.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {categories.sort((a, b) => a.sortOrder - b.sortOrder).map((cat, idx) => (
          <div key={cat.id} className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
            <button onClick={() => moveUp(idx)} className="text-muted-foreground hover:text-foreground cursor-grab">
              <GripVertical className="w-4 h-4" />
            </button>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{cat.name}</p>
              <p className="text-xs text-muted-foreground">{cat.slug} — {cat.description}</p>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={() => { setEditing({ ...cat }); setIsNew(false); }}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => handleDelete(cat)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
