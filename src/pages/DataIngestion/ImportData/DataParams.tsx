import SvgIcons from "@/assets/SvgIcons";
import { InputField } from "@/components";
import { setApiParams, setUrlParams } from "@/redux/slices/dataIngestionSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Box,
  Grid2,
  MenuItem,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SelectField = styled(TextField)({
  height: "36px",
  fontSize: "12px",
  fontWeight: 300,
  lineHeight: "38px",
  "& .MuiInputBase-input": {
    padding: "0 10px",
    color: "#3e4146",
    fontWeight: 300,
    height: "36px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "6px",
    border: "1px solid #E8EBF6",
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root": {
    fontSize: "12px",
    fontWeight: 300,
    lineHeight: "38px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #95A3B9",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #95A3B9",
  },
  "& .MuiSvgIcon-root": {
    width: "20px",
    height: "24px",
  },
});

const DataParams = () => {
  const heading = [
    {
      name: "Type",
      grid: 1.5,
    },
    {
      name: "Key",
      grid: 4.58,
    },
    {
      name: "Value",
      grid: 4,
    },
  ];

  const fields = [
    {
      id: 1,
      key: "type",
      value: "Text",
      type: "select",
      placeholder: "Select",
      options: ["Text", "Date"],
      grid: 1.4,
      showError: false,
    },
    {
      id: 2,
      key: "key",
      value: "",
      type: "text",
      placeholder: "Enter",
      grid: 4,
      showError: false,
    },
    {
      id: 3,
      key: "value",
      value: "",
      type: "text",
      placeholder: "Enter",
      grid: 4,
      showError: false,
    },
  ];

  const [inputFields, setInputFields] = useState([fields]);
  const [params, setParams] = useState<object[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { apiUrl, isSubmit } = useSelector(
    (state: RootState) => state.dataIngestion
  );

  const handleChange = (
    key: string | number | undefined,
    value: string | number | undefined,
    index: number,
    childIndex: number
  ) => {
    setInputFields((prev) => {
      const updated = [...prev];
      const updatedRow = [...prev[index]];

      updatedRow[childIndex] = {
        ...updatedRow[childIndex],
        value: value as string,
      };

      updated[index] = updatedRow;

      if (index === prev.length - 1 && updated[index][1].value.length > 0) {
        updated.push([...fields]);
      }

      if (childIndex > 0) {
        // Update params within this closure to get accurate values
        setParams((prevParams) => {
          const newParams = [...prevParams];
          newParams[index] = {
            [updated[index][1].value]: [updated[index][2].value],
          };
          return newParams;
        });
      }

      return updated;
    });
  };

  const handleDelete = (index: number) => {
    setInputFields((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });

    setParams((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  useEffect(() => {
    const queryParams = params.reduce((acc: Record<string, string>, param) => {
      const [key, value] = Object.entries(param)[0];
      acc[key] = value[0];
      return acc;
    }, {});

    if (Object.entries(queryParams).length > 0) {
      const fullUrlParams = `?${new URLSearchParams(queryParams)}`;
      dispatch(setUrlParams(`${fullUrlParams}`));
    } else {
      const fullUrlParams = ``;
      dispatch(setUrlParams(`${fullUrlParams}`));
    }
  }, [params, dispatch, apiUrl]);

  useEffect(() => {
    if (isSubmit == 1) {
      const payload: { [key: string]: string }[] = [];

      inputFields.forEach((fields, index) => {
        if (fields[1].value != "") {
          payload[index] = {};
          fields.forEach((field) => {
            payload[index][field.key] = field.value;
          });
        }
      });
      dispatch(setApiParams(payload));
    }
  }, [isSubmit, inputFields, dispatch]);

  return (
    <>
      <Grid2 container spacing={1} sx={{ mb: "20px" }}>
        <Grid2 size={10.5}>
          <Box
            sx={{
              height: "36px",
              backgroundColor: "#F8F8F9",
              border: "1px solid #E8EBF6",
              borderRadius: "6px",
            }}
          >
            <Grid2 container spacing={2}>
              {heading.map((head, index) => (
                <Grid2
                  key={index}
                  size={head.grid}
                  sx={{
                    p: "3px 10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      lineHeight: "30px",
                    }}
                  >
                    {head.name}
                  </Typography>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Grid2>
      </Grid2>
      <Grid2>
        {inputFields.map((fields, index) => (
          <Grid2 container spacing={2} key={index}>
            {fields.map((field, ind) => (
              <Grid2 key={ind} size={field.grid}>
                {field.type == "text" && (
                  <InputField
                    height={"36px"}
                    field={field}
                    labelSx={{ fontSize: "13px", padding: "5px 0 10px" }}
                    sx={{ fontSize: "12px" }}
                    onChange={(key, val) => handleChange(key, val, index, ind)}
                  ></InputField>
                )}
                {field.type == "select" && (
                  <SelectField
                    value={field.value}
                    select
                    fullWidth
                    onChange={(e) =>
                      handleChange(field.key, e.target.value, index, ind)
                    }
                  >
                    {field?.options?.map((option, index) => (
                      <MenuItem
                        sx={{ fontSize: "12px", fontWeight: 300 }}
                        key={index}
                        value={option}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </SelectField>
                )}
              </Grid2>
            ))}
            {inputFields.length > 1 && index !== inputFields.length - 1 && (
              <Grid2
                size={1}
                sx={{
                  height: "36px",
                  width: "36px",
                  background: "#F2F6F9",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(index)}
              >
                <SvgIcons name="trash_icon" />
              </Grid2>
            )}
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default DataParams;
