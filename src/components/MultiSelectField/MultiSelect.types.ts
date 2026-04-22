type FieldValue = string | number | boolean | object;
interface Field {
    key?: string | number | undefined;
    placeholder?: string;
    label: string;
    type: string;
    value?: FieldValue | FieldValue[] | null | undefined;
    list?: string[] | null | undefined;
}

interface SelectFieldProps {
    error?: boolean;
    helperText?: string;
    sx?: object;
    height?: string,
    labelSx?: object;
    field: Field;
    isMultiSelect: boolean,
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onChange: (key: string | number | undefined, newValue: string | string[] | object[] | undefined) => void;
    //   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default SelectFieldProps;