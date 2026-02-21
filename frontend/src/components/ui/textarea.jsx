import React from "react";

export const Textarea = ({
  value,
  onChange,
  placeholder = "",
  id,
  name,
  rows = 4,
  className = "",
  required = false,
  disabled = false,
  ...props // Allows passing maxLength, spellCheck, etc.
}) => {
  
  // 1. Base Styles: Matches Input.jsx (soft background, proper padding, rounded-xl)
  const baseStyles = "w-full p-4 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl placeholder:text-gray-400 transition-all duration-300 ease-in-out";
  
  // 2. Focus & Active States: Pure white background with a glowing green ring
  const focusStyles = "focus:bg-white focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/10";
  
  // 3. Disabled State: Clear visual feedback when input is blocked
  const disabledStyles = "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100";

  // 4. Responsive & Layout Limits
  // resize-y: User can make it taller but not wider (keeps mobile layout safe)
  // min-h & max-h: Prevents it from becoming too small or absurdly large
  const layoutStyles = "resize-y min-h-[120px] max-h-[400px] sm:text-sm";

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      disabled={disabled}
      className={`${baseStyles} ${focusStyles} ${disabledStyles} ${layoutStyles} ${className}`}
      {...props}
    />
  );
};