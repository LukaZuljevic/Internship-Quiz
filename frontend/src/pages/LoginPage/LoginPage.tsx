import c from "../RegisterPage/RegisterPage.module.css";
import { useState } from "react";
import { ROUTES } from "../../router/routes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FormInput } from "../../components/FormInput";
import { LoginData } from "../../types/LoginData";
import { useLogin } from "../../hooks/useLogin";

export const LoginPage = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const { userLogin } = useLogin(loginData);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    let errorString = "";
    if (!loginData.email.trim()) {
      errorString += "Email is required\n";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginData.email)
    ) {
      errorString += "Email is invalid\n";
    }

    if (!loginData.password.trim()) {
      errorString += "Password is requred";
    } else if (loginData.password.length < 4) {
      errorString += "Password must be at least 4 chars long";
    }

    if (errorString) toast.error(errorString);

    return errorString === "";
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      await userLogin();
      toast.success("Login successful!");
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
