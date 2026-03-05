import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MoreScriptsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-6">More Scripts</h1>
      <p className="text-muted-foreground leading-relaxed">
        Explore additional scripts and utilities provided by WinoxTools. More content coming soon — stay tuned!
      </p>
    </div>
    <Footer />
  </div>
);

export default MoreScriptsPage;
