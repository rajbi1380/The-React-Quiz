import { useContextQuiz } from "../context/contextQuiz";

function Progress() {
  const { maxPoints, numQuestions, points, index, answer } = useContextQuiz();
  return (
    <header className="progress">
      <progress max={15} value={index + Number(answer !== null)}></progress>
      <p>
        Question{" "}
        <strong>
          {index + 1}/{numQuestions}
        </strong>
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
}

export default Progress;
