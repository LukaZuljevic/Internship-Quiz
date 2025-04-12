import { Category } from "../../types/Category";
import { useAllCategories } from "../../api/category/useAllCategories";
import c from "./CategoryFilter.module.css";

interface CategoryFilterProps {
  currentCategory: string;
  setCurrentCategory: (item: string) => void;
}

export const CategoryFilter = ({
  currentCategory,
  setCurrentCategory,
}: CategoryFilterProps) => {
  const { data: categories } = useAllCategories();

  return (
    <select
      value={currentCategory}
      onChange={(e) => setCurrentCategory(e.target.value)}
      className={c.categoryFilter}
    >
      <option value="">Any category</option>
      {categories?.map((category: Category, index: number) => (
        <option key={index} value={category.title}>
          {category.title}
        </option>
      ))}
    </select>
  );
};
