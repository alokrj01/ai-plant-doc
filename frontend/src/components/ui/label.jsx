import React from "react";

export const Label = ({ 
  children, 
  htmlFor, 
  className = "", 
  ...props 
}) => {
  
  // Modern typography: slightly darker text, semi-bold, and a pointer cursor
  const baseStyles = "block text-sm font-semibold text-gray-800 mb-1.5 tracking-wide cursor-pointer transition-colors duration-200";

  return (
    <label
      htmlFor={htmlFor}
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};