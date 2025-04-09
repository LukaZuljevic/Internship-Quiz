import { jwtDecode } from "jwt-decode";

export const getDataFromToken = (field: string) => {
  try {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.warn("No JWT token found in storage");
      return null;
    }

    const decoded = jwtDecode<any>(token);

    return decoded[field] || null;
  } catch (error) {
    console.error("error decoding JWT token", error);
    return null;
  }
};
