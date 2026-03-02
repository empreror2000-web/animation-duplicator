import { Heart, Coffee, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const amounts = [5, 10, 25, 50, 100];

const DonationPage = () => {
  const [selected, setSelected] = useState<number | null>(10);
  const [custom, setCustom] = useState("");
  const navigate = useNavigate();

  const handleDonate = () => {
    const amount = selected || Number(custom);
    if (!amount || amount <= 0) {
      toast.error("Please select or enter a donation amount");
      return;
    }
    toast.success(`Thank you for your $${amount} donation! 💖`, {
      description: "Your support helps us keep all tools free.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6 animate-fade-up">
          <Heart className="w-10 h-10 text-destructive" />
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-3 animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
          Support WinoxTools
        </h1>
        <p className="text-lg text-muted-foreground mb-10 animate-fade-up opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
          Help us keep all tools completely free for everyone
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: Coffee, text: "Keep Tools Free" },
            { icon: Star, text: "Fund New Features" },
            { icon: Sparkles, text: "Support the Team" },
          ].map((item, i) => (
            <div
              key={item.text}
              className="bg-muted rounded-xl p-4 flex flex-col items-center gap-2 animate-fade-up opacity-0"
              style={{ animationDelay: `${300 + i * 100}ms`, animationFillMode: "forwards" }}
            >
              <item.icon className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-foreground">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6 animate-fade-up opacity-0" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
          <h3 className="font-semibold text-foreground mb-4">Choose an amount</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => { setSelected(amt); setCustom(""); }}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  selected === amt
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-muted text-foreground hover:bg-accent"
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs mx-auto mb-6">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
            <input
              type="number"
              placeholder="Custom amount"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button onClick={handleDonate} size="lg" className="w-full max-w-xs rounded-xl">
            <Heart className="w-4 h-4 mr-2" />
            Donate {selected ? `$${selected}` : custom ? `$${custom}` : ""}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          All donations are processed securely. Thank you for your generosity! 💖
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default DonationPage;
