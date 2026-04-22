import { OutlinedInput, styled, TextField } from "@mui/material";

export const InputTextField = styled(TextField)({
    height: "36px",
    border: "none",
    fontSize: "12px",
    fontWeight: 300,
    lineHeight: "12px",
    background: "#F8F8F9",
    width: "232px",
    borderRadius: "6px",
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

export const DefaultInput = styled(OutlinedInput)({
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