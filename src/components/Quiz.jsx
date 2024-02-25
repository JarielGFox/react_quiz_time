// TODO: you need to import here 2 different hooks and two components
import { useState, useRef } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";
import Summary from "./Summary.jsx";

const QUESTIONS_LENGTH = QUESTIONS.length;
//to do per domani: fare un controllo quando si clicca o no, Click --> reset Barra --> colore bottone ---> prossima domanda
//non clicco > prossima domanda, clicco, feedback visivo

//la funzione di shuffling tale e quale  acom'è ora anche se ovviamente con le variabili del caso in Quiz.jsx, passare la props ad Answers ed invocare su goToNextQuestion dopo che ha cambiato l'indice della domanda corrente

export default function Quiz() {
  //stato per estrapolare la domanda
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = QUESTIONS[currentQuestionIndex];


  //stato per mostrare il summary all'ultima domanda o allo scadere del tempo
  const [showSummary, setShowSummary] = useState(false);
  //stato per tenere traccia delle domande selezionate dall'utente
  const [rightAnswers, setRightAnswers] = useState([]);
  //stato per capire se l'utente ha risposto o no
  const [hasAnswered, setHasAnswered] = useState(false);


  //funzione per passare alla domanda successiva
  function goToNextQuestion() {
    //controllo se ho raggiunto l'ultima domanda
    if (currentQuestionIndex < QUESTIONS_LENGTH - 1) {

      //restituiamo la domanda successiva basata sull'ultimo update dello stato
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setHasAnswered(false);
        // shuffleAnswer();
      }, 3000);

      //riabilitiamo la risposta per le successive domande
    } else {
      setShowSummary(true);
    }
  }

  //approccio per memorizzare le risposte dell'utente: funzione con due parametri, id e risposta, uso del prev in setRightAnswers per tenere traccia delle risposte, return di COPIA di array di filtered answers con oggetto dentro che punta la risposta corretta (vedi esempio Simone se non ricordi sintassi)
  function handleAnswerClick(questionId, answer) {
    //controllo se l'utente ha risposto
    if (hasAnswered) return;
    //disabilitiamo ulteriori risposte
    setHasAnswered(true);
    //se hai già risposto non deve più cliccare sulla stessa domanda
    setRightAnswers((prevAnswers) => {
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
    if (currentQuestionIndex < QUESTIONS_LENGTH - 1) {

      //restituiamo la domanda successiva
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      //finite le domande restituiamo il summary
      setShowSummary(true);
    }
  };

  if (showSummary) {
    //mostra il summary quando showSummary è true (cioè quando è finito il tempo)
    return (
      <Summary rightAnswers={rightAnswers} />
    );
  }

  // if (
  //   //se la chiave della domanda corrente è undefined o diversa da true, esegui la funzione shuffleAnswers()
  //   !currentQuestion.shuffled
  // ) {
  //   shuffleAnswer();
  // }

  return (
    <div id="quiz">
      {/* passiamo il testo della domanda */}
      <Question
        key={currentQuestionIndex}
        text={currentQuestion.text}
        onTimeGong={handleTimeGong}
      >
        <Answers
          // passiamo le risposte
          answers={currentQuestion.answers}
          hasAnswered={hasAnswered}
          showNextQuestion={goToNextQuestion}
          onAnswerClick={handleAnswerClick}
          rightAnswers={rightAnswers}
          currentQuestionIndex={currentQuestionIndex}
        />
      </Question>
    </div>
  );
}
