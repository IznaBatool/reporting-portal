import SvgIcons from "@/assets/SvgIcons";
import { AppDispatch, RootState } from "@/redux/store";
import { Workspace } from "@/types/IAuthTypes";
import {
  Avatar,
  Button,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StackComponent from "../Stack";
import FormDialog from "../FormDialog";
import { CreateWorkspaceForm } from "@/pages/Workspace";
import { fetchWorkspace } from "@/redux/slices/workspaceSlice";
import { useNavigate, useParams } from "react-router-dom";
import TruncateText from "@/utils/TrucateText";

interface SidebarTabsProps {
  open: boolean;
}

type CreateWorkspaceFormRef = {
  submitForm: () => void;
  loading: boolean;
  closeModal: boolean;
};

const WorkspaceSelector: React.FC<SidebarTabsProps> = ({ open }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const params = useParams();
  const { workspaces, selectedWorkspace } = useSelector(
    (state: RootState) => state.auth
  );

  const [currentWorkspace, setCurrentWorkspace] = useState<
    Workspace | null | undefined
  >(selectedWorkspace);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<CreateWorkspaceFormRef>(null);

  // Filter workspaces based on search query
  const filteredWorkspaces =
    workspaces?.filter((workspace: Workspace) =>
      workspace.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleInitials = (name: string | undefined) => {
    if (!name) return;
    const names = name.trim().split(" ");
    return names.length > 1
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : names[0][0].toUpperCase();
  };

  const handleCreateWorkspace = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    if (formRef.current) {
      setLoading(formRef.current?.loading);
      formRef.current?.submitForm();
      setOpenDialog(formRef.current?.closeModal);
    }
  };

  const handleSelectedWorkspace = (workspace: Workspace) => {
    setCurrentWorkspace(workspace as Workspace);
    setOpenDropdown(false);
    dispatch(fetchWorkspace({ id: workspace.id })).then(() => {
      navigate(`/workspace/${workspace.id}/settings`);
    });
  };

  useEffect(() => {
    setOpenDialog(false);
  }, [formRef.current?.loading]);

  useEffect(() => {
    setCurrentWorkspace(selectedWorkspace);
    setOpenDropdown(false);
  }, [selectedWorkspace]);

  useEffect(() => {
    workspaces?.map((workspace) => {
      if (workspace.id === Number(params?.workspaceId)) {
        setCurrentWorkspace(workspace);
      }
    });
  }, []);

  return (
    <>
      <Select
        open={openDropdown} // Control open state
        value={currentWorkspace?.id || ""}
        onClose={() => setOpenDropdown(false)}
        onOpen={() => setOpenDropdown(true)}
        onChange={(e) => {
          const selected = workspaces?.find((w) => w.id === e.target.value);
          if (selected) {
            handleSelectedWorkspace(selected);
            setSearchQuery("");
          }
        }}
        fullWidth
        MenuProps={{
          disableAutoFocusItem: true,
          PaperProps: {
            style: {
              maxHeight: 600,
              paddingBottom: 0,
              padding: 0,
            },
            sx: {
              padding: 0,
              "& .MuiMenu-list": {
                padding: 0,
              },
              "&.MuiMenu-paper": {
                borderRadius: "10px",
                height: "400px",
              },
            },
          },
        }}
        sx={{
          border: "none",
          padding: 0,
          "& .MuiSelect-select": { padding: 0 },
          "&.MuiOutlinedInput-root": {
            "& fieldset": { border: "none" },
          },
          "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
          "& .MuiList-root .MuiMenu-list": {
            padding: 0,
          },
        }}
        IconComponent={(props) =>
          open && (
            <div
              {...props}
              onClick={(e) => {
                e.stopPropagation();
                setOpenDropdown((prev) => !prev);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                pointerEvents: "auto",
                cursor: "pointer",
              }}
            >
              <SvgIcons name="dropdownIcon" />
            </div>
          )
        }
        renderValue={() => (
          <StackComponent direction="row" spacing={1}>
            {currentWorkspace?.logo ? (
              <img
                loading="lazy"
                width={30}
                height={30}
                src={currentWorkspace?.logo}
                alt={currentWorkspace?.name}
                style={{
                  width: "30px",
                  height: "30px",
                  objectFit: "contain",
                  borderRadius: "4px",
                }}
              />
            ) : (
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: green[500],
                  height: 30,
                  width: 30,
                  fontSize: 14,
                }}
              >
                {handleInitials(currentWorkspace?.name)}
              </Avatar>
            )}
            {open && (
              <Tooltip
                arrow
                placement="bottom-start"
                title={currentWorkspace?.name || ""}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "30px",
                    pl: 2,
                  }}
                >
                  {TruncateText(currentWorkspace?.name as string, 15)}
                </Typography>
              </Tooltip>
            )}
          </StackComponent>
        )}
      >
        {/* Search Bar */}
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 10,
            padding: "8px",
            "&:hover ": {
              background: "white",
            },
            "&.Mui-focusVisible ": {
              background: "none",
            },
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.preventDefault()}
        >
          <TextField
            autoFocus
            fullWidth
            placeholder="Search workspace..."
            value={searchQuery}
            onChange={(e) => {
              e.stopPropagation();
              setSearchQuery(e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                height: "30px",
                background: "#F8F9FB",
                border: "0",
                fontSize: "12px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
        </MenuItem>

        {/* Filtered Workspaces */}
        {filteredWorkspaces.length > 0 ? (
          filteredWorkspaces.map((workspace: Workspace) => (
            <MenuItem
              key={workspace.id}
              value={workspace.id}
              sx={{
                "&.MuiButtonBase-root.Mui-selected ": {
                  background: "#F8FAFC",
                },
              }}
            >
              {workspace.logo ? (
                <img
                  loading="lazy"
                  width={30}
                  height={30}
                  src={workspace.logo}
                  alt={workspace.name}
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "contain",
                    borderRadius: "4px",
                  }}
                />
              ) : (
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: green[500],
                    height: 30,
                    width: 30,
                    fontSize: 14,
                  }}
                >
                  {handleInitials(workspace.name)}
                </Avatar>
              )}
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: "30px",
                  pl: 2,
                }}
              >
                {workspace.name}
              </Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <Typography sx={{ fontSize: 14, color: "gray" }}>
              No workspaces found
            </Typography>
          </MenuItem>
        )}

        {/* "New Workspace" Button */}
        <MenuItem
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "white",
            zIndex: 10,
            padding: "4px 6px",
            borderTop: "1px solid #E8EBF6",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          disableRipple
          disableTouchRipple
        >
          <Button
            fullWidth
            sx={{
              textTransform: "none",
              display: "flex",
              justifyContent: "start",
            }}
            onClick={() => handleCreateWorkspace()}
          >
            <SvgIcons name={"create"} />{" "}
            <Typography sx={{ fontSize: "13px", pl: 2, color: "#3E4755" }}>
              {" "}
              Create Workspace{" "}
            </Typography>
          </Button>
        </MenuItem>
      </Select>
      <FormDialog
        open={openDialog}
        handleClose={handleClose}
        title={"Create New Workspace"}
        icon={"Create"}
        btnContent={"Save"}
        width={"495px"}
        onSubmit={handleSubmit}
        loading={loading}
      >
        <CreateWorkspaceForm ref={formRef} />
      </FormDialog>
    </>
  );
};

export default WorkspaceSelector;
