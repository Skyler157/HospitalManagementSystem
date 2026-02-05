import React, { useState } from 'react';

export const Tabs = ({ value, onValueChange, children }) => {
  const [active, setActive] = useState(value);
  const handleChange = (val) => {
    setActive(val);
    onValueChange(val);
  };

  return React.Children.map(children, (child) => {
    if (child.type === TabsList) {
      return React.cloneElement(child, { active, onTabChange: handleChange });
    } else if (child.type === TabsContent) {
      return child.props.value === active ? child : null;
    }
    return child;
  });
};

export const TabsList = ({ children, active, onTabChange }) => (
  <div className="flex gap-4 border-b mb-4">
    {React.Children.map(children, (child) =>
      React.cloneElement(child, {
        isActive: child.props.value === active,
        onClick: () => onTabChange(child.props.value),
      })
    )}
  </div>
);

export const TabsTrigger = ({ value, children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 ${isActive ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-500'}`}
  >
    {children}
  </button>
);

export const TabsContent = ({ children }) => (
  <div className="mt-4">{children}</div>
);
export const TabsHeader = ({ children }) => (
  <div className="text-lg font-semibold mb-4">{children}</div>
);