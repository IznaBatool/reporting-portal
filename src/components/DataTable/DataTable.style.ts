import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const Table = styled(DataGrid)({
    ".MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within": {
        outline: "none",
    },
    ".MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within": {
        outline: "none",
    },
    ".MuiDataGrid-columnHeader.Mui-selected": {
        backgroundColor: "inherit",
    },
    ".MuiDataGrid-cell:focus": {
        outline: "none",
    },
    ".MuiDataGrid-cell:focus-within": {
        outline: "none",
    },
    ".MuiDataGrid-row.Mui-selected": {
        backgroundColor: "transparent",
    },
    ".MuiDataGrid-row:hover": {
        backgroundColor: "#f5f5f5",
    },
    "&.MuiDataGrid-root": {
        border: "none",
    },
    "& .MuiDataGrid-columnSeparator": {
        border: "none",
        display: "none",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: 500,
        fontSize: "12px",
        fontFamily: "GeneralSans-Bold, sans-serif",
    },
    "& .MuiDataGrid-cell": {
        fontWeight: 300,
        fontFamily: "GeneralSans-Regular, sans-serif",
        fontSize: "12px",
        color: "#0A2540",
        borderTop: "1px solid #EEEEF2",
        borderBottom: "none !important"
    },
    "& .MuiDataGrid-row": {
        height: "36px",
        maxHeight: "36px",
        minHeight: "36px",
    },
    "& .MuiDataGrid-columnHeaders": {
        height: "30px",
        maxHeight: "30px",
    },
    "& .MuiDataGrid-columnHeader": {
        borderBottom: "none !important"
    },
    "& .MuiDataGrid-footerContainer": {
        border: "none !important"
    },
    "& .MuiDataGrid-filler": {
        display: "none"
    }
});