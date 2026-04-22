import { FormControl, Checkbox, Chip, TextField } from "@mui/material";
import React from "react";
import { CustomLabel, AutocompleteField } from "./MultiSelect.style";
import { Close } from "@mui/icons-material";
import SelectFieldProps from "./MultiSelect.types";
import ErrorMsg from "@/common/ErrorMsg";

type FieldValue = string | number | boolean | object | null | undefined;
const MultiSelectField: React.FC<SelectFieldProps> = ({
  field,
  isMultiSelect,
  labelSx,
  error,
  helperText,
  onChange,
}) => {
  const selectedValues = Array.isArray(field?.value) ? field.value : [];
  const handleRemove = (selectedValue: FieldValue) => {
    const newValue = selectedValues.filter((item) => item !== selectedValue);
    const value = Array.isArray(newValue) && isMultiSelect ? newValue : "";
    onChange(field.key, value as string | string[]);
  };

  const valueForAutocomplete = isMultiSelect
    ? Array.isArray(field.value)
      ? field.value as string[]
      : []
    : typeof field.value === "string"
    ? field.value as string
    : "";

  return (
    <FormControl fullWidth error={!!error}>
      {/* Label */}
      {field?.label && (
        <CustomLabel sx={{ padding: "15px 0 10px", ...labelSx }}>
          {field.label}
        </CustomLabel>
      )}

      {/* Selected Field */}
      <AutocompleteField
        multiple={isMultiSelect as true}
        clearIcon={!isMultiSelect ? null : undefined}
        value={valueForAutocomplete}
        id="checkboxes-tags-demo"
        options={field?.list as string[]}
        onChange={(_, value) => {
          onChange(field.key, isMultiSelect ? (value as string[]) : value);
        }}
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li style={{ fontSize: "12px" }} key={key} {...optionProps}>
              <Checkbox
                sx={{
                  width: "16px",
                  height: "16px",
                  padding: 0,
                  marginRight: "10px",
                  borderRadius: "3px",
                  color: "transparent",
                  border: "1px solid #DEE1EC",
                  "&.Mui-checked": {
                    backgroundColor: "#000",
                    color: "#A1EDB1",
                    border: "1px solid #A1EDB1",
                  },
                  "&.Mui-checked .MuiSvgIcon-root": {
                    // color: "#000",
                    fontSize: "19px",
                  },
                }}
                checked={selected}
              />
              {option}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            sx={{
              "& .MuiInputBase-root": {
                paddingLeft: "15px",
              },
              "& .MuiInputBase-root .MuiAutocomplete-input": {
                height: 0,
                minHeight: 0,
                visibility: "hidden",
                padding: 0,
                margin: 0,
              },
              "& .MuiInputLabel-root": {
                display: "none",
              },
            }}
            {...params}
          />
        )}
        sx={{ width: "100%" }} // just simple layout props
      />

      {/* Selected Values Display with Remove Option */}
      {Array.isArray(field?.value) && field.value.length > 0 ? (
        <div
          style={{
            marginTop: "8px",
            fontSize: "14px",
            color: "#333",
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
          }}
        >
          {field.value?.map((selected: FieldValue, index: number) => (
            <Chip
              key={index}
              label={
                typeof selected === "object"
                  ? JSON.stringify(selected)
                  : String(selected)
              }
              onDelete={() => handleRemove(selected)}
              deleteIcon={
                <Close
                  sx={{
                    "&.MuiChip-deleteIcon": {
                      fontSize: "13px",
                    },
                  }}
                  fontSize="small"
                />
              }
              sx={{
                background: "#F2F6F9",
                padding: "4px 8px",
                borderRadius: "5px",
                fontSize: "13px",
                fontWeight: 500,
                "& .MuiChip-deleteIcon": {
                  color: "#888",
                  "&:hover": {
                    color: "#555",
                  },
                },
              }}
            />
          ))}
        </div>
      ) : typeof field.value == "string" && field.value != "" ? (
        <div
          style={{
            marginTop: "8px",
            fontSize: "14px",
            color: "#333",
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
          }}
        >
          <Chip
            label={
              typeof field.value === "object"
                ? JSON.stringify(field.value)
                : String(field.value ?? "")
            }
            onDelete={() => handleRemove(field.value)}
            deleteIcon={
              <Close
                sx={{
                  "&.MuiChip-deleteIcon": {
                    fontSize: "13px",
                  },
                }}
                fontSize="small"
              />
            }
            sx={{
              background: "#F2F6F9",
              padding: "4px 8px",
              borderRadius: "5px",
              fontSize: "13px",
              fontWeight: 500,
              "& .MuiChip-deleteIcon": {
                color: "#888",
                "&:hover": {
                  color: "#555",
                },
              },
            }}
          />
        </div>
      ) : (
        ""
      )}
      {/* Error & Helper Text */}
      <ErrorMsg helperText={helperText} error={error} />
    </FormControl>
  );
};

export default MultiSelectField;
