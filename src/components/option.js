import { useContextQuiz } from "../context/contextQuiz";

function Option({ question }) {
  const { dispatch, answer } = useContextQuiz();
  console.log(question);
  let hasAnswer = answer !== null;

  return (
    <>
      {question.options.map((option, index) => (
        <button
          disabled={hasAnswer}
          onClick={() => dispatch({ type: "answer", payload: index })}
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
        >
          {option}
        </button>
      ))}
    </>
  );
}

export default Option;
