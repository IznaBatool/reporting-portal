import SvgIcons from "@/assets/SvgIcons";
import { BoxComponent, InputField } from "@/components";
import { fetchAuthUser } from "@/redux/slices/authSlice";
import { createWorkspace } from "@/redux/slices/workspaceSlice";
import { AppDispatch } from "@/redux/store";
import { AddWorkspacePayload } from "@/types/IworkspaceTypes";
import ValidateField from "@/utils/ValidateField";
import {
  Avatar,
  CardContent,
  CardMedia,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { FieldProps } from "./Workspace.types";
import { CustomLabel, VisuallyHiddenInput } from "./Workspace.style";

const CreateWorkspaceForm = forwardRef((props, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const fields = [
    {
      id: 1,
      key: "name",
      label: "Name *",
      value: "",
      type: "text",
      placeholder: "Enter",
      multiline: false,
      rules: [
        "required",
        "max100",
        "emojiRegex",
        "specialCharactersWithoutUnderscore",
      ],
      grid: 6,
      showError: false,
    },
    {
      id: 2,
      key: "email",
      label: "Email *",
      value: "",
      type: "text",
      placeholder: "Enter",
      multiline: false,
      rules: ["email", "required", "max100", "emojiRegex"],
      grid: 6,
      showError: false,
    },
    {
      id: 3,
      key: "address",
      label: "Address *",
      value: "",
      type: "text",
      placeholder: "Enter",
      multiline: false,
      rules: ["required", "max100", "emojiRegex"],
      grid: 12,
      showError: false,
    },
    {
      id: 4,
      key: "description",
      label: "Description *",
      value: "",
      type: "text",
      placeholder: "Enter",
      multiline: true,
      maxRows: 3,
      rules: ["required", "max255", "emojiRegex"],
      grid: 12,
      showError: false,
    },
    {
      id: 5,
      key: "image",
      label: "Upload Image *",
      value: selectedImage,
      type: "image",
      placeholder: "Select Image",
      description:
        "Image size should be at least 400px and less then 500kb. Allowed file PNG  & JPG.",
      rules: ["required"],
      grid: 12,
      showError: false,
    },
  ];

  const [inputFields, setInputFields] = useState<FieldProps[]>(fields);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

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
        setSelectedImage(imageUrl);
      };
    }
  };

  const handleChange = (
    key: string | number | undefined,
    newValue: string | string[] | object[] | undefined | null
  ) => {
    setInputFields((prevFields: FieldProps[]) =>
      prevFields.map((field) =>
        field.key === key
          ? {
              ...field,
              value: newValue as string,
              showError: true,
            }
          : field
      )
    );
  };

  // Expose `submitForm` to parent
  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit,
    loading: loading,
    closeModal: closeModal,
  }));

  const ValidateForm = useCallback(() => {
    const allValid = inputFields.every(
      (field) => !ValidateField(field.rules, field?.value as string)
    );

    return allValid;
  }, [inputFields]);

  useEffect(() => {
    ValidateForm();
  }, [ValidateForm]);

  const handlePayload = () => {
    const payload: AddWorkspacePayload = inputFields.reduce((acc, field) => {
      return { ...acc, [field.key]: field.value };
    }, {} as AddWorkspacePayload);

    return payload;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setInputFields((prevFields) =>
      prevFields.map((field) => ({
        ...field,
        showError: !!ValidateField(field.rules, field.value),
      }))
    );

    const isValid = ValidateForm();
    if (!isValid) return;

    const payload = handlePayload();

    dispatch(createWorkspace(payload)).then(() => {
      setCloseModal(false);
      setLoading(false);
      dispatch(fetchAuthUser());
    });
  };

  const handleShowError = (index: number) => {
    setInputFields((prevFields) =>
      prevFields.map((field, ind) =>
        index === ind ? { ...field, showError: true } : field
      )
    );
  };

  return (
    <>
      <BoxComponent>
        <form autoComplete="off">
          <Grid2 container columnSpacing={2}>
            {inputFields.map((field, index) => (
              <Grid2 key={field.id} size={field.grid}>
                {field.type == "text" && (
                  <InputField
                    height={field?.multiline ? "79px" : "36px"}
                    field={field}
                    error={
                      field.showError &&
                      !!ValidateField(field.rules, field.value)
                    }
                    helperText={
                      field.showError
                        ? ValidateField(field.rules, field.value)
                        : ""
                    }
                    onBlur={() => handleShowError(index)}
                    labelSx={{ fontSize: "13px", padding: "5px 0 10px" }}
                    sx={{ fontSize: "12px" }}
                    onChange={handleChange}
                  />
                )}

                {field.type == "image" && (
                  <>
                    {field?.label && (
                      <CustomLabel
                        sx={{ padding: "0px 0 10px", fontSize: "13px" }}
                      >
                        {field.label}
                      </CustomLabel>
                    )}
                    <Stack
                      direction={"row"}
                      height={"65px"}
                      sx={{ mt: "10px" }}
                    >
                      {selectedImage ? (
                        <CardMedia
                          component={"img"}
                          alt="user-profile"
                          height={"71"}
                          width={"71"}
                          image={selectedImage}
                          sx={{
                            borderRadius: "21px",
                            "&.MuiCardMedia-root": {
                              height: "71px",
                              maxWidth: "71px",
                              objectFit: "contain",
                              border: "0.5px solid #E8EBF6",
                            },
                          }}
                        />
                      ) : (
                        <Avatar
                          sx={{
                            bgcolor: "#EFEFF4",
                            height: 71,
                            width: 71,
                            fontSize: 18,
                            color: "#3E4146",
                            borderRadius: "21px",
                          }}
                        >
                          <SvgIcons name="uploadImage" />
                        </Avatar>
                      )}
                      <CardContent sx={{ padding: "2px 16px" }}>
                        <Typography
                          onClick={triggerFileSelect}
                          color="success.main"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 500,
                            pb: "5px",
                            textDecoration: "underline",
                            textDecorationColor: (theme) =>
                              theme.palette.success.main,
                            cursor: "pointer",
                          }}
                        >
                          {field.placeholder}
                        </Typography>
                        <VisuallyHiddenInput
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          size={5 * 1024 * 1024}
                        />
                        <Typography
                          color={isError ? "error.main" : "primary"}
                          sx={{ fontSize: "12px", fontWeight: 400 }}
                        >
                          {field.description}
                        </Typography>
                      </CardContent>
                    </Stack>
                  </>
                )}
              </Grid2>
            ))}
          </Grid2>
        </form>
      </BoxComponent>
    </>
  );
});

export default CreateWorkspaceForm;
