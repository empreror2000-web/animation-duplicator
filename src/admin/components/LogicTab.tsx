import { Input } from "@/components/ui/input";
import type { AdminTool, ToolType, LogicMode } from "@/admin/types";
import { PROCESSOR_LIST } from "@/admin/types";

const TOOL_TYPES: { value: ToolType; label: string }[] = [
  { value: "calculator", label: "Calculator" },
  { value: "text-transform", label: "Text Transform" },
  { value: "generator", label: "Generator" },
  { value: "prompt-builder", label: "Prompt Builder" },
  { value: "file-tool", label: "File Tool" },
  { value: "pdf-tool", label: "PDF Tool" },
];

interface Props {
  tool: AdminTool;
  setTool: React.Dispatch<React.SetStateAction<AdminTool>>;
}

const LogicTab = ({ tool, setTool }: Props) => {
  const logic = tool.logic;

  const updateLogic = (updates: Partial<typeof logic>) => {
    setTool((prev) => ({ ...prev, logic: { ...prev.logic, ...updates } }));
  };

  // Auto-select logic mode based on tool type
  const handleToolTypeChange = (toolType: ToolType) => {
    const logicMode: LogicMode = toolType === "calculator" ? "formula" : "processor";
    updateLogic({ toolType, logicMode });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <h3 className="font-semibold text-foreground">Logic Configuration</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Tool Type</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
            value={logic.toolType}
            onChange={(e) => handleToolTypeChange(e.target.value as ToolType)}
          >
            {TOOL_TYPES.map((tt) => <option key={tt.value} value={tt.value}>{tt.label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Logic Mode</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
            value={logic.logicMode}
            onChange={(e) => updateLogic({ logicMode: e.target.value as LogicMode })}
          >
            <option value="formula">Formula</option>
            <option value="processor">Processor Selector</option>
          </select>
        </div>
      </div>

      {logic.logicMode === "formula" && (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground">Formula Editor</label>
            <p className="text-xs text-muted-foreground mb-2">
              Write simple formulas, one per line. Use field names as variables.
              <br />Example: <code className="bg-muted px-1 rounded">vatAmount = price * vat / 100</code>
            </p>
            <textarea
              className="w-full min-h-[160px] rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-foreground resize-y"
              value={logic.formula || ""}
              onChange={(e) => updateLogic({ formula: e.target.value })}
              placeholder={"vatAmount = price * vat / 100\ntotal = price + vatAmount"}
            />
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs font-medium text-foreground mb-1">Supported operations:</p>
            <p className="text-xs text-muted-foreground">+ (add), - (subtract), * (multiply), / (divide), % (modulo), parentheses</p>
            <p className="text-xs text-muted-foreground mt-1">Variables are created from your UI Builder field names (use the "name" field).</p>
          </div>
        </div>
      )}

      {logic.logicMode === "processor" && (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground">Select Processor</label>
            <p className="text-xs text-muted-foreground mb-2">Choose a predefined processor that handles the tool's logic.</p>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
              value={logic.processor || ""}
              onChange={(e) => updateLogic({ processor: e.target.value })}
            >
              <option value="">Select a processor...</option>
              {PROCESSOR_LIST.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          {logic.processor && (
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">
                ✅ Processor <strong>{logic.processor}</strong> selected. It will process the input fields and produce output automatically.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LogicTab;
