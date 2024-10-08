import { useEffect } from "react";
import { useContextQuiz } from "../context/contextQuiz";

function Timer() {
  const { dispatch, time } = useContextQuiz();
  let mins = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  useEffect(
    function () {
      let id = setInterval(() => dispatch({ type: "tick" }), 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 ? "0" + mins : mins} :{seconds < 10 ? "0" + seconds : seconds}
    </div>
  );
}

export default Timer;
