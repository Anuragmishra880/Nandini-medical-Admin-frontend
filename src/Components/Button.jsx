import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary", // primary, secondary, danger, etc.
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
