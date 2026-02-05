import React from 'react';

export const Input = ({ placeholder, className = "", ...props }) => (
  <input
    type="text"
    placeholder={placeholder}
    className={`border rounded px-3 py-2 w-full ${className}`}
    {...props}
  />
);
export const TextArea = ({ placeholder, className = "", ...props }) => (
  <textarea
    placeholder={placeholder}
    className={`border rounded px-3 py-2 w-full ${className}`}
    {...props}
  />
);