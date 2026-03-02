export type ToolCategory = "dev" | "student" | "business" | "prompt" | "pdf";

export interface Tool {
  name: string;
  slug: string;
  category: ToolCategory;
  description: string;
  icon: string;
  route: string;
}

export const categories: Record<ToolCategory, { label: string; description: string; icon: string; route: string; color: string }> = {
  dev: {
    label: "Dev Tools",
    description: "Essential utilities for developers",
    icon: "Code",
    route: "/dev-tools",
    color: "cat-dev",
  },
  student: {
    label: "Student Tools",
    description: "Calculators & study helpers",
    icon: "GraduationCap",
    route: "/student-tools",
    color: "cat-student",
  },
  business: {
    label: "Business Tools",
    description: "Finance & business calculators",
    icon: "Briefcase",
    route: "/business-tools",
    color: "cat-business",
  },
  prompt: {
    label: "Prompt Tools",
    description: "AI prompt generators & improvers",
    icon: "Sparkles",
    route: "/prompt-tools",
    color: "cat-prompt",
  },
  pdf: {
    label: "PDF Tools",
    description: "Convert, edit & manage PDFs",
    icon: "FileText",
    route: "/pdf-tools",
    color: "cat-pdf",
  },
};

export const tools: Tool[] = [
  // Dev Tools
  { name: "JSON Formatter", slug: "json-formatter", category: "dev", description: "Format & beautify JSON data", icon: "Braces", route: "/dev-tools/json-formatter" },
  { name: "Base64 Encoder", slug: "base64-encoder", category: "dev", description: "Encode & decode Base64 strings", icon: "Lock", route: "/dev-tools/base64-encoder" },
  { name: "UUID Generator", slug: "uuid-generator", category: "dev", description: "Generate unique UUIDs instantly", icon: "Fingerprint", route: "/dev-tools/uuid-generator" },
  { name: "Regex Tester", slug: "regex-tester", category: "dev", description: "Test & debug regular expressions", icon: "Search", route: "/dev-tools/regex-tester" },
  { name: "Timestamp Converter", slug: "timestamp-converter", category: "dev", description: "Convert Unix timestamps to dates", icon: "Clock", route: "/dev-tools/timestamp-converter" },
  { name: "Hash Generator", slug: "hash-generator", category: "dev", description: "Generate MD5, SHA-1, SHA-256 hashes", icon: "Hash", route: "/dev-tools/hash-generator" },

  // Student Tools
  { name: "GPA Calculator", slug: "gpa-calculator", category: "student", description: "Calculate your GPA easily", icon: "Calculator", route: "/student-tools/gpa-calculator" },
  { name: "Final Grade Calculator", slug: "final-grade-calculator", category: "student", description: "Find the grade you need on your final", icon: "Target", route: "/student-tools/final-grade-calculator" },
  { name: "Percentage Calculator", slug: "percentage-calculator", category: "student", description: "Calculate percentages instantly", icon: "Percent", route: "/student-tools/percentage-calculator" },
  { name: "Pomodoro Timer", slug: "pomodoro-timer", category: "student", description: "Stay focused with timed study sessions", icon: "Timer", route: "/student-tools/pomodoro-timer" },

  // Business Tools
  { name: "Invoice Generator", slug: "invoice-generator", category: "business", description: "Create professional invoices", icon: "Receipt", route: "/business-tools/invoice-generator" },
  { name: "Profit Margin Calculator", slug: "profit-margin-calculator", category: "business", description: "Calculate profit margins quickly", icon: "TrendingUp", route: "/business-tools/profit-margin-calculator" },
  { name: "VAT Calculator", slug: "vat-calculator", category: "business", description: "Calculate VAT & sales tax", icon: "BadgePercent", route: "/business-tools/vat-calculator" },
  { name: "ROI Calculator", slug: "roi-calculator", category: "business", description: "Calculate return on investment", icon: "LineChart", route: "/business-tools/roi-calculator" },

  // Prompt Tools
  { name: "Prompt Generator", slug: "prompt-generator", category: "prompt", description: "Generate AI prompts for any task", icon: "Wand2", route: "/prompt-tools/prompt-generator" },
  { name: "Prompt Improver", slug: "prompt-improver", category: "prompt", description: "Enhance & refine your prompts", icon: "Sparkles", route: "/prompt-tools/prompt-improver" },
  { name: "Midjourney Prompt Builder", slug: "midjourney-prompt-builder", category: "prompt", description: "Build optimized Midjourney prompts", icon: "Image", route: "/prompt-tools/midjourney-prompt-builder" },
  { name: "YouTube Script Prompt", slug: "youtube-script-prompt", category: "prompt", description: "Generate YouTube script outlines", icon: "Video", route: "/prompt-tools/youtube-script-prompt" },

  // PDF Tools
  { name: "Image to PDF", slug: "image-to-pdf", category: "pdf", description: "Convert images to PDF files", icon: "ImagePlus", route: "/pdf-tools/image-to-pdf" },
  { name: "PDF to Image", slug: "pdf-to-image", category: "pdf", description: "Convert PDF pages to images", icon: "FileImage", route: "/pdf-tools/pdf-to-image" },
  { name: "Rotate PDF", slug: "rotate-pdf", category: "pdf", description: "Rotate PDF pages easily", icon: "RotateCw", route: "/pdf-tools/rotate-pdf" },
  { name: "Split PDF", slug: "split-pdf", category: "pdf", description: "Split PDF into multiple files", icon: "Scissors", route: "/pdf-tools/split-pdf" },
];

export const getToolsByCategory = (category: ToolCategory): Tool[] =>
  tools.filter((t) => t.category === category);

export const getFeaturedTools = (): Tool[] => [
  tools[0],  // JSON Formatter
  tools[6],  // GPA Calculator
  tools[10], // Invoice Generator
  tools[14], // Prompt Generator
  tools[18], // Image to PDF
  tools[2],  // UUID Generator
];
