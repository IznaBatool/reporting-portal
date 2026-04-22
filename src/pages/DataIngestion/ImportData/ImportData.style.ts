import { styled, TextField } from "@mui/material";

const SelectField = styled(TextField)({
    height: "36px",
    border: "none",
    fontSize: "12px",
    fontWeight: 300,
    lineHeight: "38px",
    "& .MuiInputBase-input": {
        padding: "0 10px",
        color: "#3e4146",
        fontWeight: 300,
        height: "36px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
        fontSize: "12px",
        fontWeight: 300,
        lineHeight: "38px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
    "& .MuiSvgIcon-root": {
        width: "20px",
        height: "24px",
    },
});

const InputTextField = styled(TextField)({
    height: "36px",
    border: "none",
    fontSize: "12px",
    fontWeight: 300,
    lineHeight: "12px",
    "& .MuiInputBase-input": {
        padding: "0 10px",
        color: "#3e4146",
        fontWeight: 300,
        height: "36px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
        fontSize: "12px",
        fontWeight: 300,
        lineHeight: "35px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
    "& .MuiSvgIcon-root": {
        width: "20px",
        height: "24px",
    },
})

export { SelectField, InputTextField };