import { Stepper, styled } from "@mui/material";

const LinearStepper = styled(Stepper)({
    "& .MuiSvgIcon-root": {
        color: "#EBEDF1",
        width: "20px",
        height: "20px",
    },
    "& .MuiSvgIcon-root.Mui-active": {
        color: "#A1EDB1",
    },
    "& .MuiStepLabel-label": {
        color: "#95A3B9",
        fontSize: "13px",
        fontWeight: 500,
    },
    "& .MuiStepLabel-label.Mui-active": {
        color: "#0E1218",
    },
    "& .MuiStepIcon-text": {
        fill: "#95A3B9",
    },
    "& .Mui-active .MuiStepIcon-text": {
        fill: "#0E1218",
    },
    "& .MuiStepConnector-line.MuiStepConnector-lineHorizontal": {
        borderColor: "#EBEDF1"
    },
    "& .MuiSvgIcon-root.Mui-completed": {
        color: "#A1EDB1",
    },
});

export { LinearStepper };