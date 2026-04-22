import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchDataSourceList,
  setDataSource,
  updateDescription,
} from "@/redux/slices/dataSourceSlice";

import SvgIcons from "@/assets/SvgIcons";

import TruncateText from "@/utils/TrucateText";
import { CreateAutomationFormRef, ParamsType } from "./DataSource.types";
import { useNavigate } from "react-router-dom";
import { GridRowParams } from "@mui/x-data-grid";

const useDataSourceList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { dataSourceList } = useSelector(
    (state: RootState) => state.dataSource
  );

  const formRef = useRef<CreateAutomationFormRef>(null);

  const [rows, setRows] = useState(dataSourceList || []);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [search, setSearch] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSourceDetail, setDataSourceDetail] = useState<object | null>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentRowId, setCurrentRowId] = useState<number | null>(null);
  const [currentValue, setCurrentValue] = useState("");

  const openPopover = Boolean(anchorEl);

  // Columns definition
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      sortable: false,
    },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      flex: 1.5,
      renderCell: (params: ParamsType) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="90%"
        >
          <span>{TruncateText(params?.value as string, 30)}</span>
          <IconButton
            size="small"
            onClick={(e) =>
              handleOpenPopover(e, params?.row?.id, params.value as string)
            }
          >
            <EditIcon
              fontSize="small"
              sx={{ width: 16, height: 16, color: "#C4CCD9", mt: "4px" }}
            />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      sortable: false,
    },
    {
      field: "automation",
      headerName: "Automation",
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params: ParamsType) => (
        <IconButton
          onClick={() => handleOpenAutomationModal(params)}
          aria-label="edit"
          size="small"
        >
          <SvgIcons
            name={params.row?.isActive === 1 ? "toggle_on" : "toggle_off"}
          />
        </IconButton>
      ),
    },
  ];

  // Fetch data sources
  const fetchDataSources = () => {
    dispatch(fetchDataSourceList({ page, perPage, search })).then((res) => {
      const data = res.payload?.data;
      if (!data) return;

      if (data.total !== total) setTotal(data.total);
      if (data.currentPage !== page) setPage(data.currentPage);
      if (data.perPage !== perPage) setPerPage(data.perPage);
      if (JSON.stringify(data.dataSources) !== JSON.stringify(rows)) {
        setRows(data.dataSources);
      }
    });
  };

  // Popover handlers
  const handleOpenPopover = (
    event: React.MouseEvent<HTMLElement>,
    rowId: number,
    value: string
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentRowId(rowId);
    setCurrentValue(value);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setCurrentRowId(null);
    setCurrentValue("");
  };

  const handleSaveDescription = () => {
    if (currentRowId !== null) {
      dispatch(
        updateDescription({ id: currentRowId, description: currentValue })
      ).then(() => {
        fetchDataSources();
      });
    }
    handleClosePopover();
  };

  // Automation Modal Handlers
  const handleOpenAutomationModal = (params: object) => {
    setOpenDialog(true);
    setLoading(false);
    setDataSourceDetail(params?.row);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleFormSubmit = () => {
    if (formRef.current) {
      setLoading(formRef.current.loading);
      formRef.current.onSubmit();
      setOpenDialog(formRef.current.closeModal);
      setTimeout(fetchDataSources, 300);
    }
  };

  const handleFormPause = () => {
    if (formRef.current) {
      setLoading(formRef.current.loading);
      formRef.current.onPause();
      setOpenDialog(formRef.current.closeModal);
      setTimeout(fetchDataSources, 300);
    }
  };

  const handleRowClick = (e: GridRowParams) => {
    dispatch(setDataSource(e.id as number));
    navigate(`/data-ingestion/integrated-data-source-details/${e.id}`);
  };

  return {
    rows,
    total,
    page,
    perPage,
    search,
    setPage,
    setPerPage,
    setSearch,
    openDialog,
    setOpenDialog,
    anchorEl,
    currentRowId,
    currentValue,
    setCurrentValue,
    openPopover,
    handleClosePopover,
    columns,
    handleOpenAutomationModal,
    fetchDataSources,
    handleFormPause,
    handleCloseDialog,
    handleFormSubmit,
    handleSaveDescription,
    dataSourceDetail,
    loading,
    formRef,
    handleRowClick,
  };
};

export default useDataSourceList;
