

## Problems Identified

### Problem 1: Category Cards Blank/Invisible
The category cards use `bg-${cat.color}` with dynamic class names like `bg-cat-dev`. Tailwind purges these because they're constructed dynamically. The cards also use `text-primary-foreground` which is white — so on a white/missing background, everything is invisible. The `opacity-0` in the className combined with `animate-fade-up` is supposed to animate in, but the dual animation in the `style` prop may conflict.

**Root cause**: Dynamic Tailwind classes (`bg-${cat.color}`) are purged at build time. The background never applies, so white text on white background = invisible.

### Problem 2: Tool Cards Missing Icons
Tool cards in `AllToolsGrid`, `FeaturedTools`, `CategoryPage`, and `SearchPage` don't render the tool's icon at all — there's no icon import or rendering logic despite each tool having an `icon` field in the data.

---

## Plan

### Fix 1: CategoryCards.tsx
- Replace dynamic `bg-${cat.color}` with a lookup map of full Tailwind classes (e.g., `{ dev: "bg-cat-dev", student: "bg-cat-student", ... }`) so classes aren't purged
- Remove conflicting `opacity-0` from className (the style prop animation handles fade-in)
- Keep `text-primary-foreground` (white) since backgrounds will now render correctly
- Ensure text, badge, and icon are all visible by default

### Fix 2: Add Icons to Tool Cards
- Create a shared icon lookup map in a utility or directly in components, mapping the `icon` string from tool data to actual Lucide components
- Add icon badge rendering to all 4 tool card locations:
  - `AllToolsGrid.tsx`
  - `FeaturedTools.tsx`  
  - `CategoryPage.tsx`
  - `SearchPage.tsx`
- Icon badge: 40px rounded-xl container with subtle category-tinted background, Lucide icon inside at 20px with proper contrast colors

### Files to modify:
1. **`src/components/CategoryCards.tsx`** — fix background color map, remove opacity-0
2. **`src/components/AllToolsGrid.tsx`** — add icon imports + icon badge to each card
3. **`src/components/FeaturedTools.tsx`** — same icon badge addition
4. **`src/pages/CategoryPage.tsx`** — same icon badge addition
5. **`src/pages/SearchPage.tsx`** — same icon badge addition

