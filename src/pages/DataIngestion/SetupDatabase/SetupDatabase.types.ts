import { TreeNodeData } from "@/components/Treeview/TreeViewField.types";

type OptionType = string | { id: string; label: string };
export type ValueType = string | number | boolean | object | TreeNodeData | object[] | string[] | undefined;
export interface ColumnFieldProps {
  id: string;
  key: string;
  value:
    | TreeNodeData
    | number
    | boolean
    | string
    | object
    | object[]
    | string[]
    | undefined;
  type: string;
  grid: number;
  display?: boolean;
  placeholder?: string;
  options?: OptionType[];
  disable?: boolean;
  rules?: string[];
  sx?: string;
  flag?: string;
  isError?: boolean
}