import { BasicButton } from "@/components";
import { AppDispatch, RootState } from "@/redux/store";
import { WorkspaceTypes } from "@/types/IworkspaceTypes";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VisuallyHiddenInput } from "../ManageWorkspace/Workspace.style";
import { setWorkspaceLogo } from "@/redux/slices/workspaceSlice";

const WorkspaceImage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const workspaceStore = useSelector((state: RootState) => state.workspace);
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<WorkspaceTypes | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    selectedWorkspace?.logo || null
  );

  const [isError, setIsError] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setIsError(true);
        return;
      }
      setIsError(false);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const imageUrl = reader.result as string;
        dispatch(setWorkspaceLogo(imageUrl));
        setSelectedImage(imageUrl);
      };
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    dispatch(setWorkspaceLogo(null));
    setSelectedImage(null);
    setIsError(false);
  };

  useEffect(() => {
    if (workspaceStore?.currentWorkspace) {
      setSelectedWorkspace(workspaceStore.currentWorkspace);
    }
  }, [workspaceStore]);

  useEffect(() => {
    setSelectedImage(selectedWorkspace?.logo as string | null);
    dispatch(setWorkspaceLogo(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWorkspace]);

  return (
    <>
      {selectedWorkspace && (
        <Card
          variant="outlined"
          sx={{
            width: "565px",
            padding: "20px",
            borderRadius: "8px",
            borderColor: "#E8EBF6",
          }}
        >
          <Stack
            direction={"row"}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Stack direction={"row"} height={"65px"}>
              {selectedImage ? (
                <CardMedia
                  component={"img"}
                  alt="user-profile"
                  height={"65"}
                  image={selectedImage}
                  sx={{
                    borderRadius: "50px",
                    "&.MuiCardMedia-root": {
                      height: "65px",
                      width: "65px",
                      objectFit: "contain",
                      border: "0.5px solid #E8EBF6",
                    },
                  }}
                />
              ) : (
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: "#EFEFF4",
                    height: 65,
                    width: 65,
                    fontSize: 18,
                    color: "#3E4146",
                    borderRadius: "50px",
                  }}
                >
                  {selectedWorkspace.name?.[0]}
                </Avatar>
              )}
              <CardContent sx={{ padding: "10px 16px" }}>
                <Typography
                  color="primary"
                  sx={{ fontSize: "18px", fontWeight: 500 }}
                >
                  {selectedWorkspace?.name}
                </Typography>
                {isError ? (
                  <Typography
                    color="primary"
                    sx={{
                      fontSize: "14px",
                      lineHeight: "19px",
                      fontWeight: 100,
                      color: "error.main",
                    }}
                  >
                    File size exceeds 5MB
                  </Typography>
                ) : (
                  <Typography
                    color="primary"
                    sx={{
                      fontSize: "14px",
                      lineHeight: "19px",
                      fontWeight: 100,
                    }}
                  >
                    Max file size - 5 MB
                  </Typography>
                )}
              </CardContent>
            </Stack>
            <CardActions>
              <BasicButton
                height="34px"
                onClick={triggerFileSelect}
                sx={{
                  color: "primary.main",
                  backgroundColor: "secondary.main",
                  "&.MuiButtonBase-root": {
                    padding: "6px 10px",
                  },
                  fontSize: "12px",
                }}
              >
                Upload
              </BasicButton>
              <VisuallyHiddenInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                size={5 * 1024 * 1024}
              />
              <BasicButton
                height="34px"
                onClick={handleRemoveImage}
                sx={{
                  color: "primary.contrastText",
                  backgroundColor: "primary.dark",
                  "&.MuiButtonBase-root": {
                    padding: "6px 14px",
                  },
                  fontSize: "12px",
                }}
              >
                Remove Image
              </BasicButton>
            </CardActions>
          </Stack>
        </Card>
      )}
    </>
  );
};

export default WorkspaceImage;
