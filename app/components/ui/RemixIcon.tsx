import { cn } from "~/lib/utils";

interface RemixIconProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function RemixIcon({ className, size = "md" }: RemixIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  return (
    <div className={cn("inline-flex items-center justify-center", sizeClasses[size], className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Simple "R" design */}
        <path
          d="M6 4h8c2.21 0 4 1.79 4 4 0 1.5-.83 2.8-2.06 3.5L18 16h-2.5l-1.94-4H8v4H6V4zm2 2v4h6c1.1 0 2-.9 2-2s-.9-2-2-2H8z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

// Alternative minimalist "R" icon
export function SimpleRemixIcon({ className, size = "md" }: RemixIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center justify-center rounded font-bold text-white bg-gradient-to-br from-gray-600 to-gray-800",
        sizeClasses[size], 
        className
      )}
    >
      R
    </div>
  );
}
