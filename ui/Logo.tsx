export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-9 w-9 text-sm",
    md: "h-14 w-14 text-xl",
    lg: "h-14 w-14 text-xl",
  };

  return (
    <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 ${sizes[size]}`}>
      <span className="font-bold text-white">N</span>
    </div>
  );
}
