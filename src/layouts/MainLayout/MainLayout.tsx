import { setNavigator, setStore } from "@/axiosConfig";
import Sidebar from "@/components/Sidebar";
import { fetchAuthUser } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { store } from '@/redux/store';

const MainLayout = () => {
  setStore(store);
  const { open } = useSelector((state: RootState) => state.sidebar);
  const [isSidebarOpen, setIsSidebarOpen] = useState(open);

  const dispatch = useDispatch<AppDispatch>();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { id } = useParams();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const performUpdateAuth = () => {
    const pathSegment = location.pathname.split("/")[1];

    if (user?.currentRole && id && pathSegment === "workspace") {
      console.log("WORKSPACE");
    } else {
      dispatch(fetchAuthUser());
    }
  };

  const startUpdateAuthInterval = () => {
    console.log("Interval Start");
    intervalRef.current = setInterval(() => {
      performUpdateAuth();
    }, 20000);
  };

  const clearUpdateAuthInterval = () => {
    console.log("Interval Clear!");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      startUpdateAuthInterval();
    } else {
      clearUpdateAuthInterval();
    }
  };

  useEffect(() => {
    // Set up event listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start interval initially if page is visible
    if (document.visibilityState === "visible") {
      startUpdateAuthInterval();
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearUpdateAuthInterval();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, location.pathname]);

  useEffect(() => {
    setIsSidebarOpen(open);
  }, [open]);
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <>
      <Sidebar />
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: isSidebarOpen ? "240px" : "60px",
          padding: "16px",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;
