import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  Typography,
} from "@mui/material";
import { sidebarTabs, SubTab, TabItem } from "./Sidebar.types";
import SvgIcons from "@/assets/SvgIcons";
import React, { useEffect, useState } from "react";
import { ListButton } from "./Sidebar.style";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface SidebarTabsProps {
  open: boolean;
}

const SidebarTabs: React.FC<SidebarTabsProps> = ({ open }) => {
  const workspaceId =
    useSelector((state: RootState) => state.auth.selectedWorkspace?.id) ?? 1; // Provide a fallback value
  const [sidebarState, setSidebarState] = useState(sidebarTabs(workspaceId));
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLSpanElement>,
    index: number,
    tabIndex: number
  ) => {
    const clickedTab = sidebarState[index].name[tabIndex];
    if (clickedTab.isMenu) {
      setAnchorEl(event.currentTarget);
    } else {
      setSelectedTab(clickedTab.key); // Set selected tab
      setSidebarState((prevState) =>
        prevState.map((group, groupIndex) =>
          groupIndex === index
            ? {
                ...group,
                name: group.name.map((tab, tIndex) =>
                  tIndex === tabIndex && tab.subList
                    ? { ...tab, open: !tab.open }
                    : tab
                ),
              }
            : group
        )
      );
      if (clickedTab?.url) {
        navigate(clickedTab.url);
      }
    }
  };

  const handleClose = (
    event?: React.MouseEvent<HTMLSpanElement>,
    menu?: TabItem
  ) => {
    setAnchorEl(null);
    if (menu) {
      setSelectedMenuItem(menu?.key as string);
    }
  };

  useEffect(() => {
    sidebarState.map((tabs) => {
      tabs.name?.map((tab) => {
        if (tab.isMenu) {
          tab.menu?.map((menu) => {
            if (menu.url == location.pathname) {
              setSelectedTab(tab.key);
              setSelectedMenuItem(menu.key);
            }
          });
        } else {
          if (tab.url == location.pathname) {
            setSelectedTab(tab.key);
          }
        }
      });
    });
  }, [location.pathname, sidebarState]);

  return (
    <>
      {sidebarState.map((group, index) => (
        <List
          key={index}
          sx={{
            pl: "8px",
            pr: "10px",
            pb: index === 2 ? "10px" : "0",
            pt: index % 2 !== 0 ? "16px" : !open ? "16px" : "16px",
            ...(index === 2 && { mt: "auto" }), // Push EndTabs to the bottom
          }}
        >
          {group.divider && <Divider sx={{ margin: "0 0 10px 0" }} />}
          {group.name.map((tab, tabIndex) => (
            <ListItem disablePadding key={tabIndex} sx={{ display: "block" }}>
              <ListButton
                onClick={(e) => handleClick(e, index, tabIndex)}
                sx={{
                  justifyContent: "initial",
                  backgroundColor:
                    selectedTab === tab.key ? "#F2F6F9" : "transparent",
                  "&:hover": {
                    backgroundColor: "#F2F6F9",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    "&.MuiListItemIcon-root": { minWidth: "30px" },
                    mt: !open ? "6px" : "",
                    mb: !open ? "5.5px" : "",
                    ml: !open ? "5.5px" : "5.5px",
                  }}
                >
                  <SvgIcons name={tab.name} />
                </ListItemIcon>
                <ListItemText>
                  {open && (
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: selectedTab === tab.key ? "#29A073" : "inherit",
                      }}
                    >
                      {tab.name}
                    </Typography>
                  )}
                </ListItemText>
                {tab.subList &&
                  open &&
                  (tab.open ? (
                    <SvgIcons name="expandLess" />
                  ) : (
                    <SvgIcons name="expandDown" />
                  ))}
              </ListButton>

              {tab.subList && open && (
                <Collapse in={tab.open ?? false} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 4 }}>
                    {tab?.list?.map((item: SubTab, itemIndex: number) => (
                      <ListButton key={itemIndex}>
                        <ListItemIcon
                          sx={{
                            "&.MuiListItemIcon-root": { minWidth: "30px" },
                          }}
                        >
                          <SvgIcons name="subList" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            {item?.name}
                          </Typography>
                        </ListItemText>
                      </ListButton>
                    ))}
                  </List>
                </Collapse>
              )}

              {tab.isMenu && tab.menu && (
                <Menu
                  sx={{
                    borderRadius: "8px",
                    "& .MuiList-root": {
                      padding: "8px 0",
                    },
                    "& .MuiPaper-root": {
                      borderRadius: "8px",
                    },
                  }}
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={() => handleClose()}
                  anchorOrigin={{
                    vertical: -90,
                    horizontal: "left",
                  }}
                >
                  {tab?.menu.map((menu, index) => (
                    <MenuItem
                      key={index}
                      sx={{
                        minHeight: "24px",
                        margin: "0px 8px",
                        borderRadius: "4px",
                        width: "201px",
                        "&.MuiButtonBase-root": {
                          color: "#3E4146",
                          padding: "6px 8px",
                        },
                        "&:hover.MuiButtonBase-root": {
                          background: "#F2F6F9",
                          color: "#29A073",
                        },
                        backgroundColor:
                          selectedMenuItem === menu.key
                            ? "#F2F6F9"
                            : "transparent",
                      }}
                      onClick={(event) => handleClose(event, menu)}
                      component={Link}
                      to={menu.url}
                    >
                      <ListItemIcon>
                        <SvgIcons name={menu.name} />
                      </ListItemIcon>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color:
                            selectedMenuItem === menu.key
                              ? "#29A073"
                              : "inherit",
                        }}
                      >
                        {menu.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </ListItem>
          ))}
          {index === 2 && <Divider sx={{ mt: "10px" }} />}
        </List>
      ))}
    </>
  );
};

export default SidebarTabs;
