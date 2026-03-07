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
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import NotFound from "./pages/NotFound";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import MoreScriptsPage from "./pages/MoreScriptsPage";
import SitemapPage from "./pages/SitemapPage";

// Admin
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminToolsList from "./admin/pages/AdminToolsList";
import AdminToolEditor from "./admin/pages/AdminToolEditor";
import AdminCategories from "./admin/pages/AdminCategories";

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
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/more-scripts" element={<MoreScriptsPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="tools" element={<AdminToolsList />} />
            <Route path="tools/:id" element={<AdminToolEditor />} />
            <Route path="categories" element={<AdminCategories />} />
          </Route>
          {/* Tool routes */}
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
