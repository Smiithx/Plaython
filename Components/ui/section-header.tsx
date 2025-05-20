import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  /**
   * The title of the section
   */
  title: string;

  /**
   * Optional subtitle or description
   */
  subtitle?: string;

  /**
   * Optional icon to display before the title
   */
  icon?: LucideIcon;

  /**
   * Optional accent color for the title
   * @default "default"
   */
  accentColor?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";

  /**
   * Additional CSS classes to apply to the section header
   */
  className?: string;

  /**
   * Optional content to display on the right side of the header
   */
  rightContent?: React.ReactNode;
}

/**
 * A reusable section header component that can be used throughout the application
 * to provide a consistent style for section headers.
 */
export function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  accentColor = "default",
  className,
  rightContent,
}: SectionHeaderProps) {
  // Accent color classes for the title
  const accentColorClasses = {
    default: "text-white",
    primary: "text-blue-400",
    secondary: "text-purple-400",
    success: "text-green-400",
    warning: "text-yellow-400",
    danger: "text-red-400",
  };

  return (
    <div className={cn("flex justify-between items-center mb-6", className)}>
      <div className="flex items-center">
        {Icon && (
          <Icon className={cn("mr-2 h-6 w-6", accentColorClasses[accentColor])} />
        )}
        <div>
          <h2 className={cn("text-2xl font-bold", accentColorClasses[accentColor])}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      {rightContent && (
        <div className="flex items-center">
          {rightContent}
        </div>
      )}
    </div>
  );
}
