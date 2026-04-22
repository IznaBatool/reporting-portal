import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface CustomTypographyProps extends TypographyProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "caption";
  color?: string;
  fontWeight?: number;
  sx?: object;
}

const TypographyComponent: React.FC<CustomTypographyProps> = ({
  variant = "body1",
  children,
  sx,
  ...props
}) => {
  return (
    <Typography
      variant={variant}
      sx={{
        fontFamily: "General Sans, sans-serif",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default TypographyComponent;
