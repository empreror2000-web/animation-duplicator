import { useState } from "react";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AdminTool, ToolField, FieldType, FieldOption } from "@/admin/types";

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "text", label: "Text Input" },
  { value: "textarea", label: "Textarea" },
  { value: "number", label: "Number Input" },
  { value: "select", label: "Select Dropdown" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio Buttons" },
  { value: "file", label: "File Upload" },
  { value: "multifile", label: "Multiple File Upload" },
  { value: "output", label: "Output Box (read-only)" },
  { value: "result", label: "Result Area (read-only)" },
  { value: "button", label: "Action Button" },
];

interface Props {
  tool: AdminTool;
  setTool: React.Dispatch<React.SetStateAction<AdminTool>>;
}

const UIBuilderTab = ({ tool, setTool }: Props) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const addField = () => {
    const field: ToolField = {
      id: crypto.randomUUID(),
      label: "New Field",
      name: `field_${tool.fields.length + 1}`,
      type: "text",
      placeholder: "",
      required: false,
      defaultValue: "",
      options: [],
      helpText: "",
    };
    setTool((prev) => ({ ...prev, fields: [...prev.fields, field] }));
    setExpanded(field.id);
  };

  const updateFieldItem = (id: string, updates: Partial<ToolField>) => {
    setTool((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    }));
  };

  const removeField = (id: string) => {
    setTool((prev) => ({ ...prev, fields: prev.fields.filter((f) => f.id !== id) }));
  };

  const moveField = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= tool.fields.length) return;
    const arr = [...tool.fields];
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    setTool((prev) => ({ ...prev, fields: arr }));
  };

  const addOption = (fieldId: string) => {
    const field = tool.fields.find((f) => f.id === fieldId);
    if (!field) return;
    const opts: FieldOption[] = [...(field.options || []), { label: "Option", value: `option_${(field.options?.length || 0) + 1}` }];
    updateFieldItem(fieldId, { options: opts });
  };

  const updateOption = (fieldId: string, optIdx: number, updates: Partial<FieldOption>) => {
    const field = tool.fields.find((f) => f.id === fieldId);
    if (!field) return;
    const opts = [...(field.options || [])];
    opts[optIdx] = { ...opts[optIdx], ...updates };
    updateFieldItem(fieldId, { options: opts });
  };

  const removeOption = (fieldId: string, optIdx: number) => {
    const field = tool.fields.find((f) => f.id === fieldId);
    if (!field) return;
    const opts = (field.options || []).filter((_, i) => i !== optIdx);
    updateFieldItem(fieldId, { options: opts });
  };

  const hasOptions = (type: FieldType) => type === "select" || type === "radio";

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">UI Builder</h3>
          <p className="text-sm text-muted-foreground">{tool.fields.length} fields</p>
        </div>
        <Button onClick={addField} className="gap-2" size="sm">
          <Plus className="w-4 h-4" /> Add Field
        </Button>
      </div>

      {tool.fields.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No fields yet. Click "Add Field" to start building the tool UI.
        </div>
      )}

      <div className="space-y-2">
        {tool.fields.map((field, idx) => {
          const isExpanded = expanded === field.id;
          return (
            <div key={field.id} className="border border-border rounded-lg overflow-hidden">
              <div
                className="flex items-center gap-2 p-3 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setExpanded(isExpanded ? null : field.id)}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground">{field.label}</span>
                  <span className="text-xs text-muted-foreground ml-2">({field.type})</span>
                </div>
                <div className="flex gap-1 items-center">
                  <button onClick={(e) => { e.stopPropagation(); moveField(idx, -1); }} className="p-1 text-muted-foreground hover:text-foreground">
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); moveField(idx, 1); }} className="p-1 text-muted-foreground hover:text-foreground">
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); removeField(field.id); }} className="p-1 text-destructive hover:text-destructive/80">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 space-y-3 border-t border-border">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-foreground">Label</label>
                      <Input value={field.label} onChange={(e) => updateFieldItem(field.id, { label: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground">Field Name</label>
                      <Input value={field.name} onChange={(e) => updateFieldItem(field.id, { name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground">Type</label>
                      <select
                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
                        value={field.type}
                        onChange={(e) => updateFieldItem(field.id, { type: e.target.value as FieldType })}
                      >
                        {FIELD_TYPES.map((ft) => <option key={ft.value} value={ft.value}>{ft.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground">Placeholder</label>
                      <Input value={field.placeholder || ""} onChange={(e) => updateFieldItem(field.id, { placeholder: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground">Default Value</label>
                      <Input value={field.defaultValue || ""} onChange={(e) => updateFieldItem(field.id, { defaultValue: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground">Help Text</label>
                      <Input value={field.helpText || ""} onChange={(e) => updateFieldItem(field.id, { helpText: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={field.required} onChange={(e) => updateFieldItem(field.id, { required: e.target.checked })} className="w-4 h-4" />
                    <label className="text-sm text-foreground">Required</label>
                  </div>

                  {hasOptions(field.type) && (
                    <div className="space-y-2 pt-2 border-t border-border">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-foreground">Options</label>
                        <Button size="sm" variant="outline" onClick={() => addOption(field.id)} className="h-7 text-xs gap-1">
                          <Plus className="w-3 h-3" /> Add
                        </Button>
                      </div>
                      {(field.options || []).map((opt, oi) => (
                        <div key={oi} className="flex gap-2 items-center">
                          <Input value={opt.label} onChange={(e) => updateOption(field.id, oi, { label: e.target.value })} placeholder="Label" className="h-8 text-xs" />
                          <Input value={opt.value} onChange={(e) => updateOption(field.id, oi, { value: e.target.value })} placeholder="Value" className="h-8 text-xs" />
                          <button onClick={() => removeOption(field.id, oi)} className="text-destructive hover:text-destructive/80 shrink-0">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UIBuilderTab;
