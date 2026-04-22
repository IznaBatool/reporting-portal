import {
  BasicButton,
  BoxComponent,
  InputField,
  StackComponent,
} from "@/components";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ValidateField from "@/utils/ValidateField";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ResetPasswordPayload } from "@/types/IAuthTypes";
import { resetPassword } from "@/redux/slices/authSlice";

const ForgetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const data = [
    {
      id: 1,
      key: "email",
      type: "text",
      value: "",
      label: "Email Address *",
      placeholder: "Enter email",
      rules: ["email", "required"],
      showError: false,
    },
  ];
  const [fieldData, setFieldData] = useState(data);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowError = (index: number) => {
    setFieldData((prevFields) =>
      prevFields.map((field, fieldIndex) =>
        index === fieldIndex ? { ...field, showError: true } : field
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

  // Check if all fields are valid whenever fieldData updates
  useEffect(() => {
    const allValid = fieldData.every(
      (field) => !ValidateField(field.rules, field.value)
    );
    setIsFormValid(allValid);
  }, [fieldData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);

    const payload: ResetPasswordPayload = fieldData.reduce((acc, field) => {
      return {
        ...acc,
        [field.key]: field.value,
      };
    }, {} as ResetPasswordPayload);

    dispatch(resetPassword(payload)).then((res) => {
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
            <BoxComponent>
              <StackComponent
                sx={{
                  mt: 0,
                  display: "flex",
                  justifyContent: "end",
                }}
                direction="row"
              >
                <Typography
                  sx={{
                    color: "#29A073",
                    fontSize: "12px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  component={Link}
                  to="/login"
                >
                  Back to login
                </Typography>
              </StackComponent>
            </BoxComponent>

            <BoxComponent>
              <BasicButton
                loading={loading}
                type="submit"
                children="Reset Password"
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

export default ForgetPassword;
