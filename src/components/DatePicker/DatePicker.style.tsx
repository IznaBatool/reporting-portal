import { styled, TextField } from "@mui/material";

export const InputTextField = styled(TextField)({
    height: "36px",
    fontSize: "12px",
    lineHeight: "38px",
    "& .MuiInputBase-input": {
      padding: "0 10px",
      color: "#3e4146",
      fontWeight: 300,
      height: "36px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "6px",
      border: "1px solid #E8EBF6",
    },
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
      fontSize: "12px",
      fontWeight: 300,
      lineHeight: "38px",
    },
    "&:hover .MuiInputBase-root.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
      {
        border: "1px solid #95A3B9",
      },
    "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline ":
      {
        border: "1px solid #95A3B9",
      },
    "& .MuiSvgIcon-root": {
      width: "20px",
      height: "24px",
    },
  });