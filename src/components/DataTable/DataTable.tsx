// DataTable.tsx
import React from "react";
import { Table } from "./DataTable.style";
import { DataTableProps } from "./DataTable.types";
import TablePagination from "./TablePagination";

const DataTable: React.FC<DataTableProps> = ({
  columns = [],
  rows = [],
  page = 1,
  perPage = 50,
  total,
  onPageChange,
  onPerPageChange,
  onRowClick,
  ...props
}) => {
  return (
    <>
      <Table
        rows={rows}
        columns={columns}
        hideFooterPagination
        disableColumnMenu
        rowHeight={36}
        disableRowSelectionOnClick
        checkboxSelection={false}
        onRowClick={(params) => onRowClick && onRowClick(params)}
        {...props}
      />
      <TablePagination
        total={total}
        page={page}
        perPage={perPage}
        onPageChange={onPageChange || (() => {})}
        onPerPageChange={onPerPageChange || (() => {})}
      ></TablePagination>
    </>
  );
};

export default DataTable;
