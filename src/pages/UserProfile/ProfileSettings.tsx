import { BoxComponent } from "@/components";
import ProfileImage from "./ProfileImage";
import { Stack, Typography } from "@mui/material";
import ProfileTabs from "./ProfileTabs";

const UserProfile = () => {
  return (
    <>
      <BoxComponent height={"56px"} sx={{ pb: "17px" }}>
        <Typography
          sx={{ fontSize: "18px", fontWeight: 500, color: "#0E1218" }}
        >
          Profile
        </Typography>
      </BoxComponent>
      <BoxComponent sx={{ display: "flex", justifyContent: "center" }}>
        <Stack direction={"column"}>
          <ProfileImage></ProfileImage>
          <BoxComponent sx={{ mt: "10px" }}>
            <ProfileTabs />
          </BoxComponent>
        </Stack>
      </BoxComponent>
    </>
  );
};

export default UserProfile;
