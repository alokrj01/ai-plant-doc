import React from "react";

export const Badge = ({ children, variant = "default", className = "", ...props }) => {
  
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    primary: "bg-green-50 text-green-700 border-green-200/60",
    destructive: "bg-red-50 text-red-700 border-red-200/60",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    warning: "bg-amber-50 text-amber-700 border-amber-200/60",
    blue: "bg-blue-50 text-blue-700 border-blue-200/60",
  };

  
  const colorMap = {
    gray: "default",
    red: "destructive",
    green: "success",
    blue: "blue",
    yellow: "warning",
  };

  const selectedVariant = variants[variants[variant] ? variant : colorMap[variant]] || variants.default;

  return (
    <div
      className={`inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-semibold tracking-wide rounded-full border transition-colors focus:outline-none ${selectedVariant} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};