function Option({ questions, dispatch, answer }) {
  let hasAnswer = answer !== null;
  return (
    <>
      {questions.options.map((option, index) => (
        <button
          disabled={hasAnswer}
          onClick={() => dispatch({ type: "answer", payload: index })}
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswer
              ? index === questions.correctOption
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
