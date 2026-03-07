/**
 * Processor registry — predefined safe logic functions.
 * Each processor receives an object of field values and returns results.
 */

type ProcessorFn = (inputs: Record<string, string>) => Record<string, string>;

function jsonFormatter(inputs: Record<string, string>): Record<string, string> {
  try {
    const parsed = JSON.parse(inputs.input || "");
    return { output: JSON.stringify(parsed, null, 2) };
  } catch (e: any) {
    return { output: `Error: ${e.message}` };
  }
}

function base64Encode(inputs: Record<string, string>): Record<string, string> {
  try { return { output: btoa(inputs.input || "") }; }
  catch { return { output: "Error: Invalid input" }; }
}

function base64Decode(inputs: Record<string, string>): Record<string, string> {
  try { return { output: atob(inputs.input || "") }; }
  catch { return { output: "Error: Invalid Base64" }; }
}

function uuidGenerator(): Record<string, string> {
  const uuid = crypto.randomUUID?.() || "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return { output: uuid };
}

function regexTester(inputs: Record<string, string>): Record<string, string> {
  try {
    const regex = new RegExp(inputs.pattern || "", inputs.flags || "g");
    const matches = (inputs.input || "").match(regex);
    return { output: matches ? matches.join("\n") : "No matches found" };
  } catch (e: any) {
    return { output: `Error: ${e.message}` };
  }
}

function timestampConverter(inputs: Record<string, string>): Record<string, string> {
  const ts = Number(inputs.input || "0");
  if (isNaN(ts)) return { output: "Invalid timestamp" };
  const isMs = ts > 1e12;
  const date = new Date(isMs ? ts : ts * 1000);
  return {
    output: `UTC: ${date.toUTCString()}\nISO: ${date.toISOString()}\nLocal: ${date.toLocaleString()}`,
  };
}

async function hashGenerator(inputs: Record<string, string>): Promise<Record<string, string>> {
  const text = inputs.input || "";
  const enc = new TextEncoder();
  const data = enc.encode(text);
  try {
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return { output: hex };
  } catch {
    return { output: "Hashing not supported in this environment" };
  }
}

function percentageCalculator(inputs: Record<string, string>): Record<string, string> {
  const value = parseFloat(inputs.value || "0");
  const total = parseFloat(inputs.total || "0");
  if (total === 0) return { output: "Total cannot be zero" };
  return { output: `${((value / total) * 100).toFixed(2)}%` };
}

function profitMarginCalculator(inputs: Record<string, string>): Record<string, string> {
  const cost = parseFloat(inputs.cost || "0");
  const revenue = parseFloat(inputs.revenue || "0");
  if (revenue === 0) return { output: "Revenue cannot be zero" };
  const margin = ((revenue - cost) / revenue) * 100;
  return { output: `Profit Margin: ${margin.toFixed(2)}%\nProfit: ${(revenue - cost).toFixed(2)}` };
}

function vatCalculator(inputs: Record<string, string>): Record<string, string> {
  const price = parseFloat(inputs.price || "0");
  const vat = parseFloat(inputs.vat || "20");
  const vatAmount = price * vat / 100;
  return { output: `VAT Amount: ${vatAmount.toFixed(2)}\nTotal: ${(price + vatAmount).toFixed(2)}` };
}

function roiCalculator(inputs: Record<string, string>): Record<string, string> {
  const investment = parseFloat(inputs.investment || "0");
  const returnVal = parseFloat(inputs.returnValue || "0");
  if (investment === 0) return { output: "Investment cannot be zero" };
  const roi = ((returnVal - investment) / investment) * 100;
  return { output: `ROI: ${roi.toFixed(2)}%\nNet Profit: ${(returnVal - investment).toFixed(2)}` };
}

function gpaCalculator(inputs: Record<string, string>): Record<string, string> {
  try {
    const grades = (inputs.grades || "").split(",").map((g) => parseFloat(g.trim())).filter((g) => !isNaN(g));
    if (grades.length === 0) return { output: "Enter grades separated by commas" };
    const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
    return { output: `GPA: ${avg.toFixed(2)} (from ${grades.length} courses)` };
  } catch {
    return { output: "Invalid input" };
  }
}

function finalGradeCalculator(inputs: Record<string, string>): Record<string, string> {
  const current = parseFloat(inputs.currentGrade || "0");
  const desired = parseFloat(inputs.desiredGrade || "0");
  const weight = parseFloat(inputs.finalWeight || "0");
  if (weight === 0) return { output: "Final weight cannot be zero" };
  const needed = (desired - current * (1 - weight / 100)) / (weight / 100);
  return { output: `You need: ${needed.toFixed(2)} on your final exam` };
}

function promptGenerator(inputs: Record<string, string>): Record<string, string> {
  const topic = inputs.topic || "general";
  const tone = inputs.tone || "professional";
  const length = inputs.length || "medium";
  return {
    output: `Act as an expert in ${topic}. Write a ${length}-length, ${tone} response about ${topic}. Be specific, provide examples, and structure your answer clearly with headers and bullet points.`,
  };
}

function promptImprover(inputs: Record<string, string>): Record<string, string> {
  const prompt = inputs.input || "";
  return {
    output: `Improved prompt:\n\n"${prompt}"\n\n→ Be specific about your desired output format\n→ Add context about your target audience\n→ Specify the tone and style\n→ Include examples if possible\n→ Define constraints and requirements`,
  };
}

function midjourneyPromptBuilder(inputs: Record<string, string>): Record<string, string> {
  const subject = inputs.subject || "";
  const style = inputs.style || "photorealistic";
  const mood = inputs.mood || "cinematic";
  return {
    output: `/imagine prompt: ${subject}, ${style} style, ${mood} mood, highly detailed, 8k resolution --ar 16:9 --v 6`,
  };
}

function youtubeScriptPrompt(inputs: Record<string, string>): Record<string, string> {
  const topic = inputs.topic || "";
  const duration = inputs.duration || "10";
  return {
    output: `Write a YouTube script about "${topic}" for a ${duration}-minute video.\n\nStructure:\n1. Hook (first 30 seconds)\n2. Introduction\n3. Main content (3-5 key points)\n4. Call to action\n5. Outro\n\nTone: Engaging, conversational, informative`,
  };
}

// Sync processor map
const syncProcessors: Record<string, ProcessorFn> = {
  jsonFormatter,
  base64Encode,
  base64Decode,
  uuidGenerator: () => uuidGenerator(),
  regexTester,
  timestampConverter,
  percentageCalculator,
  profitMarginCalculator,
  vatCalculator,
  roiCalculator,
  gpaCalculator,
  finalGradeCalculator,
  promptGenerator,
  promptImprover,
  midjourneyPromptBuilder,
  youtubeScriptPrompt,
  // File/PDF tools return instructions since they need browser APIs
  imageToPdf: () => ({ output: "Select images above to convert to PDF" }),
  rotatePdf: () => ({ output: "Upload a PDF to rotate pages" }),
  splitPdf: () => ({ output: "Upload a PDF to split" }),
  pdfToImage: () => ({ output: "Upload a PDF to convert to images" }),
  invoiceGenerator: (inputs) => ({
    output: `Invoice #${Date.now().toString(36).toUpperCase()}\n\nFrom: ${inputs.from || "Your Company"}\nTo: ${inputs.to || "Client"}\nAmount: $${inputs.amount || "0"}\nDate: ${new Date().toLocaleDateString()}\n\nStatus: Generated`,
  }),
  pomodoroTimer: () => ({ output: "Timer functionality — use the start button to begin a 25-minute focus session." }),
};

// Async processor map (for hash etc.)
const asyncProcessors: Record<string, (inputs: Record<string, string>) => Promise<Record<string, string>>> = {
  hashGenerator,
};

export async function runProcessor(
  processorName: string,
  inputs: Record<string, string>
): Promise<Record<string, string>> {
  if (asyncProcessors[processorName]) {
    return asyncProcessors[processorName](inputs);
  }
  if (syncProcessors[processorName]) {
    return syncProcessors[processorName](inputs);
  }
  return { output: `Unknown processor: ${processorName}` };
}

export function getProcessorNames(): string[] {
  return [...Object.keys(syncProcessors), ...Object.keys(asyncProcessors)];
}
