import SvgIcons from "@/assets/SvgIcons";
import { BasicButton, BoxComponent } from "@/components";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Grid2,
  Chip,
  TextField,
} from "@mui/material";
import { Fragment, useEffect } from "react";
import useTrnxFilterData from "./useTrnxFilterData";
import SelectField from "@/components/SelectField";
import { AutocompleteField } from "./FilterModal.style";
import AddIcon from "@mui/icons-material/Add";
import DatePickerField from "@/components/DatePicker";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const TrnxFilterModal: React.FC<ModalProps> = ({ isOpen, handleClose }) => {
  const {
    fetchColumns,
    inputFields,
    handleSelect,
    handleChange,
    handleAddColumn,
    handleDelete,
    handleDateChange,
  } = useTrnxFilterData();

  const handleDialogClose = () => {
    handleClose();
  };

  useEffect(() => {
    if (isOpen) {
      fetchColumns();
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={(event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return;
        }
        handleDialogClose();
      }}
      disableEscapeKeyDown
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "582px",
          borderRadius: "8px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          fontSize: "18px",
          fontWeight: 600,
        }}
      >
        <SvgIcons name="trnx_filter" />
        Filter Transactions
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 12,
          top: 17,
          color: theme.palette.grey[500],
          "& .MuiSvgIcon-root": {
            height: "18px",
            width: "18px",
            color: "#3E4146",
          },
        })}
      >
        <Close />
      </IconButton>

      <DialogContent
        sx={{
          "&.MuiDialogContent-root": {
            padding: "10px 24px",
          },
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <BoxComponent>
          {inputFields &&
            inputFields?.map((fields, index) => (
              <Fragment key={index}>
                <Grid2
                  container
                  alignItems="flex-start"
                  spacing={1.5}
                  key={index}
                  sx={{ mb: "20px" }}
                >
                  {fields.map((field: any, fieldIndex: number) => {
                    const isRightAligned =
                      fieldIndex != 0 && fieldIndex % 2 === 0;

                    return (
                      <Grid2
                        key={`${index}-${fieldIndex}`}
                        size={field.grid}
                        sx={{
                          display: field.display ? "block" : "none",
                          alignItems: "center",
                          minHeight: "36px",
                          mb: "5px",
                          ...(isRightAligned && { ml: "114px" }), // right alignment
                        }}
                      >
                        {field.type === "select" && (
                          <SelectField
                            multiple={field?.multiple ?? false}
                            loading={field.loading}
                            value={
                              field?.multiple
                                ? Array.isArray(field.value)
                                  ? field.value
                                  : []
                                : field.value || ""
                            }
                            options={field.options}
                            handleChange={(val) =>
                              handleSelect(index, fieldIndex, val as string)
                            }
                          />
                        )}

                        {field.data_type == "datetime" ? (
                          <DatePickerField
                            value={
                              field.value as [Date | null, Date | null] | null
                            }
                            onChange={(val: [Date, Date]) =>
                              handleDateChange(index, fieldIndex, val)
                            }
                          />
                        ) : index === 0 && fieldIndex === 0 ? (
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "#95A3B9",
                            }}
                          >
                            Where
                          </Typography>
                        ) : (
                          field.type === "text" && (
                            <AutocompleteField
                              multiple
                              freeSolo
                              options={[]}
                              value={field.value || []}
                              onChange={(event, newValue) =>
                                handleChange(index, fieldIndex, newValue as string)
                              }
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip
                                    variant="outlined"
                                    label={String(option)}
                                    size="small"
                                    sx={{
                                      fontSize: "12px",
                                      background: "rgba(0, 0, 0, 0.08)",
                                      border: "none",
                                    }}
                                    {...getTagProps({ index })}
                                  />
                                ))
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder="Enter values"
                                  slotProps={{
                                    input: {
                                      ...params.InputProps,
                                      style: {
                                        fontSize: "12px",
                                        minHeight: "36px",
                                      },
                                    },
                                  }}
                                />
                              )}
                            />
                          )
                        )}
                      </Grid2>
                    );
                  })}
                  <div
                    style={{
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(index)}
                  >
                    <SvgIcons
                      name={"trash_icon"}
                      isColor={true}
                      color="#95A3B9"
                    />
                  </div>
                </Grid2>
                {index == inputFields.length - 1 && (
                  <BasicButton
                    type={"submit"}
                    height={"36px"}
                    variant="text"
                    sx={{
                      mt: "5px",
                      fontSize: "11px",
                      fontWeight: "500",
                      color: "#29A073",
                      display: "flex",
                      flexDirection: "row",
                      padding: "0",
                    }}
                    onClick={handleAddColumn}
                    disabled={
                      (fields[2].object_key === "columnValues" &&
                        fields[2].value == null) ||
                      fields[2].value == ""
                    }
                  >
                    <AddIcon
                      sx={{
                        fontSize: "12px",
                        mr: "5px",
                      }}
                    />
                    {"Add Column"}
                  </BasicButton>
                )}
              </Fragment>
            ))}
        </BoxComponent>
      </DialogContent>

      <DialogActions sx={{ padding: "15px 20px" }}>
        <BasicButton
          type="submit"
          height="36px"
          variant="text"
          sx={{
            mt: "5px",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          Clear All Filters
        </BasicButton>
        <BasicButton
          type="submit"
          height="36px"
          sx={{
            backgroundColor: "primary.dark",
            mt: "5px",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          Filters
        </BasicButton>
      </DialogActions>
    </Dialog>
  );
};

export default TrnxFilterModal;
