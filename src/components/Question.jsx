// TODO: you need to import here 1 hook and 2 components
//ho usato children quindi mi sa che il componente diventa uno!
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
