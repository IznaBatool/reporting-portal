type FieldValue = string | number | boolean | object;
interface Field {
    key?: string | number | undefined;
    placeholder?: string;
    label?: string;
    type?: string;
    multiline?: boolean,
    maxRows?: number,
    value?: FieldValue | FieldValue[] | null | undefined;
}

interface FieldProps {
    error?: boolean;
    helperText?: string;
    sx?: object;
    height?: string,
    labelSx?: object;
    field: Field;
    disabled?: boolean
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onChange: (key: string | number | undefined, newValue: string) => void;
    //   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default FieldProps;