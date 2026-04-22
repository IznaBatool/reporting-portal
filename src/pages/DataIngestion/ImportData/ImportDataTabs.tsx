import { BoxComponent } from "@/components";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import DataParams from "./DataParams";
import DataHeaders from "./DataHeaders";

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

// TabPanel Component: Displays the content of the selected tab
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  const isActive = value === index;
  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${index}`}
      style={{ display: isActive ? "block" : "none" }} // Key change
    >
      <BoxComponent sx={{ pt: 2 }}>{children}</BoxComponent>
    </div>
  );
};

const ImportDataTabs = () => {
  const [selectedTab, setSelectedTab] = useState<string>("param");
  const tabs = [
    { id: 1, name: "Param", slug: "param" },
    { id: 2, name: "Headers", slug: "headers" },
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{ marginTop: "15px" }}
      >
        {tabs.map((tab, index) => (
          <Tab
            sx={{
              "&.MuiTab-root": {
                padding: "2px",
                fontSize: "14px",
                fontWeight: 400,
                textTransform: "capitalize",
                minWidth: 0,
                mr: "20px",
                mt: "20px",
                color: "secondary.light",
                minHeight: "20px",
                height: "20px",
              },
              "&.Mui-selected": {
                color: "primary.dark",
              },
            }}
            key={index}
            label={tab.name}
            value={tab.slug}
          />
        ))}
      </Tabs>

      <TabPanel value={selectedTab} index={"param"}>
        <DataParams></DataParams>
      </TabPanel>
      <TabPanel value={selectedTab} index={"headers"}>
        <DataHeaders></DataHeaders>
      </TabPanel>
    </>
  );
};

export default ImportDataTabs;
