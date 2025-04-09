import { ValidationRules } from "../types/ValidationsRules";
import toast from "react-hot-toast";

type FormValidationProps<T> = {
  formData: T;
  validationRules: ValidationRules<T>;
};

export const formValidation = <T extends Record<string, any>>({
  formData,
  validationRules,
}: FormValidationProps<T>): boolean => {
  let errors = "";

  for (const [key, rules] of Object.entries(validationRules)) {
    const field = key as keyof T;
    const formValue = formData[field];

    if (rules?.required && !formValue)
      errors += `${rules.errorMessages.required}\n`;

    if (formValue) {
      const isFormValueString = typeof formValue === "string";
      if (
        rules?.minLength &&
        isFormValueString &&
        formValue.length < rules.minLength
      ) {
        errors += `${rules.errorMessages.minLength}\n`;
      }

      if (formValue) {
        if (rules?.regex && !rules.regex.test(formValue)) {
          errors += `${rules.errorMessages.regex}\n`;
        }
      }

      if (rules?.match) {
        const passwordField = formData[rules.match];
        if (formValue !== passwordField) {
          errors += `${rules.errorMessages.match}\n`;
        }
      }
    }
  }
  if (errors) toast.error(errors);

  return errors === "";
};
