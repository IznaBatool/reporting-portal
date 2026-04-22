import SvgIcons from "@/assets/SvgIcons";
import { BasicButton, InputField } from "@/components";
import {
  Box,
  Checkbox,
  Grid2,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { SelectField } from "./SetupDatabase.style";
import TreeSelectField from "@/components/Treeview/TreeViewField";
import { TreeNodeData } from "@/components/Treeview/TreeViewField.types";
import ValidateField from "@/utils/ValidateField";
import { duplicationError } from "./ValidationHelper";
import { useSetupDatabase } from "./useSetupDatabase";

const SetupDatabase = () => {
  const {
    detailFields,
    inputFields,
    handleChange,
    handleFieldChange,
    handleCheckbox,
    validationError,
    handleSubmit,
    handleShowError,
    loading,
    treeData,
    disableFields,
    columnNames,
    heading,
  } = useSetupDatabase();

  return (
    <>
      <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
        Setup DatabaseTable
      </Typography>
      <Typography sx={{ fontSize: "12px", fontWeight: 300, margin: "10px 0" }}>
        Define the structure of your database table by specifying the table name
        and mapping data keys to column names. Select or deselect columns to
        include in the table, and configure <br /> each column's data type,
        whether it allows null values, and other properties like partitioning.
        Ensure all necessary fields are mapped correctly before saving your
        schema.
      </Typography>

      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid2 container spacing={4} sx={{ mt: 2 }}>
          {detailFields.map((field, index) => (
            <Grid2 key={field.id} size={field.grid}>
              <InputField
                height={"36px"}
                field={field}
                labelSx={{ fontSize: "13px", padding: "5px 0 10px" }}
                sx={{ fontSize: "12px", fontWeight: 400 }}
                onChange={(key, val) => handleChange(key, val)}
                error={
                  field.showError && !!ValidateField(field.rules, field.value)
                }
                helperText={
                  field.showError ? ValidateField(field.rules, field.value) : ""
                }
                onBlur={() => handleShowError(index)}
              ></InputField>
            </Grid2>
          ))}
        </Grid2>

        <Grid2 container spacing={6} sx={{ mt: "25px" }}>
          <Grid2 size={11.5}>
            <Box
              sx={{
                height: "36px",
                backgroundColor: "#F8F8F9",
                border: "1px solid #E8EBF6",
                borderRadius: "6px",
                padding: "0 15px",
              }}
            >
              <Grid2 container spacing={4}>
                {heading.map((head, index) => (
                  <Grid2
                    key={`.0:${index}`}
                    size={head.grid}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingTop: "3px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 500,
                        lineHeight: "30px",
                        display: "inline-flex",
                        alignItems: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {head.name}
                      <Tooltip
                        title={
                          <div
                            dangerouslySetInnerHTML={{ __html: head.info }}
                            style={{
                              fontSize: "10px",
                              maxWidth: 250,
                              whiteSpace: "normal",
                            }}
                          />
                        }
                        placement="top"
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            verticalAlign: "middle",
                            marginLeft: "5px",
                          }}
                        >
                          <SvgIcons name="info"></SvgIcons>
                        </span>
                      </Tooltip>
                    </Typography>
                  </Grid2>
                ))}
              </Grid2>
            </Box>
            <Box sx={{ mt: "25px" }}>
              <Grid2
                container
                columnSpacing={4}
                sx={{ height: "350px", overflow: "scroll" }}
              >
                {inputFields.map((fields, index) =>
                  fields.map((field, fieldIndex) => (
                    <Grid2
                      key={field.id}
                      size={field.grid}
                      sx={{
                        pointerEvents:
                          disableFields.includes(index) && fieldIndex != 0
                            ? "none"
                            : "",
                        opacity: disableFields.includes(index) ? "0.5" : "",
                      }}
                    >
                      {field.type == "text" && (
                        <InputField
                          key={field.id}
                          height={"36px"}
                          field={field}
                          labelSx={{ fontSize: "13px" }}
                          sx={{ fontSize: "12px", fontWeight: 400 }}
                          error={
                            !!(
                              validationError(field) ||
                              duplicationError(
                                field,
                                index,
                                inputFields,
                                disableFields,
                                columnNames
                              )
                            )
                          }
                          helperText={[
                            validationError(field),
                            duplicationError(
                              field,
                              index,
                              inputFields,
                              disableFields,
                              columnNames
                            ) && "Duplicate name exist",
                          ]
                            .filter(Boolean)
                            .join(" | ")}
                          onChange={(key, val) =>
                            handleFieldChange(key, val, index, fieldIndex)
                          }
                        ></InputField>
                      )}
                      {field.type == "select" && (
                        <SelectField
                          key={field.id}
                          value={field.value}
                          select
                          fullWidth
                          onChange={(e) =>
                            handleFieldChange(
                              field.key,
                              e.target.value,
                              index,
                              fieldIndex
                            )
                          }
                        >
                          {field.options?.map((option, index) => {
                            return (
                              <MenuItem
                                sx={{ fontSize: "12px", fontWeight: 300 }}
                                key={`.0:${index}`}
                                value={option?.id}
                              >
                                {option?.label}
                              </MenuItem>
                            );
                          })}
                        </SelectField>
                      )}
                      {field.type == "treeView" && (
                        <TreeSelectField
                          key={field.id}
                          value={field.value as TreeNodeData}
                          data={treeData}
                        />
                      )}
                      {field.type == "checkbox" && (
                        <Checkbox
                          checked={field.value as boolean}
                          sx={{
                            display:
                              fieldIndex == 0 || field.display
                                ? "block"
                                : "none",
                            "&:hover": { bgcolor: "transparent" },
                            ml: fieldIndex == 0 ? "10px" : "",
                          }}
                          key={field.id}
                          disableRipple
                          color="default"
                          checkedIcon={<SvgIcons name="checked_checkbox" />}
                          icon={<SvgIcons name="unchecked_checkbox" />}
                          onClick={() =>
                            handleCheckbox(
                              field?.value as boolean,
                              index,
                              fieldIndex
                            )
                          }
                          disabled={
                            fieldIndex == 0 || field.display ? false : true
                          }
                        />
                      )}
                    </Grid2>
                  ))
                )}
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
        <Grid2
          container
          spacing={0}
          sx={{ mt: 2, display: "flex", justifyContent: "right" }}
        >
          <Grid2
            size={1.5}
            sx={{ display: "flex", justifyContent: "center", mr: "10px" }}
          >
            <BasicButton
              height={"36px"}
              sx={{
                borderRadius: "6px",
                fontSize: "12px",
                backgroundColor: "#0E1218",
              }}
              type="submit"
              loading={loading}
            >
              Save
            </BasicButton>
          </Grid2>
        </Grid2>
      </form>
    </>
  );
};

export default SetupDatabase;
