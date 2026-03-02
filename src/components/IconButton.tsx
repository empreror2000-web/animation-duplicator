import { cn } from "@/lib/utils";

interface IconButtonProps {
  ariaLabel: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "ghost" | "solid";
  className?: string;
}

const IconButton = ({ ariaLabel, onClick, children, variant = "ghost", className }: IconButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "[&_svg]:w-[18px] [&_svg]:h-[18px] [&_svg]:shrink-0",
        variant === "ghost"
          ? "text-foreground border border-border bg-background hover:bg-accent hover:text-accent-foreground"
          : "text-primary-foreground bg-primary hover:bg-primary/90",
        className
      )}
    >
      {children}
    </button>
  );
};

export default IconButton;
