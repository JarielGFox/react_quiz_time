// TODO: you need to import here 2 different hooks and two components
import { useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  //stato per estrapolare la domanda
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  //funzione per passare alla domanda successiva
  function goToNextQuestion() {
    //controllo se ho raggiunto l'ultima domanda
    if (currentQuestion < QUESTIONS.length - 1) {
      //restituiamo la domanda successiva basata sull'ultimo update dello stato
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
    }
  }

  const handleTimeGong = () => {
    //mostra il summary appena arriviamo al "gong"
    setShowSummary(true);
  };

  if (showSummary) {
    //mostra il summary quando showSummary è true
    return <Summary />;
  }

  return (
    <div id="quiz">
      {/* passiamo il testo della domanda */}
      <Question
        key={currentQuestion}
        text={QUESTIONS[currentQuestion].text}
        onTimeGong={handleTimeGong}
      >
        <Answers
          // passiamo le risposte
          answers={QUESTIONS[currentQuestion].answers}
          showNextQuestion={goToNextQuestion}
        />
      </Question>
    </div>
  );
}
