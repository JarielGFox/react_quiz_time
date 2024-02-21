// TODO: you need to import here 1 hooks

export default function Answers({
  answers,
  showNextQuestion,
  handleAnswerClick,
  rightAnswer,
}) {
  //funzione per mescolare le risposte (Fisher-Yates puppami la fava)
  const shuffleAnswers = () => {
    return answers.sort(() => Math.random() - 0.5);
  };

  //salviamoci la nostra funzioncina in una variabile
  const shuffledAnswers = shuffleAnswers();

  //funzione per indicare la risposta giusta o sbagliata all'utente
  const currentSelectedAnswer = rightAnswer.find(
    (a) => a.questionId === QUESTIONS[currentQuestion].id
  );

  return (
    <ul id="answers">
      {/* key nel li che prende index */}
      {shuffledAnswers.map((answer, index) => (
        <li key={index} className="answer">
          <button
            className={`answer button ${
              currentSelectedAnswer?.answerText === answer.text
                ? currentSelectedAnswer.isCorrect
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() => {
              handleAnswerClick;
              showNextQuestion();
            }}
          >
            {answer.text}
          </button>
        </li>
      ))}
    </ul>
  );
}
