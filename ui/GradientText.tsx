import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
