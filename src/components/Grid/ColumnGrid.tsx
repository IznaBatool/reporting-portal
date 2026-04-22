import { Grid2 as Grid } from "@mui/material";

interface GridProps {
  size?: number;
  children: React.ReactNode;
}

const ColumnGrid: React.FC<GridProps> = ({ size = 12, children }) => {
  return <Grid size={size}>{children}</Grid>;
};

export default ColumnGrid;
