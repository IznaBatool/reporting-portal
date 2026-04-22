import { BoxComponent } from "@/components";
import {
  FormControl,
  FormHelperText,
  Grid2,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { DefaultInput } from "./DataSource.style";
import SvgIcons from "@/assets/SvgIcons";
import { AutomationFormProps } from "./DataSource.types";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setDataSourceAutomation } from "@/redux/slices/dataSourceSlice";

const AutomationForm = forwardRef((props: AutomationFormProps, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const { dataSource } = props;
  const [timer, setTimer] = useState<string>("00:00:00");
  const [loading, setLoading] = useState<boolean>(false);
  const [closeModal, setCloseModal] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [fields, setFields] = useState([
    {
      id: 1,
      automationId: dataSource?.id,
      time: "00:00",
      error: false,
    },
  ]);

  const handleAddField = () => {
    const newField = {
      id: fields.length + 1,
      automationId: dataSource?.id,
      time: "00:00",
      error: false,
    };
    setFields([...fields, newField]);
  };

  const formatTime = (value: string) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Format as HH:MM
    if (numericValue.length <= 2) {
      return numericValue;
    } else if (numericValue.length <= 4) {
      return `${numericValue.slice(0, 2)}:${numericValue.slice(2)}`;
    } else {
      return `${numericValue.slice(0, 2)}:${numericValue.slice(2, 4)}`;
    }
  };

  const validateTime = (value: string) => {
    // Check if the value is in the format HH:MM and within the valid range
    const isValid = /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
    return isValid;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    console.log("CHNAGE ===", event, index);

    const value = event.target.value;
    const formattedValue = formatTime(value);
    const isValid = validateTime(formattedValue);

    const updatedFields = [...fields];
    updatedFields[index].time = formattedValue;
    updatedFields[index].error = value !== "" && !isValid;
    setFields(updatedFields);
  };

  // Expose `submitForm` to parent
  useImperativeHandle(ref, () => ({
    onSubmit: handleSubmit,
    onPause: handlePause,
    loading: loading,
    closeModal: closeModal,
  }));

  const ValidateForm = () => {
    const allValid = fields.every((field) => !field.error && field.time !== "");

    if (!allValid) {
      const updatedFields = fields.map((field) => ({
        ...field,
        error: field.time === "" || field.error,
      }));
      setFields(updatedFields);
    }

    return allValid;
  };

  const handlePayload = () => {
    const automation: { id: number; time: string }[] = [];
    fields.map((acc, index) => {
      automation[index] = {
        id: acc?.id,
        time: acc?.time,
      };
    });

    const payload = {
      dataSourceId: dataSource.id,
      isActive: isPause
        ? 0
        : dataSource.isActive == 0
        ? 1
        : dataSource.isActive,
      automation: automation,
    };

    return payload;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (dataSource.isActive == 0) {
      setIsPause(false);
    }
    const isValid = ValidateForm();
    if (!isValid) return;
    setLoading(true);

    const payload = handlePayload();

    dispatch(setDataSourceAutomation(payload))
      .then(() => {
        setCloseModal(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePause = () => {
    setIsPause(true);
  };

  useEffect(() => {
    if (isPause == true) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPause]);

  const setAutomation = () => {
    if (dataSource?.automation?.length === 0) {
      setFields([
        {
          id: 1,
          automationId: dataSource.id,
          time: "00:00",
          error: false,
        },
      ]);
      return;
    } else {
      const updatedFields = dataSource?.automation?.map((item) => ({
        id: item?.id,
        automationId: dataSource.id,
        time: `${item?.hour}:${item?.minute}`,
        error: false,
      }));

      setFields(updatedFields || []);
    }
  };

  useEffect(() => {
    setAutomation();
    const intervalId = setInterval(() => {
      const hrs = new Date().getUTCHours().toString().padStart(2, "0");
      const mins = new Date().getUTCMinutes().toString().padStart(2, "0");
      const secs = new Date().getUTCSeconds().toString().padStart(2, "0");
      setTimer(`${hrs}:${mins}:${secs}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <BoxComponent
        sx={{ display: "flex", justifyContent: "space-between", mb: "20px" }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          Automation Cycle (In UTC)
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            UTC Time:
          </Typography>{" "}
          {timer}
        </Typography>
      </BoxComponent>

      <BoxComponent>
        {fields.map((field, index) => (
          <Grid2 container spacing={1} key={field.id}>
            <Grid2 size={11.5}>
              <FormControl fullWidth error={field.error}>
                <DefaultInput
                  fullWidth
                  value={field.time}
                  placeholder="HH:MM"
                  onChange={(e) => handleInputChange(e, index)}
                  endAdornment={
                    <InputAdornment position="end">
                      <SvgIcons name={"field_clock"} />
                    </InputAdornment>
                  }
                  sx={{ height: "42px", fontSize: "14px" }}
                />
                {field.error ? (
                  <FormHelperText
                    sx={{ padding: 0, margin: 0, fontSize: "11px" }}
                  >
                    Enter the valid time HH:MM
                  </FormHelperText>
                ) : (
                  <div style={{ marginBottom: "18px" }}></div>
                )}
              </FormControl>
            </Grid2>
            <Grid2 size={0.5} sx={{ mt: "10px" }}>
              {index === fields.length - 1 && index < 2 ? (
                <span onClick={handleAddField}>
                  <SvgIcons name={"add_icon"} />
                </span>
              ) : (
                <span
                  onClick={() => {
                    const updatedFields = fields.filter((_, i) => i !== index);
                    setFields(updatedFields);
                  }}
                >
                  <SvgIcons name={"trash_icon"} />
                </span>
              )}
            </Grid2>
          </Grid2>
        ))}
      </BoxComponent>
    </>
  );
});

export default AutomationForm;
