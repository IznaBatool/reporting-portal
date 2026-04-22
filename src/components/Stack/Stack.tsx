import React from "react";
import { Stack, StackProps } from "@mui/material";

interface StackComponentProps extends StackProps{
  children: React.ReactNode;
  direction?: "row" | "row-reverse" | "column" | "column-reverse" | undefined;
  spacing?: number;
  sx?: object;
}

const StackComponent: React.FC<StackComponentProps> = ({
  children,
  direction,
  spacing = "2",
  sx,
  ...props
}) => {
  return (
    <Stack direction={direction} sx={{ ...sx }} spacing={spacing} {...props}>
      {children}
    </Stack>
  );
};

export default StackComponent;
