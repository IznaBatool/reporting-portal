import { createTheme } from "@mui/material";

const Theme = createTheme({
  spacing: 8, // Base unit (default is 8px)
  palette: {
    primary: {
      main: "#3E4146",
      light: "#F8F8F9",
      dark: "#0E1218",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#F8F8F9",
      light: "#616E85",
      contrastText: "#95A3B9"
    },
    success: {
      main: "#48B16E",
      light: "#A1EDB1",
      dark: "#0E1218",
      contrastText: "#ffffff",
    },
    error: {
      main: "#db504a"
    }
  },
  typography: {
    fontFamily: "General Sans, sans-serif",
    h1: { fontSize: "2.5rem" },
    body1: { fontSize: "1rem" },
  },
});

export default Theme;