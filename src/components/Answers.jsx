// TODO: you need to import here 1 hooks

export default function Answers({
  answers,
  hasAnswered,
  showNextQuestion,
  onAnswerClick,
  rightAnswer,
  currentQuestion,
}) {
  //funzione per mescolare le risposte (Fisher-Yates puppami la fava)
  const shuffleAnswers = () => {
    return answers.sort(() => Math.random() - 0.2);
  };

  //salviamoci la nostra funzioncina per mescolare, in una variabile
  const shuffledAnswers = shuffleAnswers();

  return (
    <ul id="answers">
      {/* key nel li che prende index */}
      {shuffledAnswers.map((answer, index) => {
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
