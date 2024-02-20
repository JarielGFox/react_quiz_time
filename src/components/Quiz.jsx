// TODO: you need to import here 2 different hooks and two components
import { useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  function goToNextQuestion() {
    setCurrentQuestion((prevQuestion) => {
      return prevQuestion + 1;
    });
  }

  return (
    <div id="quiz">
      <Question text={QUESTIONS[currentQuestion].text}>
        <Answers
          answers={QUESTIONS[currentQuestion].answers}
          showNextQuestion={goToNextQuestion}
        />
      </Question>
    </div>
  );
}
