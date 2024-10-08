import { useContextQuiz } from "../context/contextQuiz";

function Nextbutton() {
  const { answer, index, numQuestions, dispatch } = useContextQuiz();
  if (answer === null) return null;
  if (index < numQuestions - 1) {
    return (
      <button
        onClick={() => dispatch({ type: "newQuestion" })}
        className="btn btn-ui"
      >
        Next
      </button>
    );
  }
  if (index === numQuestions - 1) {
    return (
      <button
        onClick={() => dispatch({ type: "finish" })}
        className="btn btn-ui"
      >
        Finish
      </button>
    );
  }
}

export default Nextbutton;
