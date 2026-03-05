import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground leading-relaxed">
        At WinoxTools, your privacy is important to us. We process data client-side whenever possible and do not require user accounts. We do not sell or share personal data with third parties. For questions, contact us at support@Winox.store.
      </p>
    </div>
    <Footer />
  </div>
);

export default PrivacyPage;
