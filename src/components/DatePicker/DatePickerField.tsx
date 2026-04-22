import * as React from "react";
import Popover from "@mui/material/Popover";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { InputAdornment } from "@mui/material";
import { isWithinInterval, format } from "date-fns";
import { InputTextField } from "./DatePicker.style";
import SvgIcons from "@/assets/SvgIcons";

interface DatePickerFieldProps {
  value: [Date | null, Date | null] | null;
  onChange: (range: [Date, Date]) => void;
}

function isDateInRange(date: Date, start: Date, end: Date) {
  if (!start || !end) return false;
  return isWithinInterval(date, { start, end });
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  value = null,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [startDate, setStartDate] = React.useState<Date | null>(
    value?.[0] || null
  );
  const [endDate, setEndDate] = React.useState<Date | null>(value?.[1] || null);
  const [selectionStep, setSelectionStep] = React.useState(0);

  const open = Boolean(anchorEl);

  const handleFieldClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("EVENT ===", event);

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectionStep(0);
  };

  const handleDateChange = (value: unknown) => {
    if (!value || !(value instanceof Date)) return;

    if (selectionStep === 0) {
      setStartDate(value);
      setEndDate(null);
      setSelectionStep(1);
    } else {
      const newStart =
        startDate && value < startDate ? value : startDate || value;
      const newEnd = startDate && value < startDate ? startDate : value;
      setStartDate(newStart);
      setEndDate(newEnd);
      setSelectionStep(0);
      setAnchorEl(null);
      onChange([newStart, newEnd] as [Date, Date]);
    }
  };

  const formatRange = () => {
    if (!startDate) return "";
    if (!endDate) return format(startDate, "yyyy-MM-dd");
    return `${format(startDate, "yyyy-MM-dd")},${format(
      endDate,
      "yyyy-MM-dd"
    )}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputTextField
        value={formatRange()}
        onClick={handleFieldClick}
        fullWidth
        variant="outlined"
        placeholder="Select Date Range"
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <SvgIcons name="calendar" />
              </InputAdornment>
            ),
          },
        }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <DateCalendar
          value={selectionStep === 0 ? startDate : endDate || startDate}
          onChange={handleDateChange}
          slots={{
            day: (props) => {
              const { day, outsideCurrentMonth, ...other } = props;
              const dayDate = day as Date;
              const isStart =
                startDate && dayDate.getTime() === startDate.getTime();
              const isEnd = endDate && dayDate.getTime() === endDate.getTime();
              const inRange =
                startDate && endDate
                  ? isDateInRange(dayDate, startDate, endDate)
                  : false;

              return (
                <PickersDay
                  {...other}
                  day={day}
                  outsideCurrentMonth={outsideCurrentMonth}
                  sx={{
                    bgcolor:
                      isStart || isEnd
                        ? "primary.main"
                        : inRange
                        ? "primary.light"
                        : undefined,
                    color: isStart || isEnd ? "white" : undefined,
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                    },
                  }}
                />
              );
            },
          }}
        />
      </Popover>
    </LocalizationProvider>
  );
};

export default DatePickerField;
