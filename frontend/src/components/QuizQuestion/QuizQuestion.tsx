import { useEffect, useState } from "react";
import { Question, QuestionType, Options } from "../../types/Question";
import c from "./QuizQuestion.module.css";
import { Answer } from "../../types/Answer";

type QuizQuestionProps = {
  question: Question;
  onAnswerChange: (answer: Answer) => void;
  currentAnswer?: Answer;
  isCorrect: boolean | undefined;
};

export const QuizQuestion = ({
  question,
  onAnswerChange,
  currentAnswer,
  isCorrect,
}: QuizQuestionProps) => {
  const parsedOptions = question.options
    ? typeof question.options === "string"
      ? JSON.parse(question.options)
      : question.options
    : null;

  const [answer, setAnswer] = useState<Answer>(
    currentAnswer || getDefaultAnswer(question.type)
  );

  function getDefaultAnswer(type: QuestionType) {
    switch (type) {
      case "Number":
      case "Select":
      case "Field":
        return "";
      case "Match":
        const matchOptions = parsedOptions as { firstArray: string[] };
        return matchOptions.firstArray.reduce((acc, item) => {
          return { ...acc, [item]: "" };
        }, {});
      case "Order":
        return parsedOptions;
      default:
        return "";
    }
  }

  const renderQuestionOptions = () => {
    switch (question.type) {
      case "Field":
        return renderFieldQuestion();
      case "Number":
        return renderNumberQuestion();
      case "Select":
        return renderSelectQuestion();
      case "Match":
        return renderMatchQuestion();
      case "Order":
        return renderOrderQuestion();
      default:
        return <p>Unknown question type</p>;
    }
  };

  const handleValueChange = (answer: string) => {
    setAnswer(answer);
  };

  const handleMatchChange = (pendingAnswer: string, option: string) => {
    setAnswer((prev) => ({
      ...(typeof prev === "object" && !Array.isArray(prev) ? prev : {}),
      [option]: pendingAnswer,
    }));
  };

  const handleOrderChangeClick = (direction: "up" | "down", index: number) => {
    if (!Array.isArray(answer)) return;

    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === answer.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;

    const newOrder = [...answer];
    [newOrder[index], newOrder[newIndex]] = [
      newOrder[newIndex],
      newOrder[index],
    ];

    setAnswer(newOrder);
  };

  useEffect(() => {
    onAnswerChange(answer);
  }, [answer]);

  const renderFieldQuestion = () => {
    return (
      <input
        type="text"
        value={typeof answer === "string" ? answer : ""}
        placeholder="Enter you answer"
        onChange={(e) => handleValueChange(e.target.value)}
        disabled={isCorrect !== undefined}
        className={c.textInput}
      />
    );
  };

  const renderNumberQuestion = () => {
    return (
      <input
        type="number"
        value={typeof answer === "string" ? answer : ""}
        onChange={(e) => handleValueChange(e.target.value)}
        disabled={isCorrect !== undefined}
        className={c.numberInput}
      />
    );
  };

  const renderSelectQuestion = () => {
    return (
      <div className={c.radioQuestion}>
        {parsedOptions.map((option: string, index: number) => (
          <div key={index} className={c.radioOption}>
            <input
              type="radio"
              value={option}
              onChange={(e) => handleValueChange(e.target.value)}
              checked={answer === option}
              disabled={isCorrect !== undefined}
            />
            <label className={c.radioLabel}>{option}</label>
          </div>
        ))}
      </div>
    );
  };

  const renderMatchQuestion = () => {
    const options = parsedOptions as {
      firstArray: string[];
      secondArray: string[];
    };
    return (
      <>
        {options.firstArray.map((option: string, index: number) => (
          <div key={index} className={c.matchQuestion}>
            <p className={c.matchLabel}>{option}</p>
            <select
              value={
                typeof answer === "object" && !Array.isArray(answer)
                  ? answer[option] ?? ""
                  : ""
              }
              onChange={(e) => handleMatchChange(e.target.value, option)}
              disabled={isCorrect !== undefined}
              className={c.matchInput}
            >
              <option value="">Choose</option>
              {options.secondArray.map((option: string, index: number) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </>
    );
  };

  const renderOrderQuestion = () => {
    return (
      <div className={c.orderQuestion}>
        {Array.isArray(answer) &&
          answer.map((option: string, index: number) => (
            <div key={index} className={c.orderItem}>
              <button
                onClick={() => handleOrderChangeClick("up", index)}
                disabled={isCorrect !== undefined}
                className={c.orderButton}
              >
                &#8593;
              </button>
              <p>{option}</p>
              <button
                onClick={() => handleOrderChangeClick("down", index)}
                disabled={isCorrect !== undefined}
                className={c.orderButton}
              >
                &#8595;
              </button>
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      <h3 className={c.questionTitle}>{question.title}</h3>
      <div>{renderQuestionOptions()}</div>
      {isCorrect !== undefined &&
        (isCorrect ? (
          <p className={c.correct}>Correct!</p>
        ) : (
          <p className={c.incorrect}>Incorect!</p>
        ))}
    </>
  );
};
