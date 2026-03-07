export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "checkbox"
  | "radio"
  | "file"
  | "multifile"
  | "output"
  | "result"
  | "button";

export interface FieldOption {
  label: string;
  value: string;
}

export interface ToolField {
  id: string;
  label: string;
  name: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  options?: FieldOption[];
  helpText?: string;
}

export type ToolType =
  | "calculator"
  | "text-transform"
  | "generator"
  | "prompt-builder"
  | "file-tool"
  | "pdf-tool";

export type LogicMode = "formula" | "processor";

export interface ToolLogic {
  toolType: ToolType;
  logicMode: LogicMode;
  formula?: string; // e.g. "vatAmount = price * vat / 100\ntotal = price + vatAmount"
  processor?: string; // e.g. "jsonFormatter"
  processorSettings?: Record<string, string>;
}

export interface ToolSEO {
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
}

export interface AdminTool {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  longDescription?: string;
  icon: string;
  featuredImage?: string;
  status: "draft" | "published";
  enabled: boolean;
  featured: boolean;
  sortOrder: number;
  fields: ToolField[];
  logic: ToolLogic;
  seo: ToolSEO;
  createdAt: string;
  updatedAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  sortOrder: number;
}

export const DEFAULT_CATEGORIES: AdminCategory[] = [
  { id: "dev", name: "Dev Tools", slug: "dev", description: "Essential utilities for developers", icon: "Code", color: "cat-dev", sortOrder: 0 },
  { id: "student", name: "Student Tools", slug: "student", description: "Calculators & study helpers", icon: "GraduationCap", color: "cat-student", sortOrder: 1 },
  { id: "business", name: "Business Tools", slug: "business", description: "Finance & business calculators", icon: "Briefcase", color: "cat-business", sortOrder: 2 },
  { id: "prompt", name: "Prompt Tools", slug: "prompt", description: "AI prompt generators & improvers", icon: "Sparkles", color: "cat-prompt", sortOrder: 3 },
  { id: "pdf", name: "PDF Tools", slug: "pdf", description: "Convert, edit & manage PDFs", icon: "FileText", color: "cat-pdf", sortOrder: 4 },
];

export const PROCESSOR_LIST = [
  { value: "jsonFormatter", label: "JSON Formatter" },
  { value: "base64Encode", label: "Base64 Encode" },
  { value: "base64Decode", label: "Base64 Decode" },
  { value: "uuidGenerator", label: "UUID Generator" },
  { value: "regexTester", label: "Regex Tester" },
  { value: "timestampConverter", label: "Timestamp Converter" },
  { value: "hashGenerator", label: "Hash Generator (SHA-256)" },
  { value: "gpaCalculator", label: "GPA Calculator" },
  { value: "finalGradeCalculator", label: "Final Grade Calculator" },
  { value: "percentageCalculator", label: "Percentage Calculator" },
  { value: "pomodoroTimer", label: "Pomodoro Timer" },
  { value: "invoiceGenerator", label: "Invoice Generator" },
  { value: "profitMarginCalculator", label: "Profit Margin Calculator" },
  { value: "vatCalculator", label: "VAT Calculator" },
  { value: "roiCalculator", label: "ROI Calculator" },
  { value: "promptGenerator", label: "Prompt Generator" },
  { value: "promptImprover", label: "Prompt Improver" },
  { value: "midjourneyPromptBuilder", label: "Midjourney Prompt Builder" },
  { value: "youtubeScriptPrompt", label: "YouTube Script Prompt" },
  { value: "imageToPdf", label: "Image to PDF" },
  { value: "rotatePdf", label: "Rotate PDF" },
  { value: "splitPdf", label: "Split PDF" },
  { value: "pdfToImage", label: "PDF to Image" },
] as const;

export const ICON_OPTIONS = [
  "Braces", "Lock", "Fingerprint", "Search", "Clock", "Hash",
  "Calculator", "Target", "Percent", "Timer",
  "Receipt", "TrendingUp", "BadgePercent", "LineChart",
  "Wand2", "Sparkles", "Image", "Video",
  "ImagePlus", "FileImage", "RotateCw", "Scissors",
  "Code", "GraduationCap", "Briefcase", "FileText",
  "Settings", "Zap", "Globe", "Shield", "Star", "Heart",
  "Download", "Upload", "RefreshCw", "Type", "AlignLeft",
];
