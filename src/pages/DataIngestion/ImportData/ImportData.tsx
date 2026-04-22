import { BasicButton, BoxComponent } from "@/components";
import { Box, Divider, Grid2, MenuItem, Typography } from "@mui/material";
import { InputTextField, SelectField } from "./ImportData.style";
import { useEffect, useState } from "react";
import ImportDataTabs from "./ImportDataTabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchDataToImport,
  setBasicUrl,
  setMethod,
  setPayload,
  setSubmit,
} from "@/redux/slices/dataIngestionSlice";
import {
  ImportDataPayload,
  RequestParamsTypes,
} from "@/types/IDataIngestionTypes";

const ImportData = () => {
  const methods = ["GET", "POST"];
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>(methods[0]);
  const dispatch = useDispatch<AppDispatch>();

  const { url, urlParams, apiUrl, params, headers, method, isSubmit } =
    useSelector((state: RootState) => state.dataIngestion);

  const fullUrl = `${url}${urlParams}`;

  const handleMethod = (event: string) => {
    setSelectedMethod(event);
    dispatch(setMethod(event));
  };

  const handleUrl = (event: string) => {
    const [basicUrl] = event.split("?");
    dispatch(setBasicUrl(basicUrl));
  };

  const handleSubmit = () => {
    if (!fullUrl) return;
    setLoading(true);
    dispatch(setSubmit());
  };

  useEffect(() => {
    if (isSubmit == 3) {
      setTimeout(() => {
        const payload: ImportDataPayload = {
          method: method,
          apiUrl: fullUrl,
          url: apiUrl,
          basicUrl: apiUrl,
          headers: headers,
          queryParams: params as RequestParamsTypes[],
        };
        dispatch(fetchDataToImport(payload)).finally(() => {
          dispatch(setPayload(payload));
          setLoading(false);
        });
      }, 500);
    }
  }, [apiUrl, params, headers, method, isSubmit, dispatch, fullUrl]);
  return (
    <>
      <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
        Import and Save
      </Typography>
      <Typography sx={{ fontSize: "12px", fontWeight: 300, margin: "10px 0" }}>
        Use this interface to connect to an API and retrieve data. Select the
        HTTP method, enter the API endpoint, and configure the required
        parameters and headers. Test your connection before <br /> proceeding to
        save the data into your database table.
      </Typography>
      <Grid2 container spacing={1} sx={{ mt: "25px" }}>
        <Grid2 size={10.5}>
          <Box
            sx={{
              height: "36px",
              backgroundColor: "#F8F8F9",
              border: "1px solid #E8EBF6",
              borderRadius: "6px",
            }}
          >
            <Grid2 container spacing={1}>
              <Grid2 size={1.25}>
                <SelectField
                  value={selectedMethod}
                  select
                  fullWidth
                  onChange={(e) => handleMethod(e.target.value)}
                >
                  {methods.map((option, index) => (
                    <MenuItem
                      sx={{ fontSize: "12px", fontWeight: 300 }}
                      key={index}
                      value={option}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </SelectField>
              </Grid2>
              <Divider
                sx={{ borderColor: "#E8EBF6" }}
                orientation="vertical"
                variant="middle"
                flexItem
              />
              <Grid2 size={10.5}>
                <InputTextField
                  onChange={(e) => handleUrl(e.target.value)}
                  value={fullUrl}
                  fullWidth
                  placeholder="Enter"
                ></InputTextField>
              </Grid2>
            </Grid2>
          </Box>
        </Grid2>
        <Grid2 size={1.5} sx={{ display: "flex", justifyContent: "center" }}>
          <BasicButton
            height={"36px"}
            sx={{
              borderRadius: "6px",
              fontSize: "12px",
              backgroundColor: "#0E1218",
            }}
            onClick={handleSubmit}
            loading={loading}
          >
            Test & continue
          </BasicButton>
        </Grid2>
      </Grid2>

      <BoxComponent>
        <ImportDataTabs></ImportDataTabs>
      </BoxComponent>
    </>
  );
};

export default ImportData;
