import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedTools from "@/components/FeaturedTools";
import CategoryCards from "@/components/CategoryCards";
import AllToolsGrid from "@/components/AllToolsGrid";
import WhyChoose from "@/components/WhyChoose";
import SEOSection from "@/components/SEOSection";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import DonationSection from "@/components/DonationSection";

import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

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
      <BlogSection />
      <DonationSection />
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
