import { ColumnFieldProps, ValueType } from "./SetupDatabase.types";

// validationHelpers.ts
export const isDuplicate = (value: ValueType, names: string[]) =>
    names.filter((name) => name === value).length > 1;
  
  export const duplicationError = (
    field: ColumnFieldProps,
    index: number,
    inputFields: ColumnFieldProps[][],
    disableFields: number[],
    columnNames: string[]
  ) => {
    const filtered = disableFields.filter((num) =>
      [0, inputFields.length - 1, inputFields.length - 2].includes(num)
    );
    if (!filtered.includes(index)) {
      return isDuplicate(field.value, columnNames);
    }
  };
  