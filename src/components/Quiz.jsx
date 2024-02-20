// TODO: you need to import here 2 different hooks and two components
import { useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  //stato per estrapolare la domanda
  const [currentQuestion, setCurrentQuestion] = useState(0);

  //funzione per passare alla domanda successiva
  function goToNextQuestion() {
    //tramite il prev aggiorniamo l'ultima istantanea dello stato precedente
    setCurrentQuestion((prevQuestion) => {
      //restituiamo la domanda successiva basata sull'ultimo update dello stato
      return prevQuestion + 1;
    });
  }

  if (currentQuestion >= QUESTIONS.length) {
    return <Summary />;
  }

  return (
    <div id="quiz">
      {/* passiamo il testo della domanda */}
      <Question text={QUESTIONS[currentQuestion].text}>
        <Answers
          // passiamo le risposte
          answers={QUESTIONS[currentQuestion].answers}
          showNextQuestion={goToNextQuestion}
        />
      </Question>
    </div>
  );
}
