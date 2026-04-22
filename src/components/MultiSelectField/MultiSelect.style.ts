import { Autocomplete, styled, Typography } from "@mui/material";

const CustomLabel = styled(Typography)({
    color: "#0E1218",
    fontWeight: "500",
    lineHeight: "100%",
});

const AutocompleteField = styled(Autocomplete<string, true>)({
    "& .MuiAutocomplete-inputRoot": {
        padding: "0 8px",
        height: "36px",
        color: "#3e4146",
        fontSize: "12px",
        fontWeight: 400,
    },
    "& .MuiOutlinedInput-root": {
        padding: "0 8px",
        height: "36px",
        borderRadius: "6px",
        border: "1px solid #E8EBF6",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
    "&:hover .MuiOutlinedInput-root": {
        border: "1px solid #95A3B9",
    },
    "& .MuiInputBase-input": {
        padding: "0 !important",
        height: "36px",
        display: "flex",
        alignItems: "center",
    },
    "& .MuiInputLabel-root": {
        fontSize: "12px",
        color: "#3e4146",
        top: "50%",
        transform: "translateY(-50%)",
        padding: "15px",
        fontWeight: 400,
    },
    "& .MuiAutocomplete-popupIndicator": {
        color: "#3e4146",
    },
});


export { CustomLabel, AutocompleteField };