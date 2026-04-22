import {
  //   Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SvgIcons from "@/assets/SvgIcons";
import BasicButton from "../Button";

interface FormDialogType {
  open: boolean;
  handleClose: () => void;
  title: string;
  icon: string;
  btnContent: string;
  secondBtnContent?: string;
  handleSecondClick?: () => void;
  children: React.ReactNode;
  loading: boolean;
  width: string;
  onSubmit: () => void;
}

const FormDialog: React.FC<FormDialogType> = ({
  open,
  handleClose,
  title,
  icon,
  btnContent,
  secondBtnContent,
  handleSecondClick,
  children,
  onSubmit,
  loading,
  width = "495px",
}) => {
  const handleDialogClose = () => {
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        // onClose={handleDialogClose()}
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            // Ignore these close attempts
            return;
          }
          handleDialogClose(); // Only allow closing from your buttons
        }}
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth={"sm"}
        sx={{
          "& .MuiPaper-root": {
            maxWidth: width,
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          <SvgIcons name={icon} />
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 12,
            top: 17,
            color: theme.palette.grey[500],
            "& .MuiSvgIcon-root ": {
              height: "18px",
              width: "18px",
              color: "#3E4146",
            },
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>{children}</DialogContent>
        <DialogActions sx={{ padding: "15px 20px" }}>
          {secondBtnContent && (
            <BasicButton
              type={"submit"}
              height={"36px"}
              width={"90px"}
              variant="text"
              sx={{
                mt: "5px",
                fontSize: "13px",
                fontWeight: "500",
              }}
              onClick={handleSecondClick}
            >
              {secondBtnContent}
            </BasicButton>
          )}
          <BasicButton
            type={"submit"}
            height={"36px"}
            width={"90px"}
            loading={loading}
            sx={{
              backgroundColor: "primary.dark",
              mt: "5px",
              fontSize: "12px",
              fontWeight: "500",
            }}
            onClick={onSubmit}
          >
            {btnContent}
          </BasicButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormDialog;
