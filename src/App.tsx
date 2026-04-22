import AppRoutes from "@/router/routes";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router";
import SnackbarProvider from "./provider/SnackbarProvider";
import Theme from "./theme";
import "./assets/styles/default.css";
import { LoaderProvider } from "./context/LoaderContext";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <LoaderProvider>
          <SnackbarProvider />
          <AppRoutes />
        </LoaderProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
