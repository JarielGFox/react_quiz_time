// TODO: you need to import here 1 hooks

export default function Answers({
  answers,
  showNextQuestion,
  handleAnswerClick,
}) {
  //funzione per mescolare le risposte (Fisher-Yates puppami la fava)
  const shuffleAnswers = () => {
    return answers.sort(() => Math.random() - 0.5);
  };

  //salviamoci la nostra funzioncina in una variabile
  const shuffledAnswers = shuffleAnswers();

  return (
    <ul id="answers">
      {/* key nel li che prende index */}
      {shuffledAnswers.map((answer, index) => (
        <li key={index} className="answer">
          <button
            className=""
            onClick={showNextQuestion}
            onAnswerClick={handleAnswerClick}
          >
            {answer.text}
          </button>
        </li>
      ))}
    </ul>
  );
}
