// TODO: you need to import here 2 different hooks and two components
import { useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";
import Summary from "./Summary.jsx";

//to do per domani: fare un controllo quando si clicca o no, Click --> reset Barra --> colore bottone ---> prossima domanda
//non clicco > prossima domanda, clicco, feedback visivo

export default function Quiz() {
  //stato per estrapolare la domanda
  const [currentQuestion, setCurrentQuestion] = useState(0);
  //stato per mostrare il summary all'ultima domanda o allo scadere del tempo
  const [showSummary, setShowSummary] = useState(false);
  //stato per tenere traccia delle domande selezionate dall'utente
  const [rightAnswer, setRightAnswer] = useState([]);

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

  //approccio per memorizzare le risposte dell'utente: funzione con due parametri, id e risposta, uso del prev in setRightAnswer per tenere traccia delle risposte, return di COPIA di array di filtered answers con oggetto dentro che punta la risposta corretta (vedi esempio Simone se non ricordi sintassi)
  function handleAnswerClick(questionId, answer) {
    setRightAnswer((prevAnswers) => {
      const filteredAnswers = prevAnswers.filter(
        (a) => a.questionId !== questionId
      );
      return [
        ...filteredAnswers,
        {
          questionId,
          answerText: answer.text,
          isCorrect: answer.correct,
        },
      ];
    });
  }

  //non deve mostrarti il summary ma mandarti alla prossima domanda
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
          onAnswerClick={handleAnswerClick}
          rightAnswer={rightAnswer}
          currentQuestion={currentQuestion}
        />
      </Question>
    </div>
  );
}
