import { useState, useEffect } from "react";
import { Category } from "../../types/Category";
import { useFetchAllCategories } from "../../hooks/useFetchAllCategories";

interface CategoryFilterProps {
  currentCategory: string;
  setCurrentCategory: (item: string) => void;
}

export const CategoryFilter = ({
  currentCategory,
  setCurrentCategory,
}: CategoryFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { fetchAllCategoriesData } = useFetchAllCategories(setCategories);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllCategoriesData();
    };

    fetchData();
  }, [categories]);

  return (
    <select
      value={currentCategory}
      onChange={(e) => setCurrentCategory(e.target.value)}
    >
      <option value="">Any category</option>
      {categories.map((category: Category) => (
        <option key={category.imageUrl} value={category.title}>
          {category.title}
        </option>
      ))}
    </select>
  );
};
