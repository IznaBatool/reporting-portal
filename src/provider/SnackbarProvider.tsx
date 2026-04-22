import { Alert, Snackbar } from "@mui/material";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { hideSnackbar } from "@/redux/slices/snackbarSlice";
import SvgIcons from "@/assets/SvgIcons";

const SnackbarProvider = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootState) => state.snackbar);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          sx={{
            backgroundColor: "#20315C",
            color: "#fff",
            minWidth: "320px",
            fontSize: "12px",
            fontWeight: 500,
            borderRadius: "8px",
            "& .MuiAlert-message": {
              padding: "7px 0",
            },
            "& .MuiAlert-action": {
              padding: "3px 0 0 16px",
            },
            "& .MuiSvgIcon-root": {
              width: "16px",
              height: "16px",
              color: "#9DACD3",
            },
          }}
          onClose={handleClose}
          icon={<SvgIcons name={snackbar.severity} />}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackbarProvider;
