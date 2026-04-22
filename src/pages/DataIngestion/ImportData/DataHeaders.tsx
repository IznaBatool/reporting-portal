import SvgIcons from "@/assets/SvgIcons";
import { InputField } from "@/components";
import { setHeaders } from "@/redux/slices/dataIngestionSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Box, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DataHeaders = () => {
  const heading = [
    {
      name: "Key",
      grid: 1.5,
    },
    {
      name: "Value",
      grid: 8,
    },
  ];

  const fields = [
    {
      id: 1,
      key: "key",
      value: "",
      type: "text",
      placeholder: "Enter",
      grid: 1.4,
      showError: false,
    },
    {
      id: 3,
      key: "value",
      value: "",
      type: "text",
      placeholder: "Enter",
      grid: 8,
      showError: false,
    },
  ];

  const [inputFields, setInputFields] = useState([fields]);
  const [params, setParams] = useState<object[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { isSubmit } = useSelector((state: RootState) => state.dataIngestion);

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

      // Update params within this closure to get accurate values
      setParams((prevParams) => {
        const newParams = [...prevParams];
        newParams[index] = {
          [updated[index][0].value]: [updated[index][1].value],
        };
        return newParams;
      });

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

  const handleSubmit = () => {};

  useEffect(() => {
    if (isSubmit == 2) {
      const payload: { [key: string]: string } = {};
      params.forEach((param) => {
        const [key, value] = Object.entries(param)[0];
        payload[key] = value[0];
      });
      console.log("HEADER ===", payload);
      dispatch(setHeaders(payload));
    }
  }, [isSubmit, params, dispatch]);

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
        <form onSubmit={handleSubmit}>
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
                      onChange={(key, val) =>
                        handleChange(key, val, index, ind)
                      }
                    ></InputField>
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
        </form>
      </Grid2>
    </>
  );
};

export default DataHeaders;
