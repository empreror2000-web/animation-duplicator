import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedTools from "@/components/FeaturedTools";
import CategoryCards from "@/components/CategoryCards";
import AllToolsGrid from "@/components/AllToolsGrid";
import WhyChoose from "@/components/WhyChoose";
import SEOSection from "@/components/SEOSection";
import FAQSection from "@/components/FAQSection";
import DonationSection from "@/components/DonationSection";
import SocialSection from "@/components/SocialSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedTools />
      <CategoryCards />
      <AllToolsGrid />
      <WhyChoose />
      <SEOSection />
      <FAQSection />
      <DonationSection />
      <SocialSection />
      <Footer />
    </div>
  );
};

export default Index;
