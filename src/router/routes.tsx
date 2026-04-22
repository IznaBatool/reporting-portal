import * as Layouts from "@/layouts";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthRoutes, MainRoutes } from "./index";
import IRoute from "@/types/IRouteTypes";

interface AuthData {
  accessToken: string;
}

const AppRoutes = () => {
  const location = useLocation(); // Get current location
  const auth: string | null = localStorage.getItem("auth");

  useEffect(() => {
    // Find the current route title based on the current path
    const currentRoute = [...MainRoutes, ...AuthRoutes].find(
      (route) => route.path === location.pathname
    );

    if (currentRoute) {
      document.title = `${currentRoute.title} | Reporting System`;
    } else {
      document.title = "Reporting System";
    }
  }, [location]);

  const parsedAuth: AuthData | null = auth ? JSON.parse(auth) : null;
  const isAuthenticated: boolean = !!parsedAuth?.accessToken;

  return (
    <>
      {isAuthenticated ? (
        <Routes>
          <Route element={<Layouts.MainLayout />}>
            {MainRoutes.map((route: IRoute) =>
              route.children ? (
                // Route with nested children (like the tab layout)
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                >
                  {route.children.map((child: IRoute) => (
                    <Route
                      key={child.key}
                      path={child.path}
                      element={<child.component />}
                    />
                  ))}
                </Route>
              ) : (
                // Regular route
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              )
            )}
          </Route>
          {/* Redirect to /login if no match */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route element={<Layouts.AuthLayout />}>
            {AuthRoutes.map((route: IRoute) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
          {/* Redirect to /login if no match */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
