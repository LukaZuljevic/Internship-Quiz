import { useState } from "react";
import { Question } from "../../types/Question";
import { useAllQuestions } from "../../api/question/useAllQuestions";
import { QuestionWithCheckboxCard } from "../../components/QuestionWithCheckboxCard";
import c from "./CreateQuizPage.module.css";
import { Category } from "../../types/Category";
import { useAllCategories } from "../../api/category/useAllCategories";
import { CategoryFilter } from "../../components/CategoryFilter";
import toast from "react-hot-toast";
import { useCreateQuiz } from "../../api/quiz/useCreateQuiz";
import { useCreateQuizQuestions } from "../../api/quiz-questions/useCreateQuizQuestions";
import {
  CreateQuizResponseDto,
  QuestionType,
} from "../../types/appGlobalTypes";

export const CreateQuizPage = () => {
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [quizTitle, setQuitTitle] = useState<string>("");
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const { data: questions } = useAllQuestions();
  const { data: categories } = useAllCategories();
  const { mutate: createNewQuiz } = useCreateQuiz();
  const { mutate: createQuizQuestions } = useCreateQuizQuestions();

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

  const validateQuizCreation = (
    fullQuizCategory: Category | undefined
  ): boolean => {
    if (!fullQuizCategory) {
      toast.error("Choose a category for the quiz");
      return false;
    }

    if (quizTitle.length < 4) {
      toast.error("Quiz title needs to be at least 3 chars long");
      return false;
    }

    const noOfQuestionTypes = selectedQuestions.reduce<QuestionType[]>(
      (acc, question) => {
        const type: QuestionType = question.type;
        if (!acc.includes(type)) {
          acc.push(type);
        }
        return acc;
      },
      []
    );

    if (noOfQuestionTypes.length < 2) {
      toast.error("Quiz must contain at least 2 different question types");
      return false;
    }

    return true;
  };

  const handleCreateButton = async () => {
    const fullQuizCategory = categories?.find(
      (c: Category) => c.title === currentCategory
    );

    if (!validateQuizCreation(fullQuizCategory)) return;

    createNewQuiz(
      {
        title: quizTitle,
        categoryId: fullQuizCategory?.id ?? "",
      },
      {
        onSuccess: (newQuiz: CreateQuizResponseDto) => {
          createQuizQuestions(
            { quizId: newQuiz.id, questions: selectedQuestions },
            {
              onSuccess: () => {
                toast.success("Quiz created successfully!");
                setQuitTitle("");
                setSelectedQuestions([]);
                setCurrentCategory("");
              },
              onError: () => {
                toast.error("Failed to add questions to quiz");
              },
            }
          );
        },
        onError: () => {
          toast.error("Failed to create quiz");
        },
      }
    );
  };

  return (
    <div className={c.container}>
      <p className={c.header}>Create a new quiz!</p>

      <div className={c.questionsContainer}>
        <div className={c.questionList}>
          <h1>All question</h1>
          {questions?.map((question) => (
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
            {selectedQuestions.length > 4 && (
              <button className={c.submitButton} onClick={handleCreateButton}>
                Create quiz
              </button>
            )}
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
