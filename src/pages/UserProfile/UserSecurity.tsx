import SvgIcons from "@/assets/SvgIcons";
import {
  BasicButton,
  BoxComponent,
  InputField,
  StackComponent,
} from "@/components";
import { fetchAuthUser, UpdateUserPassword } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { UpdatePasswordPayload } from "@/types/IAuthTypes";
import ValidateField from "@/utils/ValidateField";
import { Grid2, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface FieldProps {
  id: number;
  key: string;
  label: string;
  value: string;
  type: string;
  placeholder: string;
  grid: number;
  rules: string | string[];
  showError: boolean;
}

const UserSecurity = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const passwordRequirements = [
    {
      text: "At least 12 characters but not more than 64.",
      validation: "length",
    },
    {
      text: "Contains uppercase letters.",
      validation: "capital",
    },
    {
      text: "Contains lowercase letters.",
      validation: "lowercase",
    },
    { text: "Contains numbers.", validation: "numeric" },
    {
      text: 'Contains special characters !@#$%^&*(),.?":{}|<>',
      validation: "special",
    },
    {
      text: "Password and Confirm Password must match.",
      validation: "match",
    },
  ];
  const fields = [
    {
      id: 1,
      key: "currentPassword",
      label: "Current Password *",
      value: "",
      type: "password",
      placeholder: "Enter",
      grid: 12,
      rules: ["required"],
      showError: false,
    },
    {
      id: 2,
      key: "newPassword",
      label: "New Password *",
      value: "",
      type: "password",
      placeholder: "Enter",
      grid: 12,
      rules: ["required"],
      showError: false,
    },
    {
      id: 3,
      key: "confirmPassword",
      label: "Confirm Password *",
      value: "",
      type: "password",
      placeholder: "Enter",
      grid: 12,
      rules: ["required"],
      showError: false,
    },
  ];

  const [inputFields, setInputFields] = useState<FieldProps[]>(fields);

  const isPasswordValid = (requirement: string) => {
    const password = inputFields[1]?.value;
    const confirmPassword = inputFields[2].value;
    switch (requirement) {
      case "length":
        return password?.length > 11 && password?.length < 65;
      case "special":
        return /[!@#$%^&*><(),.?":{}|<>]/.test(password);
      case "numeric":
        return /\d/.test(password);
      case "capital":
        return /[A-Z]/.test(password);
      case "lowercase":
        return /[a-z]/.test(password);
      case "match":
        return password === confirmPassword;
      default:
        return false;
    }
  };

  const handleChange = (key: string | number | undefined, newValue: string) => {
    setInputFields((prevFields) =>
      prevFields.map((field) =>
        field.key == key ? { ...field, value: newValue } : field
      )
    );
  };

  // Check if all fields are valid whenever fieldData updates
  const ValidateForm = useCallback(() => {
    const allValid = inputFields.every(
      (field) => !ValidateField(field.rules, field?.value as string)
    );
    // setIsFormValid(allValid);

    return allValid;
  }, [inputFields]);

  useEffect(() => {
    ValidateForm();
  }, [ValidateForm]);

  const handleShowError = (index: number) => {
    setInputFields((prevFields) =>
      prevFields.map((field, ind) =>
        index === ind ? { ...field, showError: true } : field
      )
    );
  };

  const handlePayload = () => {
    const payload: UpdatePasswordPayload = inputFields.reduce((acc, field) => {
      return { ...acc, [field.key]: field.value };
    }, {} as UpdatePasswordPayload);

    return payload;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled()) return;
    setInputFields((prevFields) =>
      prevFields.map((field) => ({
        ...field,
        showError: !!ValidateField(field.rules, field.value),
      }))
    );

    const isValid = ValidateForm();
    if (!isValid) return;
    
    setLoading(true);

    const payload = handlePayload();

    dispatch(UpdateUserPassword(payload))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(fetchAuthUser());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isSubmitDisabled = () => {
    return (
      !isPasswordValid("length") ||
      !isPasswordValid("special") ||
      !isPasswordValid("numeric") ||
      !isPasswordValid("capital") ||
      !isPasswordValid("lowercase") ||
      !isPasswordValid("match")
    );
  };

  return (
    <>
      <BoxComponent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
        }}
      >
        <Stack direction={"column"}>
          <form onSubmit={handleSubmit} autoComplete="off">
            <Grid2
              container
              sx={{
                width: "287px",
              }}
              columnSpacing={2}
            >
              {inputFields.map((field, index) => (
                <Grid2 key={index} size={field.grid}>
                  <InputField
                    height={"36px"}
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
                    field={field}
                    labelSx={{ fontSize: "13px", padding: "10px 0 10px" }}
                    sx={{ fontSize: "12px" }}
                    onChange={handleChange}
                  />
                </Grid2>
              ))}
            </Grid2>
            {inputFields[1].value && (
              <BoxComponent>
                <StackComponent direction="column">
                  {passwordRequirements.map((req, index) => (
                    <StackComponent key={index} direction="row" sx={{ pb: 1 }}>
                      <SvgIcons
                        name={
                          inputFields[1].value &&
                          isPasswordValid(req.validation)
                            ? "checked"
                            : "unchecked"
                        }
                      ></SvgIcons>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#0E1218",
                          lineHeight: "19px",
                          pl: 1,
                        }}
                      >
                        {" "}
                        {req.text}{" "}
                      </Typography>
                    </StackComponent>
                  ))}
                </StackComponent>
              </BoxComponent>
            )}
            <BasicButton
              height={"36px"}
              width={"287px"}
              type={"submit"}
              loading={loading}
              sx={{
                backgroundColor: "primary.dark",
                mt: "5px",
                fontSize: "12px",
              }}
            >
              Save Changes
            </BasicButton>
          </form>
        </Stack>
      </BoxComponent>
    </>
  );
};

export default UserSecurity;
