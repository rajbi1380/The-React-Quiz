import Option from "./option";
function Questions({ questions, dispatch, answer }) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <div className="options">
        <Option answer={answer} questions={questions} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default Questions;
