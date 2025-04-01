import { useState } from "react";
import { RegistrationData } from "../../types/RegistrationData";
import { FormInput } from "../../components/FormInput";
import { useRegister } from "../../hooks/useRegister";
import toast from "react-hot-toast";

export const RegisterPage = () => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });
  const { userRegistration } = useRegister(registrationData);

  const validateForm = (): boolean => {
    let errorString = "";
    if (!registrationData.firstName.trim())
      errorString += "First name is required\n";

    if (!registrationData.lastName.trim())
      errorString += "Last name is required\n";

    if (!registrationData.email.trim()) {
      errorString += "Email is required\n";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        registrationData.email
      )
    ) {
      errorString += "Email is invalid\n";
    }

    if (!registrationData.password.trim()) {
      errorString += "Password is requred";
    } else if (registrationData.password.length < 6) {
      errorString += "Password must be at least 6 chars long";
    }

    if (registrationData.password !== registrationData.repeatedPassword) {
      errorString += "Passwords don't match";
    }

    if (errorString) toast.error(errorString);

    return errorString === "";
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      userRegistration();

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
    <div className="registration-container">
      <form onSubmit={handleFormSubmit}>
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
      </form>
    </div>
  );
};
