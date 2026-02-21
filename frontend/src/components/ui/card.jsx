import React from "react";

// 1. Main Card Container (Glassmorphism & Soft Shadow)
export const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// 2. Card Header (Proper Spacing & Flexbox)
export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 md:p-8 pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// 3. Card Title (Bold & Tight Typography)
export const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <h3 className={`text-2xl font-bold tracking-tight text-gray-900 leading-none ${className}`} {...props}>
      {children}
    </h3>
  );
};

// 4. Card Description (Muted Text)
export const CardDescription = ({ children, className = "", ...props }) => {
  return (
    <p className={`text-sm text-gray-500 font-medium ${className}`} {...props}>
      {children}
    </p>
  );
};

// 5. Card Content Wrapper (Padding management)
export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-6 md:p-8 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Optional: Card Footer (Buttons management)
export const CardFooter = ({ children, className = "", ...props }) => {
  return (
    <div className={`flex items-center p-6 md:p-8 pt-0 mt-auto ${className}`} {...props}>
      {children}
    </div>
  );
};