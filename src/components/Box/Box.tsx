import React from "react";
import { Box, BoxProps } from "@mui/material";

interface BoxComponentProps extends BoxProps {
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  sx?: object;
}

const BoxComponent: React.FC<BoxComponentProps> = ({
  children,
  width = "100%",
  height = "auto",
  sx,
  ...props
}) => {
  return (
    <Box
      component="section"
      sx={{ width: { width }, height: { height }, ...sx }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default BoxComponent;
