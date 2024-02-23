import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ rightAnswer }) {
  const totalQuestions = QUESTIONS.length;
  const correctAnswers = rightAnswer.filter(
    (answer) => answer.isCorrect
  ).length;
  const incorrectAnswers = rightAnswer.filter(
    (answer) => !answer.isCorrect
  ).length;
  const skippedQuestions = totalQuestions - rightAnswer.length;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">
            {((skippedQuestions / totalQuestions) * 100).toFixed(2)} %
          </span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">
            {((correctAnswers / totalQuestions) * 100).toFixed(2)} %
          </span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">
            {((incorrectAnswers / totalQuestions) * 100).toFixed(2)} %
          </span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {QUESTIONS.map((question, index) => {
          const result = rightAnswer.find((r) => r.questionId === question.id);
          const answerGiven = result ? result.answer : "Skipped";
          const cssClass = result
            ? result.isCorrect
              ? "correct"
              : "wrong"
            : "skipped";

          return (
            <li key={question.id}>
              <h3>Question {index + 1}</h3>
              <p className="question">{question.questionText}</p>
              <p className={cssClass}>{answerGiven}</p>
              {!result || !result.isCorrect ? (
                <p className="correct-answer">
                  Correct Answer: {question.answers.find((a) => a.correct).text}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
