import { RootState } from "@/redux/store";
import { Tab, Tabs } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const DataSourceTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDataSource } = useSelector(
    (state: RootState) => state.dataSource
  );

  const dataSourceTabs = [
    {
      id: 1,
      name: "Transaction",
      slug: "transaction",
      pathSegment: "transaction",
    },
    {
      id: 2,
      name: "Recovery & Restore Module",
      slug: "recovery_module",
      pathSegment: "recovery",
    },
    {
      id: 3,
      name: "Automation Logs",
      slug: "automation_logs",
      pathSegment: "automation-logs",
    },
  ];

  const { pathname } = location;
  const match = pathname.match(/integrated-data-source-details\/([^/]+)/);
  const sourceId = match?.[1];

  const dataSourceId = selectedDataSource || sourceId;
  // Derive selectedTab from current pathname
  const currentTab =
    dataSourceTabs.find((tab) => location.pathname.includes(tab.pathSegment))
      ?.slug ?? "transaction"; // fallback to transaction

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    const tab = dataSourceTabs.find((t) => t.slug === newValue);
    if (tab) {
      navigate(
        `/data-ingestion/integrated-data-source-details/${dataSourceId}/${tab.pathSegment}`
      );
    }
  };

  useEffect(() => {
    navigate(
      `/data-ingestion/integrated-data-source-details/${dataSourceId}/${currentTab}`
    );
  }, [selectedDataSource]);

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{
          mb: "40px",
          "&.MuiTabs-root": {
            minHeight: "30px",
          },
        }}
      >
        {dataSourceTabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.name}
            value={tab.slug}
            sx={{
              "&.MuiTab-root": {
                padding: "2px",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "capitalize",
                minWidth: 0,
                mr: "20px",
                maxHeight: "30px",
                minHeight: "20px",
                color: "secondary.light",
              },
              "&.Mui-selected": {
                color: "primary.dark",
              },
            }}
          />
        ))}
      </Tabs>
      <Outlet />
    </>
  );
};

export default DataSourceTabs;
