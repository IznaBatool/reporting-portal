import SvgIcons from "@/assets/SvgIcons";
import { BoxComponent } from "@/components";
import { Typography } from "@mui/material";

interface NoDataProps {
  title: string;
  description: string;
  icon: string;
}

const NoDataPlaceholder: React.FC<NoDataProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <>
      <BoxComponent
        sx={{
          height: "300px",
          border: "1px dashed #E8EBF6",
          backgroundColor: "#F9FBFB",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "6px"
        }}
      >
        <BoxComponent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "8px",
          }}
        >
          <SvgIcons name={icon} />
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: "13px", fontWeight: "200", width: "250px" }}>{description}</Typography>
        </BoxComponent>
      </BoxComponent>
    </>
  );
};

export default NoDataPlaceholder;
