import BoxComponent from "../Box";

interface TabPanelProps {
    children?: React.ReactNode;
    index: string;
    value: string;
  }

// TabPanel Component: Displays the content of the selected tab
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        aria-labelledby={`tab-${index}`}
      >
        {value === index && <BoxComponent sx={{ p: 2 }}>{children}</BoxComponent>}
      </div>
    );
  };

  export default TabPanel;