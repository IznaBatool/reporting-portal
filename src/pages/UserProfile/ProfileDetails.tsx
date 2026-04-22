import { BasicButton, BoxComponent, InputField } from "@/components";
import MultiSelectField from "@/components/MultiSelectField";
import { fetchAuthUser, updateProfile } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ProfileDetailPayload } from "@/types/IAuthTypes";
import ValidateField from "@/utils/ValidateField";
import { Grid2 } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type FieldValue = string | number | boolean | object;
interface FieldProps {
  id: number;
  key: string;
  label: string;
  type: string;
  value: FieldValue | FieldValue[] | null | undefined;
  list?: string[] | null | undefined;
  placeholder: string;
  grid: number;
  disabled: boolean;
  rules: string[];
  showError: boolean;
}

const ProfileDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const fields = [
    {
      id: 1,
      key: "firstName",
      label: "First Name *",
      value: userInfo?.firstName,
      type: "text",
      placeholder: "Enter",
      rules: ["required", "max50"],
      grid: 6,
      disabled: false,
      showError: false,
    },
    {
      id: 2,
      key: "lastName",
      label: "Last Name *",
      value: userInfo?.lastName,
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
      label: "Business Email *",
      value: userInfo?.email,
      type: "text",
      placeholder: "Enter",
      rules: [],
      grid: 6,
      disabled: true,
      showError: false,
    },
    {
      id: 4,
      key: "professionalTitle",
      label: "Professional Title *",
      value: userInfo?.professionalTitle,
      type: "text",
      placeholder: "Enter",
      rules: ["required", "max50"],
      grid: 6,
      disabled: false,
      showError: false,
    },
    {
      id: 5,
      key: "businessFunction",
      label: "Business Function *",
      value: userInfo?.businessFunction,
      type: "select",
      list: [
        "Sales",
        "Operations",
        "Technology",
        "Management",
        "Accounting",
        "Finance",
        "Marketing",
        "Public Relations",
        "Human Resource",
      ],
      placeholder: "Enter",
      rules: ["required"],
      grid: 12,
      disabled: false,
      showError: false,
    },
    {
      id: 6,
      key: "role",
      label: "Role Access",
      value: userInfo?.role,
      type: "text",
      placeholder: "Enter",
      rules: [""],
      grid: 6,
      disabled: true,
      showError: false,
    },
    {
      id: 7,
      key: "phone",
      label: "Phone Number",
      value: userInfo?.phone,
      type: "text",
      placeholder: "Enter",
      rules: [""],
      grid: 6,
      disabled: false,
      showError: false,
    },
  ];

  const [inputFields, setInputFields] = useState<FieldProps[]>(fields);

  const handleChange = (
    key: string | number | undefined,
    newValue: string | string[] | object[] | undefined | null
  ) => {
    setInputFields((prevFields: FieldProps[]) =>
      prevFields.map((field) =>
        field.key === key
          ? {
              ...field,
              value: newValue as FieldValue | FieldValue[] | null | undefined,
              showError: true,
            }
          : field
      )
    );
  };

  const ValidateForm = useCallback(() => {
    const allValid = inputFields.every(
      (field) => !ValidateField(field.rules, field?.value as string)
    );

    return allValid;
  }, [inputFields]);

  useEffect(() => {
    ValidateForm();
  }, [ValidateForm]);

  const handlePayload = () => {
    const payload: ProfileDetailPayload = inputFields.reduce((acc, field) => {
      return { ...acc, [field.key]: field.value };
    }, {} as ProfileDetailPayload);

    return payload;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputFields((prevFields) =>
      prevFields.map((field) => ({
        ...field,
        showError: !!ValidateField(field.rules, field.value),
      }))
    );

    const isValid = ValidateForm();
    if (!isValid) return;

    setLoading(true);

    const payload = handlePayload();

    dispatch(updateProfile(payload))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(fetchAuthUser());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleShowError = (index: number) => {
    setInputFields((prevFields) =>
      prevFields.map((field, ind) =>
        index === ind ? { ...field, showError: true } : field
      )
    );
  };
  return (
    <>
      <BoxComponent
        sx={{
          width: "565px", // ✅ Fixed width
        }}
      >
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid2 container columnSpacing={2}>
            {inputFields.map((field, index) => (
              <Grid2 key={field.id} size={field.grid}>
                {field.type == "text" && (
                  <InputField
                    height={"36px"}
                    field={field}
                    disabled={field.disabled}
                    error={
                      field.showError &&
                      !!ValidateField(field.rules, field.value)
                    }
                    helperText={
                      field.showError
                        ? ValidateField(field.rules, field.value)
                        : ""
                    }
                    onBlur={() => handleShowError(index)}
                    labelSx={{ fontSize: "13px", padding: "5px 0 10px" }}
                    sx={{ fontSize: "12px" }}
                    onChange={handleChange}
                  />
                )}
                {field.type == "select" && (
                  <MultiSelectField
                    isMultiSelect={false}
                    height={"36px"}
                    error={
                      field.showError &&
                      !!ValidateField(field.rules, field.value)
                    }
                    helperText={
                      field.showError
                        ? ValidateField(field.rules, field.value)
                        : ""
                    }
                    onBlur={() => handleShowError(index)}
                    field={field}
                    labelSx={{ fontSize: "13px", padding: "5px 0 10px" }}
                    onChange={handleChange}
                  ></MultiSelectField>
                )}
              </Grid2>
            ))}
          </Grid2>
          <BoxComponent sx={{ display: "flex", justifyContent: "right" }}>
            <BasicButton
              type={"submit"}
              height={"36px"}
              loading={loading}
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

export default ProfileDetails;
