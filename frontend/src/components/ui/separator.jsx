import React from "react";

export const Separator = ({ 
  className = "", 
  orientation = "horizontal", // "horizontal" ya "vertical" support karta hai
  ...props 
}) => {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`
        shrink-0 bg-gray-200/80 transition-all duration-300
        ${orientation === "horizontal" ? "h-[1px] w-full my-6" : "h-full min-h-[1rem] w-[1px] mx-6"}
        ${className}
      `}
      {...props}
    />
  );
};