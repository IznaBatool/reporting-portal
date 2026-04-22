import { Box, MenuItem, Pagination, Select, Typography } from "@mui/material";
import BoxComponent from "../Box";

interface TablePaginationProps {
  total: number;
  page: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  total,
  page = 1,
  perPage = 50,
  onPageChange,
  onPerPageChange,
}) => {
  const itemPerPage = total > 0 && total > perPage ? perPage : total;
  const totalPages = Math.ceil(total / itemPerPage);
  return (
    <>
      <BoxComponent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{ fontSize: "13px", fontWeight: "200", color: "#596171" }}
        >
          Showing{" "}
          <Typography
            component="span"
            sx={{ color: "#3E4755", fontSize: "13px", fontWeight: "400" }}
          >
            {itemPerPage}
          </Typography>{" "}
          from{" "}
          <Typography
            component="span"
            sx={{ color: "#3E4755", fontSize: "13px", fontWeight: "400" }}
          >
            {total}
          </Typography>{" "}
          results
        </Typography>

        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
          <Select
            value={perPage}
            onChange={(event) => onPerPageChange(event.target.value as number)}
            sx={{
              height: "32px",
              fontSize: "12px",
              width: "52px",
              border: "none",
              borderRadius: "8px",
              background: "#F5F6F8",
              padding: "0",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
                padding: "10px",
              },
              "& .MuiSvgIcon-root": {
                width: "18px",
              },
            }}
          >
            {[50, 100].map((option) => (
              <MenuItem sx={{ fontSize: "12px" }} key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>

          {/* Pagination */}
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => onPageChange(value)}
            variant="outlined"
            shape="rounded"
            sx={{
              "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#F5F6F8 !important",
                fontWeight: "500",
                width: "30px",
                height: "30px",
                borderRadius: "3px",
              },
              "& .MuiButtonBase-root.MuiPaginationItem-root": {
                border: "none",
                fontWeight: "200",
                fontSize: "12px",
              },
            }}
          />
        </Box>
      </BoxComponent>
    </>
  );
};

export default TablePagination;
