import React from "react";
import { Box } from "@mui/material";

interface ImageProps {
  children?: React.ReactNode;
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
}

const ImageComponent: React.FC<ImageProps> = ({
  children,
  src,
  alt = "image",
  width = "100%",
  height = "100vh",
}) => {
  return (
    <Box
      component="img"
      sx={{
        width,
        height,
        objectFit: "cover",
      }}
      src={src} // ✅ Explicitly pass src
      alt={alt} // ✅ Explicitly pass alt
    >
      {children}
    </Box>
  );
};

export default ImageComponent;
