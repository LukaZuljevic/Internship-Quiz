import { useEffect, useState } from "react";
import { Question } from "../../types/Question";
import { useFetchAllQuestions } from "../../hooks/useFetchAllQuestions";
import { QuestionWithCheckboxCard } from "../../components/QuestionWithCheckboxCard";
import c from "./CreateQuizPage.module.css";
import { Category } from "../../types/Category";
import { useFetchAllCategories } from "../../hooks/useFetchAllCategories";
import { CategoryFilter } from "../../components/CategoryFilter";
import toast from "react-hot-toast";
import { useCreateNewQuiz } from "../../hooks/useCreateNewQuiz";
import { useCreateQuizQuestions } from "../../hooks/useCreateQuizQuestions";

export const CreateQuizPage = () => {
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { fetchAllCategoriesData } = useFetchAllCategories(setCategories);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const { fetchAllQuestionsData } = useFetchAllQuestions(setQuestions);

  const [quizTitle, setQuitTitle] = useState<string>("");

  const { createNewQuizData } = useCreateNewQuiz();
  const { createQuizQuestionsData } = useCreateQuizQuestions();

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllQuestionsData();
      await fetchAllCategoriesData();
    };
    fetchData();
  }, []);

  const handleToggleCheckbox = (question: Question) => {
    const isSelectedAlready = selectedQuestions.some(
      (q) => q.id === question.id
    );

    setSelectedQuestions((prev) => {
      if (isSelectedAlready) {
        return prev.filter((q) => q.id !== question.id);
      } else {
        return [...prev, question];
      }
    });
  };

  const handleCreateButton = async () => {
    const fullQuizCategory = categories.find(
      (c) => c.title === currentCategory
    );

    if (!fullQuizCategory) {
      toast.error("Choose a category for the quiz");
      return;
    }

    if (quizTitle.length < 4) {
      toast.error("Quiz title needs to be at least 3 chars long");
      return;
    }

    try {
      const newQuiz = await createNewQuizData({
        title: quizTitle,
        categoryId: fullQuizCategory.id,
      });

      if (!newQuiz) {
        toast.error("Quiz creation failed");
        return;
      }

      const results = await createQuizQuestionsData(
        newQuiz.id,
        selectedQuestions
      );

      if (!results) {
        toast.error("Failed to add questions to quiz");
        return;
      }

      toast.success("Quiz created successfully!");

      setQuitTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={c.container}>
      <div className={c.header}>
        <p>Create a new quiz!</p>
        {selectedQuestions.length > 4 && (
          <button className={c.submitButton} onClick={handleCreateButton}>
            Create quiz
          </button>
        )}
      </div>

      <div className={c.questionsContainer}>
        <div className={c.questionList}>
          <h1>All question</h1>
          {questions.map((question) => (
            <div className={c.questionContainer} key={question.id}>
              <QuestionWithCheckboxCard
                question={question}
                isSelected={selectedQuestions.includes(question)}
                handleToggleCheckbox={handleToggleCheckbox}
              />
            </div>
          ))}
        </div>

        <div className={c.questionList}>
          <h1>Your quiz: {quizTitle}</h1>
          <input
            type="text"
            placeholder="Enter quiz title"
            value={quizTitle}
            onChange={(e) => setQuitTitle(e.target.value)}
            className={c.titleInput}
          />
          <div className={c.categoryFilter}>
            <CategoryFilter
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
            />
          </div>
          {selectedQuestions.map((question) => (
            <div className={c.questionContainer} key={question.id}>
              <QuestionWithCheckboxCard
                question={question}
                isSelected={selectedQuestions.includes(question)}
                handleToggleCheckbox={handleToggleCheckbox}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
