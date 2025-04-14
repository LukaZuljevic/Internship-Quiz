import { EMAIL_REGEX } from "../../../constants";
import { RegistrationData } from "../../../types/RegistrationData";
import { ValidationRules } from "../../../types/ValidationsRules";

export const registrationValidationRules: ValidationRules<RegistrationData> = {
  firstName: {
    required: true,
    errorMessages: {
      required: "First name is required",
    },
  },
  lastName: {
    required: true,
    errorMessages: {
      required: "Last name is required",
    },
  },
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
  repeatedPassword: {
    required: true,
    match: "password",
    errorMessages: {
      required: "Passowrd confirmation required",
      match: "Passwords don't match",
    },
  },
};
