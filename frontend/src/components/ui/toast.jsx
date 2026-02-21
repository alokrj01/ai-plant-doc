import React from "react";
import { X } from "lucide-react";

// 1. Provider / Viewport (Responsive Positioning)
export const ToastProvider = ({ children }) => {
  return (
    // Mobile pe top-center, Desktop pe top-right. 'pointer-events-none' taaki background clicks block na hon.
    <div className="fixed z-[100] flex flex-col gap-3 p-4 top-0 w-full sm:top-4 sm:right-4 sm:w-[400px] pointer-events-none">
      {children}
    </div>
  );
};

// 2. Main Toast Component (Glassmorphism & Animations)
export const Toast = ({ children, variant = "default", className = "", ...props }) => {
  
  // Premium Color Variants
  const variants = {
    default: "bg-white/90 backdrop-blur-md border-gray-200 text-gray-900 shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
    destructive: "bg-red-50/95 backdrop-blur-md border-red-200 text-red-900 shadow-[0_8px_30px_rgb(220,38,38,0.12)]",
    success: "bg-emerald-50/95 backdrop-blur-md border-emerald-200 text-emerald-900 shadow-[0_8px_30px_rgb(5,150,105,0.12)]",
  };

  const activeVariant = variants[variant] || variants.default;

  return (
    <div
      className={`group pointer-events-auto relative flex w-full items-start justify-between space-x-4 overflow-hidden rounded-2xl border p-4 pr-8 transition-all animate-in slide-in-from-top-5 sm:slide-in-from-right-5 duration-300 ${activeVariant} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// 3. Typography
export const ToastTitle = ({ children }) => (
  <div className="text-sm font-semibold tracking-wide leading-none mb-1.5">{children}</div>
);

export const ToastDescription = ({ children }) => (
  <div className="text-sm opacity-80 leading-snug">{children}</div>
);

// 4. Close Button (Appears on Hover)
export const ToastClose = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-2 rounded-full p-1.5 text-gray-500 opacity-0 transition-all hover:bg-black/5 hover:text-gray-900 focus:opacity-100 group-hover:opacity-100"
  >
    <X className="h-4 w-4" />
  </button>
);

//If old code is rendering, return blank
export const ToastViewport = () => null;