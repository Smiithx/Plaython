import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingSpinnerProps {
  /**
   * The size of the spinner
   * @default "default"
   */
  size?: "sm" | "default" | "lg";

  /**
   * The text to display next to the spinner
   */
  text?: string;

  /**
   * Whether to center the spinner in its container
   * @default false
   */
  centered?: boolean;

  /**
   * Additional CSS classes to apply to the spinner container
   */
  className?: string;
}

/**
 * A reusable loading spinner component that can be used throughout the application
 * to provide a consistent loading indicator.
 */
export function LoadingSpinner({
  size = "default",
  text,
  centered = false,
  className,
}: LoadingSpinnerProps) {
  // Size classes for the spinner
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
  };

  // Container classes
  const containerClasses = cn(
    "flex items-center",
    centered && "justify-center",
    className
  );

  return (
    <div className={containerClasses}>
      <Loader2 
        className={cn(
          sizeClasses[size],
          "text-primary animate-spin",
          text && "mr-2"
        )} 
      />
      {text && (
        <span className="text-muted-foreground">{text}</span>
      )}
    </div>
  );
}
