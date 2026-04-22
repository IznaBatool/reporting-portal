import { Autocomplete, OutlinedInput, styled } from "@mui/material";

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

export const AutocompleteField = styled(Autocomplete)({
    "& .MuiAutocomplete-inputRoot": {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "2px 8px",
        minHeight: "36px",
        maxHeight: "80px",
        overflowY: "auto",
        fontSize: "12px",
        border: "1px solid #E8EBF6",
        borderRadius: "6px",
        "&:hover": {
            borderColor: "#95A3B9",
        },
        "&::-webkit-scrollbar": {
            height: "4px",
            width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "4px",
        },
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
    "& .MuiChip-root": {
        height: "24px",
        fontSize: "12px",
        margin: "2px",
    },
});