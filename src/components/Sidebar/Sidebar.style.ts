import { ListItemButton, styled } from "@mui/material";

const ListButton = styled(ListItemButton)(
    {
        minHeight: "24px",
        padding: "4px 8px",
        borderRadius: "4px",
        "&.MuiButtonBase-root": { color: "#3E4146" },
        "&:hover.MuiButtonBase-root": {
            background: "#F2F6F9",
            color: "#29A073",
        },
    },
);

export {ListButton};