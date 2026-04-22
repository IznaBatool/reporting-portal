export interface ParamsType {
    id: number;
    field: object;
    row: {
        isActive?: number | string;
        [key: string]: string | number | object | object[] | undefined | null;
    }[];
    rowNode: object;
    colDef: object;
    cellMode: object;
    hasFocus: boolean;
    tabIndex: number;
    value: string | number | undefined | null;
    formattedValue: boolean;
    isEditable: boolean;
    api: string;
};

export interface CreateAutomationFormRef {
    onSubmit: () => void;
    handleSecondClick: () => void;
    onPause: () => void;
    loading: boolean;
    closeModal: boolean;
};

export interface AutomationFormProps {
    automationId?: number;
    dataSource: {
        id: number,
        isActive: number
        automation?: {
            id: number;
            hour: string;
            minute: string;
        }[];
    };
}