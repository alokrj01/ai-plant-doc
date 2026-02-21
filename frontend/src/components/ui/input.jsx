import React from "react";

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  id,
  name,
  className = "",
  required = false,
  disabled = false, // Added disabled prop for completeness
  ...props // Allows passing any other native input attributes (like min, max, etc.)
}) => {
  
  // Modern, spacious, and soft-focus styling
  const baseStyles = "w-full h-12 px-4 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl placeholder:text-gray-400 transition-all duration-300 ease-in-out";
  
  // Focus and Active states (Soft glowing green ring)
  const focusStyles = "focus:bg-white focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/10";
  
  // Disabled state
  const disabledStyles = "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100";

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`${baseStyles} ${focusStyles} ${disabledStyles} ${className}`}
      {...props}
    />
  );
};