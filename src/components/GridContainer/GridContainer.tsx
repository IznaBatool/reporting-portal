import React from "react";
import { Grid2 as Grid } from "@mui/material";

interface GridContainerProps {
  spacing?: number;
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  alignItems?: "flex-start" | "center" | "flex-end";
  children: React.ReactNode;
}

const GridContainer: React.FC<GridContainerProps> = ({
  spacing = 2,
  justifyContent = "center",
  alignItems = "center",
  children,
}) => {
  return (
    <Grid
      container
      spacing={spacing}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </Grid>
  );
};

export default GridContainer;
