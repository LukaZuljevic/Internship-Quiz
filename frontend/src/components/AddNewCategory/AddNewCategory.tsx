import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateNewCategory } from "../../hooks/useCreateNewCategory";
import c from "./AddNewCategory.module.css";

export const AddNewCategory = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newImageUrl, setNewImageUrl] = useState<string>("");
  const { createNewCategoryData } = useCreateNewCategory();

  const handleButtonClick = () => {
    if (!newTitle.trim() || !newImageUrl.trim()) {
      toast.error("All fields are required!");
      return;
    }

    if (newTitle.trim().length < 3) {
      toast.error("Category needs to be at least 2 chars long!");
      return;
    }

    const formattedTitle =
      newTitle.charAt(0).toUpperCase() + newTitle.slice(1).toLowerCase();

    createNewCategoryData(formattedTitle, newImageUrl);

    setNewTitle("");
    setNewImageUrl("");
    setIsClicked(false);
  };

  return (
    <>
      {isClicked ? (
        <div className={c.addNewCategoryForm}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter category name"
          />
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
          <button onClick={handleButtonClick}>Add</button>
          <button onClick={() => setIsClicked(false)}>Go back</button>
        </div>
      ) : (
        <button
          onClick={() => setIsClicked(true)}
          className={c.addNewCategoryButton}
        >
          Add new category
        </button>
      )}
    </>
  );
};
