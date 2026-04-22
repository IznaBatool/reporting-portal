import {
  fetchColumnData,
  fetchDataSourceColumns,
} from "@/redux/slices/dataSourceSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useLoader } from "@/context/LoaderContext";

export type itemObject = {
  name: string;
  data_type: string;
};

export type columns = {
  name: string;
  data_type?: string;
  options?: object[];
  loading?: boolean;
};
type InputFieldRow = columns[]; // each row is a set of fields

const useTrnxFilterData = () => {
  const { sourceId } = useParams();
  const { show, hide } = useLoader();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [columnId, setColumnId] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const [tableColumns, setTableColumns] = useState<columns[]>([]);
  const [inputFields, setInputFields] = useState<InputFieldRow[]>([]);

  const newFields = (item: itemObject[]) => {
    let id = columnId;
    setColumnId(columnId + 3);

    return [
      {
        id: id++,
        object_key: "condition",
        key: "condition",
        value: columnId === 1 ? "" : "AND",
        type: columnId === 1 ? "text" : "select",
        placeholder: columnId === 1 ? "Where" : "Select",
        readonly: columnId === 1,
        select: id !== 1,
        data_type: "",
        options: [
          { label: "AND", value: "AND", data_type: "string" },
          { label: "OR", value: "OR", data_type: "string" },
        ],
        width: "58px",
        grid: 2.5,
        class: "condition",
        display: true,
      },
      {
        id: id++,
        object_key: "columnName",
        key: columnId === 1 ? item[0].name : "",
        value: columnId === 1 ? item[0].name : "",
        type: "select",
        placeholder: "Select Option",
        readonly: false,
        select: true,
        data_type: "",
        options: item.map((i) => ({
          label: i.name,
          value: i.name,
          data_type: i.data_type,
        })),
        width: "204px",
        grid: 8.5,
        class: "",
        display: true,
      },
      {
        id: id++,
        object_key: "columnValues",
        key: columnId === 1 ? item[0].name : "",
        value: null,
        type: item[0].data_type == "string" ? "select" : "text",
        multiple: true,
        placeholder: "Select Option",
        readonly: false,
        data_type: columnId === 1 ? item[0].data_type : "",
        width: "204px",
        display: columnId === 1,
        tab: "Delete Transactions",
        mask: "YYYY-MM-DD",
        date: [],
        class: "",
        grid: 8.5,
        options: [],
        loading: true,
      },
    ];
  };

  const organizeTableColumns = (columns: object) => {
    const updatedColumns: columns[] = [];

    Object.entries(columns).forEach(([key, value]) => {
      updatedColumns.push({
        name: key,
        data_type: value as string,
      });
    });

    setTableColumns(updatedColumns);

    return updatedColumns;
  };

  const handleInputFields = (item: columns[]) => {
    if (sourceId) {
      dispatch(
        fetchColumnData({
          id: parseInt(sourceId),
          column: item[0].name,
          pagination: { page: 1, perPage: 10 },
        })
      )
        .unwrap()
        .then((data) => {
          const record = data.data.record;

          setInputFields((prevFields) => {
            const updatedFields = [...prevFields];
            if (updatedFields[updatedFields.length - 1]?.[2]) {
              const rowIndex = updatedFields.length - 1;
              const fieldRow = [...updatedFields[rowIndex]];

              fieldRow[2] = {
                ...fieldRow[2],
                options: record.map((id) => ({
                  label: id,
                  value: id,
                })),
                loading: false,
              };

              updatedFields[rowIndex] = fieldRow;
            }
            return updatedFields;
          });

          setPage(data.data.currentPage);
          setPerPage(data.data.perPage);
        })
        .catch((error) => {
          console.error("Failed to fetch column data:", error);
        });
    }
  };

  const fetchColumns = () => {
    if (sourceId) {
      show();
      dispatch(fetchDataSourceColumns({ id: parseInt(sourceId) }))
        .then((response) => {
          const organizedColumns = organizeTableColumns(
            (response.payload as { data: Record<string, string> }).data
          );
          const fields = newFields(organizedColumns);

          setInputFields((prev) => [...prev, [...fields]]);

          handleInputFields(organizedColumns);
        })
        .finally(() => {
          hide();
        });
    }
  };

  const handleSelect = (
    rowIndex: number,
    fieldIndex: number,
    selectedValue: string
  ) => {
    setInputFields((prev) => {
      const updated = [...prev];
      const field = updated[rowIndex][fieldIndex];

      field.value = selectedValue;
      field.key = selectedValue;

      if (field.object_key === "columnName" && sourceId) {
        const selectedCol = field.options?.find(
          (opt: any) => opt.value === selectedValue
        );

        const columnValuesField = updated[rowIndex].find(
          (f) => f.object_key === "columnValues"
        );

        if (selectedCol) {
          if (columnValuesField) {
            columnValuesField.display = true;
            columnValuesField.loading = true;
          }

          dispatch(
            fetchColumnData({
              id: parseInt(sourceId),
              column: selectedCol.value,
              pagination: { page: 1, perPage: 10 },
            })
          ).then((res) => {
            const record = res.payload.data.record;

            if (columnValuesField) {
              columnValuesField.display = true;

              if (record.length > 0) {
                columnValuesField.type = "select";
                columnValuesField.options = record.map((id) => ({
                  label: id,
                  value: id,
                }));
              } else {
                columnValuesField.type = "text";
              }

              columnValuesField.data_type = selectedCol.data_type;
              columnValuesField.loading = false;

              setInputFields([...updated]);
            }
          });
        } else {
          if (columnValuesField) {
            columnValuesField.display = false;
            columnValuesField.value = "";
          }
        }
      }

      return updated;
    });
  };

  const handleChange = (
    rowIndex: number,
    fieldIndex: number,
    newValue: string
  ) => {
    setInputFields((prev) => {
      const updated = [...prev];
      updated[rowIndex][fieldIndex].value = newValue;
      return updated;
    });
  };

  const handleAddColumn = () => {
    const newFieldSet = newFields(tableColumns);
    setInputFields((prev) => [...prev, [...newFieldSet]]);
  };

  const handleDelete = (index: number) => {
    setInputFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDateChange = (
    rowIndex: number,
    fieldIndex: number,
    value: string | [Date, Date]
  ): void => {
    const updatedFields = [...inputFields];
    updatedFields[rowIndex][fieldIndex].value = value;
    setInputFields(updatedFields);
  };

  useEffect(() => {
    setColumnId(1);
    setInputFields([]);
  }, [sourceId]);

  return {
    inputFields,
    fetchColumns,
    handleSelect,
    handleChange,
    handleAddColumn,
    handleDelete,
    handleDateChange,
  };
};

export default useTrnxFilterData;
