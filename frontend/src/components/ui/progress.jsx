import React from "react";

export const Progress = ({ value = 0, max = 100, color = "blue", className = "", ...props }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Premium gradient fill colors
  const colors = {
    blue: "bg-gradient-to-r from-blue-500 to-indigo-400",
    green: "bg-gradient-to-r from-green-500 to-emerald-400",
    red: "bg-gradient-to-r from-red-500 to-rose-400",
    yellow: "bg-gradient-to-r from-amber-400 to-yellow-400",
    gray: "bg-gradient-to-r from-gray-400 to-gray-300",
  };

  const fillClass = colors[color] || colors.blue;

  return (
    <div 
      className={`relative w-full h-2.5 bg-gray-100 rounded-full overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin="0"
      aria-valuemax="100"
      {...props}
    >
      {/* Animated and Gradient Fill Bar */}
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${fillClass}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};