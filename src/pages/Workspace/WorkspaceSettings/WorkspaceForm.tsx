import { BasicButton, BoxComponent, InputField } from "@/components";
import { AppDispatch, RootState } from "@/redux/store";
import {
  UpdateWorkspacePayload,
  WorkspaceTypes,
} from "@/types/IworkspaceTypes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FieldProps } from "./WorkspaceSettings.types";
import { Grid2 } from "@mui/material";
import ValidateField from "@/utils/ValidateField";
import { fetchWorkspace, updateWorkspace } from "@/redux/slices/workspaceSlice";

const WorkspaceForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const workspaceStore = useSelector((state: RootState) => state.workspace);
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<WorkspaceTypes | null>(null);

  const fields = [
    {
      id: 1,
      key: "name",
      label: "Name *",
      value: selectedWorkspace?.name,
      type: "text",
      placeholder: "Enter",
      rules: ["required", "max50"],
      grid: 6,
      disabled: false,
      showError: false,
    },
    {
      id: 3,
      key: "email",
      label: "Email *",
      value: selectedWorkspace?.email,
      type: "text",
      placeholder: "Enter",
      rules: ["required", "email"],
      grid: 6,
      disabled: true,
      showError: false,
    },
    {
      id: 4,
      key: "address",
      label: "Address *",
      value: selectedWorkspace?.address,
      type: "text",
      placeholder: "Enter",
      rules: ["required", "max50"],
      grid: 12,
      disabled: false,
      showError: false,
    },
    {
      id: 5,
      key: "description",
      label: "Description *",
      value: selectedWorkspace?.description,
      type: "text",
      placeholder: "Enter",
      multiline: true,
      maxRows: 5,
      rules: ["required", "max255", "emojiRegex"],
      grid: 12,
      showError: false,
    },
  ];
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputFields, setInputFields] = useState<FieldProps[]>([]);

  const handleChange = (
    key: string | number | undefined,
    newValue: string | string[] | object[] | undefined | null
  ) => {
    setInputFields((prevFields: FieldProps[]) =>
      prevFields.map((field) =>
        field.key === key
          ? {
              ...field,
              value: newValue as string,
              showError: true,
            }
          : field
      )
    );
  };

  useEffect(() => {
    const allValid = inputFields.every(
      (field) => !ValidateField(field.rules, field.value)
    );
    setIsFormValid(allValid);
  }, [inputFields]);

  const handleFormValidation = () => {
    setInputFields((prev) =>
      prev.map((field) => ({
        ...field,
        showError: !!ValidateField(field.rules, field.value),
      }))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormValidation();
    if (!isFormValid) return;
    setLoading(true);

    const payload: UpdateWorkspacePayload = inputFields.reduce((acc, field) => {
      return {
        ...acc,
        [field.key]: field.value,
      };
    }, {} as UpdateWorkspacePayload);

    payload["logo"] = workspaceStore.workspaceLogo;
    payload["id"] = selectedWorkspace?.id as number;

    dispatch(updateWorkspace(payload))
      .then(() => {
        dispatch(fetchWorkspace({ id: payload.id }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (workspaceStore?.currentWorkspace) {
      setSelectedWorkspace(workspaceStore.currentWorkspace);
    }
  }, [workspaceStore]);

  useEffect(() => {
    setInputFields(fields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWorkspace]);
  return (
    <>
      <BoxComponent
        sx={{
          width: "520px",
          mt: "20px",
        }}
      >
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid2 container columnSpacing={3}>
            {inputFields.map((field) => (
              <Grid2 key={field.id} size={field.grid}>
                {field.type == "text" && (
                  <InputField
                    height={field.maxRows ? "95px" : "36px"}
                    field={field}
                    error={
                      field.showError &&
                      !!ValidateField(field.rules, field.value)
                    }
                    helperText={
                      field.showError
                        ? ValidateField(field.rules, field.value)
                        : ""
                    }
                    labelSx={{ fontSize: "13px", padding: "5px 0 10px" }}
                    sx={{ fontSize: "12px" }}
                    onChange={handleChange}
                  />
                )}
              </Grid2>
            ))}
          </Grid2>

          <BoxComponent sx={{ display: "flex", justifyContent: "right" }}>
            <BasicButton
              type={"submit"}
              height={"36px"}
              loading={loading}
              //   disabled={!isFormValid}
              sx={{
                backgroundColor: "primary.dark",
                mt: "5px",
                fontSize: "12px",
              }}
            >
              Save Changes
            </BasicButton>
          </BoxComponent>
        </form>
      </BoxComponent>
    </>
  );
};

export default WorkspaceForm;
