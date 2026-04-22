import { BasicButton } from "@/components";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetchAuthUser, updateLogo } from "@/redux/slices/authSlice";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProfileImage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    authUser?.avatar || null
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
        dispatch(updateLogo({ avatar: imageUrl })).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            dispatch(fetchAuthUser());
          }
        });
      };
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    dispatch(updateLogo({ avatar: null })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(fetchAuthUser());
      }
    });
  };

  useEffect(() => {
    setSelectedImage(authUser?.avatar as string | null);
  }, [authUser]);

  return (
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
              {authUser?.firstName?.[0]}
            </Avatar>
          )}
          <CardContent sx={{ padding: "10px 16px" }}>
            <Typography
              color="primary"
              sx={{ fontSize: "18px", fontWeight: 500 }}
            >
              {`${authUser?.firstName} ${authUser?.lastName}`}
            </Typography>
            {isError ? (
              <Typography
                color="primary"
                sx={{
                  fontSize: "14px",
                  lineHeight: "19px",
                  fontWeight: 400,
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
                  fontWeight: 400,
                }}
              >
                Max file size - 5 MB
              </Typography>
            )}
          </CardContent>
        </Stack>
        <CardActions>
          <BasicButton
            height="36px"
            onClick={triggerFileSelect}
            sx={{
              color: "primary.main",
              backgroundColor: "secondary.main",
              "&.MuiButtonBase-root": {
                padding: "6px 10px",
              },
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
            height="36px"
            onClick={handleRemoveImage}
            sx={{
              color: "primary.contrastText",
              backgroundColor: "primary.dark",
              "&.MuiButtonBase-root": {
                padding: "6px 14px",
              },
            }}
          >
            Remove Image
          </BasicButton>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default ProfileImage;
