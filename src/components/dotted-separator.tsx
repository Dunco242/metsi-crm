"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface DottedSeparatorProps {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: "horizontal" | "vertical";
}

export const DottedSeparator = ({
  className,
  color,
  height = "2px",
  dotSize = "2px",
  gapSize = "2px",
  direction = "horizontal",
}: DottedSeparatorProps) => {
  const isHorizontal = direction === "horizontal";

  // Dynamically determine dark/light mode if no color prop is passed
  const { resolvedTheme } = useTheme();
  const [effectiveColor, setEffectiveColor] = useState(color || "#d4d4d8"); // default gray-300

  useEffect(() => {
    if (!color) {
      if (resolvedTheme === "dark") {
        setEffectiveColor("#4c1d95"); // purple-900 or similar
      } else {
        setEffectiveColor("#d4d4d8"); // gray-300
      }
    }
  }, [resolvedTheme, color]);

  return (
    <div
      className={cn(
        isHorizontal ? "w-full flex items-center" : "h-full flex flex-col items-center",
        className
      )}
    >
      <div
        className={isHorizontal ? "flex-grow" : "flex-grow-0"}
        style={{
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
          backgroundImage: `radial-gradient(circle, ${effectiveColor} 25%, transparent 25%)`,
          backgroundSize: isHorizontal
            ? `${parseInt(dotSize) + parseInt(gapSize)}px ${height}`
            : `${height} ${parseInt(dotSize) + parseInt(gapSize)}px`,
          backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
