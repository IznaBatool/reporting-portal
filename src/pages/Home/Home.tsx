// src/pages/home/Home.tsx
import { BoxComponent } from "@/components";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <BoxComponent
        height={"90vh"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Home Page
      </BoxComponent>
    </>
  );
};

export default Home;
