"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/ui/button";

export interface ButtonWithIconProps extends Omit<ButtonProps, 'children'> {
  /**
   * The icon to display in the button
   */
  icon: LucideIcon;
  
  /**
   * The position of the icon
   * @default "left"
   */
  iconPosition?: "left" | "right";
  
  /**
   * The size of the icon
   * @default "default"
   */
  iconSize?: "sm" | "default" | "lg";
  
  /**
   * The text to display in the button
   */
  text?: string;
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * The text to display when the button is in a loading state
   */
  loadingText?: string;
}

/**
 * A reusable button with icon component that can be used throughout the application
 * to provide a consistent way to create buttons with icons.
 */
export function ButtonWithIcon({
  icon: Icon,
  iconPosition = "left",
  iconSize = "default",
  text,
  isLoading = false,
  loadingText,
  className,
  ...props
}: ButtonWithIconProps) {
  // Icon size classes
  const iconSizeClasses = {
    sm: "h-3 w-3",
    default: "h-4 w-4",
    lg: "h-5 w-5",
  };
  
  // Determine the content to display based on loading state
  const displayText = isLoading && loadingText ? loadingText : text;
  
  return (
    <Button
      className={cn(
        "flex items-center",
        !text && "p-2",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className={cn("animate-spin", iconSizeClasses[iconSize], text && "mr-2")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          {displayText}
        </>
      ) : (
        <>
          {iconPosition === "left" && (
            <Icon className={cn(iconSizeClasses[iconSize], text && "mr-2")} />
          )}
          {text}
          {iconPosition === "right" && (
            <Icon className={cn(iconSizeClasses[iconSize], text && "ml-2")} />
          )}
        </>
      )}
    </Button>
  );
}