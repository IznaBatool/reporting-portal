import {
  Avatar,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import StackComponent from "../Stack";
import { green } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, persistor, RootState } from "@/redux/store";
import React from "react";
import SvgIcons from "@/assets/SvgIcons";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/redux/thunks/authThunks";

interface SidebarTabsProps {
  open: boolean;
}

interface MenuProps {
  id: number;
  name: string;
  url: string;
}

const UserProfile: React.FC<SidebarTabsProps> = ({ open }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const profileMenu = [
    {
      id: 1,
      name: "Profile",
      url: "/user-profile",
    },
    {
      id: 2,
      name: "Logout",
      url: "",
    },
  ];

  const handleInitials = (name: string | null) => {
    const names = name?.trim().split("");
    if (names)
      if (names.length > 1) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }

    return names && names[0][0].toUpperCase();
  };

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (
    event?: React.MouseEvent<HTMLSpanElement>,
    menu?: MenuProps
  ) => {
    if (menu?.name == "Logout") {
      dispatch(logout()).then(() => {
        persistor.flush(); // Optional
        persistor.purge().then(() => {
          navigate(menu?.url);
        });
        localStorage.clear();
      });
    } else {
      setAnchorEl(null);
    }
  };
  return (
    <>
      <StackComponent
        direction="row"
        sx={{
          cursor: "pointer",
        }}
        id="basic-button"
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClick}
      >
        {user?.avatar ? (
          <img
            loading="lazy"
            width={30}
            height={30}
            src={user?.avatar}
            alt={user?.firstName}
            style={{
              width: "30px",
              height: "30px",
              objectFit: "contain", // Ensures it fills the space without distortion
              borderRadius: "4px", // Optional: makes it look better
              border: "0.5px solid #E8EBF6",
            }}
          />
        ) : (
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: green[500],
              height: "30px",
              width: "30px",
              mr: "10px",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: "8px",
            }}
          >
            {handleInitials(`${user?.firstName} ${user?.lastName}`)}
          </Avatar>
        )}
        {open && (
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "30px",
              pl: 1,
            }}
          >
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
        )}
      </StackComponent>
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
        {profileMenu.map((menu, index) => (
          <MenuItem
            key={index}
            sx={{
              minHeight: "24px",
              margin: "0px 8px",
              borderRadius: "4px",
              width: "201px",
              "&.MuiButtonBase-root": { color: "#3E4146", padding: "6px 8px" },
              "&:hover.MuiButtonBase-root": {
                background: "#F2F6F9",
                color: "#29A073",
              },
            }}
            onClick={(event) => handleClose(event, menu)}
            component={Link}
            to={menu.url}
          >
            <ListItemIcon>
              <SvgIcons name={menu.name} />
            </ListItemIcon>
            <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
              {menu.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default UserProfile;
