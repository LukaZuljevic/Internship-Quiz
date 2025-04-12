import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateCategory } from "../../api/category/useCreateCategory";
import c from "./AddNewCategory.module.css";

export const AddNewCategory = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newImageUrl, setNewImageUrl] = useState<string>("");
  const { mutate: createCategory } = useCreateCategory();

  const handleButtonClick = () => {
    if (!newTitle.trim()) {
      toast.error("title field is required!");
      return;
    }

    if (newTitle.trim().length < 3) {
      toast.error("Category needs to be at least 2 chars long!");
      return;
    }

    const formattedTitle =
      newTitle.charAt(0).toUpperCase() + newTitle.slice(1).toLowerCase();

    const request = {
      title: formattedTitle,
      imageUrl: newImageUrl,
    };

    createCategory(request);

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
