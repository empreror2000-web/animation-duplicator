import { useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { AdminTool } from "@/admin/types";
import { executeFormulas } from "@/admin/formulaEngine";
import { runProcessor } from "@/admin/processors";
import { getToolIcon } from "@/lib/iconMap";

interface Props {
  tool: AdminTool;
}

const DynamicToolRenderer = ({ tool }: Props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    tool.fields.forEach((f) => { init[f.name] = f.defaultValue || ""; });
    return init;
  });
  const [results, setResults] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const Icon = getToolIcon(tool.icon);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleRun = useCallback(async () => {
    setLoading(true);
    try {
      if (tool.logic.logicMode === "formula" && tool.logic.formula) {
        const numericInputs: Record<string, number> = {};
        Object.entries(values).forEach(([k, v]) => {
          const n = parseFloat(v);
          if (!isNaN(n)) numericInputs[k] = n;
        });
        const computed = executeFormulas(tool.logic.formula, numericInputs);
        const resultMap: Record<string, string> = {};
        Object.entries(computed).forEach(([k, v]) => {
          if (!(k in numericInputs)) {
            resultMap[k] = typeof v === "number" ? v.toFixed(2) : String(v);
          }
        });
        setResults(resultMap);
        // Also set output/result fields
        const outputFields = tool.fields.filter((f) => f.type === "output" || f.type === "result");
        if (outputFields.length > 0) {
          const allResults = Object.entries(resultMap).map(([k, v]) => `${k} = ${v}`).join("\n");
          outputFields.forEach((f) => {
            setValues((prev) => ({ ...prev, [f.name]: allResults }));
          });
        }
      } else if (tool.logic.logicMode === "processor" && tool.logic.processor) {
        const output = await runProcessor(tool.logic.processor, values);
        setResults(output);
        const outputFields = tool.fields.filter((f) => f.type === "output" || f.type === "result");
        outputFields.forEach((f) => {
          setValues((prev) => ({ ...prev, [f.name]: output.output || "" }));
        });
      }
    } catch (e: any) {
      setResults({ output: `Error: ${e.message}` });
    }
    setLoading(false);
  }, [tool, values]);

  const renderField = (field: typeof tool.fields[0]) => {
    const val = values[field.name] || "";

    switch (field.type) {
      case "text":
        return (
          <Input
            value={val}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case "textarea":
        return (
          <textarea
            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground resize-y"
            value={val}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={val}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case "select":
        return (
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
            value={val}
            onChange={(e) => handleChange(field.name, e.target.value)}
          >
            <option value="">{field.placeholder || "Select..."}</option>
            {(field.options || []).map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={val === "true"}
              onChange={(e) => handleChange(field.name, String(e.target.checked))}
              className="w-4 h-4"
            />
            <span className="text-sm text-foreground">{field.placeholder || field.label}</span>
          </div>
        );
      case "radio":
        return (
          <div className="space-y-2">
            {(field.options || []).map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={val === opt.value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        );
      case "file":
      case "multifile":
        return (
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
            <p className="text-sm text-muted-foreground">{field.placeholder || "Click to upload file(s)"}</p>
          </div>
        );
      case "output":
      case "result":
        return (
          <div className="w-full min-h-[100px] rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-foreground whitespace-pre-wrap font-mono">
            {val || results.output || "Results will appear here..."}
          </div>
        );
      case "button":
        return (
          <Button onClick={handleRun} disabled={loading} className="w-full sm:w-auto">
            {loading ? "Processing..." : field.label || "Run"}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{tool.name}</h1>
          <p className="text-muted-foreground">{tool.shortDescription}</p>
        </div>

        <div className="space-y-5">
          {tool.fields.map((field) => (
            <div key={field.id}>
              {field.type !== "button" && (
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </label>
              )}
              {renderField(field)}
              {field.helpText && (
                <p className="text-xs text-muted-foreground mt-1">{field.helpText}</p>
              )}
            </div>
          ))}

          {/* If no button field exists, show a default run button */}
          {!tool.fields.some((f) => f.type === "button") && (
            <Button onClick={handleRun} disabled={loading} className="w-full" size="lg">
              {loading ? "Processing..." : "Run"}
            </Button>
          )}

          {/* Show results if not captured by output fields */}
          {Object.keys(results).length > 0 && !tool.fields.some((f) => f.type === "output" || f.type === "result") && (
            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-medium text-foreground">Results</h3>
              <div className="w-full min-h-[80px] rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-foreground whitespace-pre-wrap font-mono">
                {Object.entries(results).map(([k, v]) => `${k}: ${v}`).join("\n")}
              </div>
            </div>
          )}
        </div>

        {tool.longDescription && (
          <div className="mt-12 prose prose-sm dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-foreground">About {tool.name}</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">{tool.longDescription}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DynamicToolRenderer;
