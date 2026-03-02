import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedTools from "@/components/FeaturedTools";
import CategoryCards from "@/components/CategoryCards";
import AllToolsGrid from "@/components/AllToolsGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedTools />
      <CategoryCards />
      <AllToolsGrid />
      <Footer />
    </div>
  );
};

export default Index;
