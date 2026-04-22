import { BoxComponent } from "@/components";
import { fetchWorkspace } from "@/redux/slices/workspaceSlice";
import { AppDispatch } from "@/redux/store";
import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import WorkspaceImage from "./WorkspaceImage";
import WorkspaceForm from "./WorkspaceForm";
import { useParams } from "react-router-dom";

const WorkspaceSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  useEffect(() => {
    if (params?.workspaceId) {
      dispatch(fetchWorkspace({ id: Number(params.workspaceId) }));
    }
  });

  return (
    <>
      <BoxComponent height={"56px"} sx={{ pb: "17px" }}>
        <Typography
          sx={{ fontSize: "18px", fontWeight: 500, color: "#0E1218" }}
        >
          Settings
        </Typography>
      </BoxComponent>
      <BoxComponent sx={{ display: "flex", justifyContent: "center" }}>
        <Stack direction={"column"}>
          <WorkspaceImage></WorkspaceImage>
          <BoxComponent
            sx={{ mt: "30px", display: "flex", justifyContent: "center" }}
          >
            <WorkspaceForm></WorkspaceForm>
          </BoxComponent>
        </Stack>
      </BoxComponent>
    </>
  );
};

export default WorkspaceSettings;
