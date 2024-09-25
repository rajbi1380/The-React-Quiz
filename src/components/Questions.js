import { useContextQuiz } from "../context/contextQuiz";
import Option from "./option";
function Questions() {
  const { questions, index } = useContextQuiz();
  const question = questions.at(index);
  return (
    <div>
      <h4>{questions.question}</h4>
      <div className="options">
        <Option question={question} />
      </div>
    </div>
  );
}

export default Questions;
