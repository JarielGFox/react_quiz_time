// TODO: you need to import here 1 hooks

export default function Answers({
  answers,
  hasAnswered,
  showNextQuestion,
  onAnswerClick,
  rightAnswer,
  currentQuestion,
}) {
  const shuffleMyAnswers = answers.sort((a, b) => Math.random(a, b) - 0.2);

  console.log(shuffleMyAnswers);

  return (
    <ul id="answers">
      {/* key nel li che prende index */}
      {shuffleMyAnswers.map((answer, index) => {
        //determiniamo se l'utente ha risposto
        let isSelected = rightAnswer && rightAnswer.text === answer.text;

        //determiniamo se l'utente ha selezionato la risposta corretta
        const isCorrect = answer.correct;

        //applichiamo la classe corretta per il feedback visivo
        const answerClasses = `${isSelected ? "selected" : ""} ${
          hasAnswered ? (isCorrect ? "correct" : "wrong") : ""
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
