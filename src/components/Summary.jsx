import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ rightAnswer }) {
  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">0 %</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{rightAnswer} %</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">0 %</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {/* ricordati di passare la key */}
        <li>
          <h3>CURRENT INDEX</h3>
          <p className="question">QUESTION</p>
          {/* ricordati di aggiungere la cssClass custom sotto */}
          <p className>Skipped</p>
        </li>
      </ol>
    </div>
  );
}
