import React from "react";

interface ErrorProps {
  error?: boolean;
  helperText: string | undefined;
}

const ErrorMsg: React.FC<ErrorProps> = ({ error, helperText }) => {
  const errorIcon = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );

  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: "3px",
        minHeight: "20px",
        marginLeft: 0,
        marginTop: "4px",
        lineHeight: "12px",
        fontSize: "11px",
        color: error ? "#d32f2f" : "inherit",
        opacity: error ? 1 : 0,
        transform: error ? "translateY(0px)" : "translateY(-5px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      {error && errorIcon}
      {helperText || " "}
    </span>
  );
};

export default ErrorMsg;
