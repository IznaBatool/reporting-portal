import React from "react";
import BoxComponent from "../Box";
import { Step, StepLabel, StepIconProps } from "@mui/material";
import { LinearStepper } from "./Stepper.style";
import SvgIcons from "@/assets/SvgIcons";

interface StepProps {
  id: number;
  name: string;
}

interface StepperProps {
  steps: StepProps[];
  children: React.ReactNode;
  width?: string;
  selectedStepper?: number;
}

// You can keep using StepIconProps for your own icon component’s typing.
const StepIcon: React.FC<StepIconProps> = ({
  active,
  completed,
  className,
  icon,
}) => {
  if (completed || active) {
    return (
      <div
        className={className}
        style={{
          backgroundColor: "#A1EDB1",
          borderRadius: "50%",
          width: 20,
          height: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {completed && <SvgIcons name="check" />}
        {active && <SvgIcons name="edit" />}
      </div>
    );
  }

  // Default: show step number
  return (
    <div
      className={className}
      style={{
        borderRadius: "50%",
        width: 20,
        height: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        color: "#95A3B9",
        background: "#EBEDF1",
      }}
    >
      {icon}
    </div>
  );
};

const Steppers: React.FC<StepperProps> = ({
  steps,
  children,
  width,
  selectedStepper = 0,
}) => {
  return (
    <BoxComponent>
      <LinearStepper sx={{ width }} activeStep={selectedStepper}>
        {steps.map((step, index) => (
          <Step key={index}>
            {/* use the new slots API instead of StepIconComponent */}
            <StepLabel slots={{ stepIcon: StepIcon }}>{step.name}</StepLabel>
          </Step>
        ))}
      </LinearStepper>
      {children}
    </BoxComponent>
  );
};

export default Steppers;
