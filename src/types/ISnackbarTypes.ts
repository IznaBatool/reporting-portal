export interface SnackbarType {
    open: boolean,
    message: string,
    severity?: "success" | "error" | "warning" | "info"
}