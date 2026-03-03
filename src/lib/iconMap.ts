import {
  Braces, Lock, Fingerprint, Search, Clock, Hash,
  Calculator, Target, Percent, Timer,
  Receipt, TrendingUp, BadgePercent, LineChart,
  Wand2, Sparkles, Image, Video,
  ImagePlus, FileImage, RotateCw, Scissors,
  Code, GraduationCap, Briefcase, FileText,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Braces, Lock, Fingerprint, Search, Clock, Hash,
  Calculator, Target, Percent, Timer,
  Receipt, TrendingUp, BadgePercent, LineChart,
  Wand2, Sparkles, Image, Video,
  ImagePlus, FileImage, RotateCw, Scissors,
  Code, GraduationCap, Briefcase, FileText,
};

export const getToolIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || FileText;
};
