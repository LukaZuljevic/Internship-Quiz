import { useState } from "react";
import { RegistrationData } from "../../types/RegistrationData";
import { FormInput } from "../../components/FormInput";
import { useRegister } from "../../api/user/auth/useRegister";
import c from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import { registrationValidationRules } from "./registrationValidationRules";
import { formValidation } from "../../utils/formValidation";

export const RegisterPage = () => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const navigate = useNavigate();

  const clearForm = () =>
    setRegistrationData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatedPassword: "",
    });

  const { mutate: registerUser } = useRegister(() => {
    navigate(ROUTES.LOGIN);
  }, clearForm);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formValidation({
        formData: registrationData,
        validationRules: registrationValidationRules,
      })
    ) {
      registerUser(registrationData);
    }
  };

  const handleInputChange = (name: keyof RegistrationData, value: string) => {
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={c.registrationContainer}>
      <form className={c.registrationForm} onSubmit={handleFormSubmit}>
        <FormInput
          type="text"
          placeholder="Enter your first name"
          name="firstName"
          value={registrationData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
        />

        <FormInput
          type="text"
          placeholder="Enter your last name"
          name="lastName"
          value={registrationData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
        />

        <FormInput
          type="email"
          placeholder="Enter your email"
          name="email"
          value={registrationData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />

        <FormInput
          type="password"
          placeholder="Enter your password"
          name="password"
          value={registrationData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />

        <FormInput
          type="password"
          placeholder="Repeat your password"
          name="repeatedPassword"
          value={registrationData.repeatedPassword}
          onChange={(e) =>
            handleInputChange("repeatedPassword", e.target.value)
          }
        />

        <button type="submit" className={c.submitButton}>
          Register
        </button>

        <a href={ROUTES.LOGIN} className={c.loginLink}>
          Already have an account? <span>Login here</span>
        </a>
      </form>
    </div>
  );
};
