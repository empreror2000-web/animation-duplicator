import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Trash2, Eye, EyeOff, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTools, getCategories, deleteTool, updateTool } from "@/admin/store";
import type { AdminTool, AdminCategory } from "@/admin/types";
import { toast } from "sonner";

const AdminToolsList = () => {
  const navigate = useNavigate();
  const [tools, setTools] = useState<AdminTool[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");

  const reload = () => {
    setTools(getTools());
    setCategories(getCategories());
  };

  useEffect(reload, []);

  const filtered = tools
    .filter((t) => !filterCat || t.categoryId === filterCat)
    .filter((t) => !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.slug.toLowerCase().includes(search.toLowerCase()));

  const catMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    deleteTool(id);
    reload();
    toast.success(`"${name}" deleted`);
  };

  const toggleEnabled = (tool: AdminTool) => {
    updateTool({ ...tool, enabled: !tool.enabled, updatedAt: new Date().toISOString() });
    reload();
    toast.success(`"${tool.name}" ${tool.enabled ? "disabled" : "enabled"}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tools</h1>
          <p className="text-sm text-muted-foreground">{tools.length} tools total</p>
        </div>
        <Button onClick={() => navigate("/admin/tools/new")} className="gap-2">
          <Plus className="w-4 h-4" /> Add Tool
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search tools..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Enabled</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No tools found. <Link to="/admin/tools/new" className="text-primary hover:underline">Create one</Link>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{tool.name}</p>
                      <p className="text-xs text-muted-foreground">{tool.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {catMap[tool.categoryId] || tool.categoryId}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`text-xs px-2 py-1 rounded-full ${tool.status === "published" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
                      {tool.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <button onClick={() => toggleEnabled(tool)} className="text-muted-foreground hover:text-foreground">
                      {tool.enabled ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => navigate(`/admin/tools/${tool.id}`)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(tool.id, tool.name)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminToolsList;
