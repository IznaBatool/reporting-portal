import {
  BasicButton,
  BoxComponent,
  InputField,
  StackComponent,
} from "@/components";
import { Typography } from "@mui/material";
import { useState } from "react";
import SvgIcons from "../../../assets/SvgIcons";
import ValidateField from "@/utils/ValidateField";
import { useDispatch } from "react-redux";
import { setPassword } from "@/redux/slices/authSlice";
import { SetPasswordPayload } from "@/types/IAuthTypes";
import { AppDispatch } from "@/redux/store";
import { useNavigate, useSearchParams } from "react-router-dom";

const SetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const data = [
    {
      id: 1,
      key: "password",
      type: "password",
      value: "",
      label: " New Password *",
      placeholder: "Enter",
      rules: "required",
      showError: false,
    },
    {
      id: 2,
      key: "passwordConfirmation",
      type: "password",
      value: "",
      label: "Confirm Password *",
      placeholder: "Enter",
      rules: "required",
      showError: false,
    },
  ];

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
  const [fieldData, setFieldData] = useState(data);

  const isPasswordValid = (requirement: string) => {
    const password = fieldData[0]?.value;
    const confirmPassword = fieldData[1].value;
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

  const handleShowError = (index: number) => {
    setFieldData((prevFields) =>
      prevFields.map((field, ind) =>
        index === ind ? { ...field, showError: true } : field
      )
    );
  };

  const handleChange = (key: string | number | undefined, newValue: string) => {
    setFieldData((prevFields) =>
      prevFields.map((field) =>
        field.key === key ? { ...field, value: newValue } : field
      )
    );
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled()) return;
    setLoading(true);

    const payload: SetPasswordPayload = fieldData.reduce((acc, field) => {
      return {
        ...acc,
        [field.key]: field.value,
      };
    }, {} as SetPasswordPayload);

    payload["email"] = searchParams.get("email");

    dispatch(setPassword(payload)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setLoading(false);
        navigate("/login");
      }
    });
  };
  return (
    <>
      <BoxComponent
        height={"100vh"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <StackComponent direction="column">
            {fieldData.map((field, index) => (
              <InputField
                key={field.id}
                field={field}
                error={
                  field.showError && !!ValidateField(field.rules, field.value)
                }
                helperText={
                  field.showError ? ValidateField(field.rules, field.value) : ""
                }
                onBlur={() => handleShowError(index)}
                labelSx={{
                  fontSize: "13px",
                  pt: index % 2 !== 0 ? 1 : undefined,
                }}
                sx={{ fontSize: "14px", fontWeight: 400 }}
                onChange={handleChange}
              />
            ))}
            {fieldData[0].value && (
              <BoxComponent>
                <StackComponent direction="column">
                  {passwordRequirements.map((req, index) => (
                    <StackComponent key={index} direction="row" sx={{ pb: 1 }}>
                      <SvgIcons
                        name={
                          fieldData[0].value && isPasswordValid(req.validation)
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
            <BoxComponent>
              <BasicButton
                loading={loading}
                type="submit"
                children="Set Password"
                sx={{
                  width: "390px",
                  mt: 4,
                  color: "#FFFFFF",
                  background: "#0E1218",
                }}
              />
            </BoxComponent>
          </StackComponent>
        </form>
      </BoxComponent>
    </>
  );
};

export default SetPassword;
