import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Donation from "./pages/Donation";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import ToolPage from "./pages/ToolPage";
import ToolsCategory from "./pages/ToolsCategory";
import ToolsPage from "./pages/ToolsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/donation" element={<Donation />} />
          {/* New /tools routes */}
          <Route path="/tools/:category" element={<ToolsCategory />} />
          <Route path="/tools/:category/:slug" element={<ToolsPage />} />
          {/* Legacy category routes */}
          <Route path="/dev-tools" element={<CategoryPage category="dev" />} />
          <Route path="/student-tools" element={<CategoryPage category="student" />} />
          <Route path="/business-tools" element={<CategoryPage category="business" />} />
          <Route path="/prompt-tools" element={<CategoryPage category="prompt" />} />
          <Route path="/pdf-tools" element={<CategoryPage category="pdf" />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:category/:tool" element={<ToolPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
