export interface RawNode {
    id?: number | string;
    label?: string;
    flag?: string;
    dataType?: string;
    disabled?: boolean;
    children?: RawNode[];
}

export interface TreeNodeData {
    id?: number | string;
    label?: string;
    children?: TreeNodeData[];
    flag?: string;
    dataType?: string;
    disabled?: boolean;
}