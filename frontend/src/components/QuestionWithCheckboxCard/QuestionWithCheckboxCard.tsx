import { Question } from "../../types/Question";
import c from "./QuestionWithCheckboxCard.module.css";

type QuestionWithCheckboxCardProps = {
  question: Question;
  handleToggleCheckbox: (question: Question) => void;
  isSelected: boolean;
};

export const QuestionWithCheckboxCard = ({
  question,
  handleToggleCheckbox,
  isSelected,
}: QuestionWithCheckboxCardProps) => {
  const parsedOptions = question.options
    ? typeof question.options === "string"
      ? JSON.parse(question.options)
      : question.options
    : null;

  const renderQuestionContent = () => {
    switch (question.type) {
      case "Select":
      case "Order":
        return (
          <div className={c.questionContent}>
            <p>{question.title}</p>
            <ul className={c.questionOptions}>
              {Array.isArray(parsedOptions) &&
                parsedOptions.map((option: string, index: number) => (
                  <li key={index}>
                    {index + 1}. {option}
                  </li>
                ))}
            </ul>
          </div>
        );
      case "Number":
      case "Field":
        return <p className={c.questionContent}>{question.title}</p>;

      case "Match":
        const firstMatchOptions = parsedOptions as { firstArray: string[] };
        const secondsMatchOptions = parsedOptions as { secondArray: string[] };

        return (
          <div className={c.questionContent}>
            <p>{question.title}</p>
            <ul className={c.questionOptions}>
              {firstMatchOptions.firstArray.map(
                (option: string, index: number) => (
                  <li key={index}>
                    {index + 1}. {option}
                  </li>
                )
              )}
            </ul>

            <ul className={c.questionOptions}>
              {secondsMatchOptions.secondArray.map(
                (option: string, index: number) => (
                  <li key={index}>
                    {index + 1}. {option}
                  </li>
                )
              )}
            </ul>
          </div>
        );
      default:
        return <p className={c.questionContent}>{question.title}</p>;
    }
  };

  return (
    <div className={c.questionCard}>
      <div className={c.questionInfo}>
        {renderQuestionContent()}
        <p>
          <span className={c.typeSpan}>TYPE: </span>
          {question.type}
        </p>
      </div>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => handleToggleCheckbox(question)}
      />
    </div>
  );
};
