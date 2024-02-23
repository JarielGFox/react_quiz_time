// TODO: you need to import here 2 different hooks and two components
import { useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";
import Summary from "./Summary.jsx";

//to do per domani: fare un controllo quando si clicca o no, Click --> reset Barra --> colore bottone ---> prossima domanda
//non clicco > prossima domanda, clicco, feedback visivo

//la funzione di shuffling tale e quale  acom'è ora anche se ovviamente con le variabili del caso in Quiz.jsx, passare la props ad Answers ed invocare su goToNextQuestion dopo che ha cambiato l'indice della domanda corrente

export default function Quiz() {
  //stato per estrapolare la domanda
  const [currentQuestion, setCurrentQuestion] = useState(0);
  //stato per mostrare il summary all'ultima domanda o allo scadere del tempo
  const [showSummary, setShowSummary] = useState(false);
  //stato per tenere traccia delle domande selezionate dall'utente
  const [rightAnswer, setRightAnswer] = useState([]);
  //stato per capire se l'utente ha risposto o no
  const [hasAnswered, setHasAnswered] = useState(false);

  function shuffleAnswer() {
    //andiamo a mischiare le risposte tramite metodo sort()
    QUESTIONS[currentQuestion].answers.sort(() => Math.random() - 0.5);
    //assegnamo una chiave manualmente impostata a true
    QUESTIONS[currentQuestion].shuffled = true;
  }

  //funzione per passare alla domanda successiva
  function goToNextQuestion() {
    //controllo se ho raggiunto l'ultima domanda
    if (currentQuestion < QUESTIONS.length - 1) {
      //restituiamo la domanda successiva basata sull'ultimo update dello stato
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setHasAnswered(false);
        shuffleAnswer();
      }, 3000);

      //riabilitiamo la risposta per le successive domande
    } else {
      setShowSummary(true);
    }
  }

  //approccio per memorizzare le risposte dell'utente: funzione con due parametri, id e risposta, uso del prev in setRightAnswer per tenere traccia delle risposte, return di COPIA di array di filtered answers con oggetto dentro che punta la risposta corretta (vedi esempio Simone se non ricordi sintassi)
  function handleAnswerClick(questionId, answer) {
    //controllo se l'utente ha risposto
    if (hasAnswered) return;
    //disabilitiamo ulteriori risposte
    setHasAnswered(true);
    //se hai già risposto non deve più cliccare sulla stessa domanda
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

  //allo scadere del tempo ti sbatte alla prossima domanda
  const handleTimeGong = () => {
    //se la domanda corrente è minore della lunghezza dell'array di domande
    if (currentQuestion < QUESTIONS.length - 1) {
      //restituiamo la domanda successiva
      setCurrentQuestion(currentQuestion + 1);
    } else {
      //finite le domande restituiamo il summary
      setShowSummary(true);
    }
  };

  if (showSummary) {
    //mostra il summary quando showSummary è true (cioè quando è finito il tempo)
    return (
      <Summary rightAnswer={rightAnswer} totalQuestions={QUESTIONS.length} />
    );
  }

  if (
    //se la chiave della domanda corrente è undefined o diversa da true, mischia le risposte
    typeof QUESTIONS[currentQuestion].shuffled === "undefined" ||
    !QUESTIONS[currentQuestion].shuffled
  ) {
    shuffleAnswer();
  }

  console.log(QUESTIONS[currentQuestion].shuffled);

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
          hasAnswered={hasAnswered}
          showNextQuestion={goToNextQuestion}
          onAnswerClick={handleAnswerClick}
          rightAnswer={rightAnswer}
          currentQuestion={currentQuestion}
        />
      </Question>
    </div>
  );
}
