export interface FieldProps {
    id: number;
    key: string;
    label: string;
    value: string | null;
    type: string;
    placeholder: string;
    description?: string;
    multiline?: boolean;
    maxRows?: number;
    rules: string[];
    grid: number;
    showError: boolean;
}