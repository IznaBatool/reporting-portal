import ValidationRules from "./ValidationRules";

const ValidateField = (rules: string | string[], value: string | string[] | number | boolean | object | object[] | null | undefined): string => {
    const valueStr = typeof value === "object" ? JSON.stringify(value) : String(value);
    
    if (Array.isArray(value) && value.length === 0) {
        return "This field is required"; // Custom error message for empty arrays
    }

    if (Array.isArray(rules)) {
        for (const rule of rules) {
            const validations = ValidationRules[rule];

            if (!Array.isArray(validations)) return ""; // Ensure it's iterable

            for (const validate of validations) {
                const result = validate(valueStr);
                if (result !== true) {
                    return result;
                }
            }
        }
    } else {
        const validations = ValidationRules[rules];

        for (const validate of validations) {
            const result = validate(valueStr);
            if (result !== true) {
                return result;
            }
        }
    }

    return "";
};

export default ValidateField;
