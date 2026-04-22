import Stepper from "@/components/Stepper";
import ImportData from "./ImportData";
import { Typography } from "@mui/material";
import { BoxComponent } from "@/components";
import SetupDatabase from "./SetupDatabase";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const DataIngestion = () => {
  const { stepper } = useSelector((state: RootState) => state.dataIngestion);
  const steps = [
    {
      id: 1,
      name: "Import and Save",
    },
    {
      id: 2,
      name: "Setup Database Table",
    },
  ];

  return (
    <>
      <BoxComponent height={"56px"}>
        <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
          Import Data
        </Typography>
      </BoxComponent>
      <BoxComponent sx={{ mt: "5px" }}>
        <Stepper width={"30%"} steps={steps} selectedStepper={stepper}>
          {stepper == 0 ? (
            <div style={{ margin: "30px 10px" }}>
              <ImportData></ImportData>
            </div>
          ) : (
            <div style={{ margin: "30px 10px" }}>
              <SetupDatabase></SetupDatabase>
            </div>
          )}
        </Stepper>
      </BoxComponent>
    </>
  );
};

export default DataIngestion;
