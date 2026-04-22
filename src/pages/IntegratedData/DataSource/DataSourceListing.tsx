import { useEffect } from "react";
import {
  Box,
  Typography,
  Popover,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

import { BoxComponent } from "@/components";
import DataTable from "@/components/DataTable";
import FormDialog from "@/components/FormDialog";
import SvgIcons from "@/assets/SvgIcons";
import { InputTextField } from "./DataSource.style";
import AutomationForm from "./AutomationForm";
import useDataSourceList from "./useDataSourceList";
import { GridColDef } from "@mui/x-data-grid";

const DataSourceListing = () => {
  const {
    rows,
    total,
    page,
    perPage,
    search,
    setPage,
    setPerPage,
    setSearch,
    openDialog,
    anchorEl,
    currentValue,
    openPopover,
    columns,
    fetchDataSources,
    handleFormPause,
    handleCloseDialog,
    handleFormSubmit,
    handleSaveDescription,
    setCurrentValue,
    dataSourceDetail,
    loading,
    formRef,
    handleClosePopover,
    handleRowClick
  } = useDataSourceList();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchDataSources();
    }, 300);
    return () => clearTimeout(timeout);
  }, [page, perPage, search]);

  return (
    <div>
      {/* Header */}
      <BoxComponent
        height="56px"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            fontFamily: "GeneralSans-Medium, sans-serif",
          }}
        >
          Integrated Data Source
        </Typography>
        <InputTextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcons name="search_icon" />
                </InputAdornment>
              ),
            },
          }}
        />
      </BoxComponent>

      {/* Table */}
      <BoxComponent sx={{ height: "calc(100vh - 146px)", mt: "20px" }}>
        <DataTable
          columns={columns as GridColDef[]}
          rows={rows}
          page={page}
          perPage={perPage}
          total={total}
          onRowClick={(e) => handleRowClick(e)}
          onPageChange={(p: number) => setPage(p)}
          onPerPageChange={(pp: number) => setPerPage(pp)}
        />
      </BoxComponent>

      {/* Automation Modal */}
      <FormDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        title="Enter time to enable automation"
        icon="clock"
        btnContent="Save"
        secondBtnContent="Pause"
        onSubmit={handleFormSubmit}
        handleSecondClick={handleFormPause}
        loading={loading}
        width="430px"
      >
        <AutomationForm
          dataSource={dataSourceDetail as { id: number; isActive: number }}
          ref={formRef}
        />
      </FormDialog>

      {/* Edit Description Popover */}
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ borderRadius: "12px" }}
      >
        <Box
          sx={{
            width: 300,
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            multiline
            rows={4}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "& .MuiInputBase-root": { fontSize: "12px" },
            }}
          />
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button
              sx={{ fontSize: "12px", height: 26 }}
              onClick={handleClosePopover}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ fontSize: "12px", height: 26 }}
              onClick={handleSaveDescription}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default DataSourceListing;
