import { AdminTool, AdminCategory, DEFAULT_CATEGORIES } from "./types";

const TOOLS_KEY = "winox_admin_tools";
const CATEGORIES_KEY = "winox_admin_categories";
const INITIALIZED_KEY = "winox_admin_initialized";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ── Categories ──────────────────────────────────────
export function getCategories(): AdminCategory[] {
  return read<AdminCategory[]>(CATEGORIES_KEY, []);
}

export function saveCategories(cats: AdminCategory[]) {
  write(CATEGORIES_KEY, cats);
}

export function addCategory(cat: AdminCategory) {
  const cats = getCategories();
  cats.push(cat);
  saveCategories(cats);
}

export function updateCategory(cat: AdminCategory) {
  const cats = getCategories().map((c) => (c.id === cat.id ? cat : c));
  saveCategories(cats);
}

export function deleteCategory(id: string) {
  saveCategories(getCategories().filter((c) => c.id !== id));
}

// ── Tools ───────────────────────────────────────────
export function getTools(): AdminTool[] {
  return read<AdminTool[]>(TOOLS_KEY, []);
}

export function saveTools(tools: AdminTool[]) {
  write(TOOLS_KEY, tools);
}

export function addTool(tool: AdminTool) {
  const tools = getTools();
  tools.push(tool);
  saveTools(tools);
}

export function updateTool(tool: AdminTool) {
  const tools = getTools().map((t) => (t.id === tool.id ? tool : t));
  saveTools(tools);
}

export function deleteTool(id: string) {
  saveTools(getTools().filter((t) => t.id !== id));
}

export function getToolBySlug(slug: string): AdminTool | undefined {
  return getTools().find((t) => t.slug === slug);
}

export function getPublishedTools(): AdminTool[] {
  return getTools().filter((t) => t.status === "published" && t.enabled);
}

export function getPublishedToolsByCategory(categoryId: string): AdminTool[] {
  return getPublishedTools().filter((t) => t.categoryId === categoryId);
}

// ── Init ────────────────────────────────────────────
export function initializeStore() {
  if (localStorage.getItem(INITIALIZED_KEY)) return;
  saveCategories(DEFAULT_CATEGORIES);
  saveTools([]);
  localStorage.setItem(INITIALIZED_KEY, "1");
}
