
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
    RawNode,
    TreeNodeData,
} from "@/components/Treeview/TreeViewField.types";
import { createDataSourceTable } from "@/redux/slices/dataIngestionSlice";
import {
    DatabaseSetupPayload,
    ImportDataPayload,
} from "@/types/IDataIngestionTypes";
import { ColumnFieldProps, ValueType } from "./SetupDatabase.types";
import ValidateField from "@/utils/ValidateField";
import { duplicationError } from "./ValidationHelper";

export const useSetupDatabase = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const [partitionColumn, setPartitionColumn] = useState<number | null>(null);
    const [amountColumn, setAmountColumn] = useState<number | null>(null);
    const { JsonTreeView, importSavePayload, dataKey } = useSelector(
        (state: RootState) => state.dataIngestion
    );
    const [isDetailFormValid, setIsDetailFormValid] = useState(false);
    const [columnNames, setColumnNames] = useState<string[]>([]);
    const [disableFields, setDisableFields] = useState<number[]>([]);

    const transformToTreeData = (
        nodes: RawNode[] | null | undefined
    ): TreeNodeData[] => {
        return nodes
            ? nodes.map((node) => ({
                id: node.id,
                label: node.label,
                flag: node.flag,
                dataType: node.dataType,
                disabled: node.disabled,
                children: node.children
                    ? transformToTreeData(node.children)
                    : undefined,
            }))
            : [];
    };

    const treeData: TreeNodeData[] = useMemo(
        () => transformToTreeData(JsonTreeView),
        [JsonTreeView]
    );

    const [detailFields, setDetailFields] = useState([
        {
            id: "dataSource",
            key: "dataSource",
            value: "",
            type: "text",
            label: "Data Source Name*",
            placeholder: "Enter",
            grid: 4.5,
            rules: ["required", "max60"],
            showError: false,
        },
        {
            id: "tableName",
            key: "tableName",
            value: "",
            type: "text",
            label: "Table Name*",
            placeholder: "Enter",
            grid: 4.5,
            rules: ["required", "alphabetWithUnderscore", "max30"],
            showError: false,
        },
    ]);

    const columnFields = useMemo(
        () => [
            {
                id: "addColumn",
                key: "add_Column",
                value: true,
                type: "checkbox",
                grid: 1,
                display: true,
                sx: `ml: "5px"`,
            },
            {
                id: "name",
                key: "columnName",
                value: "",
                type: "text",
                placeholder: "Column Name",
                grid: 3,
                rules: ["required", "alphabetWithUnderscore", "max60char"],
                isError: false,
            },
            {
                id: "mapKey",
                key: "mapKey",
                value: "",
                type: "treeView",
                placeholder: "Select",
                options: JsonTreeView,
                flag: "",
                // options: [],
                grid: 3,
            },
            {
                id: "type",
                key: "type",
                value: "",
                type: "select",
                placeholder: "Select",
                options: [
                    { id: "string", label: "Text" },
                    { id: "integer", label: "Number" },
                    { id: "double", label: "Decimal Number" },
                    { id: "dateTime", label: "Date & Time" },
                    { id: "longText", label: "Description" },
                ],
                grid: 3,
                disable: false,
            },
            {
                id: "partitionColumn",
                key: "partition_Column",
                value: false,
                type: "checkbox",
                grid: 1,
                display: false,
            },
            {
                id: "amountColumn",
                key: "amount_Column",
                value: false,
                type: "checkbox",
                grid: 1,
                display: false,
            },
        ],
        [JsonTreeView]
    );

    const heading = [
        {
            name: "Add",
            grid: 0.9,
            info: "Choose the columns to include in the table.",
        },
        {
            name: "Name",
            grid: 3.06,
            info: "Edit the name of the column.",
        },
        {
            name: "Map Key",
            grid: 3.1,
            info: "Specifying map key for the column.",
        },
        {
            name: "Data Type",
            grid: 2.9,
            info: `Specifying the data type for the column. <br /> <b> Note: </b> <br /> Storing <b>Number/Decimal Number</b> columns as <b>Date & Time</b> can cause accounting issues due to format conversion; <br />kindly choose column data types wisely.`,
        },
        {
            name: "Partition",
            grid: 1,
            info: "Select one column to serve as the primary key, which will be used for accounting operations and data fetching.",
        },
        {
            name: "Amount",
            grid: 1,
            info: "Select one column to serve for the summing up transaction amount.",
        },
    ];

    const [inputFields, setInputFields] = useState<ColumnFieldProps[][]>([]);

    const handleChange = (key: string | number | undefined, value: string) => {
        if (key == "tableName" && typeof value === "string") {
            value = value?.replace(/ /g, "_");
        }
        setDetailFields((prev) =>
            prev.map((field) =>
                field.key != key
                    ? field
                    : {
                        ...field,
                        value,
                    }
            )
        );
    };

    // Check if all fields are valid whenever fieldData updates
    useEffect(() => {
        const allValid = detailFields.every(
            (field) => !ValidateField(field.rules, field.value)
        );
        setIsDetailFormValid(allValid);
    }, [detailFields]);

    const handleFormValidation = () => {
        setDetailFields((prev) =>
            prev.map((field) => ({
                ...field,
                showError: !!ValidateField(field.rules, field.value),
            }))
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleFormValidation();
        const hasDuplicateColumnNames = columnNames.some((name, idx) =>
            name != '' && columnNames.indexOf(name) !== idx
        );
        if (hasDuplicateColumnNames) return;
        if (!amountColumn) return;
        if (!partitionColumn) return;
        if (!isDetailFormValid) return;
        setLoading(true);
        const payload: DatabaseSetupPayload = {
            dataKey: dataKey as string,
            httpRequest: importSavePayload as ImportDataPayload,
            tableData: {
                dataSource: detailFields[0].value,
                tableName: detailFields[1].value,
                partitionColumn: partitionColumn
                    ? inputFields[partitionColumn][2]?.value?.label
                    : null,
                amountColumn: amountColumn
                    ? inputFields[amountColumn][2].value?.label
                    : null,
                columns: [],
            },
        };
        inputFields.map((fields, index) => {
            if (disableFields.includes(index)) return;
            const obj: { [key: string]: ValueType } = {};
            obj["isNullable"] = false;
            fields.map((field) => {
                obj[field.key] = field.value;
            });
            payload?.tableData.columns?.push(obj);
        });
        dispatch(createDataSourceTable(payload)).finally(() => {
            setLoading(false);
        });
    };

    const handleCheckbox = (val: boolean, index: number, childIndex: number) => {

        const updatedFields = inputFields.map((fields, fieldsIndex) => {

            if (fieldsIndex !== index) {
                return fields.map((field, fieldIndex) => {
                    if (fieldIndex !== childIndex) return field;

                    return {
                        ...field,
                        value: childIndex != 0 ? false : field.value,
                    };
                });
            }

            return fields.map((field, fieldIndex) => {
                // Handle main "Add Column" checkbox
                if (childIndex === 0 && fieldIndex === 0) {
                    const updatedValue = val;

                    // Update disableFields
                    if (updatedValue === true) {
                        setDisableFields((prev) => [...prev, index]);
                        setColumnNames((prev) => {
                            const updated = [...prev];
                            updated[index] = ""; // clear the column name
                            return updated;
                        });
                    } else {
                        setDisableFields((prev) => prev.filter((i) => i !== index));
                        setColumnNames((prev) => {
                            const updated = [...prev];
                            updated[index] = inputFields[index][1].value as string;
                            return updated;
                        });
                    }

                    return {
                        ...field,
                        value: !updatedValue,
                    };
                }
                // Uncheck Partition and Amount if the main column is being unchecked
                if (disableFields.includes(index) && (fieldIndex === 4 || fieldIndex === 5)) {
                    return {
                        ...field,
                        value: false,
                    };
                }

                // Partition or Amount Column
                if (childIndex === 4 && fieldIndex === 4) {
                    setPartitionColumn(index);
                    return {
                        ...field,
                        value: !field.value,
                    };
                }
                if (childIndex === 5 && fieldIndex === 5) {
                    setAmountColumn(index);
                    return {
                        ...field,
                        value: !field.value,
                    };
                }

                return field;
            });
        });

        setInputFields(updatedFields);

        const activeColumnNames = updatedFields
            .map((row, idx) => (disableFields.includes(idx) ? "" : row[1].value))
            .filter((name) => name !== "");

        duplicationError(
            updatedFields[index][childIndex],
            index,
            updatedFields,
            disableFields,
            activeColumnNames as string[]
        );
    };


    const handleDataType = (
        dataType: string | string[] | object | number | undefined,
        index: number,
        childIndex: number
    ) => {
        setInputFields((prev) =>
            prev.map((fields, fieldsIndex) => {
                if (fieldsIndex !== index) return fields;

                return fields.map((field, fieldIndex) => {
                    if (
                        dataType == "string" ||
                        (dataType == "longText" && fieldIndex == childIndex)
                    ) {
                        return {
                            ...field,
                            display: false,
                        };
                    }
                    if (dataType === "dateTime" && fieldIndex == 4) {
                        return {
                            ...field,
                            display: true,
                        };
                    } else if (
                        (dataType === "integer" || dataType === "double") &&
                        fieldIndex == 5
                    ) {
                        return {
                            ...field,
                            display: true,
                        };
                    } else {
                        return {
                            ...field,
                            display: false
                        }
                    }
                    return field;
                });
            })
        );
    };

    const handleShowError = (index: number) => {
        setDetailFields((prev) =>
            prev.map((field, fieldIndex) =>
                fieldIndex != index
                    ? field
                    : {
                        ...field,
                        showError: true,
                    }
            )
        );
    };

    const handleFieldChange = (
        key: string | number | undefined,
        val: string | string[] | object | number | undefined,
        index: number,
        childIndex: number
    ) => {
        if (key == "columnName" && typeof val === "string") {
            val = val?.replace(/ /g, "_");
        }
        if (key == "type") {
            handleDataType(val, index, childIndex);
        }

        if (key === "columnName") {
            setColumnNames((prev) => {
                const updated = [...prev];
                updated[index] = val as string;
                return updated;
            });
        }
        setInputFields((prev) =>
            prev.map((fields, fieldsIndex) => {
                if (fieldsIndex !== index) return fields;

                return fields.map((field, fieldIndex) => {
                    if (fieldIndex !== childIndex) return field;

                    return {
                        ...field,
                        value: val,
                    };
                });
            })
        );
    };

    const validationError = (field: ColumnFieldProps) => {
        return field?.rules && ValidateField(field?.rules, field?.value);
    };

    useEffect(() => {
        if (!JsonTreeView || !columnFields) return;

        const newInputFields: ColumnFieldProps[][] = [];

        let hasSetPartition = false;
        let hasSetAmount = false;
        setColumnNames([]);

        JsonTreeView.forEach((node: TreeNodeData, index) => {
            const processNode = (
                current: TreeNodeData,
                parent: TreeNodeData,
                index: number
            ) => {
                const fields = columnFields.map((field) => ({ ...field }));

                fields[0].value = true;
                fields[1].value = parent.label as string;
                (fields[2] as ColumnFieldProps).value = current;
                fields[2].flag = parent.flag as string;
                fields[3].value = parent.dataType as string;

                setColumnNames((prev) => [...prev, parent.label!]);

                const isNotEdgeRow = index !== JsonTreeView.length - 1 && index !== JsonTreeView.length - 2;

                if (parent.dataType === "dateTime" && isNotEdgeRow) {
                    fields[4].display = true;
                    if (!hasSetPartition) {
                        fields[4].value = true;
                        setPartitionColumn(index);
                        hasSetPartition = true;
                    }
                }

                if (parent.dataType === "integer" || parent.dataType === "double" && isNotEdgeRow) {
                    fields[5].display = true;
                    if (!hasSetAmount) {
                        fields[5].value = true;
                        setAmountColumn(index);
                        hasSetAmount = true;
                    }
                }

                newInputFields.push(fields as ColumnFieldProps[]);
            };

            if (node.children && node.children.length > 0) {
                node.children.forEach((child) => processNode(child, node, index));
            } else {
                processNode(node, node, index);
            }
        });

        setInputFields(newInputFields);
        setDisableFields([0, newInputFields.length - 1, newInputFields.length - 2]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        detailFields,
        inputFields,
        handleChange,
        handleFieldChange,
        handleCheckbox,
        validationError,
        handleSubmit,
        handleShowError,
        loading,
        treeData,
        disableFields,
        columnNames,
        heading
    };
};
