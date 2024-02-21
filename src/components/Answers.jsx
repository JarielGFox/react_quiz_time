import QUESTIONS from "../questions.js";
// TODO: you need to import here 1 hooks

export default function Answers({ answers, showNextQuestion }) {
  return (
    <ul id="answers">
      {/* key nel li che prende index */}
      {answers.map((answer, index) => (
        <li key={index} className="answer">
          <button className="" onClick={showNextQuestion}>
            {answer.text}
          </button>
        </li>
      ))}
    </ul>
  );
}
