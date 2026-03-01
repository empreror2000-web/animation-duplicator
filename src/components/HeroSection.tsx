import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const rotatingWords = ["Your Life", "Business", "Everything", "Education"];

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
        setIsAnimating(false);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-8 px-4">
      {/* Floating decorative elements */}
      <div className="absolute top-16 left-[15%] w-4 h-4 rounded-full bg-cat-pdf/40 animate-float" />
      <div className="absolute top-24 right-[20%] w-3 h-3 rounded-full bg-cat-video/40 animate-float-slow animation-delay-400" />
      <div className="absolute top-40 left-[10%] w-5 h-5 rotate-45 bg-cat-write/30 animate-float animation-delay-600" />
      <div className="absolute top-12 right-[10%] w-4 h-4 rotate-45 bg-cat-image/30 animate-float-slow animation-delay-200" />
      <div className="absolute bottom-20 left-[25%] w-3 h-3 rounded-full bg-cat-file/40 animate-float animation-delay-800" />
      <div className="absolute bottom-10 right-[30%] w-5 h-5 rotate-45 bg-cat-pdf/20 animate-float-slow animation-delay-1000" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
          Free Tools to Make{" "}
          <span className="inline-block relative">
            <span
              className={`inline-block px-4 py-1 rounded-xl bg-primary text-primary-foreground transition-all duration-300 ${
                isAnimating
                  ? "opacity-0 translate-y-2 scale-95"
                  : "opacity-100 translate-y-0 scale-100"
              }`}
            >
              {rotatingWords[currentWord]}
            </span>
          </span>{" "}
          Simple
        </h1>

        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          We offer PDF, video, image and other online tools to make your life easier
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <div className="flex items-center bg-background border-2 border-border rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
            <Search className="ml-4 w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-4 py-3.5 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
            />
            <Button className="m-1.5 rounded-xl px-6">Search</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
