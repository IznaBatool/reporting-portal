import {
  BasicButton,
  BoxComponent,
  InputField,
  StackComponent,
} from "@/components";
import { useEffect, useState } from "react";
import { FormControlLabel, Typography, Checkbox } from "@mui/material";
import ValidateField from "@/utils/ValidateField";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { LoginPayload } from "@/types/IAuthTypes";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

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
    {
      id: 2,
      key: "password",
      type: "password",
      value: "",
      label: "Password *",
      placeholder: "Enter password",
      rules: "required",
      showError: false,
    },
  ];
  const [fieldData, setFieldData] = useState(data);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleShowError = (index: number) => {
    setFieldData((prevFields) =>
      prevFields.map((field, ind) =>
        index === ind ? { ...field, showError: true } : field
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    const payload: LoginPayload = fieldData.reduce((acc, field) => {
      return {
        ...acc,
        [field.key]: field.value,
      };
    }, {} as LoginPayload); // Explicitly cast to LoginPayload

    dispatch(login(payload))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setLoading(false);
          navigate("/");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <BoxComponent
        height={"98vh"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit} autoComplete="off">
          <StackComponent direction="column">
            {fieldData.map((field, index) => (
              <InputField
                key={field.id}
                field={field}
                onBlur={() => handleShowError(index)}
                error={
                  field.showError && !!ValidateField(field.rules, field.value)
                }
                helperText={
                  field.showError ? ValidateField(field.rules, field.value) : ""
                }
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
                  mt: 0.5,
                  display: "flex",
                  justifyContent: "space-between",
                }}
                direction="row"
              >
                <FormControlLabel
                  sx={{
                    color: "#95A3B9",
                    fontSize: "12px",
                    fontWeight: 500,
                    height: "12px",
                    "& .MuiFormControlLabel-label": {
                      fontSize: 12,
                      fontWeight: 400,
                    },
                    "& .MuiCheckbox-root": { padding: "0 5px 0 0" },
                  }}
                  control={
                    <Checkbox
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 14,
                          color: "#95A3B9",
                        },
                        "&.Mui-checked .MuiSvgIcon-root": {
                          color: "#29A073",
                        },
                      }}
                    />
                  }
                  label="Remember Me"
                />
                <Typography
                  sx={{
                    color: "#29A073",
                    fontSize: "12px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  component={Link}
                  to="/reset-password"
                >
                  Forget Password?
                </Typography>
              </StackComponent>
            </BoxComponent>

            <BoxComponent>
              <BasicButton
                loading={loading}
                type="submit"
                children="Login"
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

export default Login;
