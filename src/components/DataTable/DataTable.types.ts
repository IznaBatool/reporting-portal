import { GridColDef, GridRowParams } from "@mui/x-data-grid";

export interface DataTableProps {
    columns?: GridColDef[] | [];
    rows?: object[] | [];
    page: number;
    perPage: number;
    total: number;
    onPageChange?: (page: number) => void;
    onPerPageChange?: (perPage: number) => void;
    onRowClick?: (params: GridRowParams) => void;
    handleSave?: () => void;
}