import { Question } from "../../types/Question";

type QuizQuestionProps = {
  question: Question;
  onAnswerChange: (answer: any) => void;
};

export const QuizQuestion = ({ question }: QuizQuestionProps) => {
  const parsedOptions = question.options
    ? typeof question.options === "string"
      ? JSON.parse(question.options)
      : question.options
    : null;

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

  const renderFieldQuestion = () => {
    return <h1>field question</h1>;
  };

  const renderNumberQuestion = () => {
    return <h1>number question</h1>;
  };

  const renderSelectQuestion = () => {
    return <h1>select question</h1>;
  };

  const renderMatchQuestion = () => {
    return <h1>match question</h1>;
  };

  const renderOrderQuestion = () => {
    return <h1>order question</h1>;
  };

  return (
    <div>
      <h3>{question.title}</h3>
      <div>{renderQuestionOptions()}</div>
    </div>
  );
};
