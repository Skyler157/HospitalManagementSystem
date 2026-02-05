import React from 'react';

export const Button = ({ children, onClick, className = "", size = "md", variant = "default" }) => {
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base"
  };
  const variants = {
    default: "bg-blue-600 text-white",
    outline: "border border-blue-600 text-blue-600 bg-white"
  };

  return (
    <button
      onClick={onClick}
      className={`rounded ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
