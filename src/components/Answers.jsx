import { useRef } from "react";

export default function Answers({
  answers,
  hasAnswered,
  showNextQuestion,
  onAnswerClick,
  rightAnswers,
  currentQuestion,
}) {
  const shuffledAnswers = useRef()

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5)
  }

  return (
    <ul id="answers">
      {/* key nel li che prende index */}
      {shuffledAnswers.current.map((answer, index) => {
        //determiniamo se l'utente ha risposto
        let isSelected = rightAnswers && rightAnswers.text === answer.text;

        //determiniamo se l'utente ha selezionato la risposta corretta
        const isCorrect = answer.correct;

        //applichiamo la classe corretta per il feedback visivo
        const answerClasses = `${isSelected ? "selected" : ""} ${hasAnswered ? (isCorrect ? "correct" : "wrong") : ""
          }`;

        return (
          <li key={index} className="answer">
            <button
              disabled={hasAnswered}
              className={`answer button ${answerClasses}`}
              onClick={() => {
                onAnswerClick(currentQuestion, answer);
                //passo setTimeout alla funzione in modo che l'utente ha il tempo di ricevere il feedback visivo
                setTimeout(showNextQuestion, 2000);
              }}
            >
              {answer.text}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
