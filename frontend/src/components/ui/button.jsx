import React from "react";

export const Button = ({ children, onClick, className = "", type = "button", disabled = false }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold tracking-wide rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2";

  const interactiveStyles = "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700 active:scale-[0.97] active:shadow-sm";

  const disabledStyles = "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-md disabled:active:scale-100";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${interactiveStyles} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};
