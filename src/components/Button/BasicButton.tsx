import { Button, ButtonProps } from "@mui/material";

interface BasicButtonProps extends ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  sx?: object;
  variant?: "contained" | "outlined" | "text";
  loading?: boolean;
  height?: string;
  width?: string;
}

const BasicButton: React.FC<BasicButtonProps> = ({
  children,
  sx,
  type,
  variant = "contained",
  loading,
  height = "42px",
  width,
  ...props
}) => {
  return (
    <Button
      loading={loading}
      type={type}
      variant={variant}
      sx={{
        height: { height },
        width: { width },
        borderRadius: "8px",
        textTransform: "capitalize",
        display: "block", // Ensure margin works
        ...sx,
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none", // Also disable shadow on hover
        },
        "&.MuiButton-loading": {
          padding: "10px 16px",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default BasicButton;
