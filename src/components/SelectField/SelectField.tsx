import {
  MenuItem,
  styled,
  Select as MuiSelect,
  Box,
  Chip,
  Checkbox,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import BoxComponent from "../Box";
import React from "react";

const Select = styled(MuiSelect)({
  fontSize: "12px",
  fontWeight: 300,
  lineHeight: "38px",
  "& .MuiInputBase-input": {
    padding: "0 10px",
    color: "#3e4146",
    fontWeight: 300,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "6px",
    border: "1px solid #E8EBF6",
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root": {
    fontSize: "12px",
    fontWeight: 300,
    lineHeight: "20px",
    alignItems: "flex-start",
    paddingTop: "4px",
    paddingBottom: "4px",
    maxHeight: "110px",
    overflowY: "auto",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #95A3B9",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #95A3B9",
  },
  "& .MuiSvgIcon-root": {
    width: "20px",
    height: "24px",
  },
});

interface Option {
  label: string;
  value: string | string[] | null;
  data_type: string;
}

interface SelectFieldProps {
  value: string | string[];
  options: Option[];
  multiple?: boolean;
  loading?: boolean;
  handleChange: (value: string | string[]) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  value,
  options,
  multiple = false,
  loading = false,
  handleChange,
}) => {
  const onChange = (event: SelectChangeEvent<unknown>) => {
    const selectedValue = event.target.value as string | string[];
    handleChange(selectedValue);
  };

  const isSelected = (option: string) =>
    Array.isArray(value) && value.includes(option);

  return (
    <BoxComponent>
      <Select
        multiple={multiple}
        value={value}
        fullWidth
        endAdornment={
          loading ? (
            <CircularProgress size={16} sx={{ marginRight: 2 }} />
          ) : undefined
        }
        onChange={onChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
            },
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
        sx={{
          padding: multiple ? "8px 0px" : "",
        }}
        renderValue={(selected) => {
          if (multiple) {
            const values = Array.isArray(selected) ? selected : [selected];
            return (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                  maxHeight: "8.5em",
                  minHeight: "43px",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "3px",
                    height: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f1f1f1",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#555",
                  },

                  scrollbarWidth: "thin",
                  scrollbarColor: "#888 #f1f1f1",
                }}
              >
                {values.map((val) => (
                  <Chip key={val} label={val} />
                ))}
              </Box>
            );
          }
          return selected as string;
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={`${option.value}-${index}`} // guarantees uniqueness
            value={option.value ?? ""}
            sx={{ fontSize: "12px", fontWeight: 300 }}
          >
            {multiple ? (
              <>
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
                  checked={isSelected(option.value as string)}
                />
                {option.label}
              </>
            ) : (
              option.label
            )}
          </MenuItem>
        ))}
      </Select>
    </BoxComponent>
  );
};

export default SelectField;
