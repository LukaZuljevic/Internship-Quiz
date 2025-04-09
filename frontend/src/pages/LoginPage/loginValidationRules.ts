import { EMAIL_REGEX } from "../../constants/regex";
import { LoginData } from "../../types/LoginData";
import { ValidationRules } from "../../types/ValidationsRules";

export const loginValidationRules: ValidationRules<LoginData> = {
  email: {
    required: true,
    regex: EMAIL_REGEX,
    errorMessages: {
      required: "Email is required",
      regex: "Email is invalid",
    },
  },
  password: {
    required: true,
    minLength: 4,
    errorMessages: {
      required: "Password is required",
      minLength: "Password must be at least 4 chars long",
    },
  },
};
