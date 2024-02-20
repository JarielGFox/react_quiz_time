// TODO: you need to import here 1 hook and 2 components
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Question({ text, children }) {
  return (
    <div id="question">
      <QuestionTimer />
      <h2>{text}</h2>
      {children}
    </div>
  );
}
