import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DonationSection = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-16 bg-muted/30">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-5">
          <Heart className="w-8 h-8 text-destructive" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Support WinoxTools
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
          WinoxTools is free for everyone. If our tools have saved you time, consider supporting us so we can keep building and improving. Every contribution helps!
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://paypal.me/winoxtools"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Heart className="w-4 h-4" />
            Donate via PayPal
          </a>
          <a
            href="https://buymeacoffee.com/winoxtools"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-accent transition-colors"
          >
            ☕ Buy Me a Coffee
          </a>
          <Button
            variant="outline"
            className="rounded-xl px-6 py-3 h-auto"
            onClick={() => navigate("/donation")}
          >
            More Options →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
