import c from "../RegisterPage/RegisterPage.module.css";
import { useContext, useState } from "react";
import { ROUTES } from "../../router/routes";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../components/FormInput";
import { LoginData } from "../../types/LoginData";
import { useLogin } from "../../hooks/useLogin";
import { UserContext } from "../../contexts/UserContext";
import { formValidation } from "../../utils/formValidation";
import { loginValidationRules } from "./loginValidationRules";

export const LoginPage = () => {
  const { refreshUserState } = useContext(UserContext);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const { userLogin } = useLogin(loginData);
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formValidation({
        formData: loginData,
        validationRules: loginValidationRules,
      })
    ) {
      const jwt = await userLogin();

      if (!jwt) {
        console.log("error with jwt token");
        return;
      }

      refreshUserState();

      navigate(ROUTES.QUIZZES_PAGE);

      setLoginData({
        email: "",
        password: "",
      });
    }
  };

  const handleInputChange = (name: keyof LoginData, value: string) => {
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={c.registrationContainer}>
      <form className={c.registrationForm} onSubmit={handleFormSubmit}>
        <FormInput
          type="email"
          placeholder="Enter your email"
          name="email"
          value={loginData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />

        <FormInput
          type="password"
          placeholder="Enter your password"
          name="password"
          value={loginData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />

        <button type="submit">Login</button>

        <a href={ROUTES.REGISTER}>
          Don't have an account? <span>Register here</span>
        </a>
      </form>
    </div>
  );
};
