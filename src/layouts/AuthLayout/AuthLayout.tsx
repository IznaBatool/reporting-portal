import { Outlet } from "react-router-dom";
import {
  Image,
  BoxComponent,
  StackComponent,
  TypographyComponent,
} from "@/components";
import background from "../../assets/background.png";
import { Box, Container } from "@mui/material";

const AuthLayout: React.FC = () => {
  return (
    <>
      <Container disableGutters={true} maxWidth={false}>
        <StackComponent direction="row" spacing={2}>
          <BoxComponent width="81.5%">
            <TypographyComponent
              sx={{
                position: "absolute",
                top: "40%",
                left: "22%",
                transform: "translate(-50%, -50%)",
                color: "#FFFFFF",
                fontSize: "45px",
                lineHeight: "54px",
                fontWeight: 500,
              }}
            >
              Welcome to <br />
              Reporting System
            </TypographyComponent>
            <Image src={background} alt="Layout Image"></Image>
          </BoxComponent>
          <BoxComponent>
            <Outlet />
            <TypographyComponent
              sx={{
                position: "absolute",
                bottom: "1%",
                right: "14%",
                transform: "translate(-50%, -50%)",
                fontSize: "13px",
                lineHeight: "24px",
                fontWeight: 400,
                color: "#3E4146",
              }}
            >
              Privacy Policy{" "}
              <Box component="span" sx={{ ml: 1, mr: 1 }}>
                {" "}
                |{" "}
              </Box>{" "}
              Terms & Conditions
            </TypographyComponent>
          </BoxComponent>
        </StackComponent>
      </Container>
    </>
  );
};

export default AuthLayout;
