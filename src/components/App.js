import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import StartScreen from "./Startscreen";
import Questions from "./Questions";
import Loader from "./Loader";
import Error from "./Error";
import Nextbutton from "./Nextbutton";
import Finishscreen from "./Finishscreen";
import Progress from "./Progress";
import Timer from "./Timer";
import TimeOut from "./TimeOut";
import Footer from "./Footer";
let specialTime = 30;

let initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  time: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "ReciveData":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return {
        ...state,
        status: "active",
        time: state.questions.length * specialTime,
      };
    case "answer":
      let question = state.questions.at(state.index);
      console.log(question);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "newQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finish",
        points: state.points,
        highScore:
          state.points < state.highScore ? state.highScore : state.points,
      };
    case "Restar":
      return {
        ...state,
        points: 0,
        answer: null,

        index: 0,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? "timeOut" : state.status,
      };

    default:
      break;
  }
}
function App() {
  let [
    { questions, status, index, answer, points, highScore, time },
    dispatch,
  ] = useReducer(reducer, initialState);
  let numQuestions = questions.length;
  let maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  useEffect(function () {
    async function FetchData() {
      let res = await fetch("http://localhost:9000/questions");
      let data = await res.json();

      dispatch({ type: "ReciveData", payload: data });
    }
    FetchData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            {" "}
            <Progress
              numQuestions={numQuestions}
              maxPoints={maxPoints}
              points={points}
              index={index}
              answer={answer}
            />
            <Questions
              answer={answer}
              dispatch={dispatch}
              questions={questions[index]}
            />{" "}
            <Footer>
              <Timer dispatch={dispatch} time={time} />
              <Nextbutton
                numQuestions={numQuestions}
                index={index}
                answer={answer}
                dispatch={dispatch}
              />
            </Footer>
          </>
        )}{" "}
        {status === "finish" && (
          <Finishscreen
            maxPoints={maxPoints}
            highScore={highScore}
            points={points}
            dispatch={dispatch}
          />
        )}
        {status === "timeOut" && (
          <TimeOut maxPoints={maxPoints} points={points} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;
