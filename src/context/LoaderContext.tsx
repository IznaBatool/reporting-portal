import { Box, CircularProgress } from "@mui/material";
import React, { createContext, useState, useContext } from "react";

type LoaderContextType = {
  show: () => void;
  hide: () => void;
  loading: boolean;
};

const LoaderContext = createContext<LoaderContextType>({
  show: () => {},
  hide: () => {},
  loading: false,
});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  const show = () => setLoading(true);
  const hide = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ show, hide, loading }}>
      {children}
      {loading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="rgba(0,0,0,0.3)"
          zIndex={9999}
        >
          <CircularProgress color="inherit" size="30px" />
        </Box>
      )}
    </LoaderContext.Provider>
  );
};
