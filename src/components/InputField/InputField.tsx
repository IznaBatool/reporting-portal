import { FormControl, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FieldProps from "./InputField.types";
import { CustomLabel, DefaultInput } from "./InputField.style";
import ErrorMsg from "@/common/ErrorMsg";

const InputField: React.FC<FieldProps> = ({
  field,
  error,
  helperText,
  sx,
  labelSx,
  height = "44px",
  disabled,
  onBlur,
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <FormControl fullWidth error={!!error}>
        {field.label && (
          <CustomLabel sx={{ padding: "15px 0 10px", ...labelSx }}>
            {field.label}
          </CustomLabel>
        )}
        <DefaultInput
          key={field.key}
          disabled={disabled}
          type={
            field.type !== "password"
              ? field.type
              : field.type === "password" && !showPassword
              ? "password"
              : "text"
          }
          sx={{
            ...sx,
            height: { height },
          }}
          placeholder={field.placeholder}
          endAdornment={
            field.type == "password" ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "#C4CCD9", fontSize: 18 }} />
                  ) : (
                    <Visibility sx={{ color: "#C4CCD9", fontSize: 18 }} />
                  )}
                </IconButton>
              </InputAdornment>
            ) : null
          }
          value={field.value ?? ""}
          onChange={(e) => onChange(field.key, e.target.value)}
          onBlur={onBlur}
          autoComplete="off" // Handles validation when focus is lost
          multiline={field?.multiline}
          maxRows={field?.maxRows ?? 1}
          {...props}
        />
        <ErrorMsg helperText={helperText} error={error} />
      </FormControl>
    </>
  );
};

export default InputField;
