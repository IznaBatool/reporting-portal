import * as Pages from "@/pages";
import * as Paths from "@/constants/path";
import IRoute from "@/types/IRouteTypes";

const MainRoutes: Array<IRoute> = [
  {
    key: "home",
    title: "Home",
    path: Paths.LANDING,
    enabled: true,
    component: Pages.Home,
  },
  {
    key: "user-profile",
    title: "User Profile",
    path: Paths.USER_PROFILE,
    enabled: true,
    component: Pages.UserProfile,
  },
  {
    key: "user-profile",
    title: "User Profile",
    path: Paths.USER_PROFILE,
    enabled: true,
    component: Pages.UserProfile,
  },
  {
    key: "data-ingestion",
    title: "Data Ingestion",
    path: Paths.DATA_INGESTION,
    enabled: true,
    component: Pages.DataIngestion,
  },
  {
    key: "ingested-data",
    title: "Integrated Data Sources",
    path: Paths.INTEGRATED_DATA_SOURCES,
    enabled: true,
    component: Pages.IntegratedDataSources,
  },
  {
    key: "workspace-setting",
    title: "Setting",
    path: Paths.WORKSPACE_SETTINGS,
    enabled: true,
    component: Pages.WorkspaceSettings,
  },
  {
    key: "data_source_details",
    title: "Data Source Details",
    path: Paths.INTEGRATED_DATA_SOURCE_DETAILS,
    enabled: true,
    component: Pages.DataSourceTabs,
    children: [
      {
        key: "transaction",
        title: "Transaction",
        path: "transaction",
        enabled: true,
        component: Pages.TransactionList,
      },
    ],
  },
];

const AuthRoutes: Array<IRoute> = [
  {
    key: "login",
    title: "Login",
    path: Paths.LOGIN,
    enabled: true,
    component: Pages.Login,
  },
  {
    key: "forget-password",
    title: "Forget Password",
    path: Paths.FORGET_PASSWORD,
    enabled: true,
    component: Pages.ForgetPassword,
  },
  {
    key: "set-password",
    title: "Set Password",
    path: Paths.SET_PASSWORD,
    enabled: true,
    component: Pages.SetPassword,
  },
];

export { MainRoutes, AuthRoutes };
