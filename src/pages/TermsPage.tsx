import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-6">Terms of Service</h1>
      <p className="text-muted-foreground leading-relaxed">
        Welcome to WinoxTools. By using our website and tools, you agree to the following terms and conditions. All tools are provided "as is" without warranty. We reserve the right to modify or discontinue any tool at any time. Please use our tools responsibly and in accordance with applicable laws.
      </p>
    </div>
    <Footer />
  </div>
);

export default TermsPage;
