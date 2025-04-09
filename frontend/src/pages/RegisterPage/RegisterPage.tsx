import { useState } from "react";
import { RegistrationData } from "../../types/RegistrationData";
import { FormInput } from "../../components/FormInput";
import { useRegister } from "../../hooks/useRegister";
import toast from "react-hot-toast";
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

  const { userRegistration } = useRegister(registrationData);
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formValidation({
        formData: registrationData,
        validationRules: registrationValidationRules,
      })
    ) {
      await userRegistration();
      toast.success("Registration successful!");
      navigate(ROUTES.LOGIN);

      setRegistrationData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatedPassword: "",
      });
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

        <button type="submit">Register</button>

        <a href={ROUTES.LOGIN}>
          Already have an account? <span>Login here</span>
        </a>
      </form>
    </div>
  );
};
