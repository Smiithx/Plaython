import { cn } from "@/lib/utils";

export interface FlexContainerProps {
  /**
   * The content of the flex container
   */
  children: React.ReactNode;

  /**
   * The direction of the flex container
   * @default "row"
   */
  direction?: "row" | "column" | "row-reverse" | "column-reverse";

  /**
   * The alignment of items along the cross axis
   * @default "start"
   */
  align?: "start" | "center" | "end" | "stretch" | "baseline";

  /**
   * The alignment of items along the main axis
   * @default "start"
   */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";

  /**
   * The gap between items
   * @default "none"
   */
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Whether the container should wrap items
   * @default false
   */
  wrap?: boolean;

  /**
   * Additional CSS classes to apply to the flex container
   */
  className?: string;

  /**
   * Optional HTML element to render as the container
   * @default "div"
   */
  as?: React.ElementType;
}

/**
 * A reusable flex container component that can be used throughout the application
 * to provide a consistent way to create flex layouts.
 */
export function FlexContainer({
  children,
  direction = "row",
  align = "start",
  justify = "start",
  gap = "none",
  wrap = false,
  className,
  as: Component = "div",
}: FlexContainerProps) {
  // Direction classes
  const directionClasses = {
    row: "flex-row",
    column: "flex-col",
    "row-reverse": "flex-row-reverse",
    "column-reverse": "flex-col-reverse",
  };

  // Alignment classes
  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  };

  // Justify classes
  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  // Gap classes
  const gapClasses = {
    none: "gap-0",
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  };

  return (
    <Component
      className={cn(
        "flex",
        directionClasses[direction],
        alignClasses[align],
        justifyClasses[justify],
        gapClasses[gap],
        wrap && "flex-wrap",
        className
      )}
    >
      {children}
    </Component>
  );
}
