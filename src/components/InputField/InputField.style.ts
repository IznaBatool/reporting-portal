import { OutlinedInput, styled, Typography } from "@mui/material";

const CustomLabel = styled(Typography)({
    color: "#0E1218",
    fontWeight: "500",
    lineHeight: "100%",
});

const DefaultInput = styled(OutlinedInput)({
    padding: "10px 15px",
    border: "none",
    "& .MuiInputBase-input": {
        padding: "0",
        color: "#3e4146",
        fontWeight: 400,
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #E8EBF6",
        borderRadius: "6px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #95A3B9",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #95A3B9",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #db504a",
    },
    "&.Mui-error .Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #db504a",
    },
    "& .MuiInputBase-input::placeholder": {
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "12px",
    },
    "&.MuiOutlinedInput-root.Mui-disabled ": {
        backgroundColor: "#F8F8F9",
    },
    "&.MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
        borderColor: "#E8EBF6"
    },
});

export { CustomLabel, DefaultInput };