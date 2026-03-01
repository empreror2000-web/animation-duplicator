import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryCards from "@/components/CategoryCards";
import StatsSection from "@/components/StatsSection";
import PopularTools from "@/components/PopularTools";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategoryCards />
      <StatsSection />
      <PopularTools />
      <Footer />
    </div>
  );
};

export default Index;
