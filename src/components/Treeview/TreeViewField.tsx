import { useState } from "react";
import {
  Box,
  Popover,
  Typography,
  Collapse,
  IconButton,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import { ExpandMore, ChevronRight, ArrowDropDown } from "@mui/icons-material";
import { TreeViewField } from "./TreeViewField.style";

interface TreeNodeData {
  id: number;
  label: string;
  flag: string;
  dataType: string;
  disabled?: boolean;
  children?: TreeNodeData[];
}

const TreeSelectField = ({
  data,
  value,
}: {
  data: TreeNodeData[];
  value: TreeNodeData;
}) => {
  const [selected, setSelected] = useState<TreeNodeData | null>(value);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openNodes, setOpenNodes] = useState<Set<number>>(new Set());

  const toggleNode = (id: number) => {
    const newSet = new Set(openNodes);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setOpenNodes(newSet);
  };

  const renderNode = (node: TreeNodeData) => {
    const hasChildren = !!node.children?.length;
    const isLeaf = !hasChildren;

    return (
      <Box key={node.id} ml={2}>
        <Box display="flex" alignItems="center">
          {hasChildren && (
            <IconButton
              size="small"
              onClick={() => toggleNode(node.id)}
              disabled={node.disabled}
            >
              {openNodes.has(node.id) ? (
                <ExpandMore fontSize="small" />
              ) : (
                <ChevronRight fontSize="small" />
              )}
            </IconButton>
          )}
          {isLeaf && (
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": {
                  width: "16px",
                  height: "16px",
                },
                "&.Mui-checked": {
                  color: "#29A073",
                },
                pointerEvents: "none",
              }}
              checked={selected?.id === node.id}
              onChange={() => setSelected(node)}
              disabled={node.disabled}
            />
          )}
          <Typography
            onClick={() => isLeaf && !node.disabled && setSelected(node)}
            sx={{
              cursor: isLeaf && !node.disabled ? "pointer" : "default",
              fontWeight: 300,
              fontSize: "13px",
              color: node.disabled ? "text.disabled" : "text.primary",
            }}
          >
            {node.label} ({node.dataType})
          </Typography>
        </Box>
        {hasChildren && (
          <Collapse in={openNodes.has(node.id)}>
            {node.children!.map(renderNode)}
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <>
      <TreeViewField
        value={selected?.label || ""}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDropDown />
              </InputAdornment>
            ),
          },
        }}
      />
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2} minWidth={300} maxHeight={400} overflow="auto">
          {data.map(renderNode)}
        </Box>
      </Popover>
    </>
  );
};

export default TreeSelectField;
