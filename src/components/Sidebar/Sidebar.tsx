import { Drawer, Toolbar, Tooltip } from "@mui/material";
import BoxComponent from "../Box";
// import { useState } from "react";
import WorkspaceSelector from "./WorkspaceSelector";
import UserProfile from "./UserInfo";
import SidebarTabs from "./SidebarTabs";
import SvgIcons from "@/assets/SvgIcons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setSidebarState } from "@/redux/slices/sidebarSlice";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [hover, setHover] = useState(false);
  const [icon, setIcon] = useState("collapseExpand");
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    setIcon(hover ? "expandDrawer" : "collapseExpand");
  }, [hover]);

  useEffect(() => {
    dispatch(setSidebarState());
  }, [open, dispatch]);

  return (
    <>
      <BoxComponent sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            "& .MuiPaper-root": {
              minWidth: open ? 240 : 60,
              width: open ? 240 : 60,
              background: "#FCFCFE",
              border: 0,
            },
          }}
        >
          <Toolbar
            sx={{
              "&.MuiToolbar-root": {
                pl: "16px",
                pr: "16px",
                minHeight: "50px",
              },
            }}
          >
            <WorkspaceSelector open={open} />
          </Toolbar>
          <SidebarTabs open={open} />
          <Toolbar
            sx={{
              "&.MuiToolbar-root": {
                pl: "16px",
                pr: "16px",
                pb: "10px",
                minHeight: "40px",
              },
            }}
          >
            <UserProfile open={open} />
          </Toolbar>
        </Drawer>
        <BoxComponent
          sx={{
            display: "flex",
            justifyContent: "right",
            position: "absolute",
            top: "50%",
            cursor: "pointer",
            transform: "translateY(-50%)",
          }}
          width={open && !hover ? 244 : open && hover ? 254 : hover ? 74 : 64}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Tooltip title={open ? "Collapse" : "Expend"} placement="right-start">
            <div onClick={() => setOpen((prev) => !prev)}>
              <SvgIcons name={icon} />
            </div>
          </Tooltip>
        </BoxComponent>
      </BoxComponent>
    </>
  );
};

export default Sidebar;
