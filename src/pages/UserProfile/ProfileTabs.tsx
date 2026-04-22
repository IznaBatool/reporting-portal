import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ProfileDetails from "./ProfileDetails";
import UserSecurity from "./UserSecurity";
import TabPanel from "@/components/TabPanel";

const ProfileTabs = () => {
  const profileTabs = [
    {
      id: 1,
      name: "Profile",
      slug: "profile",
    },
    {
      id: 2,
      name: "Security",
      slug: "security",
    },
  ];
  const [selectedTab, setSelectedTab] = useState<string>("profile");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        {profileTabs.map((tab, index) => (
          <Tab
            sx={{
              "&.MuiTab-root": {
                padding: "2px",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "capitalize",
                minWidth: 0,
                ml: "20px",
                color: "secondary.light",
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

      <TabPanel value={selectedTab} index={"profile"}>
        <ProfileDetails />
      </TabPanel>
      <TabPanel value={selectedTab} index={"security"}>
        <UserSecurity />
      </TabPanel>
    </>
  );
};

export default ProfileTabs;
