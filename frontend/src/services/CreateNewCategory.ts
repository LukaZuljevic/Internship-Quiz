import toast from "react-hot-toast";
import { CATEGORY_PATH } from "../constants";

type CreateNewCategoryProps = {
  title: string;
  imageUrl: string;
};

export const createNewCategory = async ({
  title,
  imageUrl,
}: CreateNewCategoryProps) => {
  const url = `${CATEGORY_PATH}`;
  const token = JSON.parse(localStorage.getItem("jwt") || "null");

  const request = {
    title,
    imageUrl,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  if (response.status === 400) toast.error("That category already exists");

  if (!response.ok)
    throw new Error(`Error creating new category: ${response.statusText}`);

  const data = await response.json();

  return data;
};
