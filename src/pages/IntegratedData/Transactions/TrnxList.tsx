import { useState } from "react";
import SvgIcons from "@/assets/SvgIcons";
import { Box, Typography } from "@mui/material";
import NoDataPlaceholder from "@/common/NoData";
import TrnxFilterModal from "@/common/FilterModal";
import { BasicButton, BoxComponent } from "@/components";

const TransactionList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFilterModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <BoxComponent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            fontFamily: "GeneralSans-Medium, sans-serif",
          }}
        >
          Transaction Details
        </Typography>
        <Box sx={{ display: "flex", gap: "18px" }}>
          <div style={{ alignItems: "center", display: "flex" }}>
            <SvgIcons name="download_file_icon" />
          </div>
          <BasicButton
            height={"36px"}
            sx={{
              borderRadius: "6px",
              fontSize: "12px",
              backgroundColor: "#F8F8F9",
              color: "#0E1218",
              display: "flex",
              flexDirection: "row",
              gap: "3px",
            }}
          >
            <SvgIcons name="export_icon" />
            Export
          </BasicButton>
          <BasicButton
            height={"36px"}
            width={"73px"}
            sx={{
              borderRadius: "6px",
              fontSize: "12px",
              backgroundColor: "#0E1218",
            }}
            onClick={handleFilterModal}
          >
            Filter
          </BasicButton>
        </Box>
      </BoxComponent>

      <BoxComponent sx={{ mt: "20px" }}>
        <NoDataPlaceholder
          title={"Apply Filter"}
          description={
            "Apply a filter to view specific transactions based on defined criteria."
          }
          icon={"filter_icon"}
        />
      </BoxComponent>

      <TrnxFilterModal isOpen={isOpen} handleClose={handleClose} />
    </>
  );
};

export default TransactionList;
